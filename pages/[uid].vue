<script setup>
import HeadingSlice from "~/slices/Heading";
import ImageSlice from "~/slices/Image";
import TextSlice from "~/slices/Text";

const route = useRoute();
const uid = route.params.uid;

const { client } = usePrismic();
const { data: page } = await useAsyncData("page", (locale) =>
  client.getByUID("pages", uid, { lang: locale.value })
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