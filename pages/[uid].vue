<script setup>
import HeadingSlice from "~/slices/Heading";
import ImageSlice from "~/slices/Image";
import TextSlice from "~/slices/Text";

const route = useRoute();
const uid = route.params.uid;

const { client } = usePrismic();
const { data: page } = await useAsyncData("page", () =>
  client.getByUID("pages", uid)
);

const components = {
  heading: HeadingSlice,
  image: ImageSlice,
  text: TextSlice,
};
</script>

<template>
  <main class="page">
    <SliceZone :slices="page.data.body" :components="components" />
  </main>
</template>