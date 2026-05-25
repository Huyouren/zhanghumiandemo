import { useState } from "react";
import AppShell from "./components/AppShell";
import AppointmentSheet from "./components/AppointmentSheet";
import CheckoutSheet from "./components/CheckoutSheet";
import ProductDetail from "./components/ProductDetail";
import { products } from "./data/catalog";
import { addToCart, changeQuantity, removeFromCart } from "./lib/cart";
import Cart from "./pages/Cart";
import Category from "./pages/Category";
import Home from "./pages/Home";
import Mine from "./pages/Mine";
import Trace from "./pages/Trace";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [appointmentReason, setAppointmentReason] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [toast, setToast] = useState("");

  function showToast(message) {
    setToast(message);
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => setToast(""), 1800);
  }

  function selectCategory(category) {
    setSelectedCategory(category);
    setActiveTab("category");
  }

  function addProduct(product) {
    setCart((current) => addToCart(current, { productId: product.id, spec: product.specs[0] }));
    setOrderSuccess(false);
    showToast(`${product.name} 已加入购物车`);
  }

  function book(reason) {
    setAppointmentReason(reason);
  }

  const pages = {
    home: (
      <Home
        onSelectCategory={selectCategory}
        onOpenProduct={setSelectedProduct}
        onAddProduct={addProduct}
        onOpenTrace={() => setActiveTab("trace")}
        onBook={book}
      />
    ),
    category: (
      <Category
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onOpenProduct={setSelectedProduct}
        onAddProduct={addProduct}
      />
    ),
    trace: <Trace />,
    cart: (
      <Cart
        cart={cart}
        onChangeQuantity={(productId, spec, delta) => setCart((current) => changeQuantity(current, productId, spec, delta))}
        onRemove={(productId, spec) => setCart((current) => removeFromCart(current, productId, spec))}
        onCheckout={() => setCheckoutOpen(true)}
        orderSuccess={orderSuccess}
        onGoShop={() => setActiveTab("category")}
      />
    ),
    mine: <Mine onBook={book} />
  };

  return (
    <>
      <AppShell activeTab={activeTab} onTabChange={setActiveTab} cart={cart}>
        {pages[activeTab]}
      </AppShell>

      <ProductDetail
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAdd={addProduct}
        onBook={book}
      />

      {appointmentReason ? (
        <AppointmentSheet
          reason={appointmentReason}
          onClose={() => setAppointmentReason(null)}
          onSubmit={() => {
            setAppointmentReason(null);
            showToast("预约已提交，门店顾问将联系你");
          }}
        />
      ) : null}

      {checkoutOpen ? (
        <CheckoutSheet
          cart={cart}
          products={products}
          onClose={() => setCheckoutOpen(false)}
          onSubmit={() => {
            setCheckoutOpen(false);
            setOrderSuccess(true);
            setActiveTab("cart");
            showToast("模拟订单提交成功");
          }}
        />
      ) : null}

      {toast ? <div className="toast">{toast}</div> : null}
    </>
  );
}
