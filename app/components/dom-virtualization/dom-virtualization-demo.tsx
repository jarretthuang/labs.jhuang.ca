import { useMemo, useState } from "react";
import { DOM_VIRTUALIZATION } from "~/models/components";

export const meta = () => DOM_VIRTUALIZATION.meta;
export const handle = DOM_VIRTUALIZATION.routeHandle;

const ROW_HEIGHT = 40;
const VISIBLE_COUNT = 12;
const OVERSCAN = 4;
const TOTAL_ROWS = 10000;

export default function DomVirtualizationDemo() {
  const [scrollTop, setScrollTop] = useState(0);

  const data = useMemo(
    () => Array.from({ length: TOTAL_ROWS }, (_, index) => `Row ${index + 1}`),
    [],
  );

  const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
  const endIndex = Math.min(
    data.length,
    startIndex + VISIBLE_COUNT + OVERSCAN * 2,
  );
  const visibleRows = data.slice(startIndex, endIndex);

  return (
    <div className="w-full max-w-2xl h-full rounded-xl bg-gray-100 p-4 flex flex-col gap-3">
      <p className="text-sm text-gray-700">
        Rendering {visibleRows.length} rows out of {data.length.toLocaleString()}.
      </p>

      <div
        className="h-[480px] overflow-auto rounded-lg bg-white border border-gray-200"
        onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
      >
        <div style={{ height: data.length * ROW_HEIGHT, position: "relative" }}>
          {visibleRows.map((row, offset) => {
            const index = startIndex + offset;
            return (
              <div
                key={row}
                className="absolute left-0 right-0 px-4 border-b border-gray-100 flex items-center"
                style={{
                  top: index * ROW_HEIGHT,
                  height: ROW_HEIGHT,
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#fafafa",
                }}
              >
                {row}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
