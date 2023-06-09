<script setup>
import * as prismicH from "@prismicio/helpers";

import * as sliceComponents from "~/slices";

import { getLocales } from "~/lib/getLocales";

const route = useRoute();
const uid = route.params.uid;

const { client } = usePrismic();

const { locale } = useI18n();

// Use fetchLinks to get author data
const { data: post } = await useAsyncData("posts", () =>
  client.getByUID("posts", uid, {
    lang: locale.value,
    fetchLinks: [
      "authors.author_profile",
      "authors.author_image",
      "authors.author_bio",
      "authors.author_website_link",
      "authors.author_website_text",
    ],
  })
);

const locales = await getLocales(post.value, client);
const storeLocales = useState("locales", () => locales);

const siteTitle = useState("siteTitle");

useHead(() => {
  const pageTitle = post.value?.data?.title;
  const title = pageTitle
    ? `${prismicH.asText(pageTitle)} - ${siteTitle.value}`
    : siteTitle.value;
  return { title };
});
</script>

<template>
  <div>
    <h2>Post</h2>
    <article v-if="post">
      <PrismicRichText :field="post.data.title" />
      <Date :postDate="post.first_publication_date" />
      <SliceZone :slices="post.data.body" :components="sliceComponents" />
      <footer class="boxContainer">
        <h3>Authors</h3>
        <!-- Render linked authors from grouped content relationship -->
        <div v-for="author in post.data.authors">
          <div class="boxContent">
            <PrismicRichText
              :field="author.author_relationship.data.author_name"
            />
            <PrismicRichText
              :field="author.author_relationship.data.author_bio"
            />
            <prismic-link
              :field="author.author_relationship.data.author_website_link"
            >
              <prismic-rich-text
                :field="author.author_relationship.data.author_website_text"
              />
            </prismic-link>
          </div>
          <div class="boxImage">
            <PrismicImage
              :field="author.author_relationship.data.author_image"
            />
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
.boxContainer > div {
  display: flex;
  justify-content: space-around;
  margin: 3rem 0;
  padding: 1rem 3rem;
  border: 3px solid #000000;
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