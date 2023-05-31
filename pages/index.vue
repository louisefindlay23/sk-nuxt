<script setup>
// TODO: Import Slices better - probably in components folder
import TextSlice from "../slices/Text/index.vue";
import RecentPostsSlice from "../slices/RecentPosts/index.vue";
const { client } = usePrismic();
const { data: home } = await useAsyncData("home", () =>
  client.getSingle("home")
);

const components = {
  text: TextSlice,
  recent_posts: RecentPostsSlice,
};
</script>

<template>
  <!--  -->
  <slice-zone
    :slices="home.data.body"
    :components="components"
    wrapper="main"
  />
</template>