<script setup>
import styles from "./Image.module.css";

const props = defineProps(
  getSliceComponentProps(["slice", "index", "slices", "context"])
);

// Get Imgix parameters from select field
let imgixParams = null;
if (props.slice.primary.image_transformations === "blackWhite") {
  imgixParams = { duotone: ["black", "white"] };
}
</script>

<template>
  <prismic-image
    :class="styles.featuredImage"
    :field="slice.primary.image"
    :imgix-params="imgixParams"
  />
</template>