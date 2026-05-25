import { ArrowRight, CalendarCheck, QrCode, Sparkles } from "lucide-react";
import { products, sceneFilters } from "../data/catalog";
import ImagePanel from "../components/ImagePanel";
import ProductCard from "../components/ProductCard";

export default function Home({ onSelectCategory, onOpenProduct, onAddProduct, onOpenTrace, onBook }) {
  return (
    <div className="page page-home">
      <section className="hero-card">
        <ImagePanel imageKey="hero-silk-bedroom" imageFile="/assets/hero-silk-bedroom.png" className="hero-image" />
        <div className="hero-badges" aria-label="品牌信任标签">
          <span>省级非遗</span>
          <span>一被一码</span>
        </div>
        <div className="hero-copy">
          <span className="eyebrow">中国非遗蚕丝生活方式品牌</span>
          <h1>一生一被，一丝传家</h1>
          <p>把昭通手作蚕丝、可追溯品质和门店体验放到同一条购买路径里。</p>
          <div className="hero-actions">
            <button className="primary-action" type="button" onClick={() => onSelectCategory("gift")}>
              进入礼赠选购
              <ArrowRight size={17} />
            </button>
            <button className="secondary-action hero-secondary" type="button" onClick={onOpenTrace}>
              看溯源
            </button>
          </div>
        </div>
      </section>

      <section className="scene-grid">
        {sceneFilters.map((scene) => (
          <button className={`scene-card scene-${scene.id}`} type="button" key={scene.id} onClick={() => onSelectCategory(scene.category)}>
            <strong>{scene.title}</strong>
            <span>{scene.description}</span>
          </button>
        ))}
      </section>

      <section className="trust-strip">
        {["非遗手作", "一被一码", "昭通优丝", "到店体验"].map((item) => (
          <div key={item}>
            <Sparkles size={16} />
            <span>{item}</span>
          </div>
        ))}
      </section>

      <section className="section-block">
        <div className="section-title">
          <div>
            <span className="eyebrow">今日推荐</span>
            <h2>先看得懂，再放心买</h2>
          </div>
          <button type="button" onClick={() => onSelectCategory("all")}>
            全部
          </button>
        </div>
        <div className="horizontal-products">
          {products.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} onOpen={onOpenProduct} onAdd={onAddProduct} />
          ))}
        </div>
      </section>

      <section className="craft-teaser">
        <div>
          <span className="eyebrow">18 道工艺</span>
          <h2>从一粒茧到一床被</h2>
          <p>查看示例溯源码，理解每一步如何转化为真实的品质证据。</p>
        </div>
        <button className="secondary-action" type="button" onClick={onOpenTrace}>
          <QrCode size={17} />
          去溯源
        </button>
      </section>

      <section className="appointment-banner">
        <div>
          <strong>线下看丝，线上复购</strong>
          <span>预约门店拉丝体验、礼盒咨询和养护建议。</span>
        </div>
        <button className="icon-button light" type="button" onClick={() => onBook("门店体验")} title="预约到店">
          <CalendarCheck size={19} />
        </button>
      </section>
    </div>
  );
}
