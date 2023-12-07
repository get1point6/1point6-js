import { loadScript, initPanto, LoadPanto, LoadParams } from "./shared";

let loadScriptArgs: LoadParams | null = null;

export const loadPanto: LoadPanto = (...args) => {
  const pantoPromise = Promise.resolve().then(() => loadScript(loadScriptArgs));

  let loadCalled = false;

  pantoPromise.catch((err: Error) => {
    if (!loadCalled) {
      console.warn(err);
    }
  });
  loadScriptArgs = { env: args[1], sandboxInstance: args[2] };
  loadCalled = true;
  const startTime = Date.now();
  return pantoPromise.then((maybePanto) =>
    initPanto(maybePanto, args, startTime)
  );
};
