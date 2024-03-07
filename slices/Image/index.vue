<script setup>
defineProps(getSliceComponentProps(["slice", "index", "slices", "context"]));
</script>

<template>
  <PrismicImage :field="slice.primary.image" />
</template>

<style scoped>
.featuredImage {
  width: 100%;
  height: 300px;
  margin: 1rem 0 1rem 0;
  object-fit: cover;
}
</style>
