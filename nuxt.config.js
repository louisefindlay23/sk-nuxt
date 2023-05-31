export default defineNuxtConfig({
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
});
