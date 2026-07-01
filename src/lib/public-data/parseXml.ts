function decodeXmlValue(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .trim();
}

export function getXmlTagValue(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return match ? decodeXmlValue(match[1]) : '';
}

export function parseXmlItems(
  xml: string,
  itemTag: string,
  fields: string[],
): Record<string, string>[] {
  const itemRegex = new RegExp(`<${itemTag}[^>]*>([\\s\\S]*?)<\\/${itemTag}>`, 'gi');
  const items: Record<string, string>[] = [];
  let match: RegExpExecArray | null;

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const row: Record<string, string> = {};

    for (const field of fields) {
      const fieldMatch = block.match(
        new RegExp(`<${field}[^>]*>([\\s\\S]*?)<\\/${field}>`, 'i'),
      );
      row[field] = fieldMatch ? decodeXmlValue(fieldMatch[1]) : '';
    }

    items.push(row);
  }

  return items;
}
