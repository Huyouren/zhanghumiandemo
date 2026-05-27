import { traceRecord } from "./catalog";

export function lookupTraceRecord(code) {
  const normalized = code.trim().toUpperCase();

  if (!normalized) {
    return { ok: false, message: "请输入溯源码或点击示例码" };
  }

  if (normalized !== traceRecord.code) {
    return { ok: false, message: `没有找到该溯源码，请试试 ${traceRecord.code}` };
  }

  return { ok: true, record: traceRecord };
}
