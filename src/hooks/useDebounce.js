import { useEffect, useState } from 'react';

const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const debounce = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(debounce);
  }, [value]);
  return debounceValue;
};

export default useDebounce;
