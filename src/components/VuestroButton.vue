<template>
  <div class="vuestro-button"
       :class="{ stretch }">
    <div class="vuestro-button-inner"
         :class="[`vuestro-button-${variant}`,
                  { mobile: $root.mobile,
                    value,
                    noBorder,
                    noMargin,
                    noPadding,
                    round,
                    pill,
                    checkbox,
                    disabled,
                    shadow }, size]"
         @mouseover="onEnter"
         @mouseleave="onLeave"
         @click="onClick">
      <template v-if="checkbox">
        <template v-if="value">
          <div class="vuestro-button-content">
            <vuestro-icon v-if="checkbox && value" name="check"></vuestro-icon>
          </div>
        </template>
        <template v-else>
          <div class="vuestro-button-content" :style="{ 'justify-content': justify }"></div>
        </template>
      </template>
      <template v-else>
        <div class="vuestro-button-content" :style="{ 'justify-content': justify }">
          <span v-if="$scopedSlots.placeholder" class="vuestro-button-placeholder">
            <slot name="placeholder"></slot>
          </span>
          <span v-if="$scopedSlots.icon" class="vuestro-button-icon" :class="{ showSlotOnHover }"><slot name="icon"></slot></span>
          <transition name="vuestro-button" mode="out-in">
            <div v-if="!showSlotOnHover || hovered" class="vuestro-button-default-slot" :class="{ showSlotOnHover }">
              <slot></slot>
            </div>
          </transition>
        </div>
      </template>
    </div>
    <div v-if="checkbox && $scopedSlots.default" class="vuestro-button-checkbox-text" :class="[ size, { disabled } ]" @click="onClick">
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'VuestroButton',
  props: {
    variant: { type: String, default: 'secondary' },
    noBorder: { type: Boolean, default: false },
    noMargin: { type: Boolean, default: false },
    noPadding: { type: Boolean, default: false },
    checkbox: { type: Boolean, required: false },
    value: { type: Boolean, default: false }, // for v-model support
    disabled: { type: Boolean, default: false }, // no hover, no click
    pill: { type: Boolean, default: false },
    round: { type: Boolean, default: false },
    stretch: { type: Boolean, default: false },
    size: { type: String, default: 'md' },
    shadow: { type: Boolean, default: false },
    justify: { type: String, default: 'space-evenly' },
    showSlotOnHover: { type: Boolean, default: false },
  },
  data() {
    return {
      hovered: false,
    };
  },
  methods: {
    onClick(e) {
      if (this.disabled === false) {
        this.$emit('click', e);
        this.$emit('input', !this.value);
      }
    },
    onEnter(e) {
      this.hovered = true;
      this.$emit('enter', e);
    },
    onLeave(e) {
      this.hovered = false;
      this.$emit('leave', e);
    },
  }
};

</script>

<style scoped>

/* VARIANTS */
.vuestro-button-primary {
  --variant-color: var(--vuestro-primary);
}
.vuestro-button-secondary {
  --variant-color: var(--vuestro-secondary);
}
.vuestro-button-success {
  --variant-color: var(--vuestro-success);
}
.vuestro-button-warning {
  --variant-color: var(--vuestro-warning);
}
.vuestro-button-danger {
  --variant-color: var(--vuestro-danger);
}
.vuestro-button-info {
  --variant-color: var(--vuestro-info);
}
.vuestro-button-white {
  --variant-color: var(--vuestro-white);
  --variant-text-color: var(--vuestro-secondary);
}
.vuestro-button-black {
  --variant-color: var(--vuestro-black);
  --variant-text-color: var(--vuestro-black);
}
.vuestro-button-text {
  --variant-color: var(--vuestro-text-color);
  --variant-text-color: var(--vuestro-dark);
}

.vuestro-button {
  position: relative;
  display: flex;
  align-items: center;
  min-width: 1px;
}
.vuestro-button.stretch {
  align-self: stretch;
  flex-grow: 1;
}

