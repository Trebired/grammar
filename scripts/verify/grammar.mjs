import fs from "node:fs/promises";
import { builtinModules } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { resolveLogger } from "@package/logger-adapter";
import { CZECH_FULL_NAMES, CZECH_WORDS, GENDERS, POSSESSIVES } from "./fixtures/names.mjs";
import { ARTICLES, CATEGORIES, COUNTS, LISTS, ORDINALS, PIPES, PREPOSITIONS } from "./fixtures/text.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const organizationCodes = [116, 114, 101, 98, 105, 114, 101, 100];
const grammar = await import(`@${String.fromCharCode(...organizationCodes)}/grammar`);
const DECLINED_CASES = ["genitive", "dative", "accusative", "vocative", "locative", "instrumental"];
const log = resolveLogger({ source: "@trebired/grammar" });
const failures = [];

function check(actual, expected, label) {
  if (actual !== expected) failures.push(`${label}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}

function verifyCzechWords() {
  for (const [name, gender, expected] of CZECH_WORDS) {
    const input = gender ? { full: name, gender } : name;
    DECLINED_CASES.forEach((grammaticalCase, index) => {
        check(grammar.declineName(input, grammaticalCase, "cs"), expected[index], `${name} ${grammaticalCase}`);
    });
    check(grammar.declineName(input, "nominative", "cs"), name, `${name} nominative`);
  }
}

function verifyCzechFullNames() {
  for (const [name, expected] of CZECH_FULL_NAMES) {
    for (const [grammaticalCase, form] of Object.entries(expected)) {
      check(grammar.declineName(name, grammaticalCase, "cs"), form, `${name} ${grammaticalCase}`);
    }
  }
  check(grammar.vocative({ given: "Jana", surname: "Nováková" }, "cs"), "Jano Nováková", "explicit parts");
  check(grammar.vocative("Miroslav Machynka", "en"), "Miroslav Machynka", "english leaves names alone");
  check(grammar.vocative("", "cs"), "", "empty name");
  const overrides = { Xaver: { vocative: "Xavere" } };
  check(grammar.declineName("Xaver", "vocative", "cs", { overrides }), "Xavere", "override");
  check(grammar.vocative("Levi", "cs"), "Levi", "indeclinable name stays unchanged");
}

function verifyGendersAndPossessives() {
  for (const [name, expected] of GENDERS) check(grammar.detectGender(name, "cs"), expected, `gender ${name}`);
  check(grammar.detectGender("Jana", "en"), "unknown", "english gender");
  for (const [name, language, options, expected] of POSSESSIVES) {
    check(grammar.possessive(name, language, options), expected, `possessive ${name} ${JSON.stringify(options)}`);
  }
}

function verifyCounts() {
  for (const [count, language, forms, expected] of COUNTS) {
    check(grammar.formatCount(count, forms, language), expected, `count ${count} ${language}`);
  }
  for (const [count, language, expected] of CATEGORIES) {
    check(grammar.pluralCategory(count, language), expected, `category ${count} ${language}`);
  }
  for (const [value, language, expected] of ORDINALS) check(grammar.ordinal(value, language), expected, `ordinal ${value}`);
  check(grammar.isPluralForms({ one: "a", other: "b" }), true, "plural forms");
  check(grammar.isPluralForms({ one: "a" }), false, "plural forms without other");
  check(grammar.isPluralForms({ other: "b", title: "c" }), false, "plural forms with foreign key");
}

function verifyText() {
  for (const [items, language, options, expected] of LISTS) {
    check(grammar.formatList(items, language, options), expected, `list ${language} ${JSON.stringify(options)}`);
  }
  for (const [word, expected] of ARTICLES) check(grammar.indefiniteArticle(word), expected, `article ${word}`);
  for (const [prep, next, expected] of PREPOSITIONS) {
    check(grammar.vocalizePreposition(prep, next), expected, `preposition ${prep} ${next}`);
  }
  for (const [value, pipe, args, language, expected] of PIPES) {
    check(grammar.applyGrammarPipe(value, pipe, args, language), expected, `pipe ${pipe} ${JSON.stringify(value)}`);
  }
  check(grammar.isGrammarPipe("vocative"), true, "known pipe");
  check(grammar.isGrammarPipe("nope"), false, "unknown pipe");
}

async function collectJs(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) return collectJs(full);
        return entry.name.endsWith(".js") ? [full] : [];
  }));
  return nested.flat();
}

async function verifyBrowserSafe() {
  const builtins = new Set(builtinModules.flatMap((name) => [name, `node:${name}`]));
  for (const file of await collectJs(path.join(rootDir, "dist"))) {
    const source = await fs.readFile(file, "utf8");
    for (const match of source.matchAll(/from\s+["']([^"']+)["']/gu)) {
      check(builtins.has(match[1]), false, `${path.relative(rootDir, file)} imports ${match[1]}`);
    }
  }
}

function verifyConfiguration() {
  const events = [];
  grammar.configureGrammar({
      logger: {},
      loggerAdapter: (_logger, event) => events.push(event),
      names: { masculine: ["Saša"] },
      overrides: { "Jan Křtitel": { vocative: "Jane Křtiteli" } },
  });
  check(grammar.detectGender("Saša", "cs"), "m", "registered name wins over the tables");
  check(grammar.vocative("Jan Křtitel", "cs"), "Jane Křtiteli", "registered override");
  check(grammar.vocative("Jan Křtitel", "cs", { overrides: { "Jan Křtitel": { vocative: "X" } } }), "X", "call override wins");
  check(grammar.applyGrammarPipe("x", "nope", [], "cs"), "x", "unknown pipe keeps the value");
  check(events.some((event) => /initialized$/u.test(event.message)), true, "initialization is logged");
  check(events.some((event) => event.level === "warn" && /unknown pipe/u.test(event.message)), true, "unknown pipe is logged");
}

async function main() {
  verifyCzechWords();
  verifyCzechFullNames();
  verifyGendersAndPossessives();
  verifyCounts();
  verifyText();
  await verifyBrowserSafe();
  verifyConfiguration();
  if (failures.length) {
    log.error("verify.grammar", `${failures.length} grammar check(s) failed`, { failures });
    process.exit(1);
  }
  log.info("verify.grammar", "Grammar verification succeeded.");
}

await main();
