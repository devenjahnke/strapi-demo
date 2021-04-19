<template>
  <article class="p-8 bg-white rounded shadow">
    <NuxtLink :to="'/posts/' + slug">
      <h3 class="font-sans text-xl font-bold text-gray-500 hover:text-gray-600">
        {{ title }}
      </h3>
    </NuxtLink>
    <p class="mt-2 font-sans text-lg font-normal text-gray-500 line-clamp-3">
      {{ body }}
    </p>
    <div class="flex items-end justify-between mt-6">
      <div class="space-x-2">
        <NuxtLink 
          class="px-2 py-1 bg-gray-700 hover:bg-gray-600"
          v-for="tag in tags"
          :key="tag.name"
          :to="'/posts?tags.slug=' + tag.slug"
        >
          <span class="font-sans text-sm font-normal text-white">
            {{ tag.name }}
          </span>
        </NuxtLink>
      </div>
      <p class="font-sans text-sm font-normal text-gray-500">
        Published <span class="">{{ formatPublishedAt(published_at) }}</span>
      </p>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
    published_at: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  methods: {
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