<script setup lang="ts">
import { $api } from "../api";

const { data, error, isLoading } = $api.useQuery("get", "/posts/{id}", {
  params: {
    path: { id: "1" },
  },
});
</script>

<template>
  <template v-if="!data || isLoading">
    Loading...
  </template>
  <template v-else-if="error">
    An error occured: {{ error.message }}
  </template>
  <template v-else>
    <h3>{{ data.title }}</h3>
    <p>{{ data.body }}</p>
  </template>
</template>

