<script setup>
import Prism from "prismjs";
import "./prism-ghcolors.css";

useHead({
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css?family=Fira+Code&display=swap",
    },
  ],
});

defineProps(getSliceComponentProps(["slice", "index", "slices", "context"]));

Prism.hooks.add("before-highlight", function (env) {
  env.code = env.element.innerText;
});

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