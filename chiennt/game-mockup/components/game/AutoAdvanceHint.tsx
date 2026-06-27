"use client";

import { useEffect, useState } from "react";
import { AUTO_ADVANCE_MS } from "@/lib/game/transport";

/** Đếm ngược hiển thị cho biết còn bao lâu thì tự chuyển tiếp. */
export function AutoAdvanceHint() {
  const [sec, setSec] = useState(Math.round(AUTO_ADVANCE_MS / 1000));

  useEffect(() => {
    const id = setInterval(() => {
      setSec((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="text-sm text-white/50">
      Tự chuyển sau {sec}s — hoặc bấm để tiếp ngay
    </span>
  );
}
