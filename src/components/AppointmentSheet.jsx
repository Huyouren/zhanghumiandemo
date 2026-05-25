import { CalendarCheck, X } from "lucide-react";
import { useState } from "react";
import { stores } from "../data/catalog";
import { validateAppointment } from "../lib/appointment";

export default function AppointmentSheet({ reason = "门店体验", onClose, onSubmit }) {
  const [values, setValues] = useState({
    contactName: "",
    phone: "",
    selectedDate: "本周六",
    selectedTime: "14:00-16:00",
    serviceType: reason
  });
  const [errors, setErrors] = useState({});

  function updateValue(key, value) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  }

  function submit(event) {
    event.preventDefault();
    const result = validateAppointment(values);

    if (!result.ok) {
      setErrors(result.errors);
      return;
    }

    onSubmit({ ...values, store: stores[0].name });
  }

  return (
    <div className="sheet-backdrop" role="dialog" aria-modal="true" aria-label="预约到店">
      <form className="bottom-sheet" onSubmit={submit}>
        <div className="sheet-header">
          <div>
            <span className="eyebrow">O2O 体验</span>
            <h2>预约到店</h2>
          </div>
          <button className="icon-button ghost" type="button" onClick={onClose} title="关闭">
            <X size={18} />
          </button>
        </div>

        <div className="store-card">
          <strong>{stores[0].name}</strong>
          <span>{stores[0].address}</span>
          <span>{stores[0].hours} · {stores[0].phone}</span>
        </div>

        <label className="field">
          <span>联系人</span>
          <input
            value={values.contactName}
            onChange={(event) => updateValue("contactName", event.target.value)}
            placeholder="例如：张女士"
          />
          {errors.contactName ? <em>{errors.contactName}</em> : null}
        </label>

        <label className="field">
          <span>手机号</span>
          <input
            value={values.phone}
            onChange={(event) => updateValue("phone", event.target.value)}
            placeholder="13800138000"
            inputMode="tel"
          />
          {errors.phone ? <em>{errors.phone}</em> : null}
        </label>

        <div className="two-column">
          <label className="field">
            <span>日期</span>
            <select value={values.selectedDate} onChange={(event) => updateValue("selectedDate", event.target.value)}>
              <option>本周六</option>
              <option>本周日</option>
              <option>下周三</option>
            </select>
          </label>
          <label className="field">
            <span>时段</span>
            <select value={values.selectedTime} onChange={(event) => updateValue("selectedTime", event.target.value)}>
              <option>10:00-12:00</option>
              <option>14:00-16:00</option>
              <option>18:00-20:00</option>
            </select>
          </label>
        </div>

        <button className="primary-action full" type="submit">
          <CalendarCheck size={17} />
          提交预约
        </button>
      </form>
    </div>
  );
}
