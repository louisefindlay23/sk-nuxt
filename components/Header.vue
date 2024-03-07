<script setup>
const siteTitle = useState("siteTitle");
</script>

<template>
  <header class="pageHeader">
    <a href="/">
      <h1 v-if="siteTitle">{{ siteTitle }}</h1>
      <h1 v-else>The Sock Kingdom</h1>
    </a>
    <Navigation />
  </header>
</template>

<style scoped>
/* Page Header Styles */
.pageHeader {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 5px solid #000000;
}
</style>
