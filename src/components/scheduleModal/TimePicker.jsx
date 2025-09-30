import { useEffect, useRef, useState } from "react";
import timeUtils from "../../utils/timeUtils";
import Button from "../common/Button";

const { clamp, toMinutes, fromMinutes, parseInput, formatTime, snapToStep } =
  timeUtils;

const ITEM_H = 36;
const range = (n) => Array.from({ length: n }, (_, i) => i);

const TimePicker = ({
  value,
  onChange,
  minuteStep = 1,
  min,
  max,
  disabled,
  placeholder,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const hourRef = useRef(null);
  const minuteRef = useRef(null);

  //제한된 시간만 선택할 수 있게
  const minMins = min ? toMinutes(parseInput(min)) : 0;
  const maxMins = max ? toMinutes(parseInput(max)) : 23 * 60 + 59;

  // 현재 value를 기준으로 시간 계산
  const parsed = parseInput(value ?? "00:00") ?? { h: 0, m: 0 }; // value가 없으면 "00:00" 사용
  const curHourIdx = parsed.h; //시간은 그대로 인덱스로 사용 (15시 = 인덱스 15)
  const curMinuteIdx = Math.floor(parsed.m / minuteStep); //Wheel의 인덱스번호로 시간 선택하기위해서

  //선택을 실제 시간으로 변환
  const applyByIndex = (hIdx, mIdx) => {
    const actualMinute = mIdx * minuteStep;
    const mins = clamp(hIdx * 60 + actualMinute, minMins, maxMins);
    const { h, m } = fromMinutes(mins);
    const out = formatTime(h, m);
    onChange?.(out);
  };

  const setFromNow = () => {
    if (disabled) return;
    const d = new Date();
    const snapped = snapToStep(d.getHours() * 60 + d.getMinutes(), minuteStep);
    const { h, m } = fromMinutes(clamp(snapped, minMins, maxMins));
    const out = formatTime(h, m);
    onChange?.(out);
  };

  return (
    <div ref={rootRef} className={`relative ${className || ""}`}>
      <button
        type="button"
        onClick={() => !disabled && setOpen(true)}
        className={`h-10 w-full rounded-md border px-3 text-left text-sm bg-white border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
          disabled ? "opacity-60 pointer-events-none" : ""
        }`}
      >
        {value || placeholder || "00:00"}
      </button>

      {open && (
        <div
          className={`absolute z-30 mt-2 w-[180px] rounded-md border border-gray-200 bg-white shadow-lg ${
            disabled ? "opacity-60 pointer-events-none" : ""
          }`}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="font-semibold">{value || "00:00"}</div>
            <button
              type="button"
              onClick={setFromNow}
              className={`text-xs font-semibold ${
                disabled ? "text-gray-300" : "text-red-500 hover:text-red-600"
              }`}
            >
              NOW
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 px-2 py-2">
            <div className="text-[11px] text-gray-500 text-center">Hour</div>
            <div className="text-[11px] text-gray-500 text-center">Minute</div>

            <div className="col-span-1">
              <Wheel
                refEl={hourRef}
                items={range(24)}
                activeIndex={curHourIdx}
                onSnap={(idx) => applyByIndex(idx, curMinuteIdx)}
              />
            </div>
            <div className="col-span-1">
              <Wheel
                refEl={minuteRef}
                items={range(Math.floor(60 / minuteStep)).map((index) =>
                  String(index * minuteStep).padStart(2, "0")
                )}
                activeIndex={curMinuteIdx}
                onSnap={(idx) => applyByIndex(curHourIdx, idx)}
              />
            </div>
          </div>

          <div
            className="pointer-events-none absolute left-0 right-0 border-[#223F43] font-extrabold"
            style={{ top: (180 - ITEM_H) / 2, height: ITEM_H }}
          />

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
                const hIdx = hourRef.current?.dataset.idx
                  ? Number(hourRef.current.dataset.idx)
                  : curHourIdx;
                const mIdx = minuteRef.current?.dataset.idx
                  ? Number(minuteRef.current.dataset.idx)
                  : curMinuteIdx;
                applyByIndex(hIdx, mIdx);
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
// 외부에서 전달한 DOM 참조 , 표시할 항목들 , 현재 선택된 인덱스 , 선택이 확정될 때 호출되는 함수
const Wheel = ({ refEl, items, activeIndex, onSnap }) => {
  const localRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(activeIndex);

  // Wheel이 처음 열릴 때, 또는 activeIndex가 바뀔 때 해당 위치로 즉시 스크롤
  useEffect(() => {
    const el = refEl?.current || localRef.current; //외부/내부 ref 모두 지원
    if (el) {
      el.scrollTop = activeIndex * ITEM_H;
      el.dataset.idx = activeIndex;
    }
    setCurrentIndex(activeIndex);
  }, [activeIndex, refEl]); //사용자가 다른 시간을 선택했을 때 , 컴포넌트가 처음 마운트될 때

  //사용자가 스크롤을 멈추면, 가장 가까운 항목에 딱 맞춰서 스냅
  useEffect(() => {
    const el = refEl?.current || localRef.current;
    if (!el) return;

    // 스크롤 이벤트 디바운싱을 막고 마지막 이벤트만 처리하기 위해
    let to;
    const onScroll = () => {
      clearTimeout(to);
      to = setTimeout(() => {
        const maxIndex = items.length - 1;
        const idx = Math.min(
          maxIndex,
          Math.max(0, Math.round(el.scrollTop / ITEM_H))
        );
        el.scrollTo({ top: idx * ITEM_H, behavior: "smooth" });
        setCurrentIndex(idx);
        el.dataset.idx = idx; // 현재 선택 인덱스를 ref DOM에 기록
        onSnap?.(idx);
      }, 80);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      clearTimeout(to);
    };
  }, [onSnap, refEl, items.length]);

  return (
    <div
      ref={refEl ?? localRef}
      className="relative h-[180px] overflow-y-auto snap-y snap-mandatory rounded border border-gray-200"
      style={{ scrollBehavior: "smooth" }}
    >
      <div style={{ height: `${(180 - ITEM_H) / 2}px` }} />
      {items.map((it, idx) => (
        <div
          key={idx}
          className={`snap-center h-[36px] flex items-center justify-center text-sm ${
            idx === currentIndex ? "text-black" : "text-gray-300"
          }`}
        >
          {typeof it === "number" ? it.toString().padStart(2, "0") : it}
        </div>
      ))}
      <div style={{ height: `${(180 - ITEM_H) / 2}px` }} />
    </div>
  );
};

export default TimePicker;
