<script setup>
import { DateTime } from "luxon";

const prismic = usePrismic();

const { locale } = useI18n();

defineProps(["postDate"]);
</script>
<template>
  <time :dateTime="prismic.asDate(postDate)">
    {{
      DateTime.fromISO(postDate).setLocale(locale.value).toLocaleString()
    }}</time
  >
</template>
