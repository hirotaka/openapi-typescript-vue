import { defineConfig } from "vitepress";

export default defineConfig({
  description: "Consume OpenAPI 3.0 & 3.1 schemas in TypeScript",
  themeConfig: {
    sidebar: {
      "/": [
        {
          text: "openapi-vue-query",
          base: "/openapi-vue-query",
          items: [
            { text: "Getting Started", link: "/" },
            { text: "useQuery", link: "/use-query" },
            { text: "useMutation", link: "/use-mutation" },
            { text: "useInfiniteQuery", link: "/use-infinite-query" },
            { text: "queryOptions", link: "/query-options" },
          ],
        },
        { text: "About", link: "/about" },
      ],
    },
    search: {
      provider: "algolia",
      options: {
        appId: "NA92XVKBVS",
        apiKey: "4f3ce9ca7edc3b83c209e6656ab29eb8",
        indexName: "openapi-ts",
      },
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/openapi-ts/openapi-typescript",
      },
    ],
    footer: {
      message:
        'Released under the <a href="https://github.com/openapi-ts/openapi-typescript/blob/main/packages/openapi-typescript/LICENSE">MIT License</a>. Powered by <a href="https://netlify.com">Netlify</a>.',
    },
  },
});
