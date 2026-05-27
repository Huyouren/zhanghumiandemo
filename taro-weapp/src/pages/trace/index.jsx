import { useState } from "react";
import Taro from "@tarojs/taro";
import { Button, Image, Input, Text, View } from "@tarojs/components";
import { lookupTraceRecord } from "../../services/trace";
import { traceRecord } from "../../services/catalog";

export default function TracePage() {
  const [traceCode, setTraceCode] = useState("");
  const [result, setResult] = useState(null);

  function verify(nextCode = traceCode) {
    setResult(lookupTraceRecord(nextCode));
  }

  function useExampleCode() {
    setTraceCode(traceRecord.code);
    verify(traceRecord.code);
  }

  function scanCode() {
    Taro.scanCode({
      onlyFromCamera: true,
      success(response) {
        setTraceCode(response.result);
        verify(response.result);
      },
      fail() {
        Taro.showToast({ title: "可先使用示例码", icon: "none" });
      }
    });
  }

  return (
    <View className="page">
      <View className="product-card">
        <View className="product-image">
          <Image className="card-image" src={traceRecord.image} mode="aspectFill" />
        </View>
        <View className="product-body">
          <Text className="eyebrow">一被一码</Text>
          <Text className="h2">{traceRecord.code}</Text>
          <Text className="muted">扫码验真，查看原料、批次和手工工序。</Text>
        </View>
      </View>

      <View className="trace-card">
        <View className="section-title">
          <View>
            <Text className="eyebrow">扫码查验</Text>
            <Text className="h2">{traceRecord.batch}</Text>
          </View>
        </View>
        <View className="trace-form">
          <Input
            value={traceCode}
            onInput={(event) => setTraceCode(event.detail.value)}
            placeholder="输入溯源码"
          />
          <Button className="secondary-btn" onClick={() => verify()}>
            查验
          </Button>
        </View>
        <Button className="secondary-btn" onClick={scanCode}>
          扫码
        </Button>
        <Button className="secondary-btn" onClick={useExampleCode}>
          使用示例码
        </Button>
        {result ? (
          <View className={`trace-result ${result.ok ? "" : "error"}`}>
            <Text>{result.ok ? "查验通过，已匹配该床蚕丝被档案" : result.message}</Text>
          </View>
        ) : null}
      </View>

      <View className="grid-2">
        {[
          ["产地", traceRecord.origin],
          ["原料", traceRecord.material],
          ["工坊", traceRecord.artisan],
          ["质检", traceRecord.inspection]
        ].map(([label, value]) => (
          <View className="info-card" key={label}>
            <Text>{label}</Text>
            <Text>{value}</Text>
          </View>
        ))}
      </View>

      <View className="panel">
        <Text className="eyebrow">工艺节点</Text>
        <Text className="h2">看见每一步手作</Text>
        {traceRecord.steps.map(([title, text], index) => (
          <View className="panel" key={title}>
            <Text className="h2">{index + 1}. {title}</Text>
            <Text className="muted">{text}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
