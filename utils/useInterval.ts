import { useEffect, useRef } from "react";

const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = useRef<(() => void) | null>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const executeCallback = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    const timerId = setInterval(executeCallback, delay);

    return () => clearInterval(timerId);
  }, []);
};

export default useInterval;
