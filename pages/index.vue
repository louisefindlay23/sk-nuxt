<script setup>
import * as sliceComponents from "~/slices";

import { getLocales } from "~/lib/getLocales";

const { client } = usePrismic();

const { locale } = useI18n();

const { data: home } = await useAsyncData("home", () =>
  client.getSingle("home", { lang: locale.value })
);

const locales = await getLocales(home.value, client);
const storeLocales = useState("locales", () => locales);
</script>

<template>
  <main>
    <slice-zone :slices="home.data.body" :components="sliceComponents" />
  </main>
</template>