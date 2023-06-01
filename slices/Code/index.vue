<script setup>
defineProps(getSliceComponentProps(["slice", "index", "slices", "context"]));

const codeSerializer = {
  preformatted: ({ children }) => `<pre class="code">${children}</pre>`,
};
</script>

<template>
  <prismic-rich-text
    :field="slice.primary.code"
    :htmlSerializer="codeSerializer"
  />
</template>