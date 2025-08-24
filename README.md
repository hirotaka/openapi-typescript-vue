# openapi-typescript-vue

Tools for consuming OpenAPI schemas in TypeScript, with Vue.js support.

This project provides Vue.js-specific packages that complement the [openapi-typescript](https://github.com/openapi-ts/openapi-typescript) ecosystem.

## ⚠️ Important Notice

**This project is currently in development and has known issues with internal TypeScript type errors. While the functionality works as expected, there are unresolved type issues that may cause TypeScript compilation warnings or errors.**

**⚠️ Not recommended for production use at this time.**

### Current Status

- ✅ **Functionality**: All features work correctly at runtime
- ❌ **TypeScript Types**: Internal type errors need to be resolved
- 🔧 **Development**: Suitable for experimentation and development
- 🚫 **Production**: Not recommended until type issues are fixed

### Help Wanted

We're actively seeking contributors to help resolve these TypeScript type issues. If you have experience with complex TypeScript types, especially around:

- Generic type inference
- Conditional types
- Template literal types
- Vue 3 + TanStack Query type integration

**Your contributions would be greatly appreciated!** Please see our [Contributing Guide](./packages/openapi-vue-query/CONTRIBUTING.md) or [open an issue](https://github.com/hirotaka/openapi-typescript-vue/issues) to get started.

## 📦 Packages

<a href="./packages/openapi-typescript"><img src="./docs/public/assets/openapi-vue.svg" alt="openapi-typescript" width="200" height="40" /><br />
Type-safe @tanstack/vue-query client to work with your OpenAPI schema.
</a>

## 🤝 Contributing

Contributions are appreciated and welcome! See the appropriate guide for each package:

- [Contributing to openapi-vue-query](./packages/openapi-vue-query/CONTRIBUTING.md)
- [Contributing to docs](./docs/CONTRIBUTING.md)

## 🔗 Related Projects

This project extends the original [openapi-typescript](https://github.com/openapi-ts/openapi-typescript) ecosystem with Vue.js support. For the latest updates and other framework integrations, please check the original repository.

## ♥️ Thanks

- Thanks to [the Project Sponsors](#-sponsors) for keeping this project going!
- Thanks to [dozens of lovely, smart contributors](https://github.com/openapi-ts/openapi-typescript/graphs/contributors) that made this library possible
- Thanks to [Vitepress](https://vitepress.dev/) for the docs site
- Thanks to [Cloudflare Pages](https://pages.cloudflare.com/) for docs site hosting
- Thanks to [Algolia](https://www.algolia.com/) for the docs site search
