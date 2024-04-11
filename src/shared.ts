import { Get1Point6, Constructor } from "./types/1point6-js/1point6";

interface CustomWindow extends Window {
  Get1Point6?: Constructor;
  Panto?: Constructor;
}

export type Load1Point6 = (
  ...args: Parameters<Constructor>
) => Promise<Get1Point6 | null>;

export interface LoadParams {
  scriptSrc?: string;
}

const GET1POINT6_URL_REGEX =
  /^(https:\/\/([a-zA-Z0-9-]+\.)*js\.get1point6\.(io|ovh|xyz|com)|http:\/\/localhost:3004)$/;
const GET1POINT6_URL = "https://js.get1point6.com";
declare const _VERSION: string;

const EXISTING_SCRIPT_MESSAGE =
  "load1Point6.setLoadParameters was called but an existing 1Point6.js script already exists in the document; existing script parameters will be used";

export const findScript = (): HTMLScriptElement | null => {
  const scripts = document.querySelectorAll<HTMLScriptElement>(`script`);
  for (let i = 0; i < scripts.length; i++) {
    const script = scripts[i];
    if (!GET1POINT6_URL_REGEX.test(script.src)) {
      continue;
    }

    return script;
  }

  return null;
};

let promise: Promise<Constructor | null> | null = null;

export const loadScript = (
  params: null | LoadParams
): Promise<Constructor | null> => {
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

    const customWindow:CustomWindow = (window as unknown as CustomWindow)

    if (customWindow.Get1Point6 && params) {
      console.warn(EXISTING_SCRIPT_MESSAGE);
    }

    if (customWindow.Get1Point6) {
      resolve(customWindow.Get1Point6);
      return;
    } else if (customWindow.Panto) {
      resolve(customWindow.Panto);
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
        
        if (customWindow.Get1Point6) {
          console.log("1Point6.js succesfully loaded.");
          resolve(customWindow.Get1Point6);
        } else if(customWindow.Panto) {
          console.log("panto.js succesfully loaded.");
          resolve(customWindow.Panto);
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
  maybe1Point6: Constructor | null,
  args: Parameters<Constructor>,
  startTime: number
): Get1Point6 | null => {
  if (maybe1Point6 === null) {
    return null;
  }
  const get1Point6 = maybe1Point6.apply(undefined, args);
  registerWrapper(get1Point6, startTime);
  return get1Point6;
};

const injectScript = (params: null | LoadParams): HTMLScriptElement => {
  const script = document.createElement("script");
  let scriptSrc = params?.scriptSrc ?? GET1POINT6_URL;
  script.src = `${scriptSrc}`;
  const headOrBody = document.head || document.body;

  if (!headOrBody) {
    throw new Error(
      "Expected document.body not to be null. 1Point6.js requires a <body> element."
    );
  }

  headOrBody.appendChild(script);

  return script;
};

const registerWrapper = (get1Point6: any, startTime: number): void => {
  if (!get1Point6 || !get1Point6._registerWrapper) {
    return;
  }

  get1Point6._registerWrapper({ name: "1Point6-js", version: _VERSION, startTime });
};
