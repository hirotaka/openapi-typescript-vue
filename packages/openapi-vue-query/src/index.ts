import {
  type QueryClient,
  type QueryKey,
  type UseQueryOptions,
  type UseQueryReturnType,
  type UseInfiniteQueryOptions,
  type UseInfiniteQueryReturnType,
  type UseMutationOptions,
  type UseMutationReturnType,
  useQuery,
  useInfiniteQuery,
  useMutation,
  type InfiniteData,
} from "@tanstack/vue-query";
import type { Client as FetchClient, FetchResponse, FetchOptions, MaybeOptionalInit } from "openapi-fetch";
import type { HttpMethod, PathsWithMethod, MediaType, RequiredKeysOf } from "openapi-typescript-helpers";
import { unref, type MaybeRef, type UnwrapRef } from "vue";

type SelectFn<T> = ((d: T) => any) | undefined;
type Selected<T, TSelect extends SelectFn<T> | undefined> = TSelect extends (d: T) => infer R ? R : T;

type OperationOf<Paths extends {}, Method extends HttpMethod, Path extends PathsWithMethod<Paths, Method>> = [
  Paths[Path],
] extends [infer PathObj]
  ? PathObj extends Record<string, any>
    ? [Method] extends [keyof PathObj]
      ? PathObj[Method] & Record<string | number, any>
      : never
    : never
  : never;

type ReqOpts<Paths extends {}, Method extends HttpMethod, Path extends PathsWithMethod<Paths, Method>> = MaybeRef<
  FetchOptions<OperationOf<Paths, Method, Path>>
>;

type DataOrError<
  Paths extends {},
  Method extends HttpMethod,
  Path extends PathsWithMethod<Paths, Method>,
  Media extends MediaType = MediaType,
> = Required<FetchResponse<OperationOf<Paths, Method, Path>, UnwrapRef<ReqOpts<Paths, Method, Path>>, Media>>;

// shorthand for common omitted keys
type OptOmit = "queryKey" | "queryFn" | "mutationKey" | "mutationFn";

export interface OpenapiQueryClient<Paths extends {}, Media extends MediaType = MediaType> {
  queryOptions: QueryOptionsFunction<Paths, Media>;
  useQuery: UseQueryMethod<Paths, Media>;
  useInfiniteQuery: UseInfiniteQueryMethod<Paths, Media>;
  useMutation: UseMutationMethod<Paths, Media>;
}

export type QueryOptionsFunction<Paths extends {}, Media extends MediaType> = <
  Method extends HttpMethod,
  Path extends PathsWithMethod<Paths, Method>,
  Init extends ReqOpts<Paths, Method, Path>,
  TSelect extends SelectFn<DataOrError<Paths, Method, Path, Media>["data"]> = undefined,
>(
  method: Method,
  path: Path,
  init?: Init,
  options?: Omit<UseQueryOptions<DataOrError<Paths, Method, Path, Media>["data"], DataOrError<Paths, Method, Path, Media>["error"], Selected<DataOrError<Paths, Method, Path, Media>["data"], TSelect>, DataOrError<Paths, Method, Path, Media>["data"], QueryKey>, OptOmit> & {
    select?: TSelect;
  },
) => UseQueryOptions<DataOrError<Paths, Method, Path, Media>["data"], DataOrError<Paths, Method, Path, Media>["error"], Selected<DataOrError<Paths, Method, Path, Media>["data"], TSelect>, DataOrError<Paths, Method, Path, Media>["data"], QueryKey>;

export type UseQueryMethod<Paths extends {}, Media extends MediaType> = <
  Method extends HttpMethod,
  Path extends PathsWithMethod<Paths, Method>,
  Init extends ReqOpts<Paths, Method, Path>,
  TSelect extends SelectFn<DataOrError<Paths, Method, Path, Media>["data"]> = undefined,
>(
  method: Method,
  path: Path,
  init?: Init,
  options?: Omit<UseQueryOptions<DataOrError<Paths, Method, Path, Media>["data"], DataOrError<Paths, Method, Path, Media>["error"], Selected<DataOrError<Paths, Method, Path, Media>["data"], TSelect>, QueryKey>, OptOmit> & {
    select?: TSelect;
  },
) => UseQueryReturnType<Selected<DataOrError<Paths, Method, Path, Media>["data"], TSelect>, DataOrError<Paths, Method, Path, Media>["error"]>;

export type UseInfiniteQueryMethod<Paths extends {}, Media extends MediaType> = <
  Method extends HttpMethod,
  Path extends PathsWithMethod<Paths, Method>,
  Init extends ReqOpts<Paths, Method, Path>,
>(
  method: Method,
  path: Path,
  init: Init,
  options:
    | (Omit<UseInfiniteQueryOptions<DataOrError<Paths, Method, Path, Media>["data"], DataOrError<Paths, Method, Path, Media>["error"], InfiniteData<DataOrError<Paths, Method, Path, Media>["data"]>, QueryKey, unknown>, OptOmit> & {
        pageParamName?: string;
      })
    | undefined,
) => UseInfiniteQueryReturnType<InfiniteData<DataOrError<Paths, Method, Path, Media>["data"]>, DataOrError<Paths, Method, Path, Media>["error"]>;

export type UseMutationMethod<Paths extends {}, Media extends MediaType> = <
  Method extends HttpMethod,
  Path extends PathsWithMethod<Paths, Method>,
  Init extends ReqOpts<Paths, Method, Path>,
>(
  method: Method,
  path: Path,
  options?: Omit<UseMutationOptions<DataOrError<Paths, Method, Path, Media>["data"], DataOrError<Paths, Method, Path, Media>["error"], Init>, OptOmit>,
) => UseMutationReturnType<DataOrError<Paths, Method, Path, Media>["data"], DataOrError<Paths, Method, Path, Media>["error"], Init, unknown>;

export function getApiQueryKey<
  Paths extends {},
  Method extends HttpMethod,
  Path extends PathsWithMethod<Paths, Method>,
>(method: Method, path: Path, init?: ReqOpts<Paths, Method, Path>): QueryKey {
  return [method, path, init].filter(Boolean) as unknown as QueryKey;
}

export default function createClient<P extends {}, Media extends MediaType = MediaType>(
  client: unknown,
  queryClient?: QueryClient,
): OpenapiQueryClient<P, Media> {
  const typedClient = client as FetchClient<P, Media>;
  type MethodOnPath<P extends {}, M extends HttpMethod, Pa extends PathsWithMethod<P, M>> = Extract<M, keyof P[Pa]>;
  async function call<Method extends HttpMethod, Path extends PathsWithMethod<P, Method>>(
    method: Method,
    path: Path,
    req?: UnwrapRef<ReqOpts<P, Method, Path>>,
  ) {
    type MOn = MethodOnPath<P, Method, Path>;
    const init = unref(req) as MaybeOptionalInit<P[Path], MOn>;
    const res = await typedClient.request(method as MOn, path as any, init as any);
    return res.data as DataOrError<P, Method, Path>["data"];
  }

  const queryOptions: QueryOptionsFunction<P, Media> = (method, path, init, options) => {
    const queryKey = getApiQueryKey<P, typeof method, typeof path>(method, path, init);
    return {
      ...(options as any),
      queryKey,
      queryFn: () => call(method, path, unref(init)),
    } 
  };

  const useQueryImpl: UseQueryMethod<P, Media> = (method, path, init, options) => {
    const opts = queryOptions(method, path, init, options);
    return useQuery(opts, queryClient);
  };

  const useInfiniteQueryImpl: UseInfiniteQueryMethod<P, Media> = (method, path, init, options) => {
    const { pageParamName = "cursor", ...rest } = (options ?? {}) as { pageParamName?: string };
    const { queryKey } = unref(queryOptions(method, path, init, undefined));

    return useInfiniteQuery(
      {
        queryKey,
        queryFn: async ({ pageParam = undefined, signal }) => {
          const base = (unref(init) || {}) as any;
          const mergedInit = {
            ...base,
            signal,
            params: {
              ...(base.params || {}),
              query: {
                ...((base.params as { query?: object })?.query || {}),
                [pageParamName]: pageParam,
              },
            },
          } as UnwrapRef<ReqOpts<P, typeof method, typeof path>>;
          return await call(method, path, mergedInit);
        },
        initialPageParam: undefined,
        ...(rest as any),
      },
      queryClient,
    );
  };

  const useMutationImpl: UseMutationMethod<P, Media> = (method, path, options) => {
    return useMutation(
      {
        mutationKey: [method, path],
        mutationFn: async (inputInit: ReqOpts<P, typeof method, typeof path>) => call(method, path, inputInit as any),
        ...(options as any),
      },
      queryClient,
    ) as any;
  };

  return {
    queryOptions,
    useQuery: useQueryImpl,
    useInfiniteQuery: useInfiniteQueryImpl,
    useMutation: useMutationImpl,
  };
}
