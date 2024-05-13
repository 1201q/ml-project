import { useState, useEffect, useRef, RefObject } from "react";
import { SizeType } from "@/types/types";

const useSize = (ref: RefObject<HTMLDivElement>) => {
  const [size, setSize] = useState<SizeType | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>();

  useEffect(() => {
    const handleResize = () => {
      setIsResizing(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (ref.current) {
          setSize({
            width: ref.current.clientWidth,
            height: ref.current.clientHeight,
            aspectRatio: ref.current.clientWidth / ref.current.clientHeight,
          });
          setIsResizing(false);
        }
      }, 300);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutRef.current!);
    };
  }, []);

  return { size, isResizing };
};

export default useSize;
