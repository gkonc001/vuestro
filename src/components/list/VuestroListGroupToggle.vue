<template>
  <div class="vuestro-list-group-toggle" @click="toggle">
    <vuestro-caret :collapsed="!expanded"></vuestro-caret>
    <span class="title">{{ title }}</span>
  </div>
</template>

<script>

export default {
  name: 'VuestroListGroupToggle',
  props: {
    title: { type: String, required: true },
    expanded: { type: Boolean, required: true },
  },
  methods: {
    toggle() {
      let newVal = !this.expanded;
      this.$emit('toggle', newVal);
    },
  },
};

</script>

<style scoped>

.vuestro-list-group-toggle {
  cursor: pointer;
  font-size: 12px;
  line-height: 13px;
  font-weight: 600;
  padding-top: 5px;
  padding-bottom: 5px;
  display: flex;
}

.vuestro-list-group-toggle .title {
  align-self: center;
  user-select: none;
}

</style>