import { useEffect, useState } from "react";

const useLocalStorage = (defaultValue, key) => {
  const [value, setValue] = useState(() => {
    const tempValue = window.localStorage.getItem(key);
    return tempValue !== null ? JSON.parse(tempValue) : defaultValue;
  });

  useEffect(()=>{
    window.localStorage.setItem(key, JSON.stringify(value))
  },[key, value])

  return [value, setValue]
}

export default useLocalStorage;