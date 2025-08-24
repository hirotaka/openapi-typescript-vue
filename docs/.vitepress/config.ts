import { defineConfig } from "vitepress";
import en from "./en";
import shared from "./shared";
import { transformerTwoslash } from "@shikijs/vitepress-twoslash";
import { ModuleResolutionKind } from "typescript";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ...shared,
  locales: {
    root: { label: "English", ...en },
  },
  markdown: {
    codeTransformers: [
      transformerTwoslash({
        twoslashOptions: {
          compilerOptions: {
            experimentalDecorators: true,
            moduleResolution: ModuleResolutionKind.Bundler,
          },
        },
      }),
    ],
  },
});
