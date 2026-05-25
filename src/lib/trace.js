export function lookupTraceRecord(code, records) {
  const normalized = code.trim().toUpperCase();

  if (!normalized) {
    return { ok: false, message: "请输入溯源码或点击示例码" };
  }

  const record = records.find((item) => item.code.toUpperCase() === normalized);

  if (!record) {
    return { ok: false, message: "没有找到该溯源码，请试试示例码 ZHM-2026-0518" };
  }

  return { ok: true, record };
}
