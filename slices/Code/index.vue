<script setup>
// Import Prism and a Prismic theme for syntax highlighting
import Prism from "prismjs";
import "./prism-ghcolors.css";

// Get monospace font
useHead({
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css?family=Fira+Code&display=swap",
    },
  ],
});

defineProps(getSliceComponentProps(["slice", "index", "slices", "context"]));

// Add Prism hook to retain line breaks
Prism.hooks.add("before-highlight", function (env) {
  env.code = env.element.innerText;
});

// Use custom HTML serializer to format code snippet to Prism format
const codeSerializer = {
  preformatted: ({ children }) =>
    `<pre><code class="language-html">${children}</code></pre>`,
};
</script>

<template>
  <div>
    <prismic-rich-text
      :field="slice.primary.code"
      :htmlSerializer="codeSerializer"
    />
  </div>
</template>