<script setup>
import Prism from "prismjs";

defineProps(getSliceComponentProps(["slice", "index", "slices", "context"]));

const codeSerializer = {
  preformatted: ({ children }) =>
    `<pre><code class="language-html">${children}</pre>`,
};
</script>

<template>
  <div>
    <link href="/prism-ghcolors.css" rel="stylesheet" />
    <prismic-rich-text
      :field="slice.primary.code"
      :htmlSerializer="codeSerializer"
    />
  </div>
</template>