<script setup lang="ts">
import { $api } from "../api";
import { computed } from "vue";

const result = $api.useInfiniteQuery(
  "get",
  "/posts",
  {
    params: {
      query: {
        limit: 5,
      },
    },
  },
  {
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    pageParamName: "page",
  },
);

const data = computed(() => result.data.value);
const error = computed(() => result.error.value);
const fetchNextPage = result.fetchNextPage;
const hasNextPage = computed(() => result.hasNextPage.value);
const isFetching = computed(() => result.isFetching.value);
const isError = computed(() => result.isError.value);
const isFetchingNextPage = computed(() => result.isFetchingNextPage.value);
</script>

<template>
  <template v-if="isFetching">
    Loading...
  </template>
  <template v-else-if="isError">
    An error occured: {{ (error as any).message }}
  </template>
  <template v-else-if="data">
    <template v-if="isFetching && !isFetchingNextPage">
      Fetching...
    </template>
    <div v-for="(page, index) in data?.pages" :key="index">
      <div v-for="post in page.items" :key="post.id">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
      </div>
    </div>
    <button
      @click="() => fetchNextPage()"
      :disabled="!hasNextPage || isFetchingNextPage"
    >
      <span v-if="isFetchingNextPage">Loading more...</span>
      <span v-else-if="hasNextPage">Load More</span>
      <span v-else>Nothing more to load</span>
    </button>
  </template>
</template>

