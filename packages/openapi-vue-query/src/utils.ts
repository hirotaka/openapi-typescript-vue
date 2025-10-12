import type { ComputedRef, Ref, UnwrapRef } from "vue";
import { isRef } from "vue";

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
