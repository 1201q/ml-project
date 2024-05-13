import { useState, useEffect, useRef, RefObject } from "react";
import { SizeType } from "@/types/types";

const useSize = (ref: RefObject<HTMLDivElement>) => {
  const [size, setSize] = useState<SizeType | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [init, setInit] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>();

  useEffect(() => {
    const handleResize = () => {
      setIsResizing(true);

      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (ref.current) {
          setSize({
            width: ref.current.offsetWidth,
            height: ref.current.offsetHeight,
            aspectRatio: ref.current.offsetWidth / ref.current.offsetHeight,
          });
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

  return { size, isResizing, init };
};

export default useSize;
