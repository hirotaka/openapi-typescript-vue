import type {
  MutationObserverOptions,
  QueryFunctionContext,
  QueryKey,
  QueryObserverOptions,
  UseInfiniteQueryOptions,
} from "@tanstack/vue-query";
import type { ComputedRef, MaybeRef, MaybeRefOrGetter } from "vue";

import type { ClientContext, MaybeRefDeep } from "./utils";

export type QueryOptionsIn<
  TClientContext extends ClientContext,
  TInput,
  TOutput,
  TError extends Error,
  TSelectData,
> = (undefined extends TInput ? { input?: MaybeRefDeep<TInput> } : { input: MaybeRefDeep<TInput> }) &
  (Record<never, never> extends TClientContext
    ? { context?: MaybeRefDeep<TClientContext> }
    : { context: MaybeRefDeep<TClientContext> }) & {
    [P in keyof Omit<
      QueryObserverOptions<TOutput, TError, TSelectData, TOutput>,
      "queryKey" | "enabled"
    >]: MaybeRefDeep<QueryObserverOptions<TOutput, TError, TSelectData, TOutput>[P]>;
  } & {
    enabled?: MaybeRefOrGetter<QueryObserverOptions<TOutput, TError, TSelectData, TOutput>["enabled"]>;
    queryKey?: MaybeRefDeep<QueryObserverOptions<TOutput, TError, TSelectData, TOutput>["queryKey"]>;
    shallow?: MaybeRef<boolean>;
  };

export interface QueryOptionsBase<TOutput, TError extends Error> {
  queryKey: ComputedRef<QueryKey>;
  queryFn(ctx: QueryFunctionContext): Promise<TOutput>;
  retry?(failureCount: number, error: TError): boolean; // this help tanstack can infer TError
}

export type InfiniteOptionsIn<
  TClientContext extends ClientContext,
  TInput,
  TOutput,
  TError extends Error,
  TSelectData,
  TPageParam,
> = { input: (pageParam: TPageParam) => MaybeRefDeep<TInput> } & (Record<never, never> extends TClientContext
  ? { context?: MaybeRefDeep<TClientContext> }
  : { context: MaybeRefDeep<TClientContext> }) &
  Omit<UseInfiniteQueryOptions<TOutput, TError, TSelectData, QueryKey, TPageParam>, "queryKey"> & {
    queryKey?: QueryKey;
  };

export interface InfiniteOptionsBase<TOutput, TError extends Error, TPageParam> {
  queryKey: ComputedRef<QueryKey>;
  queryFn(ctx: QueryFunctionContext<QueryKey, TPageParam>): Promise<TOutput>;
  retry?(failureCount: number, error: TError): boolean; // this help tanstack can infer TError
}

export type MutationOptionsIn<
  TClientContext extends ClientContext,
  TInput,
  TOutput,
  TError extends Error,
  TMutationContext,
> = (Record<never, never> extends TClientContext ? { context?: TClientContext } : { context: TClientContext }) &
  MutationOptions<TInput, TOutput, TError, TMutationContext>;

export type MutationOptions<TInput, TOutput, TError extends Error, TMutationContext> = {
  [P in keyof MutationObserverOptions<TOutput, TError, TInput, TMutationContext>]: MaybeRefDeep<
    MutationObserverOptions<TOutput, TError, TInput, TMutationContext>[P]
  >;
} & {
  shallow?: MaybeRef<boolean>;
};
