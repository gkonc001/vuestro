<template>
  <div class="vuestro-grid-box"
       :class="{ dragging, resizing, locked }"
       :style="style"
       @mouseover="focused = true"
       @mouseleave="focused = false">
    <template v-if="!resizing && !dragging">
      <slot></slot>
    </template>
    <div v-show="!$root.mobile && !resizing && !dragging && !locked" class="resize-handle" ref="resizeHandle"></div>
  </div>
</template>

<script>

export default {
  name: 'VuestroGridBox',
  props: {
    boxId: { type: String, required: true },
    dragSelector: { type: String, default: '.drag' },
    locked: { type: Boolean, default: false },
  },
  provide() { // provide a widgetId for user's code, this facilitates removing/updating
    return {  // based on the id in the layout array
      widgetId: this.boxId,
    };
  },
  data() {
    return {
      dragging: false,
      resizing: true,  // start out true since grid has to size this box
      focused: false,
    };
  },
  computed: {
    style() {
      if (this.$parent.isBoxVisible(this.boxId)) {
        var pixelPosition = this.$parent.getPixelPositionById(this.boxId);
        return {
          width: pixelPosition.w + 'px',
          height: pixelPosition.h + 'px',
          left: `${pixelPosition.x}px`,
          top: `${pixelPosition.y}px`,
          'z-index': this.focused ? 10000:100,
        };
      }
      return {
        display: 'none'
      };
    },
  },
  mounted() {
    // let parent grid place and size this box
    this.$parent.registerBox(this);

    // the $parent.registerBox has sized this box, so clear resizing flag
    this.resizing = false;

    let matches = function(el, selector) {
      return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
    };

    this.$el.addEventListener('mousedown', evt => {
      if (!matches(evt.target, this.dragSelector) || this.locked) {
        return;
      }

      evt.preventDefault();
      this.dragging = true;
      this.$emit('dragStart');
      let mouseX = evt.clientX;
      let mouseY = evt.clientY;

      const handleMouseUp = evt => {
        window.removeEventListener('mouseup', handleMouseUp, true);
        window.removeEventListener('mousemove', handleMouseMove, true);

        this.dragging = false;

        var offset = {
            x: evt.clientX - mouseX,
            y: evt.clientY - mouseY
        };
        this.$emit('dragEnd', { offset });
      };

      const handleMouseMove = evt => {
        var offset = {
          x: evt.clientX - mouseX,
          y: evt.clientY - mouseY
        };
        this.$emit('dragUpdate', { offset });
      };

      window.addEventListener('mouseup', handleMouseUp, true);
      window.addEventListener('mousemove', handleMouseMove, true);
    });

    // resizing
    this.$resizeHandle = this.$refs.resizeHandle;
    if (this.$resizeHandle) {
      this.$resizeHandle.addEventListener('mousedown', evt => {
        if (this.locked) {
          return;
        }
        evt.preventDefault();
        evt.stopPropagation();
        this.resizing = true;
        this.$emit('resizeStart');
        let mouseX = evt.clientX;
        let mouseY = evt.clientY;

        const handleMouseUp = evt => {
          window.removeEventListener('mouseup', handleMouseUp, true);
          window.removeEventListener('mousemove', handleMouseMove, true);

          this.resizing = false;

          var offset = {
            x: evt.clientX - mouseX,
            y: evt.clientY - mouseY
          };
          this.$slots.default.resize && this.$slots.default.resize();
          this.$emit('resizeEnd', { offset });
        };

        const handleMouseMove = evt => {
          var offset = {
            x: evt.clientX - mouseX,
            y: evt.clientY - mouseY
          };
          this.$emit('resizeUpdate', { offset });
        };

        window.addEventListener('mouseup', handleMouseUp, true);
        window.addEventListener('mousemove', handleMouseMove, true);
      });
    }
  },
};
</script>

<style scoped>

.vuestro-grid-box {
  position: absolute;
  display: flex;
}

.vuestro-grid-box.dragging,
.vuestro-grid-box.resizing {
  z-index: 2;
  opacity: 0.7;
}

/* overlay a resize handle at the lower right */
.vuestro-grid-box .resize-handle {
  position: absolute;
  right: -3px;
  bottom: -3px;
  width: 15px;
  height: 15px;
  cursor: nwse-resize;
  transform: rotate(315deg);
  border-top: 7.5px double var(--vuestro-outline);
  border-right: 7.5px solid transparent;
  border-left: 7.5px solid transparent;
}

/* hint the child div that it should grow */
.vuestro-grid-box > div {
  flex-grow: 1;
}

.vuestro-grid-box:not(.locked) >>> .drag {
  cursor: move;
}

</style>