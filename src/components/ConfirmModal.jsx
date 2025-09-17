function ConfirmModal({
  message,
  leftBtnText,
  rightBtnText,
  onLeftClick,
  onRightClick,
}) {
  return (
    <div className="fixed inset-0 bg-gray-300 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-gray-700 rounded-lg p-6 w-[320px] shadow-lg flex flex-col items-center justify-center text-center">
        <p className="mb-6 text-white">{message}</p>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-black text-white rounded px-4 py-2 hover:bg-gray-900 "
            onClick={onLeftClick}
          >
            {leftBtnText}
          </button>
          <button
            className="bg-gray-300 rounded px-4 py-2 hover:bg-gray-400"
            onClick={onRightClick}
          >
            {rightBtnText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
