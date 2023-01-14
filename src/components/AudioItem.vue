<template>
    <li class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50"
      :class="`audio-id-${audio.docID}`"
    >
      <div>
        <router-link :to="{ name: 'audio', params: { id: audio.docId } }"
          class="font-bold block text-gray-600 composition-name"
        >
          {{ audio.modified_name }}
        </router-link>
        <span class="text-gray-500 text-sm">{{ audio.display_name }}</span>
      </div>
  
      <div class="text-gray-600 text-lg">
        <router-link
          custom
          :to="{ name: 'audio', params: { id: audio.docId }, hash: '#comments' }"
          v-slot="{ navigate }"
        >
          <!-- I'm using a global directive to show this icon-->
          <span v-icon="'comments'" />
          <span class="comments ml-2" @click="navigate">
            {{ audio.comment_count }}
          </span>
        </router-link>
      </div>
    </li>
  </template>
  
  <script>
  export default {
    name: "AudioItem",
    props: {
      audio: {
        default() {
          return {};
        },
      },
    },
  };
  </script>
  