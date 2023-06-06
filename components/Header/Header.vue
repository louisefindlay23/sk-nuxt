<script setup>
import styles from "./Header.module.css";

const nuxtApp = useNuxtApp();
</script>

<template>
  <header :class="styles.pageHeader">
    <a href="/">
      <h1>{{ nuxtApp.$siteTitle }}</h1>
    </a>
    <Navigation />
  </header>
</template>