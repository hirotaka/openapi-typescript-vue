<script setup lang="ts">
import { $api } from "../api";
import { computed } from "vue";

const result = $api.useQuery("get", "/posts/{id}", {
  params: {
    path: { id: "1" },
  },
});

const data = computed(() => result.data.value);
const error = computed(() => result.error.value);
const isLoading = computed(() => result.isLoading.value);
</script>

<template>
  <template v-if="!data || isLoading">
    Loading...
  </template>
  <template v-else-if="error">
    An error occured: {{ error }}
  </template>
  <template v-else>
    <h3>{{ data?.title }}</h3>
    <p>{{ data?.body }}</p>
  </template>
</template>

