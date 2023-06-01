<script setup>
import HeadingSlice from "~/slices/Heading/index.vue";

import styles from "~/components/PostList/PostList.module.css";

const { client } = usePrismic();
const { data: page } = await useAsyncData("pages", () =>
  client.getByUID("pages", "post")
);

const components = {
  heading: HeadingSlice,
};
</script>

<template>
  <main :class="[styles.boxContainer, styles.page]">
    <slice-zone :slices="page.data.body" :components="components" />
    <PostList />
  </main>
</template>