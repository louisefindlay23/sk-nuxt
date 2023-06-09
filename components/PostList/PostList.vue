<script setup>
import * as prismicH from "@prismicio/helpers";

const props = defineProps(["posts"]);

// Set page number and initial posts
const showPosts = useState("showPosts", () => props.posts.slice(0, 1));
const postPage = useState("postPage", () => 0);

const getPreviousPosts = () => {
  const previousPosts = props.posts.slice(postPage.value - 1, postPage.value);
  const previousPage = postPage.value - 1;
  showPosts.value = previousPosts;
  postPage.value = previousPage;
};
const getNextPosts = () => {
  const nextPosts = props.posts.slice(postPage.value + 1, postPage.value + 2);
  const nextPage = postPage.value + 1;
  showPosts.value = nextPosts;
  postPage.value = nextPage;
};

const findExcerpt = computed(() => {
  const excerpt = showPosts.value[0].data.body.find(
    (slice) => slice.slice_type === "text"
  );
  return excerpt?.primary.text.slice(0, 1) || "";
});
</script>

<template>
  <article v-for="post in showPosts" :key="JSON.stringify(post.data)">
    <div class="boxContent">
      <PrismicLink :field="post">
        <PrismicRichText :field="post.data.title" />
      </PrismicLink>
      <Date :postDate="post.first_publication_date" />
      <!-- Slice the post's first paragraph for the excerpt -->
      <PrismicRichText v-if="findExcerpt" :field="findExcerpt" />
      <p v-else>
        Read on to find {{ prismicH.asText(post.data.title).toLowerCase() }}.
      </p>
    </div>
    <div class="boxImage">
      <PrismicImage :field="post.data.featured_image" />
    </div>
  </article>
  <!-- Pagination buttons -->
  <div class="pagination">
    <button
      @click="getPreviousPosts"
      :disabled="postPage === showPosts.length - 1"
    >
      Previous
    </button>
    <button
      @click="getNextPosts"
      :disabled="postPage === props.posts.length - 1"
    >
      Next
    </button>
  </div>
</template>

<style scoped>
/* Content Box Styles */
.boxContainer > article {
  display: flex;
  justify-content: space-around;
  margin: 3rem 0;
  padding: 1rem 3rem;
  border: 3px solid #000000;
}

.boxContainer > article:first-of-type {
  margin-top: 1rem;
}

.boxContainer > article:last-of-type {
  margin-bottom: 2rem;
}

.boxContainer > section > h2 {
  margin-top: 2rem;
}

.boxContent {
  width: 50%;
}

.boxContent h4 {
  margin-top: 0;
}

.boxImage {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 30%;
}

.boxImage img {
  min-width: 150px;
  object-fit: contain;
}

/* Pagination Styles */
.pagination {
  display: flex;
  justify-content: center;
}

.pagination button {
  margin-bottom: 2vw;
  padding: 1vw 3vw;
}

.pagination button:first-of-type {
  margin-right: 2.5vw;
}

.pagination button:last-of-type {
  margin-left: 2.5vw;
}
</style>