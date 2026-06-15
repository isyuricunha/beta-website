export function getProjectLabels(labels: readonly string[]): string[] {
  const seenLabels = new Set<string>();
  const projectLabels: string[] = [];

  for (const value of labels) {
    const label = value.trim();
    const normalizedLabel = label.toLocaleLowerCase();

    if (!normalizedLabel || seenLabels.has(normalizedLabel)) {
      continue;
    }

    seenLabels.add(normalizedLabel);
    projectLabels.push(label);
  }

  return projectLabels;
}

export function getProjectTaxonomy(
  category: string,
  stack: readonly string[],
  tags: readonly string[],
): string[] {
  return getProjectLabels([category, ...stack, ...tags]);
}
