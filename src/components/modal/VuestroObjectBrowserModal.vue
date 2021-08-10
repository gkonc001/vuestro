<template>
  <vuestro-modal :active.sync="active">
    <template #title>
      <slot name="title"></slot>
    </template>
    <vuestro-object-browser :data="obj"></vuestro-object-browser>
  </vuestro-modal>
</template>

<script>

export default {
  name: 'VuestroObjectBrowserModal',
  props: {

  },
  data() {
    return {
      active: false,
      obj: {},
    };
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