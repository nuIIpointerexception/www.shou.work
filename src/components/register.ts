/**
 * Returns the constructor typed as the element, so a caller that wants the
 * class does not need a second import.
 */
export const register = <T extends CustomElementConstructor>(
  name: string,
  constructor: T,
  options?: ElementDefinitionOptions
): T => {
  customElements.define(name, constructor, options);
  return constructor;
};
