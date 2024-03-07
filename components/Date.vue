<script setup>
import { DateTime } from "luxon";

const prismic = usePrismic();

defineProps(["postDate"]);
</script>
<template>
  <time :dateTime="prismic.asDate(postDate)">
    {{ DateTime.fromISO(postDate).toLocaleString() }}</time
  >
</template>
