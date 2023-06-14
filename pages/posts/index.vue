<script setup>
import * as prismicH from "@prismicio/helpers";

import * as sliceComponents from "~/slices";

import { getLocales } from "~/lib/getLocales";

const { client } = usePrismic();

const { locale } = useI18n();

const { data: page } = await useAsyncData("pages", () =>
  client.getByUID("pages", "posts", { lang: locale.value })
);
const { data: posts } = await useAsyncData("posts", () =>
  client.getAllByType("posts", { lang: locale.value })
);

const locales = await getLocales(page.value, client);
const storeLocales = useState("locales", () => locales);

const siteTitle = useState("siteTitle");

useHead(() => {
  const pageTitle = page.value?.data?.title;
  const title = pageTitle
    ? `${prismicH.asText(pageTitle)} - ${siteTitle.value}`
    : siteTitle.value;
  return { title };
});
</script>

<template>
  <main class="boxContainer">
    <PrismicRichText :field="page.data.title" />
    <SliceZone :slices="page.data.body" :components="sliceComponents" />
    <PostList :posts="posts" />
  </main>
</template>

<style scoped>
/* Content Box Styles */
.boxContainer > article {
  display: flex;
  justify-content: space-around;
  margin: 3rem 0;
  padding: 1rem 3rem;
  border: 3px solid #000000;
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

/* Pagination Styles */
.pagination {
  display: flex;
  justify-content: center;
}

.pagination button {
  margin-bottom: 2vw;
  padding: 1vw 3vw;
}

.pagination button:first-of-type {
  margin-right: 2.5vw;
}

.pagination button:last-of-type {
  margin-left: 2.5vw;
}
</style>