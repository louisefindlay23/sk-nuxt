import { getLocales } from "~/lib/getLocales";

export const useLocales = (page) => {
  const prismic = usePrismic();
  const locales = ref([]);

  watchEffect(async () => {
    if (page.value) {
      locales.value = await getLocales(page.value, prismic.client);
    }
  });

  return { locales };
};
