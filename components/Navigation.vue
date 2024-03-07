<script setup>
const { client } = usePrismic();
const { locale } = useI18n();

const { data: navigation } = await useAsyncData("navigation", (locale) =>
  client.getByUID("navigation", "header", { lang: locale.value })
);
</script>

<template>
  <nav v-if="navigation" class="nav">
    <ul class="navList">
      <li v-for="link in navigation.data.links" :key="JSON.stringify(link)">
        <NuxtLink :to="localePath(link.link_url.url)">
          {{ link.link_text }}
        </NuxtLink>
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
