<template>
  <div>
    <h2 class="font-sans text-4xl font-bold text-gray-500">
      {{ post.title }}
    </h2>
    <div 
      class="mt-8 prose prose-lg max-w-none"
      v-html="post.body"
    ></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      post: {
        id: null,
        title: null,
        body: null,
        published_at: null,
        tags: null,
      }
    }
  },
  mounted () {
    this.fetchPost();

  },
  methods: {
    async fetchPost () {
      let slug = this.$route.path.split('/')[2];
      let data = (await this.$axios.$get('http://localhost:1337/posts?slug=' + slug))[0];
      this.post.id = data.id;
      this.post.title = data.title;
      this.post.body = this.$md.render(data.body);
      this.post.published_at = data.published_at;
      this.post.tags = data.tags;
    }
  }
}
</script>