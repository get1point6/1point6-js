import { Panto, PantoConstructor } from "./types/panto-js/panto";

interface CustomWindow extends Window {
  Panto: PantoConstructor;
}

export type LoadPanto = (
  ...args: Parameters<PantoConstructor>
) => Promise<Panto | null>;

export interface LoadParams {
  env?: "local" | "dev" | "sandbox" | "production";
  sandboxInstance?: string | undefined;
}

const PANTO_URL_REGEX =
  /^(https:\/\/([a-zA-Z0-9-]+\.)*js\.getpanto\.(io|ovh|xyz)|http:\/\/localhost:3004)$/;
const PANTO_URL = "https://js.getpanto.io";
declare const _VERSION: string;

const EXISTING_SCRIPT_MESSAGE =
  "loadPanto.setLoadParameters was called but an existing Panto.js script already exists in the document; existing script parameters will be used";

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

let pantoPromise: Promise<PantoConstructor | null> | null = null;

export const loadScript = (
  params: null | LoadParams
): Promise<PantoConstructor | null> => {
  // Ensure that we only attempt to load Panto.js at most once
  if (pantoPromise !== null) {
    return pantoPromise;
  }

  pantoPromise = new Promise((resolve, reject) => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      // Resolve to null when imported server side. This makes the module
      // safe to import in an isomorphic code base.
      resolve(null);
      return;
    }

    if ((window as unknown as CustomWindow).Panto && params) {
      console.warn(EXISTING_SCRIPT_MESSAGE);
    }

    if ((window as unknown as CustomWindow)?.Panto) {
      resolve((window as unknown as CustomWindow).Panto);
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
        if ((window as unknown as CustomWindow).Panto) {
          console.log("Panto.js succesfully loaded.");
          resolve((window as unknown as CustomWindow).Panto);
        } else {
          reject(new Error("Panto.js not available"));
        }
      });

      script.addEventListener("error", () => {
        reject(new Error("Failed to load Panto.js"));
      });
    } catch (error) {
      reject(error);
      return;
    }
  });

  return pantoPromise;
};

export const initPanto = (
  maybePanto: PantoConstructor | null,
  args: Parameters<PantoConstructor>,
  startTime: number
): Panto | null => {
  if (maybePanto === null) {
    return null;
  }
  const panto = maybePanto.apply(undefined, args);
  registerWrapper(panto, startTime);
  return panto;
};

const injectScript = (params: null | LoadParams): HTMLScriptElement => {
  const script = document.createElement("script");
  let scriptSrc = PANTO_URL;
  switch (params?.env) {
    case "local":
      scriptSrc = "http://localhost:3004/";
      break;
    case "dev":
      scriptSrc = "https://js.develop.getpanto.ovh/";
      break;
    case "sandbox":
      scriptSrc = `https://${params.sandboxInstance}.getpanto.ovh/`;
      break;
    case "production":
      scriptSrc = "https://js.getpanto.io/";
      break;
    default:
      break;
  }

  script.src = `${scriptSrc}`;
  console;
  const headOrBody = document.head || document.body;

  if (!headOrBody) {
    throw new Error(
      "Expected document.body not to be null. Panto.js requires a <body> element."
    );
  }

  headOrBody.appendChild(script);

  return script;
};

const registerWrapper = (panto: any, startTime: number): void => {
  if (!panto || !panto._registerWrapper) {
    return;
  }

  panto._registerWrapper({ name: "panto-js", version: _VERSION, startTime });
};
