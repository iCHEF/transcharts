import {
  RefObject,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { debounce } from 'lodash-es';
import resizeObserverPolyfill from 'resize-observer-polyfill';

import { GraphDimension } from '../common/types';

import { useAnimationFrame } from './useAnimationFrame';

interface ResizeObserverEntry {
  readonly target: Element;
  readonly contentRect: DOMRectReadOnly;
}

export function useContainerDimension(
  containerRef: RefObject<HTMLElement>,
  debounceTime = 300,
) {
  const [dimension, setDimension] = useState<GraphDimension>({
    width: 0,
    height: 0,
  });

  /** resizeObsrRef.current stores the ResizeObserver */
  const resizeObsrRef = useRef<ResizeObserver | null>(null);
  /** use requestAnimationFrame to update the dimension */
  const { requestWindowAnimationFrame } = useAnimationFrame();

  /** Function to set the updated dimension */
  const updateDimension = useCallback(
    (width: number, height: number) => {
      requestWindowAnimationFrame(() => {
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
      if (containerRef.current) {
        resizeObsrRef.current = new resizeObserverPolyfill(debouncedResize);
        resizeObsrRef.current.observe(containerRef.current!);
      }

      return () => {
        // disconnect the resize observer on unmounted
        if (resizeObsrRef.current) {
          resizeObsrRef.current!.disconnect();
        }
      };
    },
    [containerRef],
  );

  return dimension;
}
