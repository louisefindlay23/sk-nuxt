import { repositoryName } from "./slicemachine.config.json";

export default defineNuxtConfig({
  devtools: true,

  modules: ["@nuxtjs/prismic"],

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
});
