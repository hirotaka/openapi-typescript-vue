import { http, HttpResponse } from "msw";
import { db } from "./db";

const getPostsWithPagenation = http.get("/posts", ({ request }) => {
  const url = new URL(request.url);
  const take = Number(url.searchParams.get("limit")) || 10;
  const page = Number(url.searchParams.get("page")) || 1;
  const skip = (page - 1) * take;

  const items = db.post.findMany({ take, skip, orderBy: { createdAt: "asc" } });
  const nextPage = db.post.count() > page * take ? page + 1 : undefined;

  return HttpResponse.json({ items, nextPage });
});

// Type assertion to resolve MSW version incompatibility
export const handlers = [getPostsWithPagenation, ...db.post.toHandlers("rest")] as any[];
