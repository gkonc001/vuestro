<template>
  <vuestro-container>
    <vuestro-card color="var(--vuestro-cyan)">
      <template #heading>Typography</template>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>VuestroCleanKvp</template>
      <template #description>A simple and clean way to display key value pairs; placing more emphasis on the important part, the value.</template>
      <vuestro-container column>
        <vuestro-clean-kvp>
          <template #key>name</template>
          <template #value>Vuestro Library</template>
        </vuestro-clean-kvp>
        <vuestro-clean-kvp>
          <template #key>version</template>
          <template #value>v1.0.0</template>
        </vuestro-clean-kvp>
        <vuestro-clean-kvp>
          <template #key>date</template>
          <template #value>{{ (new Date).toISOString() }}</template>
        </vuestro-clean-kvp>
      </vuestro-container>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>VuestroCleanKvp</template>
      <template #description><span>A component to use for spacing against adjacent components (e.g. icons). Use <vuestro-code>flush-left</vuestro-code> and <vuestro-code>flush-right</vuestro-code> props as needed.</span></template>
      <vuestro-container>
        <vuestro-label flush-left>Label</vuestro-label><vuestro-icon name="spinner" pulse></vuestro-icon>
      </vuestro-container>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>Async Text</template>
      <template #description>
        <span>Simple spinner that shows for a text field that evaluates to null or undefined.</span>
      </template>
      <vuestro-container>
        <vuestro-async-text :value="asyncText"></vuestro-async-text>
      </vuestro-container>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>Search Term Highlighting</template>
      <template #description>
        <span>VuestroSearchHighlight handles rendering a string with a search term highlight</span>
      </template>
      <vuestro-container>
        <vuestro-search-highlight searchTerm="consect">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, laborum fuga nihil eligendi exercitationem suscipit aliquid deleniti eveniet aspernatur accusantium quasi ullam et iusto quis sunt odit voluptas! Maxime, recusandae? Lorem ipsum dolor sit amet, Consectetur adipisicing elit.
        </vuestro-search-highlight>
      </vuestro-container>
    </vuestro-card>
    <vuestro-card>
      <vuestro-container>
        <vuestro-search-highlight searchTerm="wontfindthis">String with no matches!</vuestro-search-highlight>
      </vuestro-container>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>Icons</template>
      <template #description>
        Vuestro currently contains all the free FontAwesome icons. They are abstracted through the VuestroIcon component, but the names and most of the prop options are passed through.
      </template>
      <vuestro-container>
        <vuestro-card cols="1" class="icon-tile" v-for="i in icons" :key="i">
          <vuestro-icon :name="i" scale="2"></vuestro-icon>
          <div>{{ i }}</div>
        </vuestro-card>
      </vuestro-container>
    </vuestro-card>
  </vuestro-container>
</template>

<script>

export default {
  name: 'Typography',
  data() {
    return {
      asyncText: null,
      icons: [
        'adjust',
        'brands/android',
        'brands/app-store-ios',
        'brands/apple',
        'archive',
        'archway',
        'at',
        'asterisk',
        'atlas',
        'brands/aws',
        'balance-scale',
        'ban',
        'band-aid',
        'barcode',
        'bars',
        'battery-full',
        'bell',
        'bell-slash',
        'binoculars',
        'brands/bitcoin',
        'brands/bluetooth',
        'bolt',
        'bomb',
        'book',
        'book-open',
        'bookmark',
        'border-all',
        'box',
        'box-open',
        'boxes',
        'brain',
        'briefcase',
        'broadcast-tower',
        'bug',
        'building',
        'bullhorn',
        'bullseye',
        'burn',
        'calculator',
        'calendar',
        'calendar-alt',
        'calendar-week',
        'camera',
        'certificate',
        'chart-area',
        'chart-bar',
        'chart-pie',
        'check',
        'check-square',
        'chess-board',
        'brands/chrome',
        'circle',
        'city',
        'clipboard',
        'clipboard-list',
        'clock',
        'clone',
        'cloud',
        'cloud-download-alt',
        'code',
        'cog',
        'cogs',
        'coins',
        'columns',
        'comment',
        'comment-alt',
        'comments',
        'compass',
        'cookie',
        'copy',
        'cube',
        'cubes',
        'cut',
        'database',
        'desktop',
        'digital-tachograph',
        'brands/docker',
        'dot-circle',
        'download',
        'edit',
        'envelope',
        'eraser',
        'ethernet',
        'exchange-alt',
        'exclamation',
        'exclamation-triangle',
        'expand',
        'external-link-square-alt',
        'eye',
        'eye-slash',
        'brands/facebook-square',
        'file',
        'filter',
        'flag',
        'folder',
        'folder-open',
        'globe-americas',
        'brands/google',
        'hammer',
        'hashtag',
        'hdd',
        'heart',
        'home',
        'id-badge',
        'image',
        'images',
        'inbox',
        'info',
        'key',
        'landmark',
        'laptop',
        'layer-group',
        'leaf',
        'lightbulb',
        'link',
        'list-alt',
        'location-arrow',
        'lock',
        'magic',
        'map-marked',
        'mobile-alt',
        'network-wired',
        'paper-plane',
        'paperclip',
        'pencil-ruler',
        'photo-video',
        'poll',
        'power-off',
        'question-circle',
        'robot',
        'rocket',
        'brands/safari',
        'save',
        'scroll',
        'search',
        'server',
        'shield-alt',
        'signal',
        'sitemap',
        'sliders-h',
        'star',
        'sticky-note',
        'store-alt',
        'stream',
        'suitcase',
        'sync-alt',
        'table',
        'tag',
        'tags',
        'th',
        'th-list',
        'thumbs-down',
        'thumbs-up',
        'toolbox',
        'tools',
        'tractor',
        'truck',
        'tv',
        'university',
        'unlock',
        'upload',
        'user',
        'users',
        'users-cog',
        'wallet',
        'warehouse',
        'wave-square',
        'wifi',
        'window-maximize',
        'wrench',
      ],
    };
  },
  mounted() {
    setTimeout(() => {
      this.asyncText = 'I was loaded asynchronously!';
    }, 2000);
  }
};

</script>

<style scoped>

.icon-tile {
  margin: 0.5em;
  justify-content: space-between;
  font-size: 0.8em;
  align-items: center;
}

</style>