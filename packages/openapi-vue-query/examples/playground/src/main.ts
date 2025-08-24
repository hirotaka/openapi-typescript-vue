import { createApp } from "vue";
import { VueQueryPlugin } from "@tanstack/vue-query";

import App from "./App.vue";

async function prepareApp() {
  const { worker } = await import("./mocks/browser");
  worker.start();

  return Promise.resolve();
}

const app = createApp(App);

app.use(VueQueryPlugin);

prepareApp().then(() => {
  app.mount("#app");
});
