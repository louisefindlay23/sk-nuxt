<script setup>
import * as prismicH from "@prismicio/helpers";
import styles from "./Navigation.module.css";
const { client } = usePrismic();
const { data: navigation } = await useAsyncData("navigation", (locale) =>
  client.getSingle("navigation", { lang: locale.value })
);
const nuxtApp = useNuxtApp();
const locale = nuxtApp.$i18n.locale;
</script>

<template>
  <nav v-if="navigation" :class="styles.nav">
    <ul :class="styles.navList">
      <li v-for="link in navigation.data.menu" :key="JSON.stringify(link)">
        <!-- <prismic-link :field="link.link_url">
          {{ prismicH.asText(link.link_text) }}
        </prismic-link> -->
        <nuxt-link :to="`/${locale}${link.link_url.url}`">
          {{ prismicH.asText(link.link_text) }}
        </nuxt-link>
      </li>
    </ul>
    <LanguageSwitcher />
  </nav>
</template>