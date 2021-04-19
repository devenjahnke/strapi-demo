<template>
  <div class="px-64 py-24">
    <div class="flex space-x-64">
      <header class="flex-none">
        <h1 class="font-sans text-6xl font-bold text-gray-800">
          {{ content.title }}
        </h1>
        <h2 class="mt-4 font-sans text-4xl font-normal text-gray-500">
          {{ content.subtitle }}
        </h2>
      </header>
      <nav class="flex items-end justify-end flex-1 space-x-4">
        <NuxtLink 
          to="/"
          class="font-sans text-lg font-normal text-gray-500 underline hover:no-underline"  
        >
          Home
        </NuxtLink>
        <NuxtLink 
          to="/posts"
          class="font-sans text-lg font-normal text-gray-500 underline hover:no-underline"  
        >
          Blog Posts
        </NuxtLink>
      </nav>
    </div>
    <hr class="mt-8 mb-16">
    <Nuxt />
  </div>
</template>

<script>
export default {
  data () {
    return {
      content: {
        title: null,
        subtitle: null,
      }
    };
  },
  mounted () {
    this.fetchContent();
  },
  methods: {
    async fetchContent () {
      let data = await this.$axios.$get('http://localhost:1337/homepage');
      this.content.title = data.title;
      this.content.subtitle = data.subtitle;
    },
  }
}
</script>

<style>
body {
  @apply bg-gray-100;
}
</style>
