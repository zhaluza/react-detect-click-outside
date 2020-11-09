import { useCallback, useEffect, useRef } from 'react';

interface Props {
  onTriggered: () => void;
  triggerKeys?: string[];
  disableClick?: boolean;
  disableKeys?: boolean;
  allowAnyKey?: boolean;
}

/**
 * Hook used to detect clicks outside a component (or an escape key press). onTriggered function is triggered on `click` or escape `keyup` event.
 *
 */
export function useDetectClickOutside({
  onTriggered,
  triggerKeys,
  disableClick,
  disableKeys,
  allowAnyKey,
}: Props) {
  const ref = useRef(null);

  const keyListener = useCallback((e: KeyboardEvent) => {
    if (allowAnyKey) {
      onTriggered();
    } else if (triggerKeys) {
      if (triggerKeys.includes(e.key)) {
        onTriggered();
      }
    } else {
      if (e.key === 'Escape') {
        onTriggered();
      }
    }
  }, []);

  const clickListener = useCallback(
    (e: MouseEvent) => {
      if (ref && ref.current) {
        if (!(ref.current! as any).contains(e.target)) {
          onTriggered?.();
        }
      }
    },
    [ref.current]
  );

  useEffect(() => {
    !disableClick && document.addEventListener('click', clickListener);
    !disableKeys && document.addEventListener('keyup', keyListener);
    return () => {
      !disableClick && document.removeEventListener('click', clickListener);
      !disableKeys && document.removeEventListener('keyup', keyListener);
    };
  }, []);

  return ref;
}
