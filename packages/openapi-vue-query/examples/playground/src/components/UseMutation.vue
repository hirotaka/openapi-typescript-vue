<script setup lang="ts">
import { $api } from "../api";

const { mutate } = $api.useMutation("post", "/posts");
</script>

<template>
  <button @click="mutate({ body: { title: 'Hello!', body: 'Hello, world!' } })">
    Post
  </button>
</template>
