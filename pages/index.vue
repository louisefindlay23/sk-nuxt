<script setup>
import TextSlice from "~/slices/Text";
import RecentPostsSlice from "~/slices/RecentPosts";

import { getLocales } from "../lib/getLocales";

const { client } = usePrismic();
const { data: home } = await useAsyncData("home", (locale) =>
  client.getSingle("home", { lang: locale.value })
);

const locales = await getLocales(home.value, client);

const components = {
  text: TextSlice,
  recent_posts: RecentPostsSlice,
};
</script>

<template>
  <div>
    <slice-zone
      :slices="home.data.body"
      :components="components"
      wrapper="main"
    />
    <ul>
      <li v-for="locale in locales" :key="locale.id">
        <nuxt-link :href="locale.url">{{ locale.lang_name }}</nuxt-link>
      </li>
    </ul>
    <v-select label="lang_name" :options="locales" />
  </div>
</template>