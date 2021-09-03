// Used as a container for VuestroPill and as the base container for VuestroMultiSelect
//
// CSS Vars:
// --vuestro-tray-title-font-size
// --vuestro-tray-title-font-weight
// --vuestro-tray-title-text-transform
// --vuestro-tray-title-margin-right
//
<template>
  <div class="vuestro-tray"
       :class="[`vuestro-tray-${variant}`, size, { stretch, noMargin }]">
    <div v-if="$slots.title" class="vuestro-tray-title flex-align-self-center">
      <slot name="title"></slot>
    </div>
    <vuestro-title v-else-if="title" class="vuestro-tray-title flex-align-self-center">{{ title }}</vuestro-title>
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'VuestroTray',
  props: {
    title: { type: String, required: false },      // title string
    variant: { type: String, default: 'regular' }, // regular, outline, shaded
    size: { type: String, default: 'md' },         // standard vuestro size string
    stretch: { type: Boolean, default: false },    // enable flex-grow
    noMargin: { type: Boolean, default: false },   // set margin: 0
  },
};

</script>

<style scoped>

.vuestro-tray.sm {
  --vuestro-tray-min-height: var(--vuestro-control-sm-height);
}
.vuestro-tray.md {
  --vuestro-tray-min-height: var(--vuestro-control-md-height);
}
.vuestro-tray.lg {
  --vuestro-tray-min-height: var(--vuestro-control-lg-height);
}
.vuestro-tray.xl {
 --vuestro-tray-min-height: var(--vuestro-control-xl-height);
}
.vuestro-tray {
  display: flex;
  position: relative;
  min-height: var(--vuestro-tray-min-height);
  min-width: 0;
  margin: var(--vuestro-control-margin-v) var(--vuestro-control-margin-h);
  border-radius: var(--vuestro-control-border-radius);
}
.vuestro-tray.stretch {
  flex-grow: 1;
}
.vuestro-tray.noMargin {
  margin: 0;
}
.vuestro-tray-outline {
  border: var(--vuestro-control-border-width) solid var(--vuestro-outline);
}
.vuestro-tray-regular {
  border-bottom: var(--vuestro-control-border-width) solid var(--vuestro-outline);
}

.vuestro-tray-shaded {
  border: none;
  background-color: var(--vuestro-field-bg);
}
.vuestro-dark .vuestro-tray-shaded {
  background-color: var(--vuestro-darker);
}

.vuestro-tray-title {
  text-transform: var(--vuestro-tray-title-text-transform, uppercase);
  font-size: var(--vuestro-tray-title-font-size, 0.7em);
  font-weight: var(--vuestro-tray-title-font-weight, 500);
  margin-left: calc(var(--vuestro-tray-min-height) / 4);
  margin-right: var(--vuestro-tray-title-margin-right, 0.5em);
  align-self: center;
  pointer-events: none;
}

</style>