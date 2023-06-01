export default defineNuxtConfig({
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

  modules: ["@nuxtjs/prismic"],

  prismic: {
    endpoint: "onboarding-content-management",
    clientConfig: {
      routes: [
        { type: "posts", path: "/posts/:uid" },
        { type: "home", path: "/" },
        { type: "pages", path: "/:uid" },
      ],
    },
  },

  devtools: {
    enabled: true,
  },
});
