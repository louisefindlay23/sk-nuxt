<script setup>
import * as prismicH from "@prismicio/helpers";

import { format } from "date-fns";

defineProps(["postDate"]);
</script>
<template>
  <time :dateTime="prismicH.asDate(postDate)">
    {{ format(prismicH.asDate(postDate), "dd/MM/yyyy") }}</time
  >
</template>