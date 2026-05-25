import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { products } from "../data/catalog";
import { summarizeCart } from "../lib/cart";

export default function Cart({ cart, onChangeQuantity, onRemove, onCheckout, orderSuccess, onGoShop }) {
  const rows = cart.map((row) => ({
    ...row,
    product: products.find((product) => product.id === row.productId)
  }));
  const summary = summarizeCart(cart, products, cart.length > 0 ? 120 : 0);

  return (
    <div className="page">
      <section className="page-heading">
        <span className="eyebrow">购物车</span>
        <h1>确认你的传家之选</h1>
        <p>本 Demo 仅模拟订单，不会发起真实支付。</p>
      </section>

      {orderSuccess ? <div className="success-banner">模拟订单已提交，可在“我的”中继续预约门店体验。</div> : null}

      {rows.length === 0 ? (
        <section className="empty-state">
          <ShoppingBag size={36} />
          <strong>购物车还是空的</strong>
          <span>先去挑选一床适合的蚕丝被。</span>
          <button className="primary-action" type="button" onClick={onGoShop}>
            去选购
          </button>
        </section>
      ) : (
        <>
          <section className="cart-list">
            {rows.map((row) => (
              <article className="cart-row" key={`${row.productId}-${row.spec}`}>
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

          <section className="cart-summary">
            <div>
              <span>商品小计</span>
              <strong>¥{summary.subtotal}</strong>
            </div>
            <div>
              <span>会员礼券</span>
              <strong>-¥{summary.discount}</strong>
            </div>
            <div className="total">
              <span>合计</span>
              <strong>¥{summary.total}</strong>
            </div>
            <button className="primary-action full" type="button" onClick={onCheckout}>
              结算
            </button>
          </section>
        </>
      )}
    </div>
  );
}
