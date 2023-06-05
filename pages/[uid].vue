<script setup>
import HeadingSlice from "~/slices/Heading";
import ImageSlice from "~/slices/Image";
import TextSlice from "~/slices/Text";

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

const components = {
  heading: HeadingSlice,
  image: ImageSlice,
  text: TextSlice,
};
</script>

<template>
  <main class="page">
    <SliceZone :slices="page.data.body" :components="components" />
  </main>
</template>