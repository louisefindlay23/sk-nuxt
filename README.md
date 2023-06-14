## The Sock Kingdom - A Nuxt Prismic Site

[![Netlify Status](https://api.netlify.com/api/v1/badges/34640360-096b-46eb-bb8e-4ab326e30472/deploy-status)](https://app.netlify.com/sites/the-sock-kingdom-nuxt/deploys)

### Purpose

Develop a basic website using Prismic and Nuxt that uses layouts, dynamic routes, and file-based routing. Also, internationlize content using Prismic locales and create a language switcher.

### About the website

The Sock Kingdom website contains three blog posts about buying socks which are displayed on the homepage using a Recent Posts slice. There is also a Posts page which uses pagination to show all blog posts.

The HTML serializer was used to render `h2` elements as Pig Latin via the [`piglatin`](https://github.com/montanaflynn/piglatin) module and code snippet field as a `code` element via the Code custom label. [Prism](https://prismjs.com/) was used to add syntax highlighting to the code snippet.

Other modules used included [`date-fns`](https://date-fns.org) to render the blog post publication date, [`PrimeVue's Dropdown`](https://primevue.org/dropdown) component to create the language switcher select element, and [`flag-icons`](https://www.npmjs.com/package/flag-icons) to display the language icons.

The blog post content was generated via [ChatGPT](https://openai.com/blog/chatgpt) and author profiles using [AI Writer](https://tools.picsart.com/text/ai-writer). All blog post images were taken from [Unsplash](https://unsplash.com).

### Screenshot

![The Sock Kingdom website screenshot](https://github.com/louisefindlay23/sk-nuxt/assets/26024131/642407fe-7eb6-47f1-b16a-b9a16e3e20aa)

### Link

[The Sock Kingdom website deployed on Netlify](https://the-sock-kingdom-nuxt.netlify.app)
