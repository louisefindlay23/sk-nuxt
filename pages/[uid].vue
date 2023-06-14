<script setup>
import * as sliceComponents from "~/slices";

import { getLocales } from "~/lib/getLocales";

const route = useRoute();
const uid = route.params.uid;

const { client } = usePrismic();

const { locale } = useI18n();

const { data: page } = await useAsyncData("page", () =>
  client.getByUID("pages", uid, { lang: locale.value })
);

const locales = await getLocales(page.value, client);
const storeLocales = useState("locales", () => locales);

const siteTitle = useState("siteTitle");

useHead({
  title: "- ${siteTitle}",
});
</script>

<template>
  <main class="page">
    <PrismicRichText :field="page.data.title" />
    <PrismicImage class="featuredImage" :field="page.data.featured_image" />
    <SliceZone :slices="page.data.body" :components="sliceComponents" />
  </main>
</template>