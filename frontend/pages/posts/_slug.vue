<template>
  <div>
    <section class="p-8 bg-white">
      <h2 class="font-sans text-4xl font-bold text-gray-500">
        {{ post.title }}
      </h2>
      <div class="flex items-center justify-between mt-6">
        <div class="flex space-x-2">
          <div 
            class="px-2 py-1 bg-gray-700"
            v-for="tag in post.tags"
            :key="tag.name"
          >
            <span class="font-sans text-sm font-normal text-white">
              {{ tag.name }}
            </span>
          </div>
        </div>
        <p class="font-sans text-sm font-normal text-gray-500">
          Published <span class="">{{ formatPublishedAt(post.published_at) }}</span>
        </p>
      </div>
      <hr class="mt-4 mb-16">
      <div 
        class="mt-8 prose prose-lg max-w-none"
        v-html="post.body"
      ></div>
    </section>
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
    },
    formatPublishedAt (date) {
      return new Date(date).toLocaleDateString('en-us', {
        day: 'numeric',
        weekday: 'short',
        month: 'long',
        ...(new Date().getFullYear() !== new Date(date).getFullYear() && { year: 'numeric'}),
      });
    }
  }
}
</script>