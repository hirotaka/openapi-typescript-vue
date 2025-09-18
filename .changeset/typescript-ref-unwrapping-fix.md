---
"openapi-vue-query": patch
---

Fix TypeScript support for Vue template ref unwrapping

- Update UseQueryMethod return type to properly handle Ref types
- Fix example components to use computed() for ref value access
- Add optional chaining for safer property access in templates
- Resolve TypeScript errors with noUncheckedIndexedAccess enabled