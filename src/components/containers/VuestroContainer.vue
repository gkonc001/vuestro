<template>
  <div class="vuestro-container"
       :class="[ gutter, { overflowHidden }]"
       :style="style"
       @click="onClick">
    <div v-if="inner"
         class="vuestro-container-inner"
         :style="style">
      <slot></slot>
    </div>
    <template v-else>
      <slot></slot>
    </template>
  </div>
</template>

<script>

export default {
  name: 'VuestroContainer',
  props: {
    gutter: { type: String, default: 'md' },  // { 'none', 'sm', 'md', 'lg', 'xl' }
    inner: { type: Boolean, default: false }, // uses an absolutely positioned inner div

    column: { type: Boolean, default: false },
    reverse: { type: Boolean, default: false },
    noWrap: { type: Boolean, default: false },

    grow: { type: String, default: '1' },       // flexbox grow value
    shrink: { type: String, default: '1' },     // flexbox shrink value
    basis: { type: String, default: 'auto' },   // flexbox basis value
    self: { type: String, default: 'auto' },    // use standard flexbox values for align-self

    justify: { type: String, default: 'flex-start' }, // use standard flexbox values for justify-content
    align: { type: String, default: 'stretch' },      // use standard flexbox values for align-items
    content: { type: String, default: 'flex-start' }, // use standard flexbox values for align-content

    overflowHidden: { type: Boolean, default: null }, // adds overflow:hidden css
  },
  computed: {
    style() {
      let flexDirection = 'row';
      if (this.column) {
        flexDirection = 'column';
      }
      // add reverse if set
      if (this.reverse) {
        flexDirection += '-reverse';
      }
      return {
        'padding': 'var(--vuestro-gutter)',
        'flex-direction': flexDirection,
        'flex-grow': this.grow,
        'flex-shrink': this.shrink,
        'flex-basis': this.basis,
        'flex-wrap': this.noWrap ? 'nowrap':'wrap',
        'justify-content': this.justify,
        'align-items': this.align,
        'align-content': this.content,
      };
    },
  },
  methods: {
    // proxy the click event
    onClick(e) {
      this.$emit('click', e);
    },
  },
};

</script>

<style>

.vuestro-app {
  --vuestro-gutter-sm: 0.2em;
  --vuestro-gutter-md: 0.5em;
  --vuestro-gutter-lg: 0.8em;
  --vuestro-gutter-xl: 1em;
}

</style>

<style scoped>

.vuestro-container {
  display: flex;
  position: relative;
}
.vuestro-container.overflowHidden {
  overflow: hidden;
}
.vuestro-container.xl {
  --vuestro-gutter: var(--vuestro-gutter-xl);
}
.vuestro-container.lg {
  --vuestro-gutter: var(--vuestro-gutter-lg);
}
.vuestro-container.md {
  --vuestro-gutter: var(--vuestro-gutter-md);
}
.vuestro-container.sm {
  --vuestro-gutter: var(--vuestro-gutter-sm);
}
.vuestro-container.none {
  --vuestro-gutter: 0px;
}
.vuestro-container-inner {
  display: flex;
  min-width: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

</style>