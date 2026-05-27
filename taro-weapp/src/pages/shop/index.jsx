import { useMemo, useState } from "react";
import { Button, Input, Text, View } from "@tarojs/components";
import ProductCard from "../../components/ProductCard";
import { categories, filterProducts, sortOptions } from "../../services/catalog";

export default function ShopPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("recommended");

  const visibleProducts = useMemo(() => filterProducts({ query, category, sort }), [query, category, sort]);

  return (
    <View className="page">
      <View>
        <Text className="eyebrow">选购</Text>
        <Text className="h1">按场景筛，少走弯路</Text>
      </View>

      <View className="search-box">
        <Input value={query} onInput={(event) => setQuery(event.detail.value)} placeholder="搜索商品或场景" />
        <Button className="pill-btn">搜索</Button>
      </View>

      <View className="category-strip">
        {categories.map((item) => (
          <Button
            className={`pill-btn ${category === item.id ? "active-chip" : ""}`}
            key={item.id}
            onClick={() => setCategory(item.id)}
          >
            {item.label}
          </Button>
        ))}
      </View>

      <View className="category-strip">
        {sortOptions.map((item) => (
          <Button
            className={`pill-btn ${sort === item.id ? "active-chip" : ""}`}
            key={item.id}
            onClick={() => setSort(item.id)}
          >
            {item.label}
          </Button>
        ))}
      </View>

      <View className="product-list">
        {visibleProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
        {visibleProducts.length === 0 ? (
          <View className="panel">
            <Text className="h2">暂时没找到</Text>
            <Text className="muted">换个关键词试试</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}
