import { useState } from "react";
import { imagePrompts } from "../data/catalog";
import { assetPath } from "../lib/assetPath";

const labels = {
  "hero-silk-bedroom": "蚕丝生活方式",
  "product-golden-silk": "黄金丝产品",
  "product-mulberry-classic": "桑蚕丝四季被",
  "product-parent-child": "子母调温被",
  "gift-set-scene": "礼赠套装",
  "craft-hands-silk": "手作工艺",
  "store-experience": "门店体验",
  "trace-code-card": "溯源证明"
};

export default function ImagePanel({ imageKey, imageFile, className = "" }) {
  const [loaded, setLoaded] = useState(false);
  const prompt = imagePrompts.find((item) => item.file.endsWith(`${imageKey}.png`));
  const resolvedImageFile = assetPath(imageFile);

  return (
    <div
      className={`image-panel image-panel-${imageKey} ${loaded ? "is-loaded" : ""} ${className}`}
      data-asset={resolvedImageFile}
      title={prompt?.prompt}
    >
      <img
        className={loaded ? "loaded" : ""}
        src={resolvedImageFile}
        alt=""
        aria-hidden="true"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(false)}
      />
      <div className="image-fallback">
        <span>{labels[imageKey] ?? "张蝴绵"}</span>
      </div>
    </div>
  );
}
