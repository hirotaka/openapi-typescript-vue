import createFetchClient from "openapi-fetch";
import createClient from "openapi-vue-query";
import type { paths } from "./lib/api/v1";

const fetchClient = createFetchClient<paths>({ baseUrl: "/" });
export const $api = createClient(fetchClient);
