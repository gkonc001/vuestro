<template>
  <div class="vuestro-tooltip"
       :class="[ position, { active }]"
       @mouseover="onMouseOver"
       @click="onClick"
       @mouseleave="onMouseLeave">
    <slot></slot>
    <div ref="content"
         class="vuestro-tooltip-content vuestro-dark"
         :class="{ noWrap, noPadding }"
         :style="[ contentPos, { 'min-width': `${minWidth}px`, visibility: active ? 'visible':'hidden', opacity: active ? '1':'0' }]">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'VuestroTooltip',
  props: {
    position: { type: String, default: 'top' },
    minWidth: { type: null, default: 10 },
    noWrap: { type: Boolean, default: false },
    noPadding: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    clickToOpen: { type: Boolean, default: false },
  },
  data() {
    return {
      active: false,
      contentPos: {
        top: 0,
        left: 0,
      },
    };
  },
  methods: {
    onMouseOver() {
      if (!this.disabled && !this.clickToOpen) {
        this.open();
      }
    },
    onClick() {
      if (this.clickToOpen) {
        this.open();
      }
    },
    onMouseLeave() {
      if (!this.disabled) {
        this.close();
      }
    },
    open() {
      // onmouseover triggers often when inside the component, so prevent retriggering when active
      // also exit if the DOM els aren't present
      if (this.active || !this.$el || !this.$refs.content) return;
      // get origin of default slot content (usually a button)
      let elBcr = this.$el.getBoundingClientRect();
      let bcr = this.$refs.content.getBoundingClientRect();

      let left;
      let arrowSize = parseInt(getComputedStyle(this.$el).getPropertyValue('--vuestro-tooltip-arrow-size'), 10);
      switch(this.position) {
        case 'top':
          left = elBcr.x + elBcr.width/2 - bcr.width/2;
          this.contentPos.top = `${elBcr.y - bcr.height - arrowSize}px`;
          break;
        case 'left':
          left = elBcr.x - bcr.width - arrowSize;
          this.contentPos.top = `${elBcr.y + elBcr.height/2 - bcr.height/2}px`;
          break;
        case 'right':
          left = elBcr.right + arrowSize;
          this.contentPos.top = `${elBcr.y + elBcr.height/2 - bcr.height/2}px`;
          break;
        case 'bottom':
          left = elBcr.x + elBcr.width/2 - bcr.width/2;
          this.contentPos.top = `${elBcr.bottom + arrowSize}px`;
          break;
      }
      this.contentPos.left = left > 0 ? `${left}px`:'0';

      this.active = true;
      this.$emit('enter');
    },
    openForMs(ms) {
      this.open();
      setTimeout(this.close, ms);
    },
    close() {
      this.active = false;
      this.$emit('leave');
    }
  },
};

</script>

<style>
/* override these css vars to set style */
.vuestro-app {
  --vuestro-tooltip-arrow-size: 10px;
  --vuestro-tooltip-font-size: inherit;
  --vuestro-tooltip-padding: 0.5em;
}

.vuestro-app.mobile {
  --vuestro-tooltip-arrow-size: 20px;
}

</style>

<style scoped>

.vuestro-tooltip {
  display: flex;
  align-self: center;
  position: relative;
  font-size: initial;
}

.vuestro-tooltip-content {
  position: fixed;
  background: var(--vuestro-dropdown-content-bg);
  color: var(--vuestro-dropdown-content-fg);
  border: var(--vuestro-control-border-width) solid var(--vuestro-dropdown-outline);
  padding: var(--vuestro-tooltip-padding);
  border-radius: var(--vuestro-control-border-radius);
  z-index: 999 !important;
  font-size: var(--vuestro-tooltip-font-size);
}
.vuestro-tooltip-content.noPadding {
  padding: 0;
}
.vuestro-tooltip-content.noWrap {
  white-space: nowrap;
}
/* render arrow */
.vuestro-tooltip.active.top::after {
  content: " ";
  position: absolute;
  bottom: 100%;
  left: calc(50% - var(--vuestro-tooltip-arrow-size));
  border-left: var(--vuestro-tooltip-arrow-size) solid transparent;
  border-right: var(--vuestro-tooltip-arrow-size) solid transparent;
  border-top: var(--vuestro-tooltip-arrow-size) solid var(--vuestro-dropdown-content-bg);
  z-index: 998 !important;
}
.vuestro-dark .vuestro-tooltip.active.top::after {
  border-top: var(--vuestro-tooltip-arrow-size) solid var(--vuestro-outline);
}

.vuestro-tooltip.active.left::after {
  content: " ";
  position: absolute;
  right: 100%;
  top: calc(50% - var(--vuestro-tooltip-arrow-size));
  border-top: var(--vuestro-tooltip-arrow-size) solid transparent;
  border-bottom: var(--vuestro-tooltip-arrow-size) solid transparent;
  border-left: var(--vuestro-tooltip-arrow-size) solid var(--vuestro-dropdown-content-bg);
  z-index: 998 !important;
}
.vuestro-dark .vuestro-tooltip.active.left::after {
  border-left: var(--vuestro-tooltip-arrow-size) solid var(--vuestro-outline);
}

.vuestro-tooltip.active.bottom::after {
  content: " ";
  position: absolute;
  top: 100%;
  left: calc(50% - var(--vuestro-tooltip-arrow-size));
  border-left: var(--vuestro-tooltip-arrow-size) solid transparent;
  border-right: var(--vuestro-tooltip-arrow-size) solid transparent;
  border-bottom: var(--vuestro-tooltip-arrow-size) solid var(--vuestro-dropdown-content-bg);
  z-index: 998 !important;
}
.vuestro-dark .vuestro-tooltip.active.bottom::after {
  border-bottom: var(--vuestro-tooltip-arrow-size) solid var(--vuestro-outline);
}

.vuestro-tooltip.active.right::after {
  content: " ";
  position: absolute;
  left: 100%;
  top: calc(50% - var(--vuestro-tooltip-arrow-size));
  border-top: var(--vuestro-tooltip-arrow-size) solid transparent;
  border-bottom: var(--vuestro-tooltip-arrow-size) solid transparent;
  border-right: var(--vuestro-tooltip-arrow-size) solid var(--vuestro-dropdown-content-bg);
  z-index: 998 !important;
}
.vuestro-dark .vuestro-tooltip.active.right::after {
  border-right: var(--vuestro-tooltip-arrow-size) solid var(--vuestro-outline);
}


</style>