<template>
  <div>
    <section class="grid grid-cols-5 gap-8">
      <div class="col-span-1">
        <h2 class="font-sans text-4xl font-normal text-gray-500">
          Recent
        </h2>
      </div>
      <div class="col-span-4 space-y-8">
        <post-preview
          v-for="post in recent"
          :key="post.slug" 
          :title="post.title"
          :body="$md.render(post.body).replace(/(<([^>]+)>)/gi, '')"
          :tags="post.tags"
          :published_at="post.published_at"
          :slug="post.slug"
        />
      </div>
    </section>
    <hr class="my-16">
  </div>
</template>

<script>
import PostPreview from "@/components/PostPreview.vue";
export default {
  components: {
    PostPreview,
  },
  data () {
    return {
      recent: null,
    };
  },
  mounted () {
    this.fetchRecent();
  },
  methods: {
    async fetchRecent () {
      let data = await this.$axios.$get('http://localhost:1337/posts?_limit=3&_sort=published_at:DESC')
      console.log()
      this.recent = data;
    },
  }

}
</script>

<style>

</style>
