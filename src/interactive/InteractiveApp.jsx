import {
  CalendarCheck,
  Check,
  ChevronRight,
  Heart,
  Home,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Star,
  Store,
  Trash2,
  UserRound,
  X
} from "lucide-react";
import { useMemo, useState } from "react";
import ImagePanel from "../components/ImagePanel";
import { categories, memberProfile, products, stores, traceRecords } from "../data/catalog";
import { addToCart, changeQuantity, removeFromCart, summarizeCart } from "../lib/cart";
import { filterInteractiveProducts, getProductDiscount, quickNeeds, sortOptions } from "./interactiveCatalog";

const tabs = [
  { id: "home", label: "首页", icon: Home },
  { id: "shop", label: "选购", icon: Store },
  { id: "cart", label: "购物车", icon: ShoppingBag },
  { id: "mine", label: "我的", icon: UserRound }
];

export default function InteractiveApp() {
  const [activeTab, setActiveTab] = useState("home");
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("recommended");
  const [cart, setCart] = useState([]);
  const [detailProduct, setDetailProduct] = useState(null);
  const [selectedSpec, setSelectedSpec] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [toast, setToast] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [couponUsed, setCouponUsed] = useState(true);
  const [likedTrace, setLikedTrace] = useState(false);

  const visibleProducts = useMemo(
    () => filterInteractiveProducts(products, { category, query, sort }),
    [category, query, sort]
  );
  const summary = summarizeCart(cart, products, couponUsed && cart.length > 0 ? 120 : 0);

  function showMessage(message) {
    setToast(message);
    window.clearTimeout(showMessage.timer);
    showMessage.timer = window.setTimeout(() => setToast(""), 1500);
  }

  function openProduct(product) {
    setDetailProduct(product);
    setSelectedSpec(product.specs[0]);
  }

  function addProduct(product, spec = product.specs[0]) {
    setCart((current) => addToCart(current, { productId: product.id, spec }));
    showMessage("已加入购物车");
  }

  function toggleFavorite(productId) {
    setFavorites((current) =>
      current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId]
    );
    showMessage(favorites.includes(productId) ? "已取消收藏" : "已收藏");
  }

  function jumpToShop(nextCategory = "all") {
    setCategory(nextCategory);
    setActiveTab("shop");
  }

  const page = {
    home: (
      <InteractiveHome
        query={query}
        onQueryChange={setQuery}
        onSearch={() => jumpToShop(category)}
        onNeedSelect={(nextCategory) => jumpToShop(nextCategory)}
        onOpenProduct={openProduct}
        onAddProduct={addProduct}
        onGoShop={jumpToShop}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />
    ),
    shop: (
      <InteractiveShop
        query={query}
        category={category}
        sort={sort}
        products={visibleProducts}
        onQueryChange={setQuery}
        onCategoryChange={setCategory}
        onSortChange={setSort}
        onOpenProduct={openProduct}
        onAddProduct={addProduct}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />
    ),
    cart: (
      <InteractiveCart
        cart={cart}
        couponUsed={couponUsed}
        onToggleCoupon={() => setCouponUsed((current) => !current)}
        onChangeQuantity={(productId, spec, delta) =>
          setCart((current) => changeQuantity(current, productId, spec, delta))
        }
        onRemove={(productId, spec) => setCart((current) => removeFromCart(current, productId, spec))}
        onCheckout={() => {
          setToast("");
          setShowCheckout(true);
        }}
        onGoShop={() => jumpToShop("all")}
      />
    ),
    mine: (
      <InteractiveMine
        favoriteCount={favorites.length}
        likedTrace={likedTrace}
        onToggleTrace={() => setLikedTrace((current) => !current)}
      />
    )
  };

  return (
    <div className="app-stage interactive-stage">
      <div className="phone-frame interactive-phone">
        <header className="interactive-top">
          <div>
            <span>张蝴绵</span>
            <strong>非遗蚕丝生活馆</strong>
          </div>
          <button type="button" onClick={() => jumpToShop("all")}>
            去选购
          </button>
        </header>

        <main className="app-content interactive-content">{page[activeTab]}</main>

        {cart.length > 0 && activeTab !== "cart" && !showCheckout && !detailProduct ? (
          <button className="floating-cart" type="button" onClick={() => setActiveTab("cart")}>
            <ShoppingBag size={17} />
            {summary.itemCount} 件 · ¥{summary.total}
          </button>
        ) : null}

        <nav className="bottom-tabs interactive-tabs" aria-label="互动版底部导航">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={tab.id === activeTab ? "active" : ""}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                title={tab.label}
              >
                <span className="tab-icon-wrap">
                  <Icon size={20} />
                  {tab.id === "cart" && summary.itemCount > 0 ? <i>{summary.itemCount}</i> : null}
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {detailProduct ? (
        <InteractiveProductSheet
          product={detailProduct}
          selectedSpec={selectedSpec}
          favorite={favorites.includes(detailProduct.id)}
          onSpecChange={setSelectedSpec}
          onClose={() => setDetailProduct(null)}
          onToggleFavorite={() => toggleFavorite(detailProduct.id)}
          onAdd={() => addProduct(detailProduct, selectedSpec)}
          onBuy={() => {
            addProduct(detailProduct, selectedSpec);
            setDetailProduct(null);
            setActiveTab("cart");
          }}
        />
      ) : null}

      {showCheckout ? (
        <InteractiveCheckout summary={summary} onClose={() => setShowCheckout(false)} onSubmit={() => {
          setShowCheckout(false);
          showMessage("订单已生成");
        }} />
      ) : null}

      {toast ? <div className="toast interactive-toast">{toast}</div> : null}
    </div>
  );
}

