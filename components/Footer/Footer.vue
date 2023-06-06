<script setup>
import styles from "./Footer.module.css";

const nuxtApp = useNuxtApp();
</script>

<template>
  <footer :class="styles.pageFooter">
    <p>© {{ new Date().getFullYear() }} {{ nuxtApp.$siteTitle }}</p>
  </footer>
</template>