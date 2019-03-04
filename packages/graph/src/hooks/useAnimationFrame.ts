import {
  useRef,
  useEffect,
  useCallback,
} from 'react';

export interface AnimationFrameControl {
  /** The current animation frame ID */
  animationFrame: number | null;

  /** Function that takes `rafCallback` and put it into `window.requestAnimationFrame()`  */
  requestWindowAnimationFrame: (rafCallback: () => void) => void;
}

export function useAnimationFrame(): AnimationFrameControl {
  /** stores the animation frame ID */
  const animaFrameIdRef = useRef<number | null>(null);

  const requestWindowAnimationFrame = useCallback(
    (rafCallback) => {
      animaFrameIdRef.current = window.requestAnimationFrame(rafCallback);
    },
    [],
  );

  useEffect(
    () => {
      // the functional component unmounting
      return () => {
        // cancel the scheduled update on the animation frame
        if (animaFrameIdRef.current) {
          window.cancelAnimationFrame(animaFrameIdRef.current);
        }
      };
    },
    [],
  );

  return {
    requestWindowAnimationFrame,
    animationFrame: animaFrameIdRef.current,
  };
}
