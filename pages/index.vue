<script setup>
import TextSlice from "~/slices/Text";
import RecentPostsSlice from "~/slices/RecentPosts";
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