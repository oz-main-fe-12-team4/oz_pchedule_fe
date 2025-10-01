import { useState, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce";

const Input = ({
  label,
  inputId,
  value,
  setValue,
  errorMessage,
  compareValue = null,
  ...props
}) => {
  const [isError, setIsError] = useState(false);
  const debouncedInput = useDebounce(value, 500);
  // 디바운스된 검색어 값이 바뀔 때 처리할 작업(예: API 호출)
  useEffect(() => {
    if (debouncedInput !== "") {
      console.log("디바운스된 검색어 값:", debouncedInput);
    }
  }, [debouncedInput]);

  const handleChange = (e) => {
    const next = e.target.value;

    if (typeof setValue === "function") {
      setValue(next);
    }

    const isValid = e.target.validity?.valid ?? true;
    const isMatch = compareValue === null || compareValue === next;
    setIsError(!isValid || !isMatch);
  };
  return (
    <>
      <label htmlFor={inputId} className="text-[13px] flex flex-col gap-1">
        {label}
      </label>
      <input
        id={inputId}
        value={value}
        className={`w-[100%] h-10 p-[0_25px] rounded-xl border border-[#C2C2C2]`}
        onChange={handleChange}
        {...props}
      />
      {isError && <p className="text-[#790000]">{errorMessage}</p>}
    </>
  );
};

export default Input;
