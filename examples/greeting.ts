import { declineName, formatCount, possessive, vocative } from "#rfp6qxcisk76";

const name = "Miroslav Machynka";
const files = { few: "soubory", many: "souboru", one: "soubor", other: "souborů" };

console.log(`Ahoj, ${vocative(name, "cs")}`);
console.log(`Profil uživatele ${declineName(name, "genitive", "cs")}`);
console.log(`Poslat zprávu ${declineName(name, "dative", "cs")}`);
console.log(`${possessive("Miroslav", "cs", { possessed: "f" })} zpráva`);
[1, 2, 5, 1.5].forEach((count) => console.log(formatCount(count, files, "cs")));
console.log(formatCount(2, { one: "file", other: "files" }, "en"));
