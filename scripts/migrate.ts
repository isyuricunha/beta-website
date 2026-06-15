import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const BASE_DIR = path.resolve('src/content');
const BLOG_DIR = path.join(BASE_DIR, 'blog');
const SNIPPETS_DIR = path.join(BASE_DIR, 'snippets');

async function getFiles(dir: string): Promise<string[]> {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  }));
  return Array.prototype.concat(...files);
}

function mapLocale(locale: string) {
  if (locale === 'pt' || locale === 'pt-br') return 'pt-br';
  if (locale.toLowerCase() === 'zh-cn') return 'zh-cn';
  return locale;
}

async function migrateFile(file: string, collection: 'blog' | 'snippets') {
  if (!file.endsWith('.md') && !file.endsWith('.mdx')) return;

  const content = await fs.readFile(file, 'utf-8');
  const parsed = matter(content);

  const relativePath = path.relative(path.join(BASE_DIR, collection), file);
  const parts = relativePath.split(path.sep);
  
  let locale = 'en';
  let slug = '';
  
  if (parts.length === 2) {
    // Check if it's locale/slug.mdx
    const p1IsLocale = ['en', 'pt', 'pt-br', 'es', 'fr', 'ja', 'zh-CN', 'de'].includes(parts[0]);
    if (p1IsLocale) {
      locale = mapLocale(parts[0]);
      slug = parts[1];
    } else {
      // It's slug/locale.mdx
      locale = mapLocale(parts[1].replace(/\.mdx?$/, ''));
      slug = parts[0] + path.extname(parts[1]);
    }
  } else {
    // Just dump it into 'en' if not sure
    slug = parts[parts.length - 1];
  }

  const newDir = path.join(BASE_DIR, collection, locale);
  await fs.mkdir(newDir, { recursive: true });
  const newFilePath = path.join(newDir, slug);

  const data = parsed.data;
  data.locale = locale;

  if (data.summary) {
    data.description = data.summary;
    delete data.summary;
  }
  if (!data.description) data.description = data.title || "No description";

  if (data.date) {
    data.publishedDate = data.date;
    delete data.date;
  }
  if (!data.publishedDate) data.publishedDate = new Date();

  if (data.modifiedTime) {
    data.updatedDate = data.modifiedTime;
    delete data.modifiedTime;
  }

  if (collection === 'snippets' && !data.category) {
    data.category = 'general';
  }
  
  if (data.author) delete data.author;

  const newContent = matter.stringify(parsed.content, data);
  
  if (file !== newFilePath) {
    await fs.unlink(file);
  }
  
  await fs.writeFile(newFilePath, newContent, 'utf-8');
}

async function run() {
  const blogFiles = await getFiles(BLOG_DIR);
  for (const file of blogFiles) {
    await migrateFile(file, 'blog');
  }
  
  const snippetFiles = await getFiles(SNIPPETS_DIR);
  for (const file of snippetFiles) {
    await migrateFile(file, 'snippets');
  }

  const cleanupDirs = async (dir: string) => {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    for (const d of dirents) {
      if (d.isDirectory()) {
        const p = path.join(dir, d.name);
        await cleanupDirs(p);
        const remaining = await fs.readdir(p);
        if (remaining.length === 0) await fs.rmdir(p);
      }
    }
  };
  await cleanupDirs(BLOG_DIR);
  await cleanupDirs(SNIPPETS_DIR);
  console.log("Migration complete!");
}

run().catch(console.error);
