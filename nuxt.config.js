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
    // Add PrimeVue for Dropdown component
    css: [
      "primevue/resources/themes/lara-light-blue/theme.css",
      "primevue/resources/primevue.css",
    ],
    build: {
      transpile: ["primevue"],
      rollupOptions: {
        external: ["/opt/build/repo/plugins/primeVue.js"],
      },
    },
    plugins: [{ src: "./plugins/primeVue.client.js" }],

    components: [
      {
        path: "~/components",
        pathPrefix: false,
      },
      {
        path: "~/slices",
        pathPrefix: false,
      },
    ],

    modules: ["@nuxtjs/i18n", "@nuxtjs/prismic"],

    // Set i18n locales
    i18n: {
      locales: locales.locales,
      defaultLocale: locales.locales[0],
    },
    // Prismic routes
    prismic: {
      endpoint: "onboarding-content-management",
      clientConfig: {
        routes: [
          { type: "posts", path: "/:lang?/posts/:uid" },
          { type: "home", path: "/:lang?" },
          { type: "pages", path: "/:lang?/:uid" },
        ],
      },
    },

    devtools: {
      enabled: true,
    },
  };
});