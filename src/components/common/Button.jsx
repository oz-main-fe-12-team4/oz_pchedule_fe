import React from "react";

const variants = {
  confirm:
    "w-[60px] h-7 text-[13px] bg-[#5AA5B2] text-white hover:bg-[#223f43] active:bg-[#223f43] rounded-[9px]",
  cancel:
    "w-[60px] h-7 text-[13px] bg-[#d9d9d9] text-gray-700 hover:bg-[#5c5c5c] active:bg-[#5c5c5c] hover:text-white rounded-[9px]",
  category:
    "w-auto  text-[14px] h-8 px-3 my-2 bg-[#2F7884] text-white  hover:bg-[#223f43] active:bg-[#223f43] rounded-[9px]",
  login:
    "w-[300px] h-10 m-1 bg-[#223f43] text-white hover:bg-[#5AA5B2] rounded-xl",
};

const baseStyle =
  "flex justify-center items-center font-semibold transition-colors duration-150 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#5AA5B2] " +
  "disabled:opacity-50 disabled:cursor-not-allowed shadow-md";

const Button = ({
  variant = "confirm",
  children,
  additionalClass = "",
  type = "button",
  disabled = false,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${additionalClass}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
