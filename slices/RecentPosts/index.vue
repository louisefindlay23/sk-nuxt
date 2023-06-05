<script setup>
import styles from "./RecentPosts.module.css";

defineProps(getSliceComponentProps(["slice", "index", "slices", "context"]));

const { client } = usePrismic();
// TODO: Should I move the query to the page?
const { data: posts } = await useAsyncData(
  "posts",
  (locale) => client.getAllByType("posts", { lang: locale.value }),
  {
    pageSize: 3,
  }
);
</script>

<template>
  <div :class="styles.boxContainer">
    <prismic-rich-text :field="slice.primary.post_heading" wrapper="section" />
    <!-- Iterate over paginated posts -->
    <article
      v-if="posts"
      v-for="post in posts"
      :key="JSON.stringify(post.data)"
    >
      <div :class="styles.boxContent">
        <!-- TODO: Use Prismic Link or Nuxt Link -->
        <a :href="`/post/${post.uid}`">
          <prismic-rich-text :field="post.data.body[0].primary.heading" />
        </a>
        <Date :postDate="post.first_publication_date" />
        <!-- Slice the post's first paragraph for the excerpt -->
        <prismic-rich-text
          :field="post.data.body[2].primary.text.slice(0, 1)"
        />
      </div>
      <div :class="styles.boxImage">
        <prismic-image :field="post.data.body[1].primary.image" />
      </div>
    </article>
  </div>
</template>