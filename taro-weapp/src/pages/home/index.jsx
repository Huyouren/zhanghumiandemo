import Taro from "@tarojs/taro";
import { Button, Image, Input, Text, View } from "@tarojs/components";
import ProductCard from "../../components/ProductCard";
import { imageUrl, products, quickNeeds } from "../../services/catalog";

export default function HomePage() {
  function goShop() {
    Taro.switchTab({ url: "/pages/shop/index" });
  }

  return (
    <View className="page">
      <View className="hero">
        <Image className="hero-image" src={imageUrl("hero-silk-bedroom.png")} mode="aspectFill" />
        <View className="hero-copy">
          <Text className="eyebrow">昭通手作 · 一被一码</Text>
          <Text className="h1">选一床会呼吸的蚕丝被</Text>
          <Button className="primary-btn" onClick={goShop}>
            立即选购
          </Button>
        </View>
      </View>

      <View className="search-box">
        <Input placeholder="搜婚庆、长辈、四季被" confirmType="search" />
        <Button className="pill-btn" onClick={goShop}>
          搜索
        </Button>
      </View>

      <View className="grid-4">
        {quickNeeds.map((need) => (
          <Button className="pill-btn" key={need.id} onClick={goShop}>
            {need.label}
          </Button>
        ))}
      </View>

      <View className="panel">
        <View className="section-title">
          <View>
            <Text className="eyebrow">今日权益</Text>
            <Text className="h2">满额减 ¥120</Text>
          </View>
          <Text onClick={goShop}>去使用</Text>
        </View>
      </View>

      <View className="section-title">
        <View>
          <Text className="eyebrow">热卖单品</Text>
          <Text className="h2">少说一点，直接看货</Text>
        </View>
        <Text onClick={goShop}>全部</Text>
      </View>

      <View className="product-list">
        {products.slice(0, 3).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </View>
    </View>
  );
}
