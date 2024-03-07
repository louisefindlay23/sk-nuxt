<script setup>
defineProps(getSliceComponentProps(["slice", "index", "slices", "context"]));
</script>

<template>
  <PrismicRichText :field="slice.primary.heading" />
</template>
