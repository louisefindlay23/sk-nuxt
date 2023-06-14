<script setup>
import pigLatin from "piglatin";

defineProps(getSliceComponentProps(["slice", "index", "slices", "context"]));

// Convert h2s into Pig Latin
const latinSerializer = {
  heading2: ({ children }) => `<h2>${pigLatin(children)}</h2>`,
};
</script>

<template>
  <prismic-rich-text
    :field="slice.primary.heading"
    :htmlSerializer="latinSerializer"
  ></prismic-rich-text>
  <Date v-if="context && context.date" :postDate="context.date" />
</template>