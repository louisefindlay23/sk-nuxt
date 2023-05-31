<script setup>
import * as prismicH from "@prismicio/helpers";
const { client } = usePrismic();
const { data: navigation } = await useAsyncData("navigation", () =>
  client.getSingle("navigation")
);
</script>

<template>
  <nav v-if="navigation">
    <ul class="navList">
      <li v-for="link in navigation.data.menu" :key="JSON.stringify(link)">
        <prismic-link :field="link.link_url">
          {{ prismicH.asText(link.link_text) }}
        </prismic-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.navList {
  display: flex;
  justify-content: space-around;
  list-style-type: none;
}
</style>