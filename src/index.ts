import { loadScript, initPanto, LoadPanto } from "./shared";

const pantoPromise = Promise.resolve().then(() => loadScript(null));

let loadCalled = false;

pantoPromise.catch((err: Error) => {
  if (!loadCalled) {
    console.warn(err);
  }
});

export const loadPanto: LoadPanto = (...args) => {
  loadCalled = true;
  const startTime = Date.now();
  return pantoPromise.then((maybePanto) =>
    initPanto(maybePanto, args, startTime)
  );
};
