import fs from 'fs/promises';
import path from 'path';

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

async function fixPaths() {
  const allFiles = [...await getFiles(BLOG_DIR), ...await getFiles(SNIPPETS_DIR)];
  
  for (const file of allFiles) {
    if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;
    
    const collection = file.includes('/snippets/') ? 'snippets' : 'blog';
    const relativePath = path.relative(path.join(BASE_DIR, collection), file);
    const parts = relativePath.split(path.sep);
    
    if (parts.length === 2) {
      const p1 = parts[0];
      const p2 = parts[1];
      const p2name = p2.replace(/\.mdx?$/, '');
      const isP1Locale = ['en', 'pt', 'pt-br', 'es', 'fr', 'ja', 'zh-CN', 'zh-cn', 'de'].includes(p1);
      
      if (isP1Locale) {
        const locale = p1;
        const slug = p2name;
        const newDir = path.join(BASE_DIR, collection, slug);
        await fs.mkdir(newDir, { recursive: true });
        const newPath = path.join(newDir, `${locale}.mdx`);
        
        if (file !== newPath) {
          await fs.rename(file, newPath);
        }
      }
    }
  }

  const cleanupDirs = async (dir: string) => {
    try {
      const dirents = await fs.readdir(dir, { withFileTypes: true });
      for (const d of dirents) {
        if (d.isDirectory()) {
          const p = path.join(dir, d.name);
          await cleanupDirs(p);
          try {
            const remaining = await fs.readdir(p);
            if (remaining.length === 0) await fs.rmdir(p);
          } catch(e) {}
        }
      }
    } catch(e) {}
  };
  await cleanupDirs(BLOG_DIR);
  await cleanupDirs(SNIPPETS_DIR);
  console.log("Restructure complete!");
}

fixPaths().catch(console.error);
