<script setup>
import * as prismicH from "@prismicio/helpers";

import HeadingSlice from "~/slices/Heading";
import ImageSlice from "~/slices/Image";
import TextSlice from "~/slices/Text";
import CodeSlice from "~/slices/Code";

import { getLocales } from "~/lib/getLocales";

import styles from "./Post.module.css";

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
          <prismic-link
            :field="author.author_relationship.data.author_website_link"
          >
            {{
              prismicH.asText(
                author.author_relationship.data.author_website_text
              )
            }}
          </prismic-link>
        </div>
        <div :class="styles.boxImage">
          <PrismicImage :field="author.author_relationship.data.author_image" />
        </div>
      </div>
    </footer>
  </div>
</template>