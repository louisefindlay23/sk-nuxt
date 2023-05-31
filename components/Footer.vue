<script setup>
const siteTitle = "The Sock Kingdom";
</script>

<template>
  <footer class="pageFooter">
    <p>© {{ new Date().getFullYear() }} {{ siteTitle }}</p>
  </footer>
</template>

<style scoped>
.pageFooter {
  font-weight: bold;
  text-align: center;
}
</style>