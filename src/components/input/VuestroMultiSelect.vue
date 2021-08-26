<template>
  <vuestro-tray class="vuestro-multi-select"
                :class="{ stretch }"
                :variant="variant"
                :no-margin="noMargin"
                :size="size"
                v-vuestro-blur="closeDropdown">
    <template #title>
      <slot name="title"></slot>
    </template>
    <draggable class="vuestro-multi-draggable" v-model="contents"
               draggable=".vuestro-pill"
               group="vuestro-multi-select"
               @add="onDragAdd">
      <template v-for="(c, idx) in contents">
        <!--ITEM - SLOT PER ITEM-->
        <slot name="item" :item="c">
          <vuestro-pill :key="idx" @[pillEvent]="removeVal(idx)">
            <template v-if="c[keyField]" #title>{{ c[keyField] }}</template>
            <template v-if="c[valueField]" #value>{{ c[valueField] }}</template>
            <template v-else #value>{{ c }}</template>
          </vuestro-pill>
        </slot>
      </template>
      <!--FOOTER (DEFAULT INPUT FIELD)-->
      <template #footer v-if="!readonly && (!single || this.value.length < 1)">
        <div class="vuestro-multi-input-el-wrapper">
          <input ref="inputEl"
                 class="vuestro-multi-input-el"
                 :placeholder="placeholder"
                 v-model="searchTerm"
                 @focus="onFocus"
                 @keyup="onKeyup">
          </input>
          <vuestro-button v-if="!single" round size="sm" no-border no-margin @click="clearSearchTerm">
            <vuestro-icon name="times"></vuestro-icon>
          </vuestro-button>
        </div>
      </template>
    </draggable>
    <!--DROPDOWN-->
    <div v-if="$scopedSlots.dropdown"
         ref="dropdown"
         class="vuestro-multi-select-dropdown"
         :style="{ visibility: showDropdown ? 'visible':'hidden', 'max-height': maxHeight }"
         @scroll="checkHeight">
        <!--PASS METHODS TO SLOT FOR TIGHT INTEGRATION-->
        <slot name="dropdown"
              :searchTerm="searchTerm"
              :closeDropdown="closeDropdown"
              :clearSearchTerm="clearSearchTerm"
              :closeAndClear="closeAndClear">
        </slot>
    </div>
  </vuestro-tray>
</template>

<script>

import draggable from 'vuedraggable';

export default {
  name: 'VuestroMultiSelect',
  components: {
    draggable,
  },
  props: {
    value: { type: Array, default: () => []},         // value, should be array even for single mode
    single: { type: Boolean, default: false },        // only allow single selection
    size: { type: String, default: 'md' },            // standard vuestro size
    variant: { type: String, default: 'outline' },    // variant for VuestroTray container
    noMargin: { type: Boolean, default: false },      // no margins (for fitting in a card or panel)
    placeholder: { type: String, default: 'Search...' }, // input placeholder
    stretch: { type: Boolean, default: false },       // stretch to fill space
    keyField: { type: String, default: 'key' },       // the field name for the keys
    valueField: { type: String, default: 'value' },   // the field name for the values
    fitWithinPanel: { type: Boolean, default: false }, // make dropdown fit within the first parent VuestroPanel
    readonly: { type: Boolean, default: false },      // true for readonly
  },
  data() {
    return {
      showDropdown: false,
      contents: this.value,
      searchTerm: '',
      maxHeight: '100vh', // default to full screen height
      focusDebounce: false,
    };
  },
  computed: {
    pillEvent() {
      return this.readonly ? 'noop':'close';
    },
  },
  watch: {
    value(newVal) {
      this.contents = newVal;
    },
  },
  mounted() {
    this.checkHeight();
  },
  methods: {
    checkHeight() {
      if (this.$refs.dropdown) {
        // set max height based on available vertical space
        let bcr = this.$refs.dropdown.getBoundingClientRect();
        if (!this.noScroll) {
          if (this.fitWithinPanel) {
            // get parents bottom edge and fit within
            let parent = this.$el.closest('.vuestro-panel-contents');
            if (parent) {
              let pbcr = parent.getBoundingClientRect();
              this.maxHeight = `${pbcr.bottom - bcr.top}px`;
            }
          } else {
            // use window
            this.maxHeight = `${window.innerHeight - bcr.top}px`;
          }
        }
      }
    },
    onFocus() {
      this.showDropdown = true;
    },
    onDragAdd(e) {
      this.$emit('add', e.item.innerText);
    },
    removeVal(idx) {
      this.$emit('remove', this.contents[idx]);
      this.contents.splice(idx, 1);
    },
    closeDropdown() {
      if (!this.focusDebounce) {
        this.showDropdown = false;
      }
    },
    // keyup passthrough, passes through keyup but also provides
    // special case for enter key which provides closeDropdown as a callback
    onKeyup(e) {
      this.$emit('keyup', e);
      if (e.key == 'Enter') {
        this.$emit('search', e.target.value, this.closeDropdown);
        this.clearSearchTerm();
      }
    },
    clearSearchTerm() {
      this.searchTerm = '';
      this.$emit('clear');
    },
    closeAndClear() {
      this.closeDropdown();
      this.clearSearchTerm();
    },
    focus() { // proxy the focus() call
      if (!this.readonly) {
        // set up a debounce to prevent v-vuestro-blur="closeDropdown"
        // from closing the dropdown
        this.focusDebounce = true;
        setTimeout(() => {
          this.focusDebounce = false;
        }, 500);
        this.showDropdown = true;
        this.$nextTick(() => {
          this.$refs.inputEl.focus();
        });
      }
    },
  },
};

