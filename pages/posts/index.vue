<script setup>
import HeadingSlice from "~/slices/Heading";

import styles from "~/components/PostList/PostList.module.css";

const { client } = usePrismic();
const { data: page } = await useAsyncData("pages", (locale) =>
  client.getByUID("pages", "post", { lang: locale.value })
);
const { data: posts } = await useAsyncData("posts", (locale) =>
  client.getAllByType("posts", { lang: locale.value })
);

const components = {
  heading: HeadingSlice,
};
</script>

<template>
  <main :class="[styles.boxContainer, styles.page]">
    <slice-zone :slices="page.data.body" :components="components" />
    <PostList :posts="posts" />
  </main>
</template>