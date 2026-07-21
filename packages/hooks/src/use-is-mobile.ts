import { useEffect, useState } from 'react';

/** Default breakpoint (in px) for mobile detection. @public */
export const MOBILE_BREAKPOINT = 850;

/** Returns `true` when the viewport width is below `MOBILE_BREAKPOINT`. @public */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>();

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return !!isMobile;
}
