import type { NameInput, ParsedName } from "#fa8gbb35wvs1";
import { isRecord, toString as toText } from "@trebired/utils";
import { isTitle } from "./titles.js";
import { PARTICLES } from "./word.js";

type SplitName = Omit<ParsedName, "gender">;

function nameText(input: NameInput | unknown): string {
  if (typeof input === "string") return input;
  if (!isRecord(input)) return toText(input);
  const parts = input as { full?: string; given?: string; surname?: string };
  if (parts.full) return String(parts.full);
  return [parts.given, parts.surname].filter(Boolean).join(" ");
}

function splitTitles(tokens: string[]) {
  let start = 0;
  let end = tokens.length;
  while (start < end - 1 && isTitle(tokens[start])) start += 1;
  while (end > start + 1 && isTitle(tokens[end - 1])) end -= 1;
  const core = tokens.slice(start, end);
  const separator = core.length && /,$/u.test(core[core.length - 1]) ? ", " : " ";
  return {
    core: core.map((token) => token.replace(/,$/u, "")),
    separator,
    titlesAfter: tokens.slice(end),
    titlesBefore: tokens.slice(0, start),
  };
}

function particleStart(core: string[]) {
  let index = core.length - 1;
  while (index > 1 && PARTICLES.has(core[index - 1].toLowerCase())) index -= 1;
  return index;
}

function splitExplicit(input: { given?: string; surname?: string }): SplitName {
  return {
    given: String(input.given || "").split(/\s+/u).filter(Boolean),
    surname: String(input.surname || "").trim(),
    titlesAfter: [],
    titlesAfterSeparator: " ",
    titlesBefore: [],
  };
}

function splitName(input: NameInput | unknown): SplitName {
  const parts = input && typeof input === "object" ? input as { full?: string; given?: string; surname?: string } : null;
  if (parts && !parts.full && (parts.given || parts.surname)) return splitExplicit(parts);
  const tokens = nameText(input).trim().split(/\s+/u).filter(Boolean);
  const { core, separator, titlesAfter, titlesBefore } = splitTitles(tokens);
  const base = { titlesAfter, titlesAfterSeparator: separator, titlesBefore };
  if (core.length <= 1) return { ...base, given: core, surname: "" };
  const surnameStart = particleStart(core);
  return { ...base, given: core.slice(0, surnameStart), surname: core.slice(surnameStart).join(" ") };
}

function lastSurnameWord(surname: string) {
  const words = String(surname || "").split(/[\s-]+/u).filter(Boolean);
  return words[words.length - 1] || "";
}

export { lastSurnameWord, nameText, splitName };
export type { SplitName };
