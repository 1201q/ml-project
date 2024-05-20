import { SizeType } from "@/types/types";
import { useState, useEffect, useRef, RefObject } from "react";

const useSize = (ref: RefObject<HTMLDivElement>) => {
  const [isResizing, setIsResizing] = useState(false);
  const [init, setInit] = useState(false);
  const [size, setSize] = useState<SizeType | undefined>();
  const timeoutRef = useRef<NodeJS.Timeout | undefined>();

  useEffect(() => {
    const handleResize = () => {
      setIsResizing(true);

      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (ref.current) {
          setIsResizing(false);
          setSize({
            width: ref.current.clientWidth,
            height: ref.current.clientHeight,
          });
        }
      }, 300);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    if (ref.current) {
      setInit(true);
      setSize({
        width: ref.current.clientWidth,
        height: ref.current.clientHeight,
      });
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutRef.current!);
    };
  }, [ref]);

  return { isResizing: !(!isResizing && init), size: size };
};

export default useSize;
