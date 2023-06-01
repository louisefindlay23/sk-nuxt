<script setup>
import styles from "./PostList.module.css";

const props = defineProps(["posts"]);

// Pagination functions
const showPosts = useState("showPosts", () => props.posts);
const postPage = useState("postPage", () => 1);

const getPreviousPosts = () => {
  const previousPosts = showPosts.value.slice(postPage - 1, postPage);
  const previousPage = postPage - 1;
  showPosts.value = previousPosts;
  postPage.value = previousPage;
};

const getNextPosts = () => {
  const nextPosts = showPosts.value.slice(postPage + 1, postPage + 2);
  const nextPage = postPage + 1;
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
    <button @click="getPreviousPosts" :disabled="postPage === 1">
      Previous
    </button>
    <button @click="getNextPosts" :disabled="postPage === showPosts.length - 1">
      Next
    </button>
  </div>
</template>