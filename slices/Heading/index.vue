<script setup>
import pigLatin from "piglatin";

defineProps(getSliceComponentProps(["slice", "index", "slices", "context"]));

// Convert h2s into Pig Latin
const latinSerializer = {
  heading4: ({ children }) => `<h4>${pigLatin(children)}</h4>`,
};
</script>

<template>
  <prismic-rich-text
    :field="slice.primary.heading"
    :htmlSerializer="latinSerializer"
  ></prismic-rich-text>
</template>