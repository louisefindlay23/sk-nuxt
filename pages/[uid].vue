<script setup>
import HeadingSlice from "../slices/Heading/index.vue";
import TextSlice from "../slices/Text/index.vue";

const route = useRoute();
const uid = route.params.uid;

const { client } = usePrismic();
const { data: page } = await useAsyncData("page", () =>
  client.getByUID("pages", uid)
);

const components = {
  heading: HeadingSlice,
  text: TextSlice,
};
</script>

<template>
  <main class="page">
    <SliceZone :slices="page.data.body" :components="components" />
  </main>
</template>