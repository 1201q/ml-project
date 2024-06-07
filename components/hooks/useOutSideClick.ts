import { useEffect } from "react";

const useOutSideClick = (
  targetref: React.RefObject<HTMLElement | null>[],
  callback: () => void
) => {
  useEffect(() => {
    const hasClickedOutsideElement = (
      event: MouseEvent,
      targetElement: HTMLElement | null
    ) => {
      return !!(targetElement && !targetElement.contains(<Node>event?.target));
    };
    const clickedOutsideElementListener = (event: MouseEvent) => {
      const hasClickedOutsideAllElements = targetref
        .map((ref) => hasClickedOutsideElement(event, ref.current))
        .includes(false)
        ? false
        : true;
      if (hasClickedOutsideAllElements) callback();
    };
    window.addEventListener("mousedown", clickedOutsideElementListener);
    return () =>
      window.removeEventListener("mousedown", clickedOutsideElementListener);
  }, []);
};

export default useOutSideClick;
