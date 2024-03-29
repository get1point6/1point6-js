export type Get1Point6ElementBase = {
  /**
   * The `element.mount` method attaches your [Element](//TODO: ADD LINK TO DOC) to the DOM.
   * `element.mount` accepts either a CSS Selector (e.g., `'#card-element'`) or a DOM element.
   *
   * You need to create a container DOM element to mount an `Element`.
   * If the container DOM element has a label, the `Element` is automatically focused when its label is clicked.
   * There are two ways to do this:
   *
   * 1. Mount the instance within a `<label>`.
   * 2. Create a `<label>` with a `for` attribute, referencing the ID of your container.
   */
  mount(domElement: string | HTMLElement): void;

  /**
   * Blurs the element.
   */
  blur(): void;

  /**
   * Clears the value(s) of the element.
   */
  clear(): void;

  /**
   * Removes the element from the DOM and destroys it.
   * A destroyed element can not be re-activated or re-mounted to the DOM.
   */
  destroy(): void;

  /**
   * Focuses the element.
   */
  focus(): void;

  /**
   * Unmounts the element from the DOM.
   * Call `element.mount` to re-attach it to the DOM.
   */
  unmount(): void;
};