.vuestro-button-inner {
  border: var(--vuestro-control-border-width) solid var(--variant-color);
  border-radius: var(--vuestro-control-border-radius);
  margin: var(--vuestro-control-margin-v) var(--vuestro-control-margin-h);
  color: var(--variant-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
  transition: background-color 0.4s;
}
/* ripple effect */
.vuestro-button-inner:after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, #000 10%, transparent 10.01%);
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10,10);
  opacity: 0;
  transition: transform .5s, opacity 1s;
}
.vuestro-button-inner:active:after {
  transform: scale(0,0);
  opacity: 0.2;
  transition: 0s;
}
.vuestro-button-inner.sm {
  height: var(--vuestro-control-sm-height);
  padding: 0 calc(var(--vuestro-control-sm-height) * 0.4);
  font-size: calc(var(--vuestro-control-sm-height) * 0.8);
}
.vuestro-button-inner.md {
  height: var(--vuestro-control-md-height);
  padding: 0 calc(var(--vuestro-control-sm-height) * 0.4);
  font-size: calc(var(--vuestro-control-md-height) * 0.6);
}
.vuestro-button-inner.lg {
  height: var(--vuestro-control-lg-height);
  padding: 0 calc(var(--vuestro-control-sm-height) * 0.4);
  font-size: calc(var(--vuestro-control-lg-height) * 0.6);
}
.vuestro-button-inner.xl {
  height: var(--vuestro-control-xl-height);
  padding: 0 calc(var(--vuestro-control-sm-height) * 0.4);
  font-size: calc(var(--vuestro-control-xl-height) * 0.6);
}
.vuestro-button.stretch > .vuestro-button-inner {
  align-self: stretch;
  flex-grow: 1;
  height: 100%;
}
.vuestro-button-inner.noBorder {
  border: none;
}
.vuestro-button-inner.noMargin {
  margin: 0;
}
.vuestro-button-inner.noPadding {
  padding: 0;
}
.vuestro-button-inner.shadow {
  box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.1);
}
.vuestro-button-content {
  flex: 1 1 auto;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  user-select: none;
  white-space: nowrap;
}
.vuestro-button-inner.tall .vuestro-button-content {
  flex-direction: column;
  padding-left: 8px;
  padding-right: 8px;
  padding-bottom: 4px;
  align-items: center;
}
.vuestro-button-default-slot {
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  overflow: hidden;
}
.vuestro-button-inner.tall >>> svg {
  width: 22px;
  height: 22px;
  margin: 6px;
}
.vuestro-button-inner.value:not(.disabled),
.vuestro-button-inner:hover {
  color: var(--vuestro-white);
  background-color: var(--variant-color);
}
.vuestro-button-inner.value:hover {
  filter: brightness(120%);
}
.vuestro-button-inner.disabled {
  pointer-events: none;
  image-rendering: pixelated;
  background-image: linear-gradient(to right top, transparent 45%, var(--variant-color) 45%, var(--variant-color) 55%, transparent 55%);
  background-size: 4px 4px;
  background-repeat: repeat;
}
.vuestro-button-inner.vuestro-button-white.value,
.vuestro-button-inner.vuestro-button-white:hover {
  color: var(--variant-text-color);
}
.vuestro-button-inner.vuestro-button-black.value,
.vuestro-button-inner.vuestro-button-black:hover {
  color: var(--vuestro-white);
}
.vuestro-button-inner.vuestro-button-black:hover {
  border-color: var(--vuestro-gray);
}
.vuestro-button-inner.vuestro-button-text.value,
.vuestro-button-inner.vuestro-button-text:hover {
  color: var(--variant-text-color);
}
.vuestro-button-inner.vuestro-button-link {
  color: var(--vuestro-primary);
  border-color: transparent;
}
.vuestro-button-inner.vuestro-button-link.value,
.vuestro-button-inner.vuestro-button-link:hover {
  filter: brightness(150%);
  background-color: transparent;
}

