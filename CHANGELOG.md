# Changelog

All notable changes to `@trebired/grammar` will be documented here.

This project follows semantic versioning once published.

## 0.2.0

- Added the `prep` pipe. `{{ table | prep:z }}` prints the preposition in front of the value and vocalizes it for Czech, so a message no longer hard-codes "z {{table}}" and prints "z sessions" where Czech needs "ze sessions". An uppercase preposition starts a sentence (`prep:V` gives "Ve Vsetíně"). Other languages print the preposition unchanged. `GRAMMAR_PIPES` now lists `prep`, so the `@trebired/i18n` checker accepts it.
- Fixed `vocalizePreposition()` uppercasing the vowel after a capital preposition. The prepositions are single letters, so a capital always starts a sentence: `vocalizePreposition("V", "Vsetíně")` returned "VE" and now returns "Ve".

## 0.1.1

- Added `configureGrammar()`, which takes a logger, given names with their gender, and name overrides for the whole application. Registered names win over the built-in gender tables; a per-call `overrides` option still wins over registered ones.
- Added logging through `@trebired/logger-adapter`'s browser entry and shipped `.trebired/logger/config.ts` with the `trebired.grammar` prefix. The package logs its initialization and warns about unknown pipes, and stays silent until an application passes a logger.
- Changed normalization to the shared `@trebired/utils` helpers instead of local copies.
- Changed the example and the verification scripts to print through `@trebired/logger-adapter` instead of `console`. Logging is the adapter's only dependency here; the package does not depend on `@trebired/logger`.
- Changed the publish workflow and `packageManager` back to Bun 1.3.12 and the lockfile to version 1, matching the other packages.

## 0.1.0

- Added Czech personal-name declension in all seven cases: masculine *pán*, *muž*, *předseda*, *soudce* and adjectival patterns with mobile *e*, feminine *žena*, *růže* and adjectival `-ová/-á` patterns, full names with degrees, particles, initials and hyphenated surnames, and caller overrides. Names the rules cannot classify are returned unchanged.
- Added gender detection from Czech names, and possessives for Czech (`Miroslavův`, `Janina`) and English (`Miroslav's`).
- Added plural selection by CLDR category, count and number formatting per language, and ordinals.
- Added list formatting, English indefinite articles, Czech preposition vocalization, and casing helpers.
- Added `applyGrammarPipe`, the single entry message formatters call for grammar pipes.
