import { categories, products } from "../data/catalog";
import ProductCard from "../components/ProductCard";

export default function Category({ selectedCategory, onSelectCategory, onOpenProduct, onAddProduct }) {
  const visibleProducts =
    selectedCategory === "all" ? products : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="page">
      <section className="page-heading">
        <span className="eyebrow">商品分类</span>
        <h1>按场景挑选蚕丝被</h1>
        <p>每个商品都连接到工艺、溯源、评价和售后承诺。</p>
      </section>

      <div className="chip-row">
        {categories.map((category) => (
          <button
            key={category.id}
            className={category.id === selectedCategory ? "active" : ""}
            type="button"
            onClick={() => onSelectCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <section className="product-list">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} onOpen={onOpenProduct} onAdd={onAddProduct} />
        ))}
      </section>
    </div>
  );
}
