export function truncateText(text: string, charLimit: number): string {
  if (text.length <= charLimit) {
    return text;
  }
  return text.substring(0, charLimit) + "...";
}
