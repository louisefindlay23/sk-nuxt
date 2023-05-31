<script setup>
defineProps(getSliceComponentProps(["slice", "index", "slices", "context"]));
</script>

<template>
  <prismic-rich-text :field="slice.primary.text"></prismic-rich-text>
</template>