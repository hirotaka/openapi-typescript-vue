---
"openapi-vue-query": patch
---

Fix TypeScript type compatibility with @tanstack/vue-query updates

- Fix UseInfiniteQueryOptions type argument count (6 to 5)
- Add required getNextPageParam and initialPageParam parameters
- Replace empty object type {} with Record<string, any> for better type safety
- Remove unused Vue type imports
