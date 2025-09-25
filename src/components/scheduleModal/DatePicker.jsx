import { useEffect, useRef, useState } from "react";
import Button from "../common/Button";

const ITEM_H = 36;

const DatePicker = ({
  value,
  onChange,
  options = [],
  placeholder,
  className,
  disabled,
}) => {
  const [open, setOpen] = useState(false);
  const [temp, setTemp] = useState(value ?? options[0] ?? null);

  const rootRef = useRef(null);
  const wheelRef = useRef(null);

  useEffect(() => {
    if (value !== undefined) setTemp(value);
  }, [value]);

  const commit = (selected) => {
    if (disabled) return;
    setTemp(selected);
    onChange?.(selected);
  };

  const curIndex = options.findIndex(
    (d) => new Date(d).toDateString() === new Date(temp).toDateString()
  );

  useEffect(() => {
    const el = wheelRef.current;
    if (el && curIndex >= 0) el.scrollTop = curIndex * ITEM_H;
  }, [curIndex]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) =>
      !rootRef.current?.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`relative ${className || ""}`}>
      <button
        type="button"
        onClick={() => !disabled && setOpen(true)}
        className={`h-10 w-full rounded-md border px-3 text-left text-sm bg-white border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
          disabled ? "opacity-60 pointer-events-none" : ""
        }`}
      >
        {temp ? temp.toLocaleDateString() : placeholder || "날짜 선택"}
      </button>

      {open && (
        <div className="absolute z-30 mt-2 w-[180px] rounded-md border border-gray-200 bg-white shadow-lg">
          <div
            className="relative h-[180px] overflow-y-auto snap-y snap-mandatory rounded border border-gray-200"
            ref={wheelRef}
            style={{ scrollBehavior: "smooth" }}
          >
            <div style={{ height: `${(180 - ITEM_H) / 2}px` }} />
            {options.map((d, i) => (
              <div
                key={i}
                className={`snap-center h-[36px] flex items-center justify-center text-sm ${
                  i === curIndex ? "text-black font-semibold" : "text-gray-500"
                }`}
                onClick={() => commit(d)}
              >
                {new Date(d).toLocaleDateString()}
              </div>
            ))}
            <div style={{ height: `${(180 - ITEM_H) / 2}px` }} />
          </div>

          <div className="flex justify-center gap-4 mb-2 mt-2">
            <Button
              variant="cancel"
              type="button"
              onClick={() => setOpen(false)}
            >
              취소
            </Button>
            <Button
              variant="confirm"
              type="button"
              onClick={() => {
                commit(temp);
                setOpen(false);
              }}
            >
              저장
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
