<script setup>
import * as prismicH from "@prismicio/helpers";

import "./styles/main.css";

const nuxtApp = useNuxtApp();

const { data: navigation } = await useAsyncData("navigation", (locale) =>
  client.getSingle("navigation", { lang: locale.value })
);

// Set siteTitle globally as nuxtApp provide
watchEffect(() => {
  if (navigation.value) {
    nuxtApp.provide(
      "siteTitle",
      prismicH.asText(navigation.value.data.site_title)
    );
  }
});

// Google Font imports
useHead({
  title: nuxtApp.$siteTitle,
  link: [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css?family=Inter&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css?family=Arvo:wght@700&display=swap",
    },
  ],
});
</script>

<template>
  <!-- App layout -->
  <div id="app">
    <Header />
    <NuxtPage />
    <Footer />
  </div>
</template>