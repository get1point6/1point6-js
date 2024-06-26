import { loadScript, init1Point6, Load1Point6, LoadParams } from "./shared";
export * from './types'

let loadScriptArgs: LoadParams | null = null;

export const load1Point6: Load1Point6 = (...args) => {
  const loadPromise = Promise.resolve().then(() => loadScript(loadScriptArgs));

  let loadCalled = false;

  loadPromise.catch((err: Error) => {
    if (!loadCalled) {
      console.warn(err);
    }
  });
  loadScriptArgs = { scriptSrc:args[1]?.scriptSrc };
  loadCalled = true;
  const startTime = Date.now();
  return loadPromise.then((maybe1Point6) =>
    init1Point6(maybe1Point6, args, startTime)
  );
};
