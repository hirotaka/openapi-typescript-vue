# openapi-vue-query

## 0.0.5

### Patch Changes

- [#74](https://github.com/hirotaka/openapi-typescript-vue/pull/74) [`380f3f2`](https://github.com/hirotaka/openapi-typescript-vue/commit/380f3f2e0db92955682a3063253c290894e79dea) Thanks [@hirotaka](https://github.com/hirotaka)! - Fix type errors and improve Vue reactivity support
  - Fix type error in useQuery by making queryKey reactive with computed() (#67)
  - Fix type error in useMutation method wrapper (#68)
  - Fix error type inference with conditional queries using SKIP token (#69)
  - Add partial reactive support (queryKey only) following @orpc/vue-query pattern
  - Remove @ts-expect-error comments and add clear explanations for necessary type assertions
  - Document future type safety improvements in #72

## 0.0.4

### Patch Changes

- [#59](https://github.com/hirotaka/openapi-typescript-vue/pull/59) [`674541b`](https://github.com/hirotaka/openapi-typescript-vue/commit/674541bf1789a015dc8ed077cc7d7c6f8237ca1b) Thanks [@hirotaka](https://github.com/hirotaka)! - Fix TypeScript type compatibility with @tanstack/vue-query updates
  - Fix UseInfiniteQueryOptions type argument count (6 to 5)
  - Add required getNextPageParam and initialPageParam parameters
  - Replace empty object type {} with Record<string, any> for better type safety
  - Remove unused Vue type imports

## 0.0.3

### Patch Changes

- [#12](https://github.com/hirotaka/openapi-typescript-vue/pull/12) [`c957bff`](https://github.com/hirotaka/openapi-typescript-vue/commit/c957bffdb938c3b94212936f55466f706416c09e) Thanks [@hirotaka](https://github.com/hirotaka)! - Fix Vue template TypeScript compatibility for useQuery
  - Update UseQueryMethod return type to include unwrapped data and error properties
  - Enables direct property access in Vue templates (e.g., `{{ data.title }}`, `{{ error.message }}`)
  - Maintains compatibility with Vue Query v5 while providing better TypeScript experience
  - Resolves type errors when using noUncheckedIndexedAccess in strict TypeScript configurations

## 0.0.2

### Patch Changes

- [`5ed71cb`](https://github.com/hirotaka/openapi-typescript-vue/commit/5ed71cbadbe4927175e6d9faaed3748c80548b40) Thanks [@hirotaka](https://github.com/hirotaka)! - Fix repository and homepage URLs in package.json

## 0.0.1

### Patch Changes

- [`338bbf6`](https://github.com/hirotaka/openapi-typescript-vue/commit/338bbf6daeae68649d9e0d7b9e573daccb1dc641) Thanks [@hirotaka](https://github.com/hirotaka)! - Initial release of openapi-vue-query

  Fast, type-safe @tanstack/vue-query client for OpenAPI schemas

## 0.0.1

### Patch Changes

- [#1717](https://github.com/openapi-ts/openapi-typescript/pull/1717) [`335530c`](https://github.com/openapi-ts/openapi-typescript/commit/335530c4f8f966d0154f19504585c462f5f5a409) Thanks [@kerwanp](https://github.com/kerwanp)! - Initial release

- Updated dependencies [[`335530c`](https://github.com/openapi-ts/openapi-typescript/commit/335530c4f8f966d0154f19504585c462f5f5a409), [`335530c`](https://github.com/openapi-ts/openapi-typescript/commit/335530c4f8f966d0154f19504585c462f5f5a409)]:
  - openapi-fetch@0.10.3
  - openapi-typescript-helpers@0.0.10
