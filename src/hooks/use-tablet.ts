import * as React from "react";

const TABLET_BREAKPOINT = 1224;

function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT}px)`);

    const onChange = () => {
      setIsTablet(window.innerWidth < TABLET_BREAKPOINT);
    };

    mql.addEventListener("change", onChange);

    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isTablet;
}

export { useIsTablet };
