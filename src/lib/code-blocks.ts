const codeLanguageLabels: Readonly<Record<string, string>> = {
  dockerfile: "docker",
  sh: "shell",
  zsh: "shell",
  yml: "yaml",
};

export function getCodeLanguageLabel(language: string | undefined): string {
  const normalizedLanguage = language?.trim().toLowerCase() ?? "";

  if (!normalizedLanguage) {
    return "text";
  }

  return codeLanguageLabels[normalizedLanguage] ?? normalizedLanguage;
}
