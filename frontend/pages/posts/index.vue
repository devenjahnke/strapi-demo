<template>
  <div>
    <section class="grid grid-cols-5 gap-8">
      <div class="col-span-1">
        <section class="p-8 bg-white rounded shadow">
          <h4 class="font-sans text-xl font-bold text-gray-500">
            Filter Options
          </h4>
          <hr class="mt-2 mb-4">
          <h5 class="font-sans text-lg font-bold text-gray-500">
            Tags
          </h5>
          <div class="mt-1 ml-1">
            <div 
              class=""
              v-for="tag in tags"
              :key="tag.slug"  
            >
              <input 
                type="checkbox" 
                class=""
                :id="tag.slug"
                :name="tag.slug"
                :value="tag.slug"
                v-model="filter_tags"
              >
              <label 
                :for="tag.slug" 
                class=""
              >
                {{ tag.name }}
              </label>
            </div>
          </div>
          <h5 class="mt-4 font-sans text-lg font-bold text-gray-500">
            Publication Date
          </h5>
          <div class="mt-1">
            <label 
              for="sort_published" 
              class="hidden"
            >
              Sort publication date
            </label>
            <select 
              name="sort_published" 
              id="sort_published" 
              class="w-full mt-1 text-gray-700 border border-gray-500 rounded"
              v-model="sort_published"
            >
              <option value="published_at:ASC" selected>Newest</option>
              <option value="published_at:DESC">Oldest</option>
            </select>
          </div>
        </section>
      </div>
      <div class="col-span-4 space-y-8">
        <post-preview
          v-for="post in posts"
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
export default {
  data () {
    return {
      posts: null,
      tags: null,
      filter_tags: [],
      sort_published: 'published_at:ASC',
    };
  },
  mounted () {
    this.filter_tags = new URLSearchParams(window.location.search).getAll('tags.slug');
    this.fetchPosts(window.location.search);
    this.fetchTags();
  },
  computed: {
    queryParams () {
      return new URLSearchParams(window.location.search).getAll('tags.slug');
    },
  },
  methods: {
    async fetchPosts (query) {
      let data = await this.$axios.$get('http://localhost:1337/posts' + query);
      console.log(query)
      this.posts = data;
    },
    async fetchTags () {
      let data = await this.$axios.$get('http://localhost:1337/tags');
      this.tags = data;
    },
    filterByTags () {
      this.filter_tags = new URLSearchParams(window.location.search).getAll('tags.slug');
    },
    updateQueryParams () {
      let queryParams = new URLSearchParams();
      this.filter_tags.forEach(tag => {
        queryParams.set('tags.slug', tag);
      });
      queryParams.set('_sort', this.sort_published);
      history.replaceState(null, null, '?' + queryParams);
      this.fetchPosts('?' + queryParams);
    }
  },
  watch: {
    filter_tags: function (val) {
      this.updateQueryParams();
    },
    sort_published: function (val) {
      this.updateQueryParams();
    }
  }
}
</script>