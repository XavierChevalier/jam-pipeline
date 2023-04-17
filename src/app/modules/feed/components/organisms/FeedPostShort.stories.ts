import FeedPostShort from './FeedPostShort.vue'
import FeedPostShortItem from '../molecules/FeedPostShortItem.vue'
import { Meta, Story } from '@storybook/vue3'
import { AvailableFeedPostType } from '@/app/modules/feed/models/FeedPostType'
import { omit } from 'lodash-es'
import { generateImageUrl } from '@/app/tools/Faker'

export default {
  title: 'Organisms/Feed/FeedPostShort',
  component: FeedPostShort,
} as Meta

const Template: Story = (args) => ({
  components: { FeedPostShort, FeedPostShortItem },
  setup() {
    return { args, omit }
  },
  template: `
    <FeedPostShort v-bind="omit(args, ['feedShortItems'])">
      <FeedPostShortItem v-for="feedShort in args.feedShortItems" v-bind="feedShort" />
    </FeedPostShort>
  `,
})

const now = new Date()
const oneHourBefore = new Date()
oneHourBefore.setHours(oneHourBefore.getHours() - 1)
const threeDaysBefore = new Date()
threeDaysBefore.setDate(threeDaysBefore.getDate() - 3)

export const With3Items = Template.bind({})
With3Items.args = {
  feedShortItems: [
    {
      publicationDate: now,
      postType: AvailableFeedPostType.userShareSong,
      author: {
        name: 'TheBaronless',
        avatar: generateImageUrl(),
      },
    },
    {
      publicationDate: oneHourBefore,
      postType: AvailableFeedPostType.artistReleaseAlbum,
      author: {
        name: 'John Gomm',
        avatar: `${generateImageUrl()}?1`,
      },
    },
    {
      publicationDate: threeDaysBefore,
      postType: AvailableFeedPostType.userSharePlaylist,
      author: {
        name: 'John Gomm',
        avatar: `${generateImageUrl()}?2`,
      },
    },
  ],
}
