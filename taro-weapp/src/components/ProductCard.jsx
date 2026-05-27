import Taro from "@tarojs/taro";
import { Button, Image, Text, View } from "@tarojs/components";
import { addToCart } from "../services/cart";
import { getDiscount } from "../services/catalog";

export default function ProductCard({ product }) {
  function handleAdd() {
    addToCart(product.id, product.specs[0]);
    Taro.showToast({ title: "已加入购物车", icon: "success" });
  }

  return (
    <View className="product-card">
      <View className="product-image">
        <Image className="card-image" src={product.image} mode="aspectFill" />
      </View>
      <View className="product-body">
        <View>
          <Text className="product-name">{product.name}</Text>
          <View className="tag-row">
            {product.tags.slice(0, 2).map((tag) => (
              <Text className="tag" key={tag}>
                {tag}
              </Text>
            ))}
          </View>
        </View>
        <View className="price-row">
          <View>
            <Text className="price">¥{product.price}</Text>
            <Text className="muted"> 省 ¥{getDiscount(product)}</Text>
          </View>
          <Button className="pill-btn" onClick={handleAdd}>
            加购
          </Button>
        </View>
      </View>
    </View>
  );
}
