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
      // 여기서 검색 API 호출 등 작업 추가 가능해
    }
  }, [debouncedInput]);
  const handleChange = (e) => {
    setValue(e.target.value);

    const isValid = e.target.validity.valid;

    const isMatch = compareValue === null || compareValue === e.target.value;
    setIsError(!isValid || !isMatch);
  };
  return (
    <>
      <label htmlFor={inputId} className="text-[13px] flex flex-col gap-1">
        {label}
      </label>
      <input
        id={inputId}
        className={`w-[100%] h-10 p-[0_25px] rounded-xl border border-[#C2C2C2]`}
        onChange={handleChange}
        {...props}
      />
      {isError && <p className="text-[#790000]">{errorMessage}</p>}
    </>
  );
};

export default Input;
