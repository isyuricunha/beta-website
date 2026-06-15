export function getProjectTaxonomy(
  category: string,
  stack: readonly string[],
  tags: readonly string[],
): string[] {
  const seenLabels = new Set<string>();
  const taxonomy: string[] = [];

  for (const value of [category, ...stack, ...tags]) {
    const label = value.trim();
    const normalizedLabel = label.toLocaleLowerCase();

    if (!normalizedLabel || seenLabels.has(normalizedLabel)) {
      continue;
    }

    seenLabels.add(normalizedLabel);
    taxonomy.push(label);
  }

  return taxonomy;
}
