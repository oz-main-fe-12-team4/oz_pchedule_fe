import { useState } from "react";

const Input = ({
  type,
  placeHolder,
  value,
  setValue,
  pattern,
  errorMessage,
  required,
  compareValue = null,
}) => {
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);

    const isValid = e.target.validity.valid;
    // console.log(e.target.validity);
    const isMatch = compareValue === null || compareValue === e.target.value;
    setIsError(!isValid || !isMatch);
  };
  return (
    <>
      <label className="flex flex-col gap-1">
        <input
          type={type}
          placeholder={placeHolder}
          value={value}
          pattern={pattern}
          required={required}
          className={`w-[300px] h-10 p-[0_25px] rounded-xl border border-[#C2C2C2]`}
          onChange={handleChange}
        />
        {isError && <p className="text-[#790000]">{errorMessage}</p>}
      </label>
    </>
  );
};

export default Input;