/* round mode */
.vuestro-button-inner.round,
.vuestro-button-inner.mobile.round {
  border-radius: 50%;
  padding: 0;
}
.vuestro-button-inner.round.sm,
.vuestro-button-inner.checkbox.sm {
  height: var(--vuestro-control-sm-height);
  width: var(--vuestro-control-sm-height);
}
.vuestro-button-inner.sm >>> svg { /* shrink svgs a little for size=sm */
  width: calc(var(--vuestro-control-sm-height) * 0.6);
  height: calc(var(--vuestro-control-sm-height) * 0.6);
}
.vuestro-button-inner.round.md,
.vuestro-button-inner.checkbox.md {
  height: var(--vuestro-control-md-height);
  width: var(--vuestro-control-md-height);
}
.vuestro-button-inner.md >>> svg { /* shrink svgs a little for size=md */
  width: calc(var(--vuestro-control-md-height) * 0.6);
  height: calc(var(--vuestro-control-md-height) * 0.6);
}
.vuestro-button-inner.round.lg,
.vuestro-button-inner.checkbox.lg {
  height: var(--vuestro-control-lg-height);
  width: var(--vuestro-control-lg-height);
}
.vuestro-button-inner.lg >>> svg { /* enlarge svgs a little for size=lg */
  width: calc(var(--vuestro-control-lg-height) * 0.6);
  height: calc(var(--vuestro-control-lg-height) * 0.6);
}
.vuestro-button-inner.round.xl,
.vuestro-button-inner.checkbox.xl {
  height: var(--vuestro-control-xl-height);
  width: var(--vuestro-control-xl-height);
}
.vuestro-button-inner.xl >>> svg { /* enlarge svgs a little for size=xl */
  width: calc(var(--vuestro-control-xl-height) * 0.6);
  height: calc(var(--vuestro-control-xl-height) * 0.6);
}

/* pill mode */
.vuestro-button-inner.pill {
  border-radius: 999px;
}

/* checkbox mode */
.vuestro-button-inner.checkbox {
  padding: 0; /* clear padding */
  border: var(--vuestro-control-border-width) solid var(--vuestro-field-bg);
  background-color: var(--vuestro-field-bg);
  border-radius: var(--vuestro-control-border-radius);
}
.vuestro-button-inner.checkbox:hover {
  border-color: var(--variant-color);
  background-color: var(--variant-color);
}
.vuestro-button-inner.checkbox.value {
  border-color: var(--variant-color);
  background-color: var(--variant-color);
  color: var(--vuestro-white);
}

/* styling for the separate text slot next to checkbox button */
.vuestro-button-checkbox-text {
  margin-left: 4px;
  margin-right: 10px;
  cursor: pointer;
}
.vuestro-button-checkbox-text.disabled {
  pointer-events: none;
}
.vuestro-button-checkbox-text.sm {
  font-size: calc(var(--vuestro-control-sm-height) * 0.7);
}
.vuestro-button-checkbox-text.md {
  font-size: calc(var(--vuestro-control-md-height) * 0.5);
}
.vuestro-button-checkbox-text.lg {
  font-size: calc(var(--vuestro-control-lg-height) * 0.5);
}
.vuestro-button-checkbox-text.xl {
  font-size: calc(var(--vuestro-control-xl-height) * 0.5);
}

/* add a right margin when icon is paired anything else */
.vuestro-button-content .vuestro-icon:not(:only-child) {
  margin-right: 0.25em;
}

.vuestro-button-placeholder {
  text-transform: uppercase;
  margin-right: 0.6em;
  font-size: 0.7em;
  font-weight: 500;
}
.vuestro-button-inner.mobile .vuestro-button-placeholder {
  margin-right: 10px;
}

.vuestro-button-icon {
  margin-right: 0.25em;
  align-self: center;
}

/* for showSlotOnHover, make margin part of default slot */
.vuestro-button-icon.showSlotOnHover {
  margin-right: 0;
}
.vuestro-button-default-slot.showSlotOnHover {
  margin-left: 0.25em;
}

/* transitions */
.vuestro-button-enter-active, .vuestro-button-leave-active {
  transition: all 0.4s;
  max-width: 100vw;
}
.vuestro-button-enter, .vuestro-button-leave-to {
  max-width: 0;
}

</style>