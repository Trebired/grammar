import { logPackageInitialized } from "@package/logger-adapter/browser";
import { GRAMMAR_PACKAGE_SOURCE, setGrammarLogger } from "./logging.js";
import { registerNames, registerOverrides } from "./names/registry.js";
import type { GrammarConfig } from "./types.js";

function configureGrammar(config: GrammarConfig = {}): void {
  setGrammarLogger(config.logger, config.loggerAdapter);
  registerNames(config.names);
  registerOverrides(config.overrides);
  logPackageInitialized({
      adapter: config.loggerAdapter || undefined,
      defaultLogger: false,
      fallback: "noop",
      logger: config.logger || undefined,
      source: GRAMMAR_PACKAGE_SOURCE,
  });
}

export { configureGrammar };
