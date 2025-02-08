import { useEffect, useState } from "react";

const useDebounce = (value: string, delay: number = 500): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler); // Cleanup timeout if value changes
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
