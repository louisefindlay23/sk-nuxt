<script setup>
import { components } from "~/slices";

const route = useRoute();
const uid = route.params.uid;

const { client } = usePrismic();

const { data: post } = await useAsyncData("posts", () =>
  client.getByUID("post", uid, {
    fetchLinks: [
      "author.author_name",
      "author.author_image",
      "author.author_bio",
      "author.author_website_link",
      "author.author_website_text",
    ],
  })
);

useHead({
  title: post.value?.data.title,
  meta: [
    { name: "description", content: post.value?.data.meta_description },
    { property: "og:title", content: post.value?.data.meta_title },
    {
      property: "og:description",
      content: post.value?.data.meta_description,
    },
    { property: "og:image", content: post.value?.data.meta_image.url },
    { name: "twitter:card", content: "summary_large_image" },
  ],
});
</script>

<template>
  <div>
    <h2>Post</h2>
    <article v-if="post">
      <h3>{{ post.data.title }}</h3>
      <Date :postDate="post.first_publication_date" />
      <PrismicImage class="featuredImage" :field="post.data.featured_image" />
      <SliceZone :slices="post?.data.slices ?? []" :components="components" />
      <footer class="boxContainer">
        <h3>Authors</h3>
        <!-- Render linked authors from grouped content relationship -->
        <div v-for="author in post.data.authors">
          <div class="boxContent">
            <h4>{{ author.author.data.author_name }}</h4>
            <PrismicRichText :field="author.author.data.author_bio" />
            <PrismicLink :field="author.author.data.author_website_link">
              {{ author.author.data.author_website_text }}
            </PrismicLink>
          </div>
          <div class="boxImage">
            <PrismicImage :field="author.author.data.author_image" />
          </div>
        </div>
      </footer>
    </article>
    <div v-else>
      <p>Loading post...</p>
    </div>
  </div>
</template>

<style scoped>
/* Content Box Styles */
.featuredImage {
  margin-top: 2.5%;
}

.boxContainer > div {
  display: flex;
  justify-content: space-around;
  margin: 3rem 0;
  padding: 1rem 3rem;
  border: 3px solid #000000;
  border-radius: 20px;
}

.boxContainer > div:first-of-type {
  margin-top: 1rem;
}

.boxContainer > div:last-of-type {
  margin-bottom: 2rem;
}

.boxContainer > section > h3 {
  margin-top: 2rem;
}

.boxContainer h3 {
  text-align: center;
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
