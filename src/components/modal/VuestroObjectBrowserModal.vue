<template>
  <vuestro-modal :active.sync="active" close-on-blur>
    <template #title>
      <slot name="title"></slot>
    </template>
    <template #toolbar>
      <vuestro-button pill no-border size="sm" @click="$refs.theObjectBrowser.expandAll()">
        <template #icon>
          <vuestro-icon name="expand-alt"></vuestro-icon>
        </template>
        Expand All
      </vuestro-button>
      <vuestro-button pill no-border size="sm" @click="$refs.theObjectBrowser.collapseAll()">
        <template #icon>
          <vuestro-icon name="compress-alt"></vuestro-icon>
        </template>
        Collapse All
      </vuestro-button>
      <vuestro-button round no-border size="sm" @click="vuestroDownloadAsJson(obj, filename)">
        <vuestro-icon name="download"></vuestro-icon>
      </vuestro-button>
    </template>
    <vuestro-object-browser ref="theObjectBrowser" :data="obj"></vuestro-object-browser>
  </vuestro-modal>
</template>

<script>

export default {
  name: 'VuestroObjectBrowserModal',
  data() {
    return {
      active: false,
      obj: {},
    };
  },
  computed: {
    filename() {
      if (this.$slots.title && this.$slots.title.length > 0 && this.$slots.title[0].text) {
        return `${this.$slots.title[0].text.replace(/[\s\/]/g, '-')}.json`;
      } else {
        return 'object-browser-download.json';
      }
    },
  },
  methods: {
    openWithObj(obj) {
      this.obj = obj;
      this.active = true;
    },
    close() {
      this.active = false;
    },
  },
};

</script>