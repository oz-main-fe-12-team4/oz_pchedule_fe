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
  const [temp, setTemp] = useState(value ?? options[0] ?? null); //선택중인 값

  const rootRef = useRef(null); // 컴포넌트 전체 root div(외부 클릭 감지를 위해)
  const wheelRef = useRef(null); // 스크롤 영역(현재 날짜가 자동으로 가운도 오도록 스크롤 조정)

  useEffect(() => {
    if (value !== undefined) setTemp(value);
  }, [value]);
  //value를 바꿀때. 내부의 temp값도 같이 맞춤

  //날짜 확정하는 부분, temp 업데이트후 onChange 콜백 실행
  const commit = (selected) => {
    if (disabled) return;
    setTemp(selected);
    onChange?.(selected);
  };

  // 현재 선택된값이 options 안에 몇번째인지 찾음
  const curIndex = options.findIndex(
    (d) => new Date(d).toDateString() === new Date(temp).toDateString()
  );

  //curIndex가 바꿀때마다 스크롤 위치 조정
  useEffect(() => {
    const el = wheelRef.current;
    if (el && curIndex >= 0) el.scrollTop = curIndex * ITEM_H;
  }, [curIndex]);

  // 외부클릭시 닫히게 하기
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
