<script setup>
import styles from "./Footer.module.css";
const siteTitle = "The Sock Kingdom";
</script>

<template>
  <footer :class="styles.pageFooter">
    <p>© {{ new Date().getFullYear() }} {{ siteTitle }}</p>
  </footer>
</template>