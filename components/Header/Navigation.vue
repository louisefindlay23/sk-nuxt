<script setup>
import * as prismicH from "@prismicio/helpers";
import styles from "./Header.module.css";
const { client } = usePrismic();
const { data: navigation } = await useAsyncData(client.getSingle("navigation"));
</script>

<template>
  <nav>
    <ul :class="styles.navList">
      <li v-for="link in navigation.data.menu" :key="JSON.stringify(link)">
        <prismic-link :field="link.link_url">
          {{ prismicH.asText(link.link_text) }}
        </prismic-link>
      </li>
    </ul>
  </nav>
</template>