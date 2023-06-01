<script setup>
import styles from "./PostList.module.css";

const { client } = usePrismic();
const { data: posts } = await useAsyncData("posts", () =>
  client.getAllByType("posts")
);

// Pagination functions
const defaultPosts = useState("showPosts", () => posts.slice(0, 1));
const postPage = useState("postPage", () => 1);

const getPreviousPosts = () => {
  const previousPosts = posts.slice(postPage - 1, postPage);
  const previousPage = postPage - 1;
  showPosts(previousPosts);
  postPage(previousPage);
};

const getNextPosts = () => {
  const nextPosts = posts.slice(postPage + 1, postPage + 2);
  const nextPage = postPage + 1;
  showPosts(nextPosts);
  postPage(nextPage);
};

console.info(posts);
</script>

<template>
  <article v-for="post in showPosts" :key="JSON.stringify(post.data)">
    <div :class="styles.boxContent">
      <prismic-link :field="post">
        <prismic-rich-text :field="post.data.body[0].primary.heading" />
      </prismic-link>
      <Date :postDate="post.first_publication_date" />
      <!-- Slice the post's first paragraph for the excerpt -->
      <prismic-rich-text :field="post.data.body[2].primary.text.slice(0, 1)" />
    </div>
    <div :class="styles.boxImage">
      <prismic-image :field="post.data.body[1].primary.image" />
    </div>
  </article>
  <!-- Pagination buttons -->
  <div :class="styles.pagination">
    <button @click="getPreviousPosts" :disabled="postPage === 1">
      Previous
    </button>
    <button @click="getNextPosts" :disabled="postPage === posts.length - 1">
      Next
    </button>
  </div>
</template>