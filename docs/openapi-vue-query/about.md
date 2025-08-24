---
title: About openapi-vue-query
description: openapi-vue-query Project Goals and contributors
---
<script setup>
  import { VPTeamMembers } from 'vitepress/theme';
  import Contributors from '../.vitepress/theme/Contributors.vue'
  import data from '../data/contributors.json';
</script>

# About

## Project Goals

1. Types should be strict and inferred automatically from OpenAPI schemas with the absolute minimum number of generics needed.
2. Respect the original `@tanstack/vue-query` APIs while reducing boilerplate.
3. Be as light and performant as possible.

## Acknowledgments

This library wouldn't be possible without the amazing work of the [openapi-typescript](https://github.com/openapi-ts/openapi-typescript) project maintainers and contributors.

### openapi-typescript Project Maintainers

<VPTeamMembers size="small" :members="data.maintainers" />

### openapi-typescript Contributors

Thanks to 100+ amazing contributors to the openapi-typescript project:

<Contributors :contributors="data.contributors" />
