import { toLowerString } from "@trebired/utils";
import type { Gender, GrammarCase, GrammarNames, NameOverrides } from "#fa8gbb35wvs1";

const registeredGenders = new Map<string, Gender>();
let registeredOverrides: NameOverrides = {};

function registerNames(names: GrammarNames = {}): void {
  for (const name of names.masculine || []) registeredGenders.set(toLowerString(name), "m");
  for (const name of names.feminine || []) registeredGenders.set(toLowerString(name), "f");
}

function registeredGender(name: string): Gender | null {
  return registeredGenders.get(toLowerString(name)) || null;
}

function registerOverrides(overrides: NameOverrides = {}): void {
  registeredOverrides = { ...registeredOverrides, ...overrides };
}

function registeredOverride(text: string, grammaticalCase: GrammarCase): string | undefined {
  return registeredOverrides[text]?.[grammaticalCase];
}

export { registerNames, registerOverrides, registeredGender, registeredOverride };
