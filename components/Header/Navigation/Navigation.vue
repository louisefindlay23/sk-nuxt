<script setup>
import * as prismicH from "@prismicio/helpers";

import styles from "./Navigation.module.css";

const { locale } = useI18n();

const { client } = usePrismic();
const { data: navigation } = await useAsyncData("navigation", (locale) =>
  client.getSingle("navigation", { lang: locale.value })
);

const localePath = useLocalePath();
</script>

<template>
  <nav v-if="navigation" :class="styles.nav">
    <ul :class="styles.navList">
      <li v-for="link in navigation.data.menu" :key="JSON.stringify(link)">
        <nuxt-link :to="localePath(link.link_url.url)">
          {{ prismicH.asText(link.link_text) }}
        </nuxt-link>
      </li>
    </ul>
    <LanguageSwitcher />
  </nav>
</template>