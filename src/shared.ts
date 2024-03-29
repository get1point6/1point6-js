import { Get1Point6, Get1Point6Constructor } from "./types/1point6-js/1point6";

interface CustomWindow extends Window {
  Get1Point6: Get1Point6Constructor;
}

export type Load1Point6 = (
  ...args: Parameters<Get1Point6Constructor>
) => Promise<Get1Point6 | null>;

export interface LoadParams {
  env?: "local" | "staging" | "sandbox" | "production" | "development";
}

const PANTO_URL_REGEX =
  /^(https:\/\/([a-zA-Z0-9-]+\.)*js\.getpanto\.(io|ovh|xyz)|http:\/\/localhost:3004)$/;
const PANTO_URL = "https://js.getpanto.io";
declare const _VERSION: string;

const EXISTING_SCRIPT_MESSAGE =
  "load1Point6.setLoadParameters was called but an existing 1Point6.js script already exists in the document; existing script parameters will be used";

export const findScript = (): HTMLScriptElement | null => {
  const scripts = document.querySelectorAll<HTMLScriptElement>(`script`);
  for (let i = 0; i < scripts.length; i++) {
    const script = scripts[i];
    if (!PANTO_URL_REGEX.test(script.src)) {
      continue;
    }

    return script;
  }

  return null;
};

let promise: Promise<Get1Point6Constructor | null> | null = null;

export const loadScript = (
  params: null | LoadParams
): Promise<Get1Point6Constructor | null> => {
  // Ensure that we only attempt to load 1point6.js at most once
  if (promise !== null) {
    return promise;
  }

  promise = new Promise((resolve, reject) => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      // Resolve to null when imported server side. This makes the module
      // safe to import in an isomorphic code base.
      resolve(null);
      return;
    }

    if ((window as unknown as CustomWindow).Get1Point6 && params) {
      console.warn(EXISTING_SCRIPT_MESSAGE);
    }

    if ((window as unknown as CustomWindow)?.Get1Point6) {
      resolve((window as unknown as CustomWindow).Get1Point6);
      return;
    }

    try {
      let script = findScript();

      if (script && params) {
        console.warn(EXISTING_SCRIPT_MESSAGE);
      } else if (!script) {
        script = injectScript(params);
      }

      script.addEventListener("load", () => {
        if ((window as unknown as CustomWindow).Get1Point6) {
          console.log("1Point6.js succesfully loaded.");
          resolve((window as unknown as CustomWindow).Get1Point6);
        } else {
          reject(new Error("1Point6.js not available"));
        }
      });

      script.addEventListener("error", () => {
        reject(new Error("Failed to load 1Point6.js"));
      });
    } catch (error) {
      reject(error);
      return;
    }
  });

  return promise;
};

export const init1Point6 = (
  maybe1Point6: Get1Point6Constructor | null,
  args: Parameters<Get1Point6Constructor>,
  startTime: number
): Get1Point6 | null => {
  if (maybe1Point6 === null) {
    return null;
  }
  const _1Point6 = maybe1Point6.apply(undefined, args);
  registerWrapper(_1Point6, startTime);
  return _1Point6;
};

const injectScript = (params: null | LoadParams): HTMLScriptElement => {
  const script = document.createElement("script");
  let scriptSrc = PANTO_URL;
  switch (params?.env) {
    case "local":
      scriptSrc = "http://localhost:3004/";
      break;
    case "development":
      scriptSrc = "https://js.getpanto.xyz/";
      break;
    case "sandbox":
      scriptSrc = `https://js.getpanto.site/`;
      break;
    case "production":
      scriptSrc = "https://js.getpanto.io/";
      break;
    case "staging":
    default:
      scriptSrc = "https://js.getpanto.xyz/";
      break;
  }

  script.src = `${scriptSrc}`;
  console;
  const headOrBody = document.head || document.body;

  if (!headOrBody) {
    throw new Error(
      "Expected document.body not to be null. 1Point6.js requires a <body> element."
    );
  }

  headOrBody.appendChild(script);

  return script;
};

const registerWrapper = (_1Point6: any, startTime: number): void => {
  if (!_1Point6 || !_1Point6._registerWrapper) {
    return;
  }

  _1Point6._registerWrapper({ name: "1Point6-js", version: _VERSION, startTime });
};
