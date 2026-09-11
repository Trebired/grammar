# Changelog

All notable changes to `@trebired/grammar` will be documented here.

This project follows semantic versioning once published.

## 0.1.0

- Added Czech personal-name declension in all seven cases: masculine *pán*, *muž*, *předseda*, *soudce* and adjectival patterns with mobile *e*, feminine *žena*, *růže* and adjectival `-ová/-á` patterns, full names with degrees, particles, initials and hyphenated surnames, and caller overrides. Names the rules cannot classify are returned unchanged.
- Added gender detection from Czech names, and possessives for Czech (`Miroslavův`, `Janina`) and English (`Miroslav's`).
- Added plural selection by CLDR category, count and number formatting per language, and ordinals.
- Added list formatting, English indefinite articles, Czech preposition vocalization, and casing helpers.
- Added `applyGrammarPipe`, the single entry message formatters call for grammar pipes.
