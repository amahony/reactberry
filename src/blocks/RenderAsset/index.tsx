import { ComponentType, createElement } from "react";

interface RenderAssetProps {
  asset: ComponentType<any>;
  assetProps?: Record<string, unknown>;
}

export default function RenderAsset({
  asset,
  assetProps = {},
}: RenderAssetProps) {
  if (!asset) {
    console.warn("RenderAsset: No asset provided");
    return null;
  }

  return createElement(asset, assetProps, null);
}
