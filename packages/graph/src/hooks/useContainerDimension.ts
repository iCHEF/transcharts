import {
  RefObject,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { debounce } from 'lodash-es';
import resizeObserverPolyfill from 'resize-observer-polyfill';

export interface ContainerDimension {
  width: number;
  height: number;
}

export function useContainerDimension(
  containerRef: RefObject<HTMLDivElement>,
  debounceTime = 300,
) {
  const [dimension, setDimension] = useState<ContainerDimension>({
    width: 1,
    height: 1,
  });

  /** resizeObsrRef.current stores the ResizeObserver */
  const resizeObsrRef = useRef<ResizeObserver | null>(null);
  /** animaFrameIDRef.current stores the current animation frame ID */
  const animaFrameIDRef = useRef<number | null>(null);

  /** Function to set the updated dimension */
  const updateDimension = useCallback(
    (width: number, height: number) => {
      animaFrameIDRef.current = window.requestAnimationFrame(() => {
        setDimension({
          width,
          height,
        });
      });
    },
    [],
  );

  /**
   * Function to be called when there are resizing events observed by ResizeObserver
   * Ref: https://developers.google.com/web/updates/2016/10/resizeobserver
   */
  const debouncedResize = useCallback(
    debounce(
      (
        entries: ResizeObserverEntry[],
        observer: ResizeObserver,
      ) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          updateDimension(width, height);
        }
      },
      debounceTime,
    ),
    [],
  );

  useEffect(
    () => {
      // connect the resize observer on mounted
      resizeObsrRef.current = new resizeObserverPolyfill(debouncedResize);
      resizeObsrRef.current.observe(containerRef.current!);

      return () => {
        // cancel the scheduled update of the container's dimension
        if (animaFrameIDRef.current) {
          window.cancelAnimationFrame(animaFrameIDRef.current);
        }
        // disconnect the resize observer on unmounted
        resizeObsrRef.current!.disconnect();
      };
    },
    [],
  );

  return dimension;
}