function InteractiveHome({
  query,
  onQueryChange,
  onSearch,
  onNeedSelect,
  onOpenProduct,
  onAddProduct,
  onGoShop,
  favorites,
  onToggleFavorite
}) {
  return (
    <div className="interactive-page">
      <section className="interactive-hero">
        <ImagePanel imageKey="hero-silk-bedroom" imageFile="/assets/hero-silk-bedroom.png" className="interactive-hero-image" />
        <div className="interactive-hero-copy">
          <span>昭通手作 · 一被一码</span>
          <h1>选一床会呼吸的蚕丝被</h1>
          <button type="button" onClick={() => onGoShop("all")}>
            立即选购
            <ChevronRight size={17} />
          </button>
        </div>
      </section>

      <SearchBar value={query} onChange={onQueryChange} onSubmit={onSearch} placeholder="搜婚庆、长辈、四季被" />

      <section className="quick-need-grid">
        {quickNeeds.map((need) => (
          <button key={need.id} type="button" onClick={() => onNeedSelect(need.category)}>
            <Sparkles size={17} />
            <span>{need.label}</span>
          </button>
        ))}
      </section>

      <section className="flash-card">
        <div>
          <span>今日权益</span>
          <strong>满额减 ¥120</strong>
        </div>
        <button type="button" onClick={() => onGoShop("all")}>去使用</button>
      </section>

      <SectionTitle eyebrow="热卖单品" title="少说一点，直接看货" action="全部" onAction={() => onGoShop("all")} />
      <div className="interactive-product-row">
        {products.slice(0, 3).map((product) => (
          <InteractiveProductCard
            key={product.id}
            product={product}
            favorite={favorites.includes(product.id)}
            onOpen={onOpenProduct}
            onAdd={onAddProduct}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}

function InteractiveShop({
  query,
  category,
  sort,
  products,
  onQueryChange,
  onCategoryChange,
  onSortChange,
  onOpenProduct,
  onAddProduct,
  favorites,
  onToggleFavorite
}) {
  return (
    <div className="interactive-page">
      <section className="compact-heading">
        <span>选购</span>
        <h1>按场景筛，少走弯路</h1>
      </section>

      <SearchBar value={query} onChange={onQueryChange} placeholder="搜索商品或场景" />

      <div className="category-strip">
        {categories.map((item) => (
          <button
            key={item.id}
            className={item.id === category ? "active" : ""}
            type="button"
            onClick={() => onCategoryChange(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="sort-strip">
        <SlidersHorizontal size={17} />
        {sortOptions.map((item) => (
          <button
            key={item.id}
            className={item.id === sort ? "active" : ""}
            type="button"
            onClick={() => onSortChange(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <section className="interactive-list">
        {products.length > 0 ? (
          products.map((product) => (
            <InteractiveProductCard
              key={product.id}
              product={product}
              favorite={favorites.includes(product.id)}
              onOpen={onOpenProduct}
              onAdd={onAddProduct}
              onToggleFavorite={onToggleFavorite}
            />
          ))
        ) : (
          <div className="mini-empty">
            <strong>暂时没找到</strong>
            <span>换个关键词试试</span>
          </div>
        )}
      </section>
    </div>
  );
}

function InteractiveProductCard({ product, favorite, onOpen, onAdd, onToggleFavorite }) {
  return (
    <article className="interactive-product-card">
      <button className="product-image-action" type="button" onClick={() => onOpen(product)}>
        <ImagePanel imageKey={product.imageKey} imageFile={product.imageFile} />
      </button>
      <div className="interactive-product-info">
        <button className="interactive-title" type="button" onClick={() => onOpen(product)}>
          {product.name}
        </button>
        <div className="micro-tags">
          {product.tags.slice(0, 2).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="interactive-card-foot">
          <div>
            <strong>¥{product.price}</strong>
            <small>省 ¥{getProductDiscount(product)}</small>
          </div>
          <div className="quick-actions">
            <button type="button" onClick={() => onToggleFavorite(product.id)} title={favorite ? "取消收藏" : "收藏"}>
              <Heart size={16} fill={favorite ? "currentColor" : "none"} />
            </button>
            <button type="button" onClick={() => onAdd(product)} title="加入购物车">
              <Plus size={17} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function InteractiveCart({ cart, couponUsed, onToggleCoupon, onChangeQuantity, onRemove, onCheckout, onGoShop }) {
  const rows = cart.map((row) => ({
    ...row,
    product: products.find((product) => product.id === row.productId)
  }));
  const summary = summarizeCart(cart, products, couponUsed && cart.length > 0 ? 120 : 0);

  return (
    <div className="interactive-page">
      <section className="compact-heading">
        <span>购物车</span>
        <h1>{rows.length ? "确认商品" : "还没有商品"}</h1>
      </section>

      {rows.length === 0 ? (
        <div className="mini-empty tall">
          <ShoppingBag size={34} />
          <strong>先挑一床</strong>
          <button className="primary-action" type="button" onClick={onGoShop}>去选购</button>
        </div>
      ) : (
        <>
          <section className="interactive-cart-list">
            {rows.map((row) => (
              <article className="interactive-cart-row" key={`${row.productId}-${row.spec}`}>
                <div>
                  <strong>{row.product.name}</strong>
                  <span>{row.spec}</span>
                  <em>¥{row.product.price}</em>
                </div>
                <div className="quantity-control">
                  <button type="button" onClick={() => onChangeQuantity(row.productId, row.spec, -1)} title="减少">
                    <Minus size={15} />
                  </button>
                  <b>{row.quantity}</b>
                  <button type="button" onClick={() => onChangeQuantity(row.productId, row.spec, 1)} title="增加">
                    <Plus size={15} />
                  </button>
                  <button className="remove" type="button" onClick={() => onRemove(row.productId, row.spec)} title="删除">
                    <Trash2 size={15} />
                  </button>
                </div>
              </article>
            ))}
          </section>

          <button className={`coupon-card ${couponUsed ? "active" : ""}`} type="button" onClick={onToggleCoupon}>
            <span>会员券 ¥120</span>
            <strong>{couponUsed ? "已使用" : "点击使用"}</strong>
          </button>

          <section className="sticky-summary">
            <div>
              <span>合计</span>
              <strong>¥{summary.total}</strong>
            </div>
            <button className="primary-action" type="button" onClick={onCheckout}>结算</button>
          </section>
        </>
      )}
    </div>
  );
}

function InteractiveMine({ favoriteCount, likedTrace, onToggleTrace }) {
  return (
    <div className="interactive-page">
      <section className="member-card interactive-member">
        <div>
          <span className="eyebrow">会员</span>
          <h1>{memberProfile.name}</h1>
          <p>积分 {memberProfile.points}</p>
        </div>
        <div className="member-points">
          <strong>{favoriteCount}</strong>
          <span>收藏</span>
        </div>
      </section>

      <section className="mini-service-grid">
        {["门店预约", "养护提醒", "售后咨询", "推荐有礼"].map((item) => (
          <button type="button" key={item}>
            <Sparkles size={17} />
            <span>{item}</span>
          </button>
        ))}
      </section>

      <section className="trace-mini-card">
        <ImagePanel imageKey="trace-code-card" imageFile="/assets/trace-code-card.png" className="trace-mini-image" />
        <div>
          <span>一被一码</span>
          <strong>{traceRecords[0].code}</strong>
          <button type="button" onClick={onToggleTrace}>
            {likedTrace ? <Check size={16} /> : <Star size={16} />}
            {likedTrace ? "已关注" : "关注溯源"}
          </button>
        </div>
      </section>

      <section className="store-info interactive-store">
        <ImagePanel imageKey="store-experience" imageFile="/assets/store-experience.png" className="store-image" />
        <span className="eyebrow">门店</span>
        <h2>{stores[0].name}</h2>
        <p>{stores[0].hours} · {stores[0].phone}</p>
      </section>
    </div>
  );
}

function InteractiveProductSheet({
  product,
  selectedSpec,
  favorite,
  onSpecChange,
  onClose,
  onToggleFavorite,
  onAdd,
  onBuy
}) {
  return (
    <div className="sheet-backdrop" role="dialog" aria-modal="true" aria-label={`${product.name}互动详情`}>
      <section className="bottom-sheet interactive-sheet">
        <div className="sheet-header">
          <div>
            <span className="eyebrow">{product.categoryName}</span>
            <h2>{product.name}</h2>
          </div>
          <button className="icon-button ghost" type="button" onClick={onClose} title="关闭">
            <X size={18} />
          </button>
        </div>

        <ImagePanel imageKey={product.imageKey} imageFile={product.imageFile} className="detail-image interactive-detail-image" />

        <div className="interactive-price">
          <strong>¥{product.price}</strong>
          <del>¥{product.originalPrice}</del>
          <span>省 ¥{getProductDiscount(product)}</span>
        </div>

        <section className="short-proof-grid">
          {["可溯源", "门店体验", "养护服务"].map((item) => (
            <span key={item}>
              <Check size={14} />
              {item}
            </span>
          ))}
        </section>

        <section className="spec-picker">
          <h3>规格</h3>
          <div>
            {product.specs.map((spec) => (
              <button
                key={spec}
                className={spec === selectedSpec ? "active" : ""}
                type="button"
                onClick={() => onSpecChange(spec)}
              >
                {spec}
              </button>
            ))}
          </div>
        </section>

        <section className="review-strip">
          <Star size={16} fill="currentColor" />
          <strong>4.9</strong>
          <span>手感轻、送礼体面、可到店看丝</span>
        </section>

        <div className="sheet-actions interactive-actions">
          <button className="secondary-action" type="button" onClick={onToggleFavorite}>
            <Heart size={17} fill={favorite ? "currentColor" : "none"} />
            {favorite ? "已收藏" : "收藏"}
          </button>
          <button className="secondary-action" type="button" onClick={onAdd}>
            <ShoppingBag size={17} />
            加购
          </button>
          <button className="primary-action" type="button" onClick={onBuy}>
            立即买
          </button>
        </div>
      </section>
    </div>
  );
}

function InteractiveCheckout({ summary, onClose, onSubmit }) {
  return (
    <div className="sheet-backdrop" role="dialog" aria-modal="true" aria-label="互动版结算">
      <section className="bottom-sheet interactive-sheet">
        <div className="sheet-header">
          <div>
            <span className="eyebrow">确认订单</span>
            <h2>模拟结算</h2>
          </div>
          <button className="icon-button ghost" type="button" onClick={onClose} title="关闭">
            <X size={18} />
          </button>
        </div>
        <div className="summary-list">
          <div>
            <span>商品</span>
            <strong>{summary.itemCount} 件</strong>
          </div>
          <div>
            <span>优惠</span>
            <strong>-¥{summary.discount}</strong>
          </div>
          <div className="total">
            <span>合计</span>
            <strong>¥{summary.total}</strong>
          </div>
        </div>
        <button className="primary-action full" type="button" onClick={onSubmit}>
          生成订单
        </button>
      </section>
    </div>
  );
}

function SearchBar({ value, onChange, onSubmit, placeholder }) {
  function submit(event) {
    event.preventDefault();
    onSubmit?.();
  }

  return (
    <form className="interactive-search" onSubmit={submit}>
      <Search size={18} />
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
      <button type="submit">搜索</button>
    </form>
  );
}

function SectionTitle({ eyebrow, title, action, onAction }) {
  return (
    <div className="interactive-section-title">
      <div>
        <span>{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      <button type="button" onClick={onAction}>{action}</button>
    </div>
  );
}
