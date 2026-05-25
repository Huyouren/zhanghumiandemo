import { CheckCircle2, Search, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { traceRecords } from "../data/catalog";
import { lookupTraceRecord } from "../lib/trace";
import ImagePanel from "../components/ImagePanel";

export default function Trace() {
  const [code, setCode] = useState("ZHM-2026-0518");
  const [result, setResult] = useState(() => lookupTraceRecord("ZHM-2026-0518", traceRecords));

  function lookup(nextCode = code) {
    setCode(nextCode);
    setResult(lookupTraceRecord(nextCode, traceRecords));
  }

  const record = result.ok ? result.record : null;

  return (
    <div className="page">
      <section className="page-heading trace-heading">
        <span className="eyebrow">一被一码</span>
        <h1>把非遗变成看得见的信任</h1>
        <p>输入示例溯源码，查看原料、批次、手作工艺和养护建议。</p>
      </section>

      <section className="trace-card">
        <ImagePanel imageKey="trace-code-card" imageFile="/assets/trace-code-card.png" className="trace-image" />
        <label className="trace-input">
          <span>溯源码</span>
          <input value={code} onChange={(event) => setCode(event.target.value)} />
        </label>
        <div className="trace-actions">
          <button className="primary-action" type="button" onClick={() => lookup()}>
            <Search size={17} />
            查询
          </button>
          <button className="secondary-action" type="button" onClick={() => lookup("ZHM-2026-0518")}>
            使用示例码
          </button>
        </div>
        {!result.ok ? <p className="form-error">{result.message}</p> : null}
      </section>

      {record ? (
        <>
          <section className="record-card">
            <div className="section-title compact">
              <div>
                <span className="eyebrow">批次记录</span>
                <h2>{record.code}</h2>
              </div>
              <ShieldCheck size={28} />
            </div>
            {[
              ["原料产地", record.origin],
              ["材料工艺", record.material],
              ["手作团队", record.artisan],
              ["生产批次", record.batch],
              ["出库检测", record.inspection]
            ].map(([label, value]) => (
              <div className="record-row" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
            <div className="care-tips">
              {record.careTips.map((tip) => (
                <span key={tip}>
                  <CheckCircle2 size={15} />
                  {tip}
                </span>
              ))}
            </div>
          </section>

          <section className="section-block">
            <div className="section-title">
              <div>
                <span className="eyebrow">18 道非遗工艺</span>
                <h2>每一步都为信任服务</h2>
              </div>
            </div>
            <ImagePanel imageKey="craft-hands-silk" imageFile="/assets/craft-hands-silk.png" className="craft-wide-image" />
            <div className="timeline">
              {record.timeline.map((step) => (
                <article key={step.id}>
                  <i>{String(step.id).padStart(2, "0")}</i>
                  <div>
                    <strong>{step.title}</strong>
                    <p>{step.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}
