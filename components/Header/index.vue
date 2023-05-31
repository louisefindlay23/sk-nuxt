<script setup>
import { Navigation } from "./Navigation.vue";
import styles from "./Header.module.css";
const siteTitle = "The Sock Kingdom";
</script>

<template>
  <header :class="styles.pageHeader">
    <a href="/">
      <h1>{{ siteTitle }}</h1>
    </a>
    <Navigation />
  </header>
</template>