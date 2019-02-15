import * as d3Ease from 'd3-ease';

const DEFAULT_EASING = 'easeLinear';

/**
 * Returns the easing function by the key of `d3-ease` library.
 * It returns `easeLinear` if there is no matching easing function.
 * Ref: https://github.com/d3/d3-ease
 */
export function getD3EaseFunc(name: string = DEFAULT_EASING) {
  const easeFunc = d3Ease[name];
  return easeFunc ? easeFunc : d3Ease[DEFAULT_EASING];
}
