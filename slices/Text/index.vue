<script setup>
defineProps(getSliceComponentProps(["slice", "index", "slices", "context"]));
</script>

<template>
  <prismic-text :field="slice.primary.text"></prismic-text>
</template>