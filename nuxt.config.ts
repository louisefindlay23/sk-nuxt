import { repositoryName } from "./slicemachine.config.json";

const prismic = require("@prismicio/client");

// Get all repository locales from Prismic
const retrieveLocales = async () => {
  const client = prismic.createClient("onboarding-content-management");
  const repository = await client.getRepository();
  const locales = repository.languages.map((lang) => lang.id);
  return {
    locales,
  };
};

export default defineNuxtConfig(async () => {
  const locales = await retrieveLocales();

  return {
    modules: ["@nuxtjs/i18n", "nuxt-primevue", "@nuxtjs/prismic"],

    // Add PrimeVue for Dropdown component
    css: [
      "primevue/resources/themes/lara-light-blue/theme.css",
      "primevue/resources/primevue.css",
    ],

    primevue: {
      components: {
        include: ["Dropdown"],
      },
    },

    // Set i18n locales
    i18n: {
      locales: locales.locales,
      defaultLocale: locales.locales[0],
    },

    prismic: {
      endpoint: repositoryName,
      preview: "/api/preview",
      clientConfig: {
        routes: [
          {
            type: "page",
            path: "/:uid",
          },
          {
            type: "page",
            uid: "home",
            path: "/",
          },
          {
            type: "post",
            path: "/post/:uid",
          },
        ],
      },
    },
  };
});
