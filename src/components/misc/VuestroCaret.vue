<template>
  <div class="vuestro-caret" :class="[size, { collapsed, left }]" @click="onClick">
    <vuestro-icon name="angle-down"></vuestro-icon>
  </div>
</template>

<script>

export default {
  name: 'VuestroCaret',
  props: {
    collapsed: { type: Boolean, required: true },
    size: { type: String, default: 'md' },
    left: { type: Boolean, default: false },
  },
  methods: {
    onClick(e) {
      this.$emit('click', e);
    }
  }
};

</script>

<style scoped>

.vuestro-caret.lg {
  --size: 22px;
}

.vuestro-caret.md {
  --size: 18px;
}

.vuestro-caret.sm {
  --size: 12px;
}

.vuestro-caret {
  width: var(--size);
  height: var(--size);
  align-self: center;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.vuestro-caret.collapsed >>> svg {
  transform: rotate(-90deg);
}
.vuestro-caret.collapsed.left >>> svg {
  transform: rotate(90deg);
}
.vuestro-caret >>> svg {
  width: var(--size);
  height: var(--size);
  transition: transform 0.2s;
}

.vuestro-app.mobile .vuestro-caret >>> .vuestro-icon > svg {
  width: calc(var(--size) * 2);
  height: calc(var(--size) * 2);
}
</style>