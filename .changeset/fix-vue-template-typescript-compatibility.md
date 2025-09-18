---
"openapi-vue-query": patch
---

Fix Vue template TypeScript compatibility for useQuery

- Update UseQueryMethod return type to include unwrapped data and error properties
- Enables direct property access in Vue templates (e.g., `{{ data.title }}`, `{{ error.message }}`)
- Maintains compatibility with Vue Query v5 while providing better TypeScript experience
- Resolves type errors when using noUncheckedIndexedAccess in strict TypeScript configurations