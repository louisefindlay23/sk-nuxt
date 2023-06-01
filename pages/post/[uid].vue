<script setup>
import * as prismicH from "@prismicio/helpers";

import HeadingSlice from "~/slices/Heading/index.vue";
import ImageSlice from "~/slices/Image/index.vue";
import TextSlice from "~/slices/Text/index.vue";
import CodeSlice from "~/slices/Code/index.vue";

import styles from "./Post.module.css";

const route = useRoute();
const uid = route.params.uid;

const { client } = usePrismic();
const { data: post } = await useAsyncData("posts", () =>
  client.getByUID("posts", uid, {
    fetchLinks: [
      "authors.author_profile",
      "authors.author_image",
      "authors.author_bio",
      "authors.author_website_link",
      "authors.author_website_text",
    ],
  })
);

const components = {
  heading: HeadingSlice,
  image: ImageSlice,
  text: TextSlice,
  code: CodeSlice,
};
</script>

<template>
  <div>
    <article v-if="post">
      <h2>Post</h2>
      <SliceZone :slices="post.data.body" :components="components" />
    </article>
    <footer :class="styles.boxContainer">
      <h3>Authors</h3>
      <!-- Render linked authors from grouped content relationship -->
      <div v-for="author in post.data.authors">
        <div :class="styles.boxContent">
          <PrismicRichText
            :field="author.author_relationship.data.author_name"
          />
          <PrismicRichText
            :field="author.author_relationship.data.author_bio"
          />
          <a :href="author.author_relationship.data.author_website_link.url">
            {{
              prismicH.asText(
                author.author_relationship.data.author_website_text
              )
            }}
          </a>
        </div>
        <div :class="styles.boxImage">
          <PrismicImage :field="author.author_relationship.data.author_image" />
        </div>
      </div>
    </footer>
  </div>
</template>