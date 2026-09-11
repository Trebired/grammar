# @trebired/grammar

Rule-based Czech and English grammar for interface text: personal names in every grammatical case, plural-aware counts, ordinals, lists, and articles.

`@trebired/grammar` owns the grammar: declension rules, gender detection from names, plural selection, and number formatting per language. Callers own the words: noun forms for counts, message text, and any name they want spelled differently through overrides. It does not own translations, message storage, or language negotiation; `@trebired/i18n` uses it for message pipes and plural messages.

## Install

Runtime support: Bun 1+.

```sh
bun i @trebired/grammar
```

## Quick Start

```ts
import { declineName, formatCount, vocative } from "@trebired/grammar";

vocative("Miroslav Machynka", "cs");               // "Miroslave Machynko"
declineName("Jana Machynková", "dative", "cs");    // "Janě Machynkové"
formatCount(2, { one: "soubor", few: "soubory", many: "souboru", other: "souborů" }, "cs"); // "2 soubory"
formatCount(1, { one: "file", other: "files" }, "en"); // "1 file"
```

## Concepts

### Languages

Every function takes a language. `cs` and `en` are supported; regional tags such as `cs-CZ` normalise to their base, and anything else is treated as `en`.

### Names and gender

A name is a string (`"Ing. Jan Novák, Ph.D."`) or parts (`{ given, surname, gender }`). Degrees before and after the name are kept as written, particles such as `van` and `de` are not declined, initials stay, and hyphenated surnames decline part by part. Gender comes from an explicit `gender`, then the surname (`-ová`, `-á`), then the given name, and decides the paradigm: `Saša Novák` is masculine, `Saša Nováková` feminine.

### Czech cases

`declineName` returns all seven cases: nominative, genitive, dative, accusative, vocative, locative, instrumental. Masculine names follow the *pán*, *muž*, *předseda*, *soudce* and adjectival patterns, including mobile *e* (Pavel → Pavla, Marek → Marku, Němec → Němče); feminine names follow *žena*, *růže* and the adjectival `-ová/-á` pattern. In a full name only the last word takes `-ovi` (Miroslavu Machynkovi). English names are returned unchanged in every case.

### Unknown names stay unchanged

A word the rules cannot classify, such as a foreign name ending in `-i` or a female surname without `-á`, is returned as written. The package never garbles a name; pass `overrides` per call, or register them once with `configureGrammar()`, for anything it gets wrong.

### Counts and plural forms

Plural forms are objects keyed by CLDR category (`zero`, `one`, `two`, `few`, `many`, `other`; `other` is required). Czech uses `one` (1), `few` (2–4), `many` (decimals, 1,5 souboru) and `other` (0, 5+); English uses `one` and `other`. Numbers are formatted for the language (1 000 and 1,5 in Czech).

## Configuration

### configureGrammar

Call `configureGrammar()` once where the application starts, on the server and in the browser. Every option is optional, and calling it again adds to what was registered before.

```ts
import { configureGrammar } from "@trebired/grammar";

configureGrammar({
  logger,
  names: { feminine: ["Nikita"], masculine: ["Saša"] },
  overrides: { "Jan Křtitel": { vocative: "Jane Křtiteli" } },
});
```

- `logger` / `loggerAdapter`: any logger `@trebired/logger-adapter` accepts. Without one the package is silent.
- `names`: given names whose gender the tables get wrong or do not know; they win over the built-in tables.
- `overrides`: exact forms for a full name, per case; a per-call `overrides` option still wins.

## Runtime

### Logging

The package logs through `@trebired/logger-adapter`'s browser entry, so the same code runs in Bun and in the browser. Its source is the package name and its group prefix comes from the shipped `.trebired/logger/config.ts` (`trebired.grammar`). It logs its initialization when `configureGrammar()` receives a logger, and warns when a message uses a pipe the package does not provide. With no logger configured nothing is printed.

## Public API

### Configuration

- `configureGrammar({ logger, loggerAdapter, names, overrides })` and the `GrammarConfig` and `GrammarNames` types.

### Names

- `declineName(name, grammaticalCase, language, { gender, overrides })`, with shortcuts `genitive`, `dative`, `accusative`, `vocative`, `locative`, `instrumental`.
- `possessive(name, language, { possessed, plural, gender, style })`: Czech possessive adjective for a single name (`Miroslavův`, `Janina`), genitive for a full name; English `Miroslav's`, `James's` (`style: "apostrophe"` gives `James'`).
- `parseName(name, language)`, `detectGender(name, language)`, `nameText(name)`.

### Counts and numbers

- `pluralCategory(count, language, { type })`, `selectPlural(count, forms, language)`, `isPluralForms(value)`, `PLURAL_CATEGORIES`.
- `formatCount(count, forms, language, { number, separator })`, `formatNumber(value, language, options)`, `ordinal(value, language)` (1st, 22nd; 3. in Czech).

### Text

- `formatList(items, language, { type, style })`: "Jan, Petr a Eva", "Jan, Petr, and Eva".
- `indefiniteArticle(word)` and `withIndefiniteArticle(word)`: "an hour", "a user", "an MBA".
- `vocalizePreposition(preposition, nextWord)`: Czech v/ve, s/se, z/ze, k/ke.
- `upper`, `lower`, `capitalize`.

### Pipes

`applyGrammarPipe(value, pipe, args, language)` is the single entry message formatters call. Pipes: every case name, `possessive`, `number`, `ordinal`, `list`, `article`, `prep`, `upper`, `lower`, `capitalize`. A case pipe takes an optional gender argument (`vocative:f`); `possessive` takes the possessed gender (`possessive:f`). `prep` takes the preposition and prints it in front of the value, vocalized for Czech: `{{ table | prep:z }}` gives "z tabulky" or "ze sessions", `{{ place | prep:V }}` gives "Ve Vsetíně". Other languages print the preposition unchanged. Unknown pipes return the value as text. `GRAMMAR_PIPES` and `isGrammarPipe(name)` list and test them.

### Types

`GrammarLanguage`, `GrammarCase`, `Gender`, `NameInput`, `NameParts`, `ParsedName`, `CaseForms`, `DeclineOptions`, `NameOverrides`, `PossessiveOptions`, `PossessedGender`, `PluralCategory`, `PluralForms`, `CountOptions`, `ListOptions`.

## What It Does Not Do

This package does not:

- decline common nouns, adjectives, or place names; counts take the noun forms from the caller
- translate text or store messages
- guess a language from text
- support languages other than Czech and English
- ship name dictionaries; its only runtime dependencies are `@trebired/utils` and `@trebired/logger-adapter`
- read a config file; configuration is the `configureGrammar()` call, because the package also runs in the browser
