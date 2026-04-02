import { webcrypto } from "node:crypto";
import { fileURLToPath } from "node:url";

if (!globalThis.crypto) {
  globalThis.crypto = webcrypto;
}

const { createBuilder } = await import("@content-collections/core");
const configPath = fileURLToPath(new URL("../content-collections.ts", import.meta.url));

const builder = await createBuilder(configPath);
await builder.build();
