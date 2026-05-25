export function validateAppointment(values) {
  const errors = {};
  const contactName = values.contactName?.trim() ?? "";
  const phone = values.phone?.trim() ?? "";

  if (!contactName) {
    errors.contactName = "请填写联系人";
  }

  if (!phone) {
    errors.phone = "请填写手机号";
  } else if (!/^1\d{10}$/.test(phone)) {
    errors.phone = "请填写 11 位手机号";
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors
  };
}
