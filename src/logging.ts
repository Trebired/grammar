import {
  resolveLogger,
  type LoggerAdapterLogger,
  type LoggerAdapterWriter,
  type NormalizedLoggerAdapter,
} from "@package/logger-adapter/browser";

const GRAMMAR_PACKAGE_SOURCE = "@trebired/grammar";

let activeLogger: LoggerAdapterLogger | null = null;
let activeAdapter: LoggerAdapterWriter | null = null;

function setGrammarLogger(logger?: LoggerAdapterLogger | null, adapter?: LoggerAdapterWriter | null): void {
  activeLogger = logger || null;
  activeAdapter = adapter || null;
}

function grammarLog(): NormalizedLoggerAdapter {
  return resolveLogger({
      adapter: activeAdapter || undefined,
      defaultLogger: false,
      fallback: "noop",
      logger: activeLogger || undefined,
      source: GRAMMAR_PACKAGE_SOURCE,
  });
}

export { GRAMMAR_PACKAGE_SOURCE, grammarLog, setGrammarLogger };
