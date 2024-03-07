<script setup>
defineProps(getSliceComponentProps(["slice", "index", "slices", "context"]));

const { locale } = useI18n();

const { client } = usePrismic();
const { data: posts } = await useAsyncData(
  "posts",
  () => client.getAllByType("post", { lang: locale.value }),
  {
    pageSize: 3,
  }
);
</script>

<template>
  <div class="boxContainer">
    <PrismicRichText :field="slice.primary.list_heading" wrapper="section" />
    <!-- Iterate over paginated posts -->
    <article
      v-if="posts"
      v-for="post in posts"
      :key="JSON.stringify(post.data)"
    >
      <div class="boxContent">
        <NuxtLink :to="post.url">
          <h3>{{ post.data.title }}</h3>
        </NuxtLink>
        <Date :postDate="post.first_publication_date" />
        <PrismicRichText v-if="post.data.excerpt" :field="post.data.excerpt" />
        <p v-else>
          Read on to find
          <NuxtLink :to="post.url">{{ post.data.title }}</NuxtLink>
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
