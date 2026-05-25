import { CalendarCheck, Gift, HeartHandshake, ShieldCheck, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { memberProfile, stores } from "../data/catalog";
import ImagePanel from "../components/ImagePanel";

export default function Mine({ onBook }) {
  const [showReferral, setShowReferral] = useState(false);

  return (
    <div className="page">
      <section className="member-card">
        <div>
          <span className="eyebrow">会员中心</span>
          <h1>{memberProfile.name}</h1>
          <p>{memberProfile.nextBenefit}</p>
        </div>
        <div className="member-points">
          <strong>{memberProfile.points}</strong>
          <span>积分</span>
        </div>
      </section>

      <section className="benefit-grid">
        {memberProfile.benefits.map((benefit) => (
          <div key={benefit}>
            <Sparkles size={17} />
            <span>{benefit}</span>
          </div>
        ))}
      </section>

      <section className="mine-actions">
        <button type="button" onClick={() => onBook("会员到店体验")}>
          <CalendarCheck size={20} />
          <div>
            <strong>预约到店体验</strong>
            <span>拉丝体验、礼盒咨询、养护建议</span>
          </div>
        </button>
        <button type="button">
          <ShieldCheck size={20} />
          <div>
            <strong>售后养护</strong>
            <span>通风、收纳、蓬松检测提醒</span>
          </div>
        </button>
        <button type="button" onClick={() => setShowReferral(true)}>
          <Gift size={20} />
          <div>
            <strong>推荐有礼</strong>
            <span>老客分享，双方获得养护券</span>
          </div>
        </button>
      </section>

      <section className="store-info">
        <ImagePanel imageKey="store-experience" imageFile="/assets/store-experience.png" className="store-image" />
        <span className="eyebrow">门店信息</span>
        <h2>{stores[0].name}</h2>
        <p>{stores[0].address}</p>
        <p>{stores[0].hours} · {stores[0].phone}</p>
      </section>

      {showReferral ? (
        <div className="sheet-backdrop" role="dialog" aria-modal="true" aria-label="推荐有礼">
          <section className="bottom-sheet">
            <div className="sheet-header">
              <div>
                <span className="eyebrow">老客推荐</span>
                <h2>把信任交给熟人</h2>
              </div>
              <button className="icon-button ghost" type="button" onClick={() => setShowReferral(false)} title="关闭">
                <X size={18} />
              </button>
            </div>
            <div className="referral-card">
              <HeartHandshake size={34} />
              <strong>分享专属推荐卡</strong>
              <span>好友到店体验或下单后，你们都可获得 120 元养护礼券。</span>
            </div>
            <button className="primary-action full" type="button" onClick={() => setShowReferral(false)}>
              生成模拟分享卡
            </button>
          </section>
        </div>
      ) : null}
    </div>
  );
}
