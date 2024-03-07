<script setup>
import "./styles/main.css";

const prismic = usePrismic();

const { data: settings } = useAsyncData("settings", () =>
  prismic.client.getSingle("settings")
);

const siteTitle = ref(null);
const siteDescription = ref(null);
const siteImage = ref(null);

// Set siteTitle globally as nuxtApp provide
watchEffect(() => {
  if (settings.value) {
    siteTitle.value = settings.value.data.site_title;
    siteDescription.value = settings.value.data.site_meta_description;
    siteImage.value = settings.value.data.site_meta_image.url;
  }
});

// Google Font imports and Meta Tags
useHead({
  title: siteTitle.value,
  meta: [
    { name: "description", content: siteDescription.value },
    { property: "og:title", content: siteTitle.value },
    {
      property: "og:description",
      content: siteDescription.value,
    },
    { property: "og:image", content: siteImage.value },
    { name: "twitter:card", content: "summary_large_image" },
  ],
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
