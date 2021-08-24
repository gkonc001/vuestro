<template>
  <div class="vuestro-title"
       :class="{ clickable,
                 drag: draggable }"
       @click="onClick">
    <span v-if="$slots.icon" class="vuestro-title-icon">
      <slot name="icon"></slot>
    </span>
    <span class="vuestro-title-title">
      <slot></slot>
    </span>
    <span class="vuestro-title-spinner">
      <vuestro-icon scale="0.7" name="spinner" pulse v-if="spinner"></vuestro-icon>
    </span>
  </div>
</template>

<script>

export default {
  name: 'VuestroTitle',
  props: {
    spinner: { type: Boolean, default: false },
    clickable: { type: Boolean, default: false },
    draggable: { type: Boolean, default: false },
  },
  methods: {
    onClick(e) {
      if (this.clickable) {
        this.$emit('click', e);
      }
    }
  }
};

</script>

<style>
.vuestro-app {
  --vuestro-title-font-size: 13px;
  --vuestro-title-font-weight: 600;
  --vuestro-title-text-transform: uppercase;
}

.vuestro-app.mobile {
  --vuestro-title-font-size: 28px;
}
</style>

<style scoped>

.vuestro-title {
  font-size: var(--vuestro-title-font-size);
  font-weight: var(--vuestro-title-font-weight);
  display: flex;
  align-items: center;
  text-transform: var(--vuestro-title-text-transform);
  min-width: 1px;
}
.vuestro-title.clickable {
  pointer-events: initial;
  cursor: pointer;
}

.vuestro-title.drag {
  pointer-events: initial;
  cursor: move;
}
.vuestro-title-title {
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  pointer-events: none;
}

.vuestro-title-icon {
  margin-right: 0.4em;
}

.vuestro-title-spinner {
  margin-left: 0.4em;
}

</style>