// Modal component
//
// CSS Vars:
// --vuestro-modal-content-bg - the background shade (outside modal)
// --vuestro-modal-margin-top - space above modal
// --vuestro-modal-title-font-size
// --vuestro-modal-titlebar-padding
// --vuestro-modal-buttons-padding
//
<template>
  <transition name="vuestro-modal" mode="out-in"
              @after-enter="onAfterOpen"
              @after-leave="onAfterClose">
    <div class="vuestro-modal" v-if="active || localActive" @click.exact="onBlur">
      <div class="vuestro-modal-inner">
        <!--TITLEBAR (ALWAYS DARK)-->
        <div v-if="$scopedSlots.title || $scopedSlots.toolbar"
             class="vuestro-modal-titlebar vuestro-dark">
          <!--TITLE-->
          <div class="vuestro-modal-title">
            <slot name="title"></slot>
          </div>
          <!--BUTTON SLOT-->
          <div class="vuestro-modal-toolbar-buttons">
            <slot name="toolbar"></slot>
            <template v-if="closeText.length > 0">
              <vuestro-button pill no-border class="close-button" @click="onClose">{{ closeText }}</vuestro-button>
            </template>
            <template v-else>
              <vuestro-button round no-border class="close-button" @click="onClose">
                <vuestro-icon name="times"></vuestro-icon>
              </vuestro-button>
            </template>
          </div>
        </div>
        <!--MODAL BODY SLOT-->
        <div class="vuestro-modal-default-slot">
          <slot></slot>
        </div>
        <!--FOOTER SLOT-->
        <div v-if="$scopedSlots.footer">
          <slot name="footer"></slot>
        </div>
        <!--BUTTON SLOT-->
        <div v-if="$scopedSlots.buttons" class="vuestro-modal-buttons">
          <slot name="buttons" :onClose="onClose"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'VuestroModal',
  props: {
    active: { type: Boolean, required: false },     // flag for controlling/binding open/close to outside var
    closeText: { type: String, default: '' },       // override default close button with this text
    closeOnBlur: { type: Boolean, default: false }, // close modal with a click outside the modal
  },
  data() {
    return {
      localActive: false, // local value to allow standalone-operation (without using active prop)
    };
  },
  methods: {
    // open method for standalone operation (not using active prop)
    onOpen() {
      this.localActive = true;
    },
    onClose() {
      this.$emit('update:active', false);
      this.$emit('close');
      this.localActive = false;
    },
    onBlur(e) {
      if (this.closeOnBlur && e.target.classList.contains('vuestro-modal')) {
        this.onClose();
      }
      return false;
    },
    onAfterOpen() {
      this.$emit('after-open');
    },
    onAfterClose() {
      this.$emit('after-close');
    }
  },
};

</script>

<style>
/* override these css vars to set style */
.vuestro-app {
  --vuestro-modal-font-size: 14px;
  --vuestro-modal-title-bg: var(--vuestro-dark);
  --vuestro-modal-title-fg: var(--vuestro-text-color-light);
  --vuestro-modal-footer-bg: var(--vuestro-content-bg);
  --vuestro-modal-active-bg: rgba(0,0,0,0.5);
  --vuestro-modal-header-border: 1px solid rgba(0,0,0,0.2);
  --vuestro-modal-footer-border: 1px solid rgba(0,0,0,0.2);
  --vuestro-modal-width: 60vw;
	--vuestro-modal-border-radius: var(--vuestro-control-border-radius);
}

.vuestro-app.mobile {
  --vuestro-modal-font-size: 32px;
  --vuestro-modal-header-footer-border: 1px solid var(--vuestro-outline);
  --vuestro-modal-width: 90vw;
}

.vuestro-dark {
  --vuestro-modal-title-bg: var(--vuestro-darker);
  --vuestro-modal-footer-bg: var(--vuestro-content-bg);
  --vuestro-modal-header-border: 1px solid var(--vuestro-outline);
  --vuestro-modal-footer-border: none;
}

</style>

<style scoped>

.vuestro-modal {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  display: flex;
  align-items: start;
  justify-content: center;
  z-index: 10000;
  background-color: var(--vuestro-modal-active-bg);
  overflow: auto;
  backdrop-filter: blur(0.4em);
  font-size: var(--vuestro-modal-font-size);
}

.vuestro-modal-inner {
  background-color: var(--vuestro-modal-content-bg, var(--vuestro-content-bg));
  transition: background-color 0.4s;
  width: var(--vuestro-modal-width);
  min-height: 15vh;
  margin-top: var(--vuestro-modal-margin-top, 10vh);
  position: relative;
  display: flex;
  flex-direction: column;
  align-content: start;
  box-shadow: 0 0 1em var(--vuestro-dark);
	border-radius: var(--vuestro-modal-border-radius);
  z-index: 10001;
}

.vuestro-dark .vuestro-modal-inner {
  border: 1px solid var(--vuestro-outline);
}

.vuestro-modal-titlebar {
  padding: var(--vuestro-modal-titlebar-padding, 0 0.1em 0 0.6em);
  background-color: var(--vuestro-modal-title-bg);
  color: var(--vuestro-modal-title-fg);
  flex: none;
  font-size: var(--vuestro-modal-title-font-size, 1.2em);
  display: flex;
  align-items: center;
  justify-content: space-between;
	border-top-left-radius: var(--vuestro-modal-border-radius);
	border-top-right-radius: var(--vuestro-modal-border-radius);
  flex-wrap: wrap;
}
.vuestro-dark .vuestro-modal-titlebar {
  border-bottom: var(--vuestro-modal-header-border);
}

.vuestro-modal-title {
  pointer-events: none;
}

.vuestro-modal-toolbar-buttons {
  display: flex;
  margin-left: auto;
  align-items: center;
}
.vuestro-modal-default-slot {
  flex-grow: 1;
  position: relative;
  display: flex;
  flex-direction: column;
}

.vuestro-modal-buttons {
  border-top: var(--vuestro-modal-footer-border);
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  padding: var(--vuestro-modal-buttons-padding, 0 0.2em);
  background-color: var(--vuestro-modal-footer-bg);
	border-bottom-left-radius: var(--vuestro-modal-border-radius);
	border-bottom-right-radius: var(--vuestro-modal-border-radius);
}

@media screen and (max-width: 768px) {
  .vuestro-modal-inner {
    width: 100%;
    height: 100%;
    max-height: 100%;
    margin-top: 0;
  }
}

.vuestro-modal-enter-active, .vuestro-modal-leave-active {
  transition: opacity 0.2s;
}
.vuestro-modal-enter, .vuestro-modal-leave-to {
  opacity: 0;
}

</style>