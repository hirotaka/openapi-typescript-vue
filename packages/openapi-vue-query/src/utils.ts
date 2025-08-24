import type { ComputedRef, Ref, UnwrapRef } from "vue";
import { isRef } from "vue";

type Primitive = string | number | boolean | bigint | symbol | undefined | null;
type UnwrapLeaf =
  | Primitive
  | Function
  | Date
  | Error
  | RegExp
  | Map<any, any>
  | WeakMap<any, any>
  | Set<any>
  | WeakSet<any>;

export type MaybeRef<T> = Ref<T> | ComputedRef<T> | T;

export type MaybeRefOrGetter<T> = MaybeRef<T> | (() => T);

export type MaybeRefDeep<T> = MaybeRef<
  T extends Function
    ? T
    : T extends object
      ? {
          [Property in keyof T]: MaybeRefDeep<T[Property]>;
        }
      : T
>;

export type NoUnknown<T> = Equal<unknown, T> extends true ? never : T;

export type Equal<TTargetA, TTargetB> = (<T>() => T extends TTargetA ? 1 : 2) extends <T>() => T extends TTargetB
  ? 1
  : 2
  ? true
  : false;

export type DeepUnwrapRef<T> = T extends UnwrapLeaf
  ? T
  : T extends Ref<infer U>
    ? DeepUnwrapRef<U>
    : T extends {}
      ? {
          [Property in keyof T]: DeepUnwrapRef<T[Property]>;
        }
      : UnwrapRef<T>;

export type DistributiveOmit<T, TKeyOfAny extends keyof any> = T extends any ? Omit<T, TKeyOfAny> : never;

export type ClientContext = Record<string, any>;

export type SetOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type AnyFunction = (...args: any[]) => any;

export type UnrefDeep<T> = T extends Ref<infer U>
  ? UnrefDeep<U>
  : T extends AnyFunction
    ? T
    : T extends object
      ? { [K in keyof T]: UnrefDeep<T[K]> }
      : T;

export function isObject(value: unknown): value is Record<PropertyKey, unknown> {
  if (!value || typeof value !== "object") {
    return false;
  }

  const proto = Object.getPrototypeOf(value);

  return proto === Object.prototype || !proto || !proto.constructor;
}

export function unrefDeep<T>(value: T): UnrefDeep<T> {
  if (isRef(value)) {
    return unrefDeep(value.value) as any;
  }

  if (Array.isArray(value)) {
    return value.map(unrefDeep) as any;
  }

  if (isObject(value)) {
    return Object.keys(value).reduce(
      (acc, key) => {
        acc[key] = unrefDeep(value[key]);
        return acc;
      },
      {} as Record<string, unknown>,
    ) as any;
  }

  return value as any;
}
