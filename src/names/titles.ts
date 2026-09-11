const TITLES = new Set([
    "arch.",
    "b.a.",
    "b.sc.",
    "bc.",
    "bca.",
    "bsc.",
    "csc.",
    "dba",
    "dis.",
    "doc.",
    "dr.",
    "drsc.",
    "ii",
    "iii",
    "ing.",
    "iv",
    "jr.",
    "judr.",
    "ll.b.",
    "ll.m.",
    "m.a.",
    "m.sc.",
    "mba",
    "mddr.",
    "mga.",
    "mgr.",
    "ml.",
    "mph",
    "msc.",
    "mudr.",
    "mvdr.",
    "paeddr.",
    "ph.d.",
    "phd",
    "phd.",
    "pharmdr.",
    "phdr.",
    "prof.",
    "rndr.",
    "rsdr.",
    "sr.",
    "st.",
    "th.d.",
    "thdr.",
    "thlic.",
]);

function isTitle(token: string): boolean {
  const value = String(token ?? "").toLowerCase().replace(/[,;]$/u, "");
  if (!value) return false;
  if (TITLES.has(value)) return true;
  if (/^\p{L}\.$/u.test(value)) return false;
  return value.length <= 9 && /^\p{L}{2,}\.(?:\p{L}+\.)*$/u.test(value);
}

export { isTitle };
