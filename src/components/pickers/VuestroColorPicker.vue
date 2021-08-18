<template>
  <vuestro-dropdown :disabled="disabled"
                    :right="right"
                    :close-on-leave="closeOnLeave"
                    close-on-content-click no-padding>
    <template #button>
      <vuestro-button :size="size"
                      :pill="pill"
                      variant="none"
                      value
                      :style="{ '--variant-color': value }">
        <!--PROXY THE PLACEHOLDER-->
        <template v-if="$slots.placeholder" #placeholder>
          <slot name="placeholder"></slot>
        </template>
        <vuestro-icon name="angle-down"></vuestro-icon>
      </vuestro-button>
    </template>
    <!--THE PALETTE-->
    <vuestro-container gutter="none" justify="center">
      <div v-for="c in colors"
           :key="c"
           class="vuestro-color-picker-chip"
           :style="{ 'background-color': c }"
           @click="onSelectColor(c)">
      </div>
    </vuestro-container>
  </vuestro-dropdown>
</template>

<script>

export default {
  name: 'VuestroColorPicker',
  props: {
    size: { type: String, default: 'md' },
    right: { type: Boolean },
    pill: { type: Boolean },
    value: { type: String, required: true },
    disabled: { type: Boolean, default: false },
    palette: { type: Array },
    closeOnLeave: { type: Boolean, default: false }, // automatically close on mouseleave
  },
  data() {
    return {
      open: false,
    };
  },
  computed: {
    colors() {
      if (this.palette) {
        return this.palette;
      }
      let style = getComputedStyle(this.$root.$el);
      return this.vuestroColorPalette().map(function(c) {
        return style.getPropertyValue(c);
      });
    },
  },
  methods: {
    onSelectColor(c) {
      this.$emit('input', c);
    }
  }
};

</script>

<style scoped>

.vuestro-color-picker-chip {
  width: 1.6em;
  height: 1.6em;
  border-radius: 50%;
  margin: 0.3em;
  cursor: pointer;
}
.vuestro-color-picker-chip:hover {
  border: 1px solid var(--vuestro-outline);
  filter: brightness(120%);
}

.vuestro-container {
  margin: 0.3em 0;
}

</style>