// On of the most useful Vuestro components, can be used for tags, badges, key value pairs, etc.
//
// Events:
//  click - emitted when there is a click listener
//  close - emitted when there is a close listener and the x is clicked
//
// CSS Vars:
// --vuestro-pill-radius - use to get squared or slightly-rounded corners
// --vuestro-pill-title-fg - foreground color for title side (left side)
// --vuestro-pill-title-bg - background color for title side (left side)
// --vuestro-pill-value-fg - foreground color for value side (right side)
// --vuestro-pill-value-bg - background color for value side (right side)
//
<template>
  <div class="vuestro-pill"
       :class="[ size, variant,
                 { clickable: $listeners.click,
                   closable: $listeners.close,
                   shadow, draggable, geopattern, noMargin }]"
       :style="style"
       @click="onClick">
    <div v-if="!$slots.title && !$slots.icon"
         class="vuestro-pill-title"
         :class="{ autoCapital }">
      {{ titleComputed }}
    </div>
    <div v-if="$slots.title || $slots.icon"
         class="vuestro-pill-title">
      <div v-if="$slots.icon" class="vuestro-pill-icon-slot">
        <slot name="icon"></slot>
      </div>
      <div v-if="$slots.title"
           class="vuestro-pill-title-slot"
           :class="{ 'vuestro-pill-title-slot-with-buttons': $slots['title-buttons'] }">
        <slot name="title"></slot>
      </div>
      <div v-if="$slots['title-buttons']" class="vuestro-pill-title-buttons">
        <slot name="title-buttons"></slot>
      </div>
    </div>
    <div v-if="$scopedSlots.value"
         class="vuestro-pill-value vuestro-pill-value-layer"
         :class="{ 'vuestro-pill-value-no-right-padding': isValueButtons }">
      <slot name="value"></slot>
    </div>
    <div v-if="isValueButtons"
         class="vuestro-pill-value-buttons vuestro-pill-value-layer">
      <template v-if="$scopedSlots['value-buttons']">
        <slot name="value-buttons"></slot>
      </template>
      <template v-if="$listeners.close">
        <vuestro-button :size="size" round no-border @click.stop="onClose">
          <vuestro-icon name="times"></vuestro-icon>
        </vuestro-button>
      </template>
    </div>
  </div>
</template>

<script>

/* global _ */
import GeoPattern from 'geopattern/geopattern.js';

export default {
  name: 'VuestroPill',
  props: {
    size: { type: String, default: 'md' },                      // standard vuestro size string
    color: { type: String, default: 'var(--vuestro-primary)' }, // color override (title bg)
    variant: { type: String, default: 'default' },              // default, outline, capsule, inverted
    draggable: { type: Boolean, default: false },               // adds a move cursor
    shadow: { type: Boolean, default: false },                  // adds a shadow
    geopattern: { type: null, default: null },                  // uses title for geopattern, or given string
    noMargin: { type: Boolean, default: false },                // remove margins
  },
  data() {
    return {
      autoCapital: false,
    };
  },
  computed: {
    style() {
      let ret = {};
      if (_.isString(this.geopattern)) {
        let text;
        // use the value of geopattern as the seed if it's a string
        if (this.geopattern.length > 0) {
          text = this.geopattern;
        } else {
          text = this.$slots.title[0].text || '';
        }
        ret['--vuestro-pill-geopattern'] = GeoPattern.generate(text.trim()).toDataUrl();
      }
      if (this.color) {
        ret['--vuestro-pill-title-bg'] = this.color;
      }
      return ret;
    },
    titleComputed() {
      this.autoCapital = true;
      if (this.$slots.value && this.$slots.value[0]) {
        let v = this.value || this.$slots.value[0].text;
        if (v && _.isString(v)) {
          return v.trim().slice(0, 1).toUpperCase();
        }
      }
      return '';
    },
    isValueButtons() {
      return this.$scopedSlots['value-buttons'] || this.$listeners.close;
    },
  },
  methods: {
    onClose(e) {
      this.$emit('close', e);
    },
    onClick(e) {
      if (this.$listeners.click) { // only if set
        this.$emit('click', e);
      }
    },
  }
};

</script>

<style>

.vuestro-app {
  --vuestro-pill-radius: 999px;
  /*--vuestro-pill-title-bg: var(--vuestro-secondary);*/
  --vuestro-pill-title-fg: var(--vuestro-text-color-inverse);
  --vuestro-pill-value-fg: var(--vuestro-text-color);
  --vuestro-pill-value-bg: var(--vuestro-widget-light-bg);
}
.vuestro-dark {
  --vuestro-pill-title-fg: var(--vuestro-text-color);
  --vuestro-pill-value-fg: var(--vuestro-text-color);
  --vuestro-pill-value-bg: var(--vuestro-gray-med);
}

</style>

<style scoped>

/* resolve height */
.vuestro-pill.sm {
  --vuestro-pill-height: var(--vuestro-control-sm-height);
}
.vuestro-pill.md {
  --vuestro-pill-height: var(--vuestro-control-md-height);
}
.vuestro-pill.lg {
  --vuestro-pill-height: var(--vuestro-control-lg-height);
}
.vuestro-pill.xl {
  --vuestro-pill-height: var(--vuestro-control-xl-height);
}

.vuestro-pill {
  flex: 0 1 auto;
  display: flex;
  min-width: 0;
  margin: var(--vuestro-control-margin-v) var(--vuestro-control-margin-h);
  z-index: 1;
}

.vuestro-pill.noMargin {
  margin: 0;
}
.vuestro-pill.sm {
  line-height: var(--vuestro-control-sm-height);
  font-size: calc(var(--vuestro-control-sm-height)/1.7);
}
.vuestro-pill.md {
  line-height: var(--vuestro-control-md-height);
  font-size: calc(var(--vuestro-control-md-height)/1.8);
}
.vuestro-pill.lg {
  line-height: var(--vuestro-control-lg-height);
  font-size: calc(var(--vuestro-control-lg-height)/1.9);
}
.vuestro-pill.xl {
  line-height: var(--vuestro-control-xl-height);
  font-size: calc(var(--vuestro-control-xl-height)/2);
}

.vuestro-pill.clickable {
  cursor: pointer;
}
.vuestro-pill.clickable:hover {
  filter: brightness(110%);
}
.vuestro-pill.draggable {
  cursor: move;
}
.vuestro-pill.shadow {
  box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.1);
}

.vuestro-pill-title {
  min-width: var(--vuestro-pill-height); /* for perfect circle */
  display: flex;
  align-items: center;
  justify-content: center;
  /* normal mode background, inverted uses value-bg */
  background-color: var(--vuestro-pill-title-bg, var(--vuestro-secondary));
  /* normal mode foreground, inverted uses value-fg */
  color: var(--vuestro-pill-title-fg);

  border-radius: var(--vuestro-pill-radius);
  background-image: var(--vuestro-pill-geopattern);
}
.vuestro-pill.capsule .vuestro-pill-title {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.vuestro-pill.inverted .vuestro-pill-title {
  color: var(--vuestro-pill-value-fg);
  background-image: none;
  background-color: var(--vuestro-pill-value-bg);
}
.vuestro-pill.inverted.outline .vuestro-pill-title {
  border: 1px solid var(--vuestro-pill-title-bg);
  box-sizing: content-box;
}

.vuestro-pill-title-slot {
  padding-left: 0.6em;
  padding-right: 0.6em;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.vuestro-pill-title.autoCapital {
  padding: 0;
}
.vuestro-pill-title-slot-with-buttons {
  padding-right: 0.3em;
}
.vuestro-pill-title-buttons {
  display: flex;
  /* automatically remove margins for embedded vuestro controls */
  --vuestro-control-margin-v: 0;
  --vuestro-control-margin-h: 0;
}

.vuestro-pill-value-layer {
  background-color: var(--vuestro-pill-value-bg);
  border-top-right-radius: var(--vuestro-pill-radius);
	border-bottom-right-radius: var(--vuestro-pill-radius);
  /* offsets to simulate wrapping around a round title (chinking) */
	margin-left: calc(var(--vuestro-pill-height) / -2);
	padding-left: calc(var(--vuestro-pill-height) / 2 + 0.3em);
}

.vuestro-pill-value {
  position: relative;
  padding-right: 0.5em;
  white-space: nowrap;
  text-overflow: ellipsis;
	color: var(--vuestro-pill-value-fg);
	border-top-right-radius: var(--vuestro-pill-radius);
	border-bottom-right-radius: var(--vuestro-pill-radius);
	background-color: var(--vuestro-pill-value-bg);
	transition: background-color 0.4s;
	z-index: -1;
}
.vuestro-pill-value-no-right-padding {
  padding-right: 0;
}
.vuestro-pill.inverted .vuestro-pill-value {
  color: var(--vuestro-pill-title-fg);
  background-color: var(--vuestro-pill-title-bg);
  background-image: var(--vuestro-pill-geopattern);
}
.vuestro-pill.outline .vuestro-pill-value {
  border: 1px solid var(--vuestro-pill-title-bg);
  box-sizing: content-box;
}

/* add slight overlap for multiple buttons so they don't take up as much space */
.vuestro-pill-value-buttons {
  display: flex;
  /* automatically remove margins for embedded vuestro controls */
  --vuestro-control-margin-v: 0;
  --vuestro-control-margin-h: 0;
	z-index: -2;
}
.vuestro-pill-value-buttons > .vuestro-button:not(:first-child) {
  margin-left: -0.2em;
}

.vuestro-pill-icon-slot {
  padding-left: 0.4em;
  margin-right: -0.3em;
}
.vuestro-pill-icon-slot:only-child {
  padding-right: 0.4em;
  margin-right: 0;
}
.vuestro-pill.sm .vuestro-pill-icon-slot {
  width: var(--vuestro-control-sm-height);
}
.vuestro-pill.md .vuestro-pill-icon-slot {
  width: var(--vuestro-control-md-height);
}
.vuestro-pill.lg .vuestro-pill-icon-slot {
  width: var(--vuestro-control-lg-height);
}
.vuestro-pill.xl .vuestro-pill-icon-slot {
  width: var(--vuestro-control-xl-height);
}

.vuestro-pill.geopattern .vuestro-pill-title {
  background-repeat: repeat;
}

</style>