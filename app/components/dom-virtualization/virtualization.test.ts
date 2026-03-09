import { describe, expect, it } from "vitest";
import { getVisibleRange } from "./virtualization";

describe("getVisibleRange", () => {
  it("returns the first window near the top", () => {
    expect(
      getVisibleRange({
        totalRows: 100,
        scrollTop: 0,
        rowHeight: 40,
        visibleCount: 12,
        overscan: 4,
      }),
    ).toEqual({ startIndex: 0, endIndex: 20 });
  });

  it("adds overscan around a scrolled window", () => {
    expect(
      getVisibleRange({
        totalRows: 100,
        scrollTop: 400,
        rowHeight: 40,
        visibleCount: 12,
        overscan: 4,
      }),
    ).toEqual({ startIndex: 6, endIndex: 26 });
  });

  it("clamps at the end of the list", () => {
    expect(
      getVisibleRange({
        totalRows: 30,
        scrollTop: 1000,
        rowHeight: 40,
        visibleCount: 12,
        overscan: 4,
      }),
    ).toEqual({ startIndex: 21, endIndex: 30 });
  });
});
