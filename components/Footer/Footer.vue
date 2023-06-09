<script setup>
const siteTitle = useState("siteTitle");
</script>

<template>
  <footer class="pageFooter">
    <p v-if="siteTitle">© {{ new Date().getFullYear() }} {{ siteTitle }}</p>
    <p v-else>© {{ new Date().getFullYear() }} The Sock Kingdom</p>
  </footer>
</template>

<style scoped>
.pageFooter {
  font-weight: bold;
  text-align: center;
}
</style>