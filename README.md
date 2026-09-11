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

A word the rules cannot classify, such as a foreign name ending in `-i` or a female surname without `-á`, is returned as written. The package never garbles a name; pass `overrides` for anything it gets wrong.

### Counts and plural forms

Plural forms are objects keyed by CLDR category (`zero`, `one`, `two`, `few`, `many`, `other`; `other` is required). Czech uses `one` (1), `few` (2–4), `many` (decimals, 1,5 souboru) and `other` (0, 5+); English uses `one` and `other`. Numbers are formatted for the language (1 000 and 1,5 in Czech).

## Public API

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

`applyGrammarPipe(value, pipe, args, language)` is the single entry message formatters call. Pipes: every case name, `possessive`, `number`, `ordinal`, `list`, `article`, `upper`, `lower`, `capitalize`. A case pipe takes an optional gender argument (`vocative:f`); `possessive` takes the possessed gender (`possessive:f`). Unknown pipes return the value as text. `GRAMMAR_PIPES` and `isGrammarPipe(name)` list and test them.

### Types

`GrammarLanguage`, `GrammarCase`, `Gender`, `NameInput`, `NameParts`, `ParsedName`, `CaseForms`, `DeclineOptions`, `NameOverrides`, `PossessiveOptions`, `PossessedGender`, `PluralCategory`, `PluralForms`, `CountOptions`, `ListOptions`.

## What It Does Not Do

This package does not:

- decline common nouns, adjectives, or place names; counts take the noun forms from the caller
- translate text or store messages
- guess a language from text
- support languages other than Czech and English
- ship dictionaries or depend on other packages
