const prismic = require("@prismicio/client");

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

    i18n: {
      locales: locales.locales,
      defaultLocale: locales.locales[0],
    },
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