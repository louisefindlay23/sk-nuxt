<script setup>
import * as prismicH from "@prismicio/helpers";

defineProps(getSliceComponentProps(["slice", "index", "slices", "context"]));

const { client } = usePrismic();
const { data: posts } = await useAsyncData(
  "posts",
  (locale) => client.getAllByType("posts", { lang: locale.value }),
  {
    pageSize: 3,
  }
);

const findExcerpt = computed(() => {
  const excerpt = posts.value[0].data.body.find(
    (slice) => slice.slice_type === "text"
  );
  return excerpt?.primary.text.slice(0, 1) || "";
});
</script>

<template>
  <div class="boxContainer">
    <prismic-rich-text :field="slice.primary.post_heading" wrapper="section" />
    <!-- Iterate over paginated posts -->
    <article
      v-if="posts"
      v-for="post in posts"
      :key="JSON.stringify(post.data)"
    >
      <div class="boxContent">
        <nuxt-link :to="localePath(post.url)">
          <PrismicRichText :field="post.data.title" />
        </nuxt-link>
        <Date :postDate="post.first_publication_date" />
        <!-- Slice the post's first paragraph for the excerpt -->
        <PrismicRichText v-if="findExcerpt" :field="findExcerpt" />
        <p v-else>
          Read on to find {{ prismicH.asText(post.data.title).toLowerCase() }}.
        </p>
      </div>
      <div class="boxImage">
        <PrismicImage :field="post.data.featured_image" />
      </div>
    </article>
    <div v-else>
      <p>Loading recent posts...</p>
    </div>
  </div>
</template>

<style scoped>
/* Content Box Styles */
.boxContainer > article {
  display: flex;
  justify-content: space-around;
  margin: 3rem 0;
  padding: 1rem 3rem;
  border: 3px solid #000000;
  border-radius: 20px;
}

.boxContainer > article:first-of-type {
  margin-top: 1rem;
}

.boxContainer > article:last-of-type {
  margin-bottom: 2rem;
}

.boxContainer > section > h2 {
  margin-top: 2rem;
}

.boxContent {
  width: 50%;
}

.boxContent h4 {
  margin-top: 0;
}

.boxImage {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 30%;
}

.boxImage img {
  min-width: 150px;
  object-fit: contain;
}
</style>
