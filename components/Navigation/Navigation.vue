<script setup>
import * as prismicH from "@prismicio/helpers";

const { locale } = useI18n();

const { client } = usePrismic();
const { data: navigation } = await useAsyncData("navigation", (locale) =>
  client.getSingle("navigation", { lang: locale.value })
);

const localePath = useLocalePath();
</script>

<template>
  <nav v-if="navigation" class="nav">
    <ul class="navList">
      <li v-for="link in navigation.data.menu" :key="JSON.stringify(link)">
        <nuxt-link :to="localePath(link.link_url.url)">
          {{ prismicH.asText(link.link_text) }}
        </nuxt-link>
      </li>
    </ul>
    <LanguageSwitcher />
  </nav>
</template>

<style scoped>
/* Nav Styles */
.nav,
.navList {
  display: flex;
  justify-content: space-around;
}

.navList {
  width: 100%;
  list-style-type: none;
}

@media only screen and (max-width: 599px) {
  .nav {
    display: block;
  }
}
</style>