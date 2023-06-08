<script setup>
import styles from "./Header.module.css";

const siteTitle = useState("siteTitle");
</script>

<template>
  <header :class="styles.pageHeader">
    <a href="/">
      <h1 v-if="siteTitle">{{ siteTitle }}</h1>
      <h1 v-else>The Sock Kingdom</h1>
    </a>
    <Navigation />
  </header>
</template>