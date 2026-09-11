type GrammarLanguage = "cs" | "en";

type GrammarCase =
|"nominative"
|"genitive"
|"dative"
|"accusative"
|"vocative"
|"locative"
|"instrumental";

type Gender = "m" | "f" | "unknown";

type NameParts = {
  full?: string;
  gender?: Gender;
  given?: string;
  surname?: string;
};

type NameInput = string | NameParts;

type ParsedName = {
  gender: Gender;
  given: string[];
  surname: string;
  titlesAfter: string[];
  titlesAfterSeparator: string;
  titlesBefore: string[];
};

type CaseForms = Record<GrammarCase, string>;

type NameOverrides = Record<string, Partial<Record<GrammarCase, string>>>;

type DeclineOptions = {
  gender?: Gender;
  overrides?: NameOverrides;
};

type PossessedGender = "m" | "f" | "n";

type PossessiveOptions = {
  gender?: Gender;
  plural?: boolean;
  possessed?: PossessedGender;
  style?: "apostrophe" | "s";
};

type PluralCategory = "zero" | "one" | "two" | "few" | "many" | "other";

type PluralForms = Partial<Record<Exclude<PluralCategory, "other">, string>>& {
  other: string;
};

type CountOptions = {
  number?: Intl.NumberFormatOptions;
  separator?: string;
};

type ListOptions = {
  style?: "long" | "short" | "narrow";
  type?: "conjunction" | "disjunction" | "unit";
};

export type {
  CaseForms,
  CountOptions,
  DeclineOptions,
  Gender,
  GrammarCase,
  GrammarLanguage,
  ListOptions,
  NameInput,
  NameOverrides,
  NameParts,
  ParsedName,
  PluralCategory,
  PluralForms,
  PossessedGender,
  PossessiveOptions,
};
