import { useLayoutEffect, useRef, useState } from "react";

export const linear = function (t: number) {
  return t;
};
// accelerating from zero velocity
export const easeInQuad = function (t: number) {
  return t * t;
};
// decelerating to zero velocity
export const easeOutQuad = function (t: number) {
  return t * (2 - t);
};
// acceleration until halfway, then deceleration
export const easeInOutQuad = function (t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};
// accelerating from zero velocity
export const easeInCubic = function (t: number) {
  return t * t * t;
};
// decelerating to zero velocity
export const easeOutCubic = function (t: number) {
  return --t * t * t + 1;
};
// acceleration until halfway, then deceleration
export const easeInOutCubic = function (t: number) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};
// accelerating from zero velocity
export const easeInQuart = function (t: number) {
  return t * t * t * t;
};
// decelerating to zero velocity
export const easeOutQuart = function (t: number) {
  return 1 - --t * t * t * t;
};
// acceleration until halfway, then deceleration
export const easeInOutQuart = function (t: number) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
};
// accelerating from zero velocity
export const easeInQuint = function (t: number) {
  return t * t * t * t * t;
};
// decelerating to zero velocity
export const easeOutQuint = function (t: number) {
  return 1 + --t * t * t * t * t;
};
// acceleration until halfway, then deceleration
export const easeInOutQuint = function (t: number) {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
};

/**
 * usePropertyAnimator
 * @param fromvalue - The start value
 * @param tovalue - The end value
 * @param duration - duration of the animation
 * @param easing - the easing function, any function that maps the interval [0,1] -> [0,1]
 * @param dependencies - variable references, that when changed, trigger the animation
 */
export const usePropertyAnimator = (
  fromvalue: number,
  tovalue: number,
  duration: number,
  easing: (val: number) => number = linear,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dependencies: Array<any>
) => {
  const [property, setProperty] = useState<number>(tovalue);
  let startTime = 0;
  const handleAnimationStep = (startTime: number) => () => {
    let currentDuration = 0;
    if (typeof performance !== "undefined") {
      currentDuration = performance.now() - startTime;
    } else {
      currentDuration = Date.now() - startTime;
    }
    if (currentDuration < duration) {
      const val =
        (tovalue - fromvalue) * easing(currentDuration / duration) + fromvalue;
      setProperty(val);
      window.requestAnimationFrame(handleAnimationStep(startTime));
    } else {
      setProperty(tovalue);
    }
  };
  const isMounted = useRef<boolean>(false);
  useLayoutEffect(() => {
    if (isMounted.current) {
      if (typeof performance !== "undefined") {
        startTime = performance.now();
      } else {
        startTime = Date.now();
      }
      setProperty(fromvalue);
      window.requestAnimationFrame(handleAnimationStep(startTime));
    }
    isMounted.current = true;
  }, dependencies);
  return property;
};
