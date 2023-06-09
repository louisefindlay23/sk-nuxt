<script setup>
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
    class="featuredImage"
    :field="slice.primary.image"
    :imgix-params="imgixParams"
  />
</template>

<style scoped>
.featuredImage {
  width: 100%;
  height: 300px;
  margin: 1rem 0 1rem 0;
  object-fit: cover;
}
</style>