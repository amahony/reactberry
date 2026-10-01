// Emits .d.ts files next to the .js sources in src/ so consumers type-check
// them under strict mode (TypeScript does not infer types for .js files in
// node_modules). Run with "build" before packing and "clean" afterwards.
import { execFileSync } from "node:child_process";
import { readdirSync, rmSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "src");

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });

const jsFiles = walk(src).filter((file) => file.endsWith(".js"));
const declarationFor = (file) => file.replace(/\.js$/u, ".d.ts");

const clean = () => {
  for (const file of jsFiles) rmSync(declarationFor(file), { force: true });
};

const build = () => {
  clean();
  execFileSync(
    join(root, "node_modules", ".bin", "tsc"),
    [
      ...jsFiles.map((file) => relative(root, file)),
      "--allowJs",
      "--declaration",
      "--emitDeclarationOnly",
      "--skipLibCheck",
      "--esModuleInterop",
      "--module", "esnext",
      "--moduleResolution", "bundler",
      "--target", "es2022",
      "--rootDir", "src",
      "--outDir", "src",
    ],
    { cwd: root, stdio: "inherit" },
  );
};

const mode = process.argv[2];
if (mode === "build") build();
else if (mode === "clean") clean();
else {
  console.error("Usage: node scripts/js-types.mjs <build|clean>");
  process.exit(1);
}
