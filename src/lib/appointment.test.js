import { describe, expect, it } from "vitest";
import { validateAppointment } from "./appointment";

describe("appointment validation", () => {
  it("requires contact name and phone", () => {
    expect(validateAppointment({ contactName: "", phone: "" })).toEqual({
      ok: false,
      errors: {
        contactName: "请填写联系人",
        phone: "请填写手机号"
      }
    });
  });

  it("requires a mainland China mobile phone shape for the demo", () => {
    expect(validateAppointment({ contactName: "张女士", phone: "12345" })).toEqual({
      ok: false,
      errors: {
        phone: "请填写 11 位手机号"
      }
    });
  });

  it("accepts a complete appointment", () => {
    expect(validateAppointment({ contactName: "张女士", phone: "13800138000" })).toEqual({
      ok: true,
      errors: {}
    });
  });
});
