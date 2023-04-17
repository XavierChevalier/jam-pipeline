import PlaylistShortcut from './PlaylistShortcut.vue'
import PlaylistShortcutItem from '@/app/modules/playlist/components/molecules/PlaylistShortcutItem.vue'
import { Meta, Story } from '@storybook/vue3'
import { Album } from '@/app/modules/playlist/components/molecules/PlaylistShortcutItem.stories'
import { omit } from 'lodash-es'

export default {
  title: 'Organisms/Playlist/PlaylistShortcut',
  component: PlaylistShortcut,
  subcomponents: { PlaylistShortcutItem },
} as Meta

const Template: Story = (args) => ({
  components: { PlaylistShortcut, PlaylistShortcutItem },
  setup() {
    return { args, omit }
  },
  template: `
    <PlaylistShortcut v-bind="omit(args, ['items'])">
      <PlaylistShortcutItem v-for="itemArgs in args.items" v-bind="itemArgs" />
    </PlaylistShortcut>
  `,
})

export const FavoriteSongs = Template.bind({})
FavoriteSongs.args = {
  title: 'Vos titres préférés',
  items: [...Array(10)].map(() => Album.args),
}

export const LgFavoriteSongs = Template.bind({})
LgFavoriteSongs.args = FavoriteSongs.args
LgFavoriteSongs.parameters = { viewport: { defaultViewport: 'reset' } }
