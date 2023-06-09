<script setup lang="ts">
  import AppAvatar from '@/app/components/atoms/AppAvatar.vue'
  import { localeFormatDistance } from '@/app/tools/date/Date'
  import { computed, PropType } from 'vue'
  import { Author } from '@/app/modules/feed/models/Author'
  import { isPropertyValid } from '@/app/tools/component-properties/PropertyValidator'
  import { AvailableFeedPostType } from '@/app/modules/feed/models/FeedPostType'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const props = defineProps({
    author: {
      type: Object as PropType<Author>,
      required: true,
      validator: isPropertyValid(Author),
    },
    postType: {
      type: String as PropType<keyof typeof AvailableFeedPostType>,
      required: true,
      validator: (value: string) =>
        Object.keys(AvailableFeedPostType).includes(value),
    },
    publicationDate: {
      type: Date,
      required: true,
    },
  })
  const publicationDateDistance = computed(() =>
    localeFormatDistance(props.publicationDate, new Date(), {
      addSuffix: false,
    })
  )
</script>

<template>
  <div class="flex gap-3 items-center">
    <AppAvatar size="sm" :user-name="author.name" :url="author.avatar" />
    <span>{{ t(`postType.${postType}`, { authorName: author.name }) }}</span>
    <div class="flex relative flex-shrink-0 gap-2 items-center ml-auto">
      <div
        class="absolute -left-3 w-0 h-0 rounded-full border-3 border-primary"
      />
      <span class="text-neutral">{{ publicationDateDistance }}</span>
    </div>
  </div>
</template>

<i18n lang="yaml">
en:
  postType:
    userShareSong: '{authorName} shared a song'
    userShareAlbum: '{authorName} shared an album'
    userSharePlaylist: '{authorName} shared a playlist'
    artistReleaseSong: '{authorName} released a new song'
    artistReleaseAlbum: '{authorName} released a new album'
fr:
  postType:
    userShareSong: '{authorName} a partagé un morceau'
    userShareAlbum: '{authorName} a partagé un album'
    userSharePlaylist: '{authorName} a partagé une playlist'
    artistReleaseSong: '{authorName} a sortie un nouveau morceau'
    artistReleaseAlbum: '{authorName} a sortie un nouvel album'
</i18n>
