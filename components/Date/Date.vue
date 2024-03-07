<script setup>
import * as prismicH from "@prismicio/helpers";

import { DateTime } from "luxon";

const nuxtApp = useNuxtApp();
const locale = nuxtApp.$i18n.locale.value;

defineProps(["postDate"]);
</script>
<template>
  <time :dateTime="prismicH.asDate(postDate)">
    {{ DateTime.fromISO(postDate).setLocale(locale).toLocaleString() }}</time
  >
</template>
