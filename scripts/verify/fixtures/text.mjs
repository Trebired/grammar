const CZECH_FILES = { few: "soubory", many: "souboru", one: "soubor", other: "souborů" };
const ENGLISH_FILES = { one: "file", other: "files" };

const COUNTS = [
  [0, "cs", CZECH_FILES, "0 souborů"],
  [1, "cs", CZECH_FILES, "1 soubor"],
  [2, "cs", CZECH_FILES, "2 soubory"],
  [4, "cs", CZECH_FILES, "4 soubory"],
  [5, "cs", CZECH_FILES, "5 souborů"],
  [1.5, "cs", CZECH_FILES, "1,5 souboru"],
  ["1,5", "cs", CZECH_FILES, "1,5 souboru"],
  [21, "cs", CZECH_FILES, "21 souborů"],
  [1000, "cs", CZECH_FILES, "1 000 souborů"],
  [0, "en", ENGLISH_FILES, "0 files"],
  [1, "en", ENGLISH_FILES, "1 file"],
  [2, "en", ENGLISH_FILES, "2 files"],
  [1.5, "en", ENGLISH_FILES, "1.5 files"],
  [1000, "en", ENGLISH_FILES, "1,000 files"],
];

const CATEGORIES = [
  [1, "cs", "one"],
  [3, "cs", "few"],
  [5, "cs", "other"],
  [-1, "cs", "one"],
  [1.5, "cs", "many"],
  [1, "en", "one"],
  [2, "en", "other"],
  ["abc", "en", "other"],
];

const ORDINALS = [
  [1, "en", "1st"],
  [2, "en", "2nd"],
  [3, "en", "3rd"],
  [4, "en", "4th"],
  [11, "en", "11th"],
  [12, "en", "12th"],
  [13, "en", "13th"],
  [21, "en", "21st"],
  [22, "en", "22nd"],
  [101, "en", "101st"],
  [111, "en", "111th"],
  [3, "cs", "3."],
  [22, "cs", "22."],
];

const LISTS = [
  [["Jan", "Petr", "Eva"], "cs", {}, "Jan, Petr a\u00a0Eva"],
  [["Jan", "Petr", "Eva"], "en", {}, "Jan, Petr, and Eva"],
  [["Jan", "Petr", "Eva"], "en", { type: "disjunction" }, "Jan, Petr, or Eva"],
  [["Jan", "Petr", "Eva"], "cs", { type: "disjunction" }, "Jan, Petr nebo Eva"],
];

const ARTICLES = [
  ["apple", "an"],
  ["user", "a"],
  ["hour", "an"],
  ["honest", "an"],
  ["house", "a"],
  ["MBA", "an"],
  ["URL", "a"],
  ["FBI", "an"],
  ["one", "a"],
  ["unicorn", "a"],
  ["umbrella", "an"],
  ["European", "a"],
  ["8", "an"],
  ["800", "an"],
  ["11", "an"],
  ["18", "an"],
  ["1", "a"],
];

const PREPOSITIONS = [
  ["v", "Vsetíně", "ve"],
  ["v", "Frýdku", "ve"],
  ["v", "Praze", "v"],
  ["s", "Standou", "se"],
  ["s", "Petrem", "s"],
  ["s", "mnou", "se"],
  ["k", "kolegovi", "ke"],
  ["k", "mámě", "k"],
  ["k", "mně", "ke"],
  ["z", "Zlína", "ze"],
  ["z", "Šumperka", "ze"],
  ["z", "Prahy", "z"],
];

const PIPES = [
  ["Miroslav Machynka", "vocative", [], "cs", "Miroslave Machynko"],
  ["Miroslav Machynka", "vocative", [], "en", "Miroslav Machynka"],
  [{ full: "Saša", gender: "f" }, "dative", [], "cs", "Saše"],
  ["Saša", "dative", ["m"], "cs", "Sašovi"],
  ["Miroslav", "possessive", ["f"], "cs", "Miroslavova"],
  [1234.5, "number", [], "cs", "1 234,5"],
  [22, "ordinal", [], "en", "22nd"],
  [["a", "b"], "list", [], "en", "a and b"],
  ["hour", "article", [], "en", "an hour"],
  ["dobrý den", "capitalize", [], "cs", "Dobrý den"],
  ["sessions", "prep", ["z"], "cs", "ze sessions"],
  ["tabulky", "prep", ["z"], "cs", "z tabulky"],
  ["Vsetíně", "prep", ["V"], "cs", "Ve Vsetíně"],
  ["kolegovi", "prep", ["k"], "cs", "ke kolegovi"],
  ["sessions", "prep", ["from"], "en", "from sessions"],
  ["table", "prep", [], "cs", "table"],
  ["x", "unknown", [], "cs", "x"],
];

export { ARTICLES, CATEGORIES, COUNTS, LISTS, ORDINALS, PIPES, PREPOSITIONS };
