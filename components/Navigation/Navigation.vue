<script setup>
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
          <prismic-rich-text :field="link.link_text" />
        </nuxt-link>
      </li>
    </ul>
    <LanguageSwitcher />
  </nav>
  <nav v-else class="nav">
    <ul class="navList">
      <li>Loading navigation links...</li>
    </ul>
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