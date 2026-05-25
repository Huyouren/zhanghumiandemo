import { Home, QrCode, ShoppingBag, Store, UserRound } from "lucide-react";
import { summarizeCart } from "../lib/cart";
import { products } from "../data/catalog";

const tabs = [
  { id: "home", label: "首页", icon: Home },
  { id: "category", label: "分类", icon: Store },
  { id: "trace", label: "溯源", icon: QrCode },
  { id: "cart", label: "购物车", icon: ShoppingBag },
  { id: "mine", label: "我的", icon: UserRound }
];

export default function AppShell({ activeTab, onTabChange, cart, children }) {
  const summary = summarizeCart(cart, products, 0);

  return (
    <div className="app-stage">
      <div className="phone-frame">
        <header className="top-bar">
          <div>
            <span>张蝴绵</span>
            <strong>非遗蚕丝生活馆</strong>
          </div>
          <small>昭通 · 手作</small>
        </header>
        <main className="app-content">{children}</main>
        <nav className="bottom-tabs" aria-label="底部导航">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                className={isActive ? "active" : ""}
                type="button"
                onClick={() => onTabChange(tab.id)}
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
    </div>
  );
}
