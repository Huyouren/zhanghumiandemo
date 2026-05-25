import { describe, expect, it } from "vitest";
import { lookupTraceRecord } from "./trace";

const record = {
  code: "ZHM-2026-0518",
  origin: "云南昭通"
};

describe("trace lookup", () => {
  it("returns the matching record for a normalized code", () => {
    expect(lookupTraceRecord(" zhm-2026-0518 ", [record])).toEqual({
      ok: true,
      record
    });
  });

  it("returns a friendly error for empty code", () => {
    expect(lookupTraceRecord("", [record])).toEqual({
      ok: false,
      message: "请输入溯源码或点击示例码"
    });
  });

  it("returns a friendly error for unknown code", () => {
    expect(lookupTraceRecord("ZHM-0000", [record])).toEqual({
      ok: false,
      message: "没有找到该溯源码，请试试示例码 ZHM-2026-0518"
    });
  });
});
