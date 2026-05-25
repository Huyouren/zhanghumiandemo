import { Plus } from "lucide-react";
import ImagePanel from "./ImagePanel";

export default function ProductCard({ product, onOpen, onAdd }) {
  return (
    <article className="product-card">
      <button className="product-media-button" type="button" onClick={() => onOpen(product)}>
        <ImagePanel imageKey={product.imageKey} imageFile={product.imageFile} />
      </button>
      <div className="product-card-body">
        <button className="link-title" type="button" onClick={() => onOpen(product)}>
          {product.name}
        </button>
        <p>{product.value}</p>
        <div className="tag-row">
          {product.tags.slice(0, 2).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="product-card-foot">
          <div>
            <span className="price-label">到手价</span>
            <strong>¥{product.price}</strong>
            <del>¥{product.originalPrice}</del>
          </div>
          <button className="icon-button accent" type="button" onClick={() => onAdd(product)} title="加入购物车">
            <Plus size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}
