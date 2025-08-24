import { factory, primaryKey } from "@mswjs/data";
import { faker } from "@faker-js/faker";

export const db = factory({
  post: {
    id: primaryKey(faker.string.nanoid),
    title: faker.lorem.words,
    body: faker.lorem.sentence,
    createdAt: Date.now,
  },
});

// Seed data
db.post.create({ id: "1" });
for (let i = 1; i < 10; i++) {
  db.post.create();
}
