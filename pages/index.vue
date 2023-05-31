<script setup>
import TextSlice from "../slices/Text/index.vue";
const { client } = usePrismic();
const { data: home } = await useAsyncData("home", () =>
  client.getSingle("home")
);

const components = {
  text: TextSlice,
};
</script>

<template>
  <slice-zone
    :slices="home.data.body"
    :components="components"
    wrapper="main"
  />
</template>