<script setup>
import shiki from "shiki";

defineProps(getSliceComponentProps(["slice", "index", "slices", "context"]));

const highlighter = await shiki.getHighlighter({
  theme: "nord",
  langs: ["html"],
});
const codeSerializer = {
  preformatted: ({ children }) =>
    highlighter.codeToHtml(children, { lang: "html" }),
};
</script>

<template>
  <prismic-rich-text
    :field="slice.primary.code"
    :htmlSerializer="codeSerializer"
  />
</template>