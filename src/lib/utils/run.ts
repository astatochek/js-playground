import { isNil } from "./helpers";

export function createRunCodeFn(): RunCodeSignature {
  let prevAlias: ConsoleLogAlias;

  return (code: string, add: (...args: any[]) => void, clear: () => void) => {
    if (!isNil(prevAlias)) {
      delete window[prevAlias];
    }
    clear();
    const consoleLogAlias: ConsoleLogAlias = `consoleLogAlias_${crypto
      .randomUUID()
      .replaceAll("-", "_")}`;

    window[consoleLogAlias] = add;
    prevAlias = consoleLogAlias;

    try {
      const parsedCode = code.replaceAll(
        "console.log",
        `window.${consoleLogAlias}`
      );
      new Function(parsedCode)();
    } catch (e) {
      add(`${e}`);
    }
  };
}

type ConsoleLogAlias = `consoleLogAlias_${string}`;
type RunCodeSignature = (code: string, add: (...args: any[]) => void, clear: () => void) => void

declare global {
  interface Window {
    [key: ConsoleLogAlias]: (...args: any[]) => void;
  }
}
