<script setup>
import HeadingSlice from "~/slices/Heading/index.vue";

import styles from "~/components/PostList/PostList.module.css";

const { client } = usePrismic();
const { data: page } = await useAsyncData("pages", () =>
  client.getByUID("pages", "post")
);
const { data: posts } = await useAsyncData("posts", () =>
client.getAllByType("posts")
);

const components = {
  heading: HeadingSlice,
};
</script>

<template>
  <main :class="[styles.boxContainer, styles.page]">
    <slice-zone :slices="page.data.body" :components="components" />
    <PostList :posts="posts"/>
  </main>
</template>