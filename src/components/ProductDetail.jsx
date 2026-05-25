import { CalendarCheck, CheckCircle2, ShoppingBag, X } from "lucide-react";
import ImagePanel from "./ImagePanel";

export default function ProductDetail({ product, onClose, onAdd, onBook }) {
  if (!product) return null;

  return (
    <div className="sheet-backdrop" role="dialog" aria-modal="true" aria-label={`${product.name}详情`}>
      <section className="bottom-sheet product-detail-sheet">
        <div className="sheet-header">
          <div>
            <span className="eyebrow">{product.categoryName}</span>
            <h2>{product.name}</h2>
          </div>
          <button className="icon-button ghost" type="button" onClick={onClose} title="关闭">
            <X size={18} />
          </button>
        </div>

        <ImagePanel imageKey={product.imageKey} imageFile={product.imageFile} className="detail-image" />

        <div className="detail-price-row">
          <strong>¥{product.price}</strong>
          <del>¥{product.originalPrice}</del>
          <span>{product.scene}</span>
        </div>

        <div className="spec-row">
          {product.specs.map((spec) => (
            <span key={spec}>{spec}</span>
          ))}
        </div>

        <section className="proof-list">
          <h3>信任证据</h3>
          {product.proofItems.map((item) => (
            <div className="proof-item" key={item}>
              <CheckCircle2 size={17} />
              <span>{item}</span>
            </div>
          ))}
        </section>

        <section className="comment-list">
          <h3>真实体验</h3>
          {product.comments.map((comment) => (
            <blockquote key={comment}>{comment}</blockquote>
          ))}
        </section>

        <div className="sheet-actions">
          <button className="secondary-action" type="button" onClick={() => onBook("商品咨询")}>
            <CalendarCheck size={17} />
            预约体验
          </button>
          <button className="primary-action" type="button" onClick={() => onAdd(product)}>
            <ShoppingBag size={17} />
            加入购物车
          </button>
        </div>
      </section>
    </div>
  );
}
