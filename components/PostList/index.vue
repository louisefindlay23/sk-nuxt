<script setup>
import styles from "./PostList.module.css";

const { client } = usePrismic();

// Pagination functions
const showPosts = ref([]);
const postPage = ref(1);

const getPosts = async () => {
  const { data: posts } = await useAsyncData("posts", () =>
    client.getAllByType("posts")
  );
  showPosts.value = posts.slice(0, 1);
  return { posts, showPosts };
};

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

getPosts();
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
    <button
      @click="getNextPosts"
      :disabled="postPage === showPosts.value.length - 1"
    >
      Next
    </button>
  </div>
</template>