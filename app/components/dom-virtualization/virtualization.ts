export type VisibleRange = {
  startIndex: number;
  endIndex: number;
};

export function getVisibleRange({
  totalRows,
  scrollTop,
  rowHeight,
  visibleCount,
  overscan,
}: {
  totalRows: number;
  scrollTop: number;
  rowHeight: number;
  visibleCount: number;
  overscan: number;
}): VisibleRange {
  if (totalRows <= 0 || rowHeight <= 0 || visibleCount <= 0) {
    return { startIndex: 0, endIndex: 0 };
  }

  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
  const endIndex = Math.min(totalRows, startIndex + visibleCount + overscan * 2);

  return { startIndex, endIndex };
}
