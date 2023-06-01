<script setup>
import styles from "./PostList.module.css";

const { client } = usePrismic();
const { data: posts } = await useAsyncData("posts", () =>
  client.getAllByType("posts")
);
</script>

<template>
  <article v-for="post in posts" :key="JSON.stringify(post.data)">
    <div :class="styles.boxContent">
      <prismic-link :field="post">
        <prismic-rich-text :field="post.data.body[0].primary.heading" />
      </prismic-link>
      <Date :postDate="post.first_publication_date" />
      <prismic-rich-text :field="post.data.body[2].primary.text.slice(0, 1)" />
    </div>
    <div :class="styles.boxImage">
      <prismic-image :field="post.data.body[1].primary.image" />
    </div>
  </article>
</template>