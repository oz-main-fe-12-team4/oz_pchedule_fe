import { useEffect, useMemo, useRef, useState } from "react";
import timeUtils from "../utils/timeUtils";
import Button from "./Button";
const { clamp, toMinutes, fromMinutes, parseInput, formatTime, snapToStep } =
  timeUtils;

const ITEM_H = 36;
const range = (n) => Array.from({ length: n }, (_, i) => i);

const TimePicker = ({
  value,
  defaultValue,
  onChange,
  minuteStep = 1,
  min,
  max,
  disabled,
  placeholder,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState(
    () => value ?? defaultValue ?? "00:00"
  );
  const [temp, setTemp] = useState(() => internal);

  const rootRef = useRef(null);
  const hourRef = useRef(null);
  const minuteRef = useRef(null);

  // 최소/최대 분
  const minMins = useMemo(
    () => (min ? toMinutes(parseInput(min) ?? { h: 0, m: 0 }) : 0),
    [min]
  );
  const maxMins = useMemo(
    () => (max ? toMinutes(parseInput(max) ?? { h: 23, m: 59 }) : 23 * 60 + 59),
    [max]
  );

  // 외부 값 동기화
  useEffect(() => {
    if (value !== undefined) setInternal(value);
  }, [value]);

  const commit = (formatted) => {
    if (disabled) return;
    if (value === undefined) setInternal(formatted);
    onChange?.(formatted);
  };

  // 열릴 때 temp 초기화 + 스크롤 위치 맞추기
  useEffect(() => {
    if (!open) return;
    const cur = parseInput(internal || temp) ?? { h: 0, m: 0 };
    const mins = clamp(
      snapToStep(toMinutes(cur), minuteStep),
      minMins,
      maxMins
    );
    const { h, m } = fromMinutes(mins);

    const scrollTo = (el, idx) => el && (el.scrollTop = idx * ITEM_H);

    scrollTo(hourRef.current, h);
    scrollTo(minuteRef.current, m);

    setTemp(formatTime(h, m));
  }, [open]);

  // 외부 클릭 시 닫기
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

  const applyByIndex = (hIdx, mIdx) => {
    const h = hIdx;
    const m = clamp(mIdx * minuteStep, 0, 59);
    const clamped = clamp(snapToStep(h * 60 + m, minuteStep), minMins, maxMins);
    const { h: hh, m: mm } = fromMinutes(clamped);
    setTemp(formatTime(hh, mm));
  };

  const parsedTemp = parseInput(temp) ?? { h: 0, m: 0 };
  const curHourIdx = parsedTemp.h;
  const curMinuteIdx = parsedTemp.m;

  const disabledCls = disabled ? "opacity-60 pointer-events-none" : "";

  const hours = useMemo(() => range(24), []);
  const minutes = useMemo(() => range(60), []);

  const setFromNow = () => {
    if (disabled) return;
    const d = new Date();
    const snapped = snapToStep(d.getHours() * 60 + d.getMinutes(), minuteStep);
    const { h, m } = fromMinutes(clamp(snapped, minMins, maxMins));
    setTemp(formatTime(h, m));
  };

  return (
    <div ref={rootRef} className={`relative ${className || ""}`}>
      <button
        type="button"
        onClick={() => !disabled && setOpen(true)}
        className={`h-10 w-full rounded-md border px-3 text-left text-sm bg-white border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 ${disabledCls}`}
      >
        {internal || placeholder || "00:00"}
      </button>

      {open && (
        <div
          className={`absolute z-30 mt-2 w-[180px] rounded-md border border-gray-200 bg-white shadow-lg ${disabledCls}`}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="font-semibold">{temp}</div>
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
                items={hours}
                activeIndex={curHourIdx}
                onSnap={(idx) => applyByIndex(idx, curMinuteIdx)}
              />
            </div>
            <div className="col-span-1">
              <Wheel
                refEl={minuteRef}
                items={minutes.map((m) => m.toString().padStart(2, "0"))}
                activeIndex={curMinuteIdx}
                onSnap={(idx) => applyByIndex(curHourIdx, idx)}
              />
            </div>
          </div>

          <div
            className="pointer-events-none absolute left-0 right-0 border-[#223F43] font-extrabold"
            style={{ top: (180 - ITEM_H) / 2, height: ITEM_H }}
          />

          <div className="flex justify-center gap-4 mb-2">
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
                const p = parseInput(temp);
                if (p) {
                  const mins = clamp(
                    snapToStep(toMinutes(p), minuteStep),
                    minMins,
                    maxMins
                  );
                  const { h, m } = fromMinutes(mins);
                  const out = formatTime(h, m);
                  commit(out);
                }
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

const Wheel = ({ refEl, items, activeIndex, onSnap }) => {
  const localRef = useRef(null);
  useEffect(() => {
    const el = refEl?.current || localRef.current;
    if (el) el.scrollTop = activeIndex * ITEM_H;
  }, [activeIndex, refEl]);

  useEffect(() => {
    const el = refEl?.current || localRef.current;
    if (!el) return;
    let to;
    const onScroll = () => {
      clearTimeout(to);
      to = setTimeout(() => {
        const idx = Math.round(el.scrollTop / ITEM_H);
        el.scrollTo({ top: idx * ITEM_H, behavior: "smooth" });
        onSnap?.(idx);
      }, 80);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      clearTimeout(to);
    };
  }, [onSnap, refEl]);

  return (
    <div
      ref={refEl ?? localRef}
      className="relative h-[180px] overflow-y-auto snap-y snap-mandatory rounded border border-gray-200"
      style={{ scrollBehavior: "smooth" }}
    >
      <div style={{ height: `${(180 - ITEM_H) / 2}px` }} />
      {items.map((it, i) => (
        <div
          key={i}
          className={`snap-center h-[36px] flex items-center justify-center text-sm ${
            i === activeIndex ? "text-black" : "text-gray-500"
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
