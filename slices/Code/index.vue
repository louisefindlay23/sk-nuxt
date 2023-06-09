<script setup>
// Import Prism and a Prismic theme for syntax highlighting and Prettier for code formatting
import Prism from "prismjs";
import "./prism-ghcolors.css";
import prettier from "prettier";
import parserHTML from "prettier/parser-html";

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

// Format the code using Prettier before highlighting it
onMounted(() => {
  Prism.hooks.add("before-sanity-check", function (env) {
    const prettifiedCode = prettier.format(env.element.innerText, {
      parser: "html",
      plugins: [parserHTML],
    });
    env.code = prettifiedCode;
  });

  Prism.highlightAll();
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