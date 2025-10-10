---
"openapi-vue-query": patch
---

Fix type errors and improve Vue reactivity support

- Fix type error in useQuery by making queryKey reactive with computed() (#67)
- Fix type error in useMutation method wrapper (#68)
- Fix error type inference with conditional queries using SKIP token (#69)
- Add partial reactive support (queryKey only) following @orpc/vue-query pattern
- Remove @ts-expect-error comments and add clear explanations for necessary type assertions
- Document future type safety improvements in #72
