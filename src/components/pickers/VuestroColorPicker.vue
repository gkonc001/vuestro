// A color picker with a few different variants.
//
// CSS Vars:
// --vuestro-color-picker-selected-border: a css border spec
// --vuestro-color-picker-border-radius: radius of color chips
//
<template>
  <vuestro-dropdown v-if="variant === 'dropdown'"
                    :disabled="disabled"
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
        <template v-if="$slots.title" #placeholder>
          <slot name="title"></slot>
        </template>
        <vuestro-icon name="angle-down"></vuestro-icon>
      </vuestro-button>
    </template>
    <!--THE PALETTE-->
    <vuestro-container gutter="none" justify="center">
      <div v-for="c in colors" :key="c"
           class="vuestro-color-picker-chip"
           :class="size"
           :style="{ 'background-color': c }"
           @click="onSelectColor(c)">
      </div>
      <slot name="extra"></slot>
    </vuestro-container>
  </vuestro-dropdown>
  <vuestro-tray v-else-if="variant === 'shaded' || variant === 'outline'"
                :variant="variant">
      <template v-if="$slots.title" #title>
          <slot name="title"></slot>
        </template>
      <div v-for="c in colors" :key="c"
           class="vuestro-color-picker-chip"
           :class="[size, { selected: c === value }]"
           :style="{ 'background-color': c }"
           @click="onSelectColor(c)">
      </div>
      <slot name="extra"></slot>
  </vuestro-tray>
</template>

<script>

export default {
  name: 'VuestroColorPicker',
  props: {
    value: { type: String, required: true },         // v-model support
    size: { type: String, default: 'md' },           // standard vuestro size prop
    variant: { type: String, default: 'dropdown' },  // dropdown, shaded, outline
    right: { type: Boolean },                        // force right-justify for dropdown variant
    pill: { type: Boolean },                         // pill mode for dropdown button
    disabled: { type: Boolean, default: false },     // disable (for readonly)
    palette: { type: Array },                        // array of HTML color strings or CSS vars
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

.vuestro-color-picker-chip.sm {
  height: var(--vuestro-control-sm-height);
  width: var(--vuestro-control-sm-height);
}
.vuestro-color-picker-chip.md {
  height: var(--vuestro-control-md-height);
  width: var(--vuestro-control-md-height);
}
.vuestro-color-picker-chip.lg {
  height: var(--vuestro-control-lg-height);
  width: var(--vuestro-control-lg-height);
}
.vuestro-color-picker-chip.xl {
  height: var(--vuestro-control-xl-height);
  width: var(--vuestro-control-xl-height);
}

.vuestro-color-picker-chip {
  margin: var(--vuestro-control-margin-v) var(--vuestro-control-margin-h);
  border-radius: var(--vuestro-color-picker-border-radius, 50%);
  cursor: pointer;
}
.vuestro-color-picker-chip:hover,
.vuestro-color-picker-chip.selected {
  border: var(--vuestro-color-picker-selected-border, 2px solid var(--vuestro-outline));
  filter: brightness(120%);
}

</style>