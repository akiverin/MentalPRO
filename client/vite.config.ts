import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import tsconfig from "./tsconfig.json";

const parseTsConfigPaths = (
  paths: Record<string, string[]>,
  basePath: string,
): Record<string, string> => {
  const aliases: Record<string, string> = {};

  for (const key in paths) {
    const normalizedKey = key.replace("/*", "").replace("*", "");
    const [target] = paths[key];
    const normalizedTarget = target.replace("/*", "").replace("*", "");

    aliases[normalizedKey] = path.resolve(basePath, normalizedTarget);
  }

  return aliases;
};

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
    alias: parseTsConfigPaths(
      tsconfig.compilerOptions.paths,
      path.resolve(__dirname, "."),
    ),
  },
});
