import { fileURLToPath } from "node:url";
import { withContentCollections } from "@content-collections/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["reactberry"],
  turbopack: {
    root: fileURLToPath(new URL("..", import.meta.url)),
  },
};

export default withContentCollections(nextConfig);