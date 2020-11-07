import { useCallback, useEffect, useRef } from 'react';

interface Props {
  onClose: () => void;
  exitKeys?: string[];
  disableClick?: boolean;
  disableKeys?: boolean;
}

/**
 * Hook used to detect clicks outside a component (or an escape key press). onClose function is triggered on `click` or escape `keyup` event.
 *
 */
export function useDetectClickOutside({
  onClose,
  exitKeys,
  disableClick,
  disableKeys,
}: Props) {
  const ref = useRef(null);

  const keyListener = useCallback((e: KeyboardEvent) => {
    if (exitKeys) {
      if (exitKeys.includes(e.key)) {
        onClose();
      }
    } else {
      if (e.key === 'Escape') {
        onClose();
      }
    }
  }, []);

  const clickListener = useCallback(
    (e: MouseEvent) => {
      if (ref && ref.current) {
        if (!(ref.current! as any).contains(e.target)) {
          onClose?.();
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
