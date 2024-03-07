<script setup>
defineProps(getSliceComponentProps(["slice", "index", "slices", "context"]));
</script>

<template>
  <Prismic-Rich-Text :field="slice.primary.text" />
</template>
