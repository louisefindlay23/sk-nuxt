<script setup>
defineProps(getSliceComponentProps(["slice", "index", "slices", "context"]));
import pigLatin from "piglatin";

// Convert h2s into Pig Latin
const latinSerializer = {
  heading2: ({ children }) => `<h2>${pigLatin(children)}`,
};
</script>

<template>
  <prismic-rich-text
    :field="slice.primary.heading"
    :htmlSerializer="latinSerializer"
  ></prismic-rich-text>
</template>