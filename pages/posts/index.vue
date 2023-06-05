<script setup>
import { useNuxtApp } from "#app";

import HeadingSlice from "~/slices/Heading";

import { getLocales } from "~/lib/getLocales";

import styles from "~/components/PostList/PostList.module.css";

const nuxtApp = useNuxtApp();
const { client } = usePrismic();

const locale = nuxtApp.$i18n.locale;

const { data: page } = await useAsyncData("pages", () =>
  client.getByUID("pages", "post", { lang: locale.value })
);
const { data: posts } = await useAsyncData("posts", () =>
  client.getAllByType("posts", { lang: locale.value })
);

const locales = await getLocales(page.value, client);
const storeLocales = useState("locales", () => locales);

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