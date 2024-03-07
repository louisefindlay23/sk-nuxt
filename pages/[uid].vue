<script setup>
import { components } from "~/slices";

const prismic = usePrismic();
const route = useRoute();
const { data: page } = useAsyncData(route.params.uid, () =>
  prismic.client.getByUID("page", route.params.uid)
);

useHead({
  title: prismic.asText(page.value?.data.title),
  meta: [
    { name: "description", content: page.value?.data.meta_description },
    { property: "og:title", content: page.value?.data.meta_title },
    {
      property: "og:description",
      content: page.value?.data.meta_description,
    },
    { property: "og:image", content: page.value?.data.meta_image.url },
    { name: "twitter:card", content: "summary_large_image" },
  ],
});
</script>

<template>
  <SliceZone
    wrapper="main"
    :slices="page?.data.slices ?? []"
    :components="components"
  />
</template>