</script>

<style scoped>

.vuestro-multi-select.sm {
  font-size: calc(var(--vuestro-control-sm-height) * 0.5);
}
.vuestro-multi-select.md {
  font-size: calc(var(--vuestro-control-md-height) * 0.5);
}
.vuestro-multi-select.lg {
  font-size: calc(var(--vuestro-control-lg-height) * 0.45);
}
.vuestro-multi-select.xl {
  font-size: calc(var(--vuestro-control-xl-height) * 0.4);
}
.vuestro-multi-select {
  position: relative;
}

.vuestro-multi-select.stretch {
  align-self: stretch;
  flex-grow: 1;
}

.vuestro-multi-draggable {
  align-self: center;
  align-items: center;
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  padding: 0.2em;
  max-width: 100%;
}
/* margin override for vuestro-pills in the multi (common) */
.vuestro-multi-draggable > .vuestro-pill {
  margin: 0 0.15em;
}

.vuestro-multi-select >>> span.sortable-ghost {
  border: 0.15em dashed var(--vuestro-outline);
  border-radius: 999px;
  margin: 0.2em;
  padding: 0 0.4em;
}

.vuestro-multi-input-el-wrapper {
  display: flex;
  align-items: center;
  flex-grow: 1;
  margin-left: 0.2em;
  margin-right: 0.4em;
}
.vuestro-multi-input-el {
  font-size: inherit;
  font-weight: var(--vuestro-text-field-font-weight);
  margin: 0 0.2em;
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  color: var(--vuestro-text-field-fg);
}
.vuestro-multi-input-el::placeholder {
  font-weight: var(--vuestro-text-field-font-weight);
}

.vuestro-multi-select-dropdown {
  background: var(--vuestro-dropdown-content-bg);
  color: var(--vuestro-dropdown-content-fg);
  box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.5);
  position: absolute;
  top: calc(100% + 0.2em);
  left: 0;
  right: 0;
  overflow: auto;
  max-height: 90vh;
  border: var(--vuestro-control-border-width) solid var(--vuestro-dropdown-outline);
  border-radius: var(--vuestro-control-border-radius);
  z-index: 999;
  padding: 0.2em;
  /* redefine style vars for vuestro components */
  --vuestro-text-field-fg: var(--vuestro-dropdown-content-fg);
  --vuestro-pill-value-fg: var(--vuestro-dropdown-content-fg);
  --vuestro-pill-value-bg: var(--vuestro-gray-dark);
}


</style>