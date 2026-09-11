import { normalizeGrammarLanguage } from "#ml0qtbq1umai";
import type { ListOptions } from "#fa8gbb35wvs1";

type ListFormatter = { format(values: string[]): string };
type ListFormatConstructor = new(language: string, options: ListOptions) => ListFormatter;

function listFormatConstructor(): ListFormatConstructor | null {
  const candidate = (Intl as unknown as { ListFormat?: ListFormatConstructor }).ListFormat;
  return typeof candidate === "function" ? candidate : null;
}

function formatList(items: unknown, language?: unknown, options: ListOptions = {}): string {
  const values = (Array.isArray(items) ? items : [items])
  .map((item) => String(item ?? "").trim())
  .filter(Boolean);
  const ListFormat = listFormatConstructor();
  if (!ListFormat) return values.join(", ");
  return new ListFormat(normalizeGrammarLanguage(language), {
      style: options.style || "long",
      type: options.type ||"conjunction",
  }).format(values);
}

export { formatList };
