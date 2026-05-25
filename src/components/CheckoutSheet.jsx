import { CheckCircle2, X } from "lucide-react";
import { summarizeCart } from "../lib/cart";

export default function CheckoutSheet({ cart, products, onClose, onSubmit }) {
  const summary = summarizeCart(cart, products, cart.length > 0 ? 120 : 0);

  return (
    <div className="sheet-backdrop" role="dialog" aria-modal="true" aria-label="确认订单">
      <section className="bottom-sheet">
        <div className="sheet-header">
          <div>
            <span className="eyebrow">模拟结算</span>
            <h2>确认订单</h2>
          </div>
          <button className="icon-button ghost" type="button" onClick={onClose} title="关闭">
            <X size={18} />
          </button>
        </div>

        <div className="summary-list">
          <div>
            <span>商品件数</span>
            <strong>{summary.itemCount} 件</strong>
          </div>
          <div>
            <span>商品小计</span>
            <strong>¥{summary.subtotal}</strong>
          </div>
          <div>
            <span>会员礼券</span>
            <strong>-¥{summary.discount}</strong>
          </div>
          <div className="total">
            <span>应付合计</span>
            <strong>¥{summary.total}</strong>
          </div>
        </div>

        <div className="checkout-note">
          <CheckCircle2 size={18} />
          <span>下单后可选择门店自提、养护咨询或预约体验。</span>
        </div>

        <button className="primary-action full" type="button" onClick={onSubmit} disabled={cart.length === 0}>
          提交模拟订单
        </button>
      </section>
    </div>
  );
}
