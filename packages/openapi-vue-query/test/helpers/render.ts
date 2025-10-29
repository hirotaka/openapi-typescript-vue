import { type QueryClient, VueQueryPlugin } from "@tanstack/vue-query";
import { render as baseRender, type RenderOptions } from "@testing-library/vue";
import type { Component } from "vue";

export interface CustomRenderOptions<C = Component> extends RenderOptions<C> {
  queryClient?: QueryClient;
}

/**
 * Custom render function that wraps @testing-library/vue's render
 * and optionally provides a custom QueryClient to the component tree.
 */
export function render<C = Component>(component: C, options?: CustomRenderOptions<C>) {
  const { queryClient, ...renderOptions } = options || {};

  if (queryClient) {
    // If a custom QueryClient is provided, we need to install VueQueryPlugin
    // with that client in the global plugins
    const plugins = renderOptions.global?.plugins || [];
    const updatedOptions: RenderOptions<C> = {
      ...renderOptions,
      global: {
        ...renderOptions.global,
        plugins: [...plugins, [VueQueryPlugin, { queryClient }]],
      },
    };
    return baseRender(component, updatedOptions);
  }

  // If no custom QueryClient, use the default render
  return baseRender(component, renderOptions);
}
