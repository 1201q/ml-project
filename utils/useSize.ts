import { useState, useEffect, useRef, RefObject } from "react";

const useSize = (ref: RefObject<HTMLDivElement>) => {
  const [isResizing, setIsResizing] = useState(false);
  const [init, setInit] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>();

  useEffect(() => {
    const handleResize = () => {
      setIsResizing(true);

      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (ref.current) {
          setIsResizing(false);
        }
      }, 300);
    };

    window.addEventListener("resize", handleResize);

    handleResize();
    setInit(true);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutRef.current!);
    };
  }, []);

  return { isResizing: !isResizing && init };
};

export default useSize;
