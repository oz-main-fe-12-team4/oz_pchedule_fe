import { useEffect, useState } from "react";

export const useDebounce = (value, delay) => {
  const [debounce, setDebounce] = useState();

  useEffect(() => {
    const debounceValue = setTimeout(() => {
      setDebounce(value);
    }, delay);
    return () => clearTimeout(debounceValue);
  }, [value, delay]);

  return debounce;
};
