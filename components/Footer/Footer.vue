<script setup>
import styles from "./Footer.module.css";

const siteTitle = useState("siteTitle");
</script>

<template>
  <footer :class="styles.pageFooter">
    <p v-if="siteTitle">© {{ new Date().getFullYear() }} {{ siteTitle }}</p>
    <p v-else>© {{ new Date().getFullYear() }} The Sock Kingdom</p>
  </footer>
</template>