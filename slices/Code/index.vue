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

onMounted(() => {
  /*   Prism.hooks.add("before-highlight", function (env) {
    console.info("Hook hit");
    console.info(env);
    env.code = env.element.innerText;
  });
  Prism.highlightElement(env.code);
  Prism.highlightAll(); */

  Prism.hooks.add("before-sanity-check", function (env) {
    console.info("Hook hit");
    env.element.innerHTML = env.element.innerText.replace(/>/g, ">\n");
    console.info(env.element.innerHTML);
    env.code = env.element.innerHTML;
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