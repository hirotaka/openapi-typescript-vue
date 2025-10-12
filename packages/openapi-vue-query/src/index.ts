import {
  type InfiniteData,
  type QueryClient,
  type QueryFunctionContext,
  type SkipToken,
  type UseInfiniteQueryOptions,
  type UseInfiniteQueryReturnType,
  type UseMutationOptions,
  type UseMutationReturnType,
  type UseQueryOptions,
  type UseQueryReturnType,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from "@tanstack/vue-query";
import type {
  ClientMethod,
  DefaultParamsOption,
  Client as FetchClient,
  FetchResponse,
  MaybeOptionalInit,
} from "openapi-fetch";
import type { HttpMethod, MediaType, PathsWithMethod, RequiredKeysOf } from "openapi-typescript-helpers";
import type {DeepUnwrapRef, MaybeRefDeep} from "@tanstack/vue-query/types"
import { computed, type ComputedRef, type Ref, type UnwrapRef } from "vue";

// Helper type to dynamically infer the type from the `select` property
type InferSelectReturnType<TData, TSelect> = TSelect extends (data: TData) => infer R ? R : TData;

type InitWithUnknowns<Init> = Init & { [key: string]: unknown };

export type QueryKey<
  Paths extends Record<string, Record<HttpMethod, Record<string, any>>>,
  Method extends HttpMethod,
  Path extends PathsWithMethod<Paths, Method>,
  Init = MaybeOptionalInit<Paths[Path], Method>,
> = Init extends undefined ? readonly [Method, Path] : readonly [Method, Path, Init];

export type QueryOptionsFunction<
  Paths extends Record<string, Record<HttpMethod, Record<string, any>>>,
  Media extends MediaType,
> = <
  Method extends HttpMethod,
  Path extends PathsWithMethod<Paths, Method>,
  Init extends MaybeOptionalInit<Paths[Path], Method>,
  Response extends Required<FetchResponse<Paths[Path][Method], Init, Media>>, // note: Required is used to avoid repeating NonNullable in UseQuery types
  Options extends Omit<
    DeepUnwrapRef<
      UseQueryOptions<
        Response["data"],
        Response["error"],
        InferSelectReturnType<Response["data"], Options["select"]>,
        Response["data"],
        QueryKey<Paths, Method, Path>
      >
    >,
    "queryKey" | "queryFn"
  >,
>(
  method: Method,
  path: Path,
  ...[init, options]: RequiredKeysOf<Init> extends never
    ? [InitWithUnknowns<Init>?, Options?]
    : [InitWithUnknowns<Init>, Options?]
) => NoInfer<
  Omit<
    DeepUnwrapRef<
      UseQueryOptions<
        Response["data"],
        Response["error"],
        InferSelectReturnType<Response["data"], Options["select"]>,
        Response["data"],
        QueryKey<Paths, Method, Path>
      >
    >,
    "queryKey" | "queryFn"
  > & {
    queryKey: ComputedRef<QueryKey<Paths, Method, Path>>;
  } & {
    queryFn: Exclude<
      DeepUnwrapRef<
        UseQueryOptions<
          Response["data"],
          Response["error"],
          InferSelectReturnType<Response["data"], Options["select"]>,
          Response["data"],
          QueryKey<Paths, Method, Path>
        >
      >["queryFn"],
      SkipToken | undefined
    >;
  }
>;

export type UseQueryMethod<
  Paths extends Record<string, Record<HttpMethod, Record<string, any>>>,
  Media extends MediaType,
> = <
  Method extends HttpMethod,
  Path extends PathsWithMethod<Paths, Method>,
  Init extends MaybeOptionalInit<Paths[Path], Method>,
  Response extends Required<FetchResponse<Paths[Path][Method], Init, Media>>, // note: Required is used to avoid repeating NonNullable in UseQuery types
  Options extends Omit<
    DeepUnwrapRef<
      UseQueryOptions<
        Response["data"],
        Response["error"],
        InferSelectReturnType<Response["data"], Options["select"]>,
        Response["data"],
        QueryKey<Paths, Method, Path>
      >
    >,
    "queryKey" | "queryFn"
  >,
>(
  method: Method,
  url: Path,
  ...[init, options, queryClient]: RequiredKeysOf<Init> extends never
    ? [InitWithUnknowns<Init>?, Options?, QueryClient?]
    : [InitWithUnknowns<Init>, Options?, QueryClient?]
) => UseQueryReturnType<InferSelectReturnType<Response["data"], Options["select"]>, Response["error"]> & {
  data: InferSelectReturnType<Response["data"], Options["select"]> | undefined;
  error: Response["error"] | null;
};

export type UseInfiniteQueryMethod<
  Paths extends Record<string, Record<HttpMethod, Record<string, any>>>,
  Media extends MediaType,
> = <
  Method extends HttpMethod,
  Path extends PathsWithMethod<Paths, Method>,
  Init extends MaybeOptionalInit<Paths[Path], Method>,
  Response extends Required<FetchResponse<Paths[Path][Method], Init, Media>>,
  Options extends Omit<
    UseInfiniteQueryOptions<
      Response["data"],
      Response["error"],
      InfiniteData<Response["data"]>,
      QueryKey<Paths, Method, Path>,
      unknown
    >,
    "queryKey" | "queryFn"
  > & {
    pageParamName?: string;
    getNextPageParam: (
      lastPage: Response["data"],
      allPages: Response["data"][],
      lastPageParam: unknown,
      allPageParams: unknown[],
    ) => unknown;
    initialPageParam: unknown;
  },
>(
  method: Method,
  url: Path,
  init: InitWithUnknowns<Init>,
  options: Options,
  queryClient?: QueryClient,
) => UseInfiniteQueryReturnType<InfiniteData<Response["data"]>, Response["error"]>;

export type UseMutationMethod<
  Paths extends Record<string, Record<HttpMethod, Record<string, any>>>,
  Media extends MediaType,
> = <
  Method extends HttpMethod,
  Path extends PathsWithMethod<Paths, Method>,
  Init extends MaybeOptionalInit<Paths[Path], Method>,
  Response extends Required<FetchResponse<Paths[Path][Method], Init, Media>>, // note: Required is used to avoid repeating NonNullable in UseQuery types
  Options extends Omit<UseMutationOptions<Response["data"], Response["error"], Init>, "mutationKey" | "mutationFn">,
>(
  method: Method,
  url: Path,
  options?: Options,
  queryClient?: QueryClient,
) => UseMutationReturnType<Response["data"], Response["error"], Init, unknown>;

export interface OpenapiQueryClient<Paths extends Record<string, any>, Media extends MediaType = MediaType> {
  queryOptions: QueryOptionsFunction<Paths, Media>;
  useQuery: UseQueryMethod<Paths, Media>;
  useInfiniteQuery: UseInfiniteQueryMethod<Paths, Media>;
  useMutation: UseMutationMethod<Paths, Media>;
}

export type MethodResponse<
  CreatedClient extends OpenapiQueryClient<any, any>,
  Method extends HttpMethod,
  Path extends CreatedClient extends OpenapiQueryClient<infer Paths, infer _Media>
    ? PathsWithMethod<Paths, Method>
    : never,
  Options = object,
> = CreatedClient extends OpenapiQueryClient<infer Paths extends { [key: string]: any }, infer Media extends MediaType>
  ? NonNullable<FetchResponse<Paths[Path][Method], Options, Media>["data"]>
  : never;

// TODO: Add the ability to bring queryClient as argument
export default function createClient<Paths extends Record<string, any>, Media extends MediaType = MediaType>(
  client: FetchClient<Paths, Media>,
): OpenapiQueryClient<Paths, Media> {
  const queryFn = async <Method extends HttpMethod, Path extends PathsWithMethod<Paths, Method>>({
    queryKey: [method, path, init],
    signal,
  }: QueryFunctionContext<DeepUnwrapRef<QueryKey<Paths, Method, Path>>>) => {
    const mth = method.toUpperCase() as Uppercase<typeof method>;
    const fn = client[mth] as ClientMethod<Paths, typeof method, Media>;
    const { data, error } = await fn(path as PathsWithMethod<Paths, DeepUnwrapRef<Method>>, {
      signal,
      ...(init as any),
    }); // TODO: find a way to avoid as any
    if (error) {
      throw error;
    }

    return data;
  };

  const queryOptions: QueryOptionsFunction<Paths, Media> = (method, path, ...[init, options]) => {
    const key = (init === undefined ? ([method, path] as const) : ([method, path, init] as const)) as QueryKey<
      Paths,
      typeof method,
      typeof path
    >;

    return {
      queryKey: computed(() => key),
      queryFn,
      ...options,
    };
  };

  return {
    queryOptions,
    useQuery: ((method, path, ...[init, options, queryClient]) => {
      const opts = queryOptions(method, path, init as InitWithUnknowns<typeof init>, options);
      // Type assertion needed: queryOptions returns queryKey as ComputedRef (for Vue reactivity),
      // but TypeScript can't verify the structural compatibility with UseQueryOptions.
      // The outer type assertion to UseQueryMethod ensures type safety for consumers.
      return useQuery(opts as any, queryClient);
    }) as UseQueryMethod<Paths, Media>,
    useInfiniteQuery: ((method, path, init, options, queryClient) => {
      const { pageParamName = "cursor", ...restOptions } = options;
      const { queryKey } = queryOptions(method, path, init);

      return useInfiniteQuery(
        {
          queryKey, // queryKey is already a ComputedRef, which is compatible with MaybeRefDeep
          queryFn: async (
            context: QueryFunctionContext<DeepUnwrapRef<QueryKey<Paths, typeof method, typeof path>>, unknown>,
          ) => {
            const [queryMethod, queryPath, queryInit] = context.queryKey as QueryKey<Paths, typeof method, typeof path>;
            const { pageParam = 0, signal } = context;

            const mth = queryMethod.toUpperCase() as Uppercase<typeof method>;
            const fn = client[mth] as ClientMethod<Paths, typeof method, Media>;
            const mergedInit = {
              ...queryInit,
              signal,
              params: {
                ...(queryInit?.params || {}),
                query: {
                  ...(queryInit?.params as { query?: DefaultParamsOption })?.query,
                  [pageParamName]: pageParam,
                },
              },
            };

            const response = await (fn as Function)(queryPath, mergedInit);
            const { data, error } = response;
            if (error) {
              throw error;
            }
            return data;
          },
          ...restOptions,
        } as unknown as Parameters<typeof useInfiniteQuery>[0],
        queryClient,
      );
    }) as UseInfiniteQueryMethod<Paths, Media>,
    useMutation: (method, path, options, queryClient) =>
      useMutation(
        {
          mutationKey: [method, path],
          mutationFn: async (init: any) => {
            const mth = method.toUpperCase() as Uppercase<typeof method>;
            const fn = client[mth] as ClientMethod<Paths, typeof method, Media>;
            const { data, error } = await fn(path, init as InitWithUnknowns<typeof init>);
            if (error) {
              throw error;
            }

            return data as Exclude<typeof data, undefined>;
          },
          ...options,
        } as any, // Type assertion needed: mutationFn return type Exclude<data, undefined> doesn't structurally match Response["data"]
        queryClient,
      ),
  };
}
