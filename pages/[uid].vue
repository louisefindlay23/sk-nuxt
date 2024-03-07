<script setup>
import { components } from "~/slices";

import { getLocales } from "~/lib/getLocales";

const prismic = usePrismic();
const route = useRoute();
const { locale } = useI18n();

const { data: page } = useAsyncData(route.params.uid, () =>
  prismic.client.getByUID("page", route.params.uid, { lang: locale.value })
);

const locales = ref([]);

watchEffect(async () => {
  if (page.value) {
    locales.value = await getLocales(page.value, prismic.client);
    storeLocales.value = locales.value;
  }
});

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
