import { useState } from "react";
import Taro, { useDidShow } from "@tarojs/taro";
import { Button, Text, View } from "@tarojs/components";
import { cartWithProducts, changeQuantity, getCart, removeFromCart, summarizeCart } from "../../services/cart";

export default function CartPage() {
  const [rows, setRows] = useState(getCart());

  useDidShow(() => {
    setRows(getCart());
  });

  const detailRows = cartWithProducts(rows);
  const summary = summarizeCart(rows, rows.length > 0 ? 120 : 0);

  function updateRows(nextRows) {
    setRows(nextRows);
  }

  function checkout() {
    Taro.showToast({ title: "订单已生成", icon: "success" });
  }

  return (
    <View className="page">
      <View>
        <Text className="eyebrow">购物车</Text>
        <Text className="h1">{rows.length ? "确认商品" : "还没有商品"}</Text>
      </View>

      {detailRows.length === 0 ? (
        <View className="panel">
          <Text className="h2">先挑一床</Text>
          <Text className="muted">到选购页加入商品后会出现在这里。</Text>
        </View>
      ) : (
        <View className="product-list">
          {detailRows.map((row) => (
            <View className="panel cart-row" key={`${row.productId}-${row.spec}`}>
              <View>
                <Text className="product-name">{row.product.name}</Text>
                <Text className="muted">{row.spec}</Text>
                <Text className="price">¥{row.product.price}</Text>
              </View>
              <View className="quantity-row">
                <Button className="quantity-btn" onClick={() => updateRows(changeQuantity(row.productId, row.spec, -1))}>
                  -
                </Button>
                <Text>{row.quantity}</Text>
                <Button className="quantity-btn" onClick={() => updateRows(changeQuantity(row.productId, row.spec, 1))}>
                  +
                </Button>
                <Button className="quantity-btn" onClick={() => updateRows(removeFromCart(row.productId, row.spec))}>
                  ×
                </Button>
              </View>
            </View>
          ))}
          <View className="panel">
            <Text className="muted">会员券 -¥{summary.discount}</Text>
            <Text className="h2">合计 ¥{summary.total}</Text>
            <Button className="primary-btn" onClick={checkout}>
              结算
            </Button>
          </View>
        </View>
      )}
    </View>
  );
}
