import { useState } from "react";

const Input = ({
  label,
  setValue,
  errorMessage,
  compareValue = null,
  ...props
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
      <label htmlFor={label} className="text-[13px] flex flex-col gap-1">
        {label}
      </label>
      <input
        id={label}
        className={`w-[300px] h-10 p-[0_25px] rounded-xl border border-[#C2C2C2]`}
        onChange={handleChange}
        {...props}
      />
      {isError && <p className="text-[#790000]">{errorMessage}</p>}
    </>
  );
};

export default Input;
