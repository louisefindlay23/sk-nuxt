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
</script>

<template>
  <main class="page">
    <SliceZone :slices="page.data.body" :components="sliceComponents" />
  </main>
</template>