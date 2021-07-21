<template>
  <div class="vuestro-list-item"
	     :class="{ selected, readonly }"
			 :style="{ 'z-index': zIndex }"
			 @mouseenter="onMouseEnter"
			 @mouseleave="onMouseLeave"
	     @click="onClick">
    <div v-if="$scopedSlots.icon" class="vuestro-list-item-icon">
      <slot name="icon"></slot>
    </div>
    <div class="vuestro-list-item-inner">
      <div v-if="!$scopedSlots.default" class="vuestro-list-item-text">
        <div v-if="$scopedSlots.title" class="vuestro-list-item-title">
          <slot name="title"></slot>
        </div>
        <div v-if="$scopedSlots.description" class="vuestro-list-item-description">
          <slot name="description"></slot>
        </div>
        <div v-if="$scopedSlots.content" class="vuestro-list-item-content">
          <slot name="content"></slot>
        </div>
      </div>
      <template v-else>
        <slot></slot>
      </template>
    </div>
    <div class="vuestro-list-item-buttons">
      <slot name="buttons"></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'VuestroListItem',
  props: {
    selected: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
  },
	data() {
		return {
			zIndex: 0,
		};
	},
  methods: {
    onClick(e) {
      if (!this.readonly) {
        // if a vuestro-button is part of the path, ignore click
        for (let p of e.composedPath()) {
          if (p.classList && p.classList.contains('vuestro-button')) {
            return e.stopPropagation();
          }
        }
        this.$emit('click');
      }
    },
		onMouseEnter() {
			this.zIndex = 0;
		},
		onMouseLeave() {
			this.zIndex = 0;
		},
  }
};

</script>

<style>

.vuestro-app {
  --vuestro-list-item-title-font-size: 0.9em;
  --vuestro-list-item-title-font-weight: 600;
  --vuestro-list-item-description-font-size: 0.85em;
  --vuestro-list-item-content-font-size: 0.8em;
  --vuestro-list-item-icon-margin: 0 0 0 0.8em;
  --vuestro-list-item-inner-margin: 0.4em 0.2em 0.4em 0.8em;
  --vuestro-list-item-selected-bg: var(--vuestro-selection);
  --vuestro-list-item-alt-bg: var(--vuestro-light);
  --vuestro-list-item-padding: 0.3em 0.4em;
}
.vuestro-dark.vuestro-app {
  --vuestro-list-item-alt-bg: var(--vuestro-gray-dark);
}

</style>

<style scoped>

.vuestro-list-item {
  display: flex;
  cursor: pointer;
  position: relative;
}
/* unset cursor for readonly */
.vuestro-list-item.readonly {
  cursor: initial;
}
/* the selection is drawn as pseudo-element so it can cover the border when selected */
.vuestro-list-item.selected:before {
  content: " ";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: var(--vuestro-selection-border-radius);
  background-color: var(--vuestro-list-item-selected-bg);
  z-index: -1000;
}
/* draw a border at the bottom of all but the last child */
/* of course these css pseudo-element manipulations assume all children are vuestro-list-item(s) */
.vuestro-list-item:not(.selected):not(:last-child):after {
  position: absolute;
  top: 100%;
  left: var(--vuestro-selection-border-radius);
  right: var(--vuestro-selection-border-radius);
  content: " ";
  border-bottom: 0.5px solid var(--vuestro-outline);
	z-index: -2;
}
.vuestro-list-item-icon {
  margin: var(--vuestro-list-item-icon-margin);
  display: flex;
  align-items: center;
}
.vuestro-list-item-inner {
  min-width: 0;
  margin: var(--vuestro-list-item-inner-margin);
  display: flex;
  flex-grow: 1;
}
.vuestro-list-item-text {
  flex: 1;
  min-width: 0;
}
.vuestro-list-item-title {
  font-size: var(--vuestro-list-item-title-font-size);
  font-weight: var(----vuestro-list-item-title-font-weight);
	text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.vuestro-list-item-description {
  font-size: var(--vuestro-list-item-description-font-size);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.vuestro-list-item-content {
  color: var(--vuestro-text-color-muted);
  font-size: var(--vuestro-list-item-content-font-size);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.vuestro-list-item-buttons {
  --vuestro-control-margin-v: 0.2em; /* shrink v margin so buttons stack closer */
  margin: 0.2em 0.2em 0.2em auto;
  display: flex;
  flex-direction: column;
}

</style>