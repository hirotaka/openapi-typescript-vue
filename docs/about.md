---
title: About openapi-typescript-vue
description: Additional info about this project
---

<script setup>
  import { VPTeamMembers } from 'vitepress/theme';
  import Contributors from './.vitepress/theme/Contributors.vue'
  import data from './data/contributors.json';
</script>

# About openapi-typescript-vue

**openapi-typescript-vue** provides Vue.js ecosystem packages that work seamlessly with the [openapi-typescript](https://github.com/openapi-ts/openapi-typescript) project. This project distributes Vue-specific packages that are not available in the original openapi-typescript distribution.

## Vue.js specific packages

This project provides Vue.js-specific packages that complement the openapi-typescript ecosystem:

- **openapi-vue-query**: Type-safe @tanstack/vue-query integration for reactive API calls
- **Vue 3 composables**: Built-in Vue composables for common API patterns
- **Reactive query management**: Full reactivity support for queries, mutations, and infinite queries
- **Vue-optimized examples**: Complete Vue.js examples and documentation

## Using openapi-vue-query in your project?

We'd love to hear from you! If you're using `openapi-vue-query` or other packages from this project in your Vue.js application, please let us know by [opening an issue](https://github.com/hirotaka/openapi-typescript-vue/issues) or submitting a PR to add your project to this list.

### Companies and projects using openapi-vue-query

*Be the first to showcase your project here!*

::: tip Share your usage

Help us showcase the Vue.js ecosystem by sharing how you're using openapi-vue-query:

- **Open Source Projects**: Submit a PR with your project details
- **Companies**: Let us know how openapi-vue-query helps your Vue.js applications
- **Community**: Share your experience and examples

:::

### Related projects using openapi-typescript ecosystem

The broader openapi-typescript ecosystem is used by many notable projects:

- [**Bigcommerce**](https://github.com/bigcommerce/bigcommerce-api-node): Node SDK for the BigCommerce API
- [**Google Firebase CLI**](https://github.com/firebase/firebase-tools): Official CLI for Google's Firebase platform
- [**GitHub Octokit**](https://github.com/octokit): Official SDK for the GitHub API
- [**Netlify**](https://netlify.com): The modern development platform
- [**Nuxt**](https://github.com/unjs/nitro): The Intuitive Vue framework
- [**Supabase**](https://github.com/supabase/supabase): The open source Firebase alternative

*And many more...*

## Project goals

### openapi-vue-query (Vue.js specific)

1. Types should be strict and inferred automatically from OpenAPI schemas with the absolute minimum number of generics needed.
2. Respect the original `@tanstack/vue-query` APIs while reducing boilerplate.
3. Provide full reactivity support for Vue 3 composition API.
4. Be as light and performant as possible.

### openapi-typescript (inherited from original)

1. Support converting any valid OpenAPI schema to TypeScript types, no matter how complicated.
1. Generated types should be statically-analyzable and runtime-free (with minor exceptions like [enums](https://www.typescriptlang.org/docs/handbook/enums.html).
1. Generated types should match your original schema as closely as possible, preserving original capitalization, etc.
1. Typegen only needs Node.js to run (no Java, Python, etc.) and works in any environment.
1. Support fetching OpenAPI schemas from files as well as local and remote servers.

### openapi-fetch (inherited from original)

1. Types should be strict and inferred automatically from OpenAPI schemas with the absolute minimum number of generics needed.
2. Respect the native Fetch API while reducing boilerplate (such as `await res.json()`).
3. Be as light and performant as possible.

### openapi-react-query (inherited from original)

1. Types should be strict and inferred automatically from OpenAPI schemas with the absolute minimum number of generics needed.
2. Respect the original `@tanstack/react-query` APIs while reducing boilerplate.
3. Be as light and performant as possible.

### swr-openapi (inherited from original)

1. Types should be strict and inferred automatically from OpenAPI schemas with the absolute minimum number of generics needed.
2. Respect the original `swr` APIs while reducing boilerplate.
3. Be as light and performant as possible.

## Acknowledgments

This project is made possible by the incredible work of the [openapi-typescript](https://github.com/openapi-ts/openapi-typescript) maintainers and contributors.

### openapi-typescript Project Maintainers

The openapi-typescript project is maintained by these amazing individuals:

<VPTeamMembers size="small" :members="data.maintainers" />

### openapi-typescript Contributors

Thanks to 100+ amazing contributors to the openapi-typescript project, whose work makes this Vue.js ecosystem possible:

<Contributors :contributors="data.contributors" />

### Project Maintainer

This Vue.js ecosystem project is maintained by:
- **Hirotaka Miyagi** ([@hirotaka](https://github.com/hirotaka))
