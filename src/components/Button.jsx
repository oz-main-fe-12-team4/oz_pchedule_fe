import React from "react";

export const Button = ({
  cancelText = "취소",
  confirmText = "저장",
  onCancelClick,
  onConfirmClick,
}) => {
  return (
    <div className="flex gap-3 justify-center my-3">
      <button
        className="rounded-lg px-6 py-2 text-sm font-bold bg-[#FFE6AB] hover:bg-[#ffb400]"
        onClick={onCancelClick}
      >
        {cancelText}
      </button>
      <button
        className="rounded-lg px-6 py-2 text-sm font-bold bg-[#CAE8F2] hover:bg-[#5aa5b2]"
        onClick={onConfirmClick}
      >
        {confirmText}
      </button>
      {/* <button
        className="rounded-lg px-6 py-2 text-sm font-bold bg-[#f5f5f5] hover:bg-[#d9d9d9]"
        onClick={onCancelClick}
      >
        {cancelText}
      </button>
      <button
        className="rounded-lg px-6 py-2 text-sm font-bold bg-[#CAE8F2] hover:bg-[#5aa5b2]"
        onClick={onConfirmClick}
      >
        {confirmText}
      </button> */}
    </div>
  );
};
