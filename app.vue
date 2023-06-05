<script setup>
import "./styles/main.css";

// Google Font imports
useHead({
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