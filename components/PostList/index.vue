<script setup>
import styles from "./PostList.module.css";

const props = defineProps(["posts"]);

// Pagination functions
const showPosts = useState("showPosts", () => props.posts.slice(0, 1));
const postPage = useState("postPage", () => 0);

const getPreviousPosts = () => {
  const previousPosts = props.posts.slice(postPage.value - 1, postPage.value);
  const previousPage = postPage.value - 1;
  showPosts.value = previousPosts;
  postPage.value = previousPage;
  //console.info(showPosts);
};
const getNextPosts = () => {
  const nextPosts = props.posts.slice(postPage.value + 1, postPage.value + 2);
  const nextPage = postPage.value + 1;
  showPosts.value = nextPosts;
  postPage.value = nextPage;
};
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
    <button
      @click="getPreviousPosts"
      :disabled="postPage === showPosts.length - 1"
    >
      Previous
    </button>
    <button @click="getNextPosts" :disabled="postPage.value === 1">Next</button>
  </div>
</template>