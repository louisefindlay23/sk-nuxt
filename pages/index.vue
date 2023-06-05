<script setup>
import TextSlice from "~/slices/Text";
import RecentPostsSlice from "~/slices/RecentPosts";

import { getLocales } from "~/lib/getLocales";

const { client } = usePrismic();

const { locale } = useI18n();

const { data: home } = await useAsyncData("home", () =>
  client.getSingle("home", { lang: locale.value })
);

const locales = await getLocales(home.value, client);
const storeLocales = useState("locales", () => locales);

const components = {
  text: TextSlice,
  recent_posts: RecentPostsSlice,
};
</script>

<template>
  <main>
    <slice-zone :slices="home.data.body" :components="components" />
  </main>
</template>