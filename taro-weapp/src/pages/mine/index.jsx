import { Button, Image, Text, View } from "@tarojs/components";
import { memberProfile, store, traceRecord } from "../../services/catalog";

export default function MinePage() {
  return (
    <View className="page">
      <View className="member-card">
        <View>
          <Text className="eyebrow">会员</Text>
          <Text className="h1">{memberProfile.name}</Text>
          <Text>积分 {memberProfile.points}</Text>
        </View>
        <View>
          <Text className="h2">{memberProfile.level}</Text>
        </View>
      </View>

      <View className="service-grid">
        {["门店预约", "养护提醒", "售后咨询", "推荐有礼"].map((item) => (
          <Button className="pill-btn" key={item}>
            {item}
          </Button>
        ))}
      </View>

      <View className="product-card">
        <View className="product-image">
          <Image className="card-image" src={traceRecord.image} mode="aspectFill" />
        </View>
        <View className="product-body">
          <Text className="eyebrow">一被一码</Text>
          <Text className="h2">{traceRecord.code}</Text>
          <Text className="muted">可在底部“溯源”页扫码查验。</Text>
        </View>
      </View>

      <View className="panel">
        <Image className="hero" src={store.image} mode="aspectFill" />
        <Text className="eyebrow">门店</Text>
        <Text className="h2">{store.name}</Text>
        <Text className="muted">{store.hours} · {store.phone}</Text>
      </View>
    </View>
  );
}
