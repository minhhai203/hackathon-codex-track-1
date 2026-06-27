"use client";

import { useEffect, useState } from "react";

/** Đồng hồ đếm ngược đồng bộ theo deadline tuyệt đối của server. */
export function Countdown({
  deadlineTs,
  timeLimitSec,
}: {
  deadlineTs: number;
  timeLimitSec: number;
}) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      setNow(Date.now());
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const remainMs = Math.max(0, deadlineTs - now);
  const remainSec = Math.ceil(remainMs / 1000);
  const ratio = Math.max(0, Math.min(1, remainMs / (timeLimitSec * 1000)));
  const urgent = remainSec <= 3;

  return (
    <div className="flex items-center gap-3">
      <div
        className={`grid h-14 w-14 place-items-center rounded-full text-2xl font-black transition-colors ${
          urgent ? "animate-pulse bg-red-600" : "bg-white/15"
        }`}
      >
        {remainSec}
      </div>
      <div className="h-3 flex-1 overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full transition-[width] duration-100 ${
            urgent ? "bg-red-500" : "bg-emerald-400"
          }`}
          style={{ width: `${ratio * 100}%` }}
        />
      </div>
    </div>
  );
}
