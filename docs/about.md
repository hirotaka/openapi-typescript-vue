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

## Project goals

### openapi-vue-query (Vue.js specific)

1. Types should be strict and inferred automatically from OpenAPI schemas with the absolute minimum number of generics needed.
2. Respect the original `@tanstack/vue-query` APIs while reducing boilerplate.
3. Provide full reactivity support for Vue 3 composition API.
4. Be as light and performant as possible.

## Acknowledgments

This project is made possible by the incredible work of the [openapi-typescript](https://github.com/openapi-ts/openapi-typescript) maintainers and contributors.

### openapi-typescript-vue Project Maintainers

The openapi-typescript-vue project is maintained by these amazing individuals:

<VPTeamMembers size="small" :members="data.maintainers" />

### openapi-typescript-vue Contributors

This project is just getting started! We'd love to have you as our first contributor. Whether it's fixing bugs, adding features, improving documentation, or sharing feedback - all contributions are welcome!

<Contributors :contributors="data.contributors" />
