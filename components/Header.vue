<script setup>
const siteTitle = "The Sock Kingdom";
</script>

<template>
  <header class="pageHeader">
    <a href="/">
      <h1>{{ siteTitle }}</h1>
    </a>
    <Navigation />
  </header>
</template>

<style scoped>
.pageHeader {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 5px solid #000000;
}
</style>