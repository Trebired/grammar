import { resolveLogger } from "@package/logger-adapter";
import { declineName, formatCount, possessive, vocative } from "#rfp6qxcisk76";

const log = resolveLogger({ source: "@trebired/grammar" });
const name = "Miroslav Machynka";
const files = { few: "soubory", many: "souboru", one: "soubor", other: "souborů" };

log.info("example.names", `Ahoj, ${vocative(name, "cs")}`);
log.info("example.names", `Profil uživatele ${declineName(name, "genitive", "cs")}`);
log.info("example.names", `Poslat zprávu ${declineName(name, "dative", "cs")}`);
log.info("example.names", `${possessive("Miroslav", "cs", { possessed: "f" })} zpráva`);
[1, 2, 5, 1.5].forEach((count) => log.info("example.counts", formatCount(count, files, "cs")));
log.info("example.counts", formatCount(2, { one: "file", other: "files" }, "en"));
