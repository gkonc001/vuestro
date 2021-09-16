// The all-important text field
//
//
// CSS Vars:
// --vuestro-text-field-fg - text color for entered text
// --vuestro-text-field-font-weight - font weight for entered text
// --vuestro-text-field-placeholder - placeholder color
// --vuestro-text-field-placeholder-font-weight - font weight for placeholder
// --vuestro-text-field-input-padding - padding around input el
// --vuestro-text-field-search-radius - border radius for search variant
// --vuestro-control-margin-v - inherited vuestro vertical margin
// --vuestro-control-margin-h - inherited vuestro horizontal margin
// --vuestro-control-border-width - inherited vuestro border width
// --vuestro-control-border-radius - inherited vuestro border radius
//
<template>
  <div class="vuestro-text-field"
       :class="[ `vuestro-text-field-${variant}`,
                 size,
                 { focused,
                   center,
                   noMargin,
                   readonly,
                   invalid,
                   stretch,
                  }
               ]"
       v-vuestro-blur="closeDropdown">
    <!--the main input, vuestro-text-field-input-el-wrapper provides border for outline variant-->
    <div class="vuestro-text-field-input-el-wrapper" :style="style">
      <!--ICON SLOT-->
      <div ref="iconSlot"
           class="vuestro-text-field-icon-slot"
           :class="{ active: $scopedSlots.icon || variant === 'search' }">
        <slot name="icon">
          <div @click="showDropdown = true">
            <vuestro-icon v-if="variant === 'search'" name="search" :scale="iconScale"></vuestro-icon>
          </div>
        </slot>
      </div>
      <!--SHADED PLACEHOLDER-->
      <div v-if="variant === 'shaded'" class="vuestro-text-field-shaded-placeholder">
        <vuestro-title>{{ placeholder }}</vuestro-title>
      </div>
      <!--THE INPUT-->
      <input ref="inputEl"
             class="vuestro-text-field-input-el"
             :value="inputBuffer"
             :type="showPassword ? 'text':type"
             :autocomplete="autocomplete"
             :spellcheck="spellcheck"
             :placeholder="inputPlaceholder"
             @focus="onFocus"
             @focusout="onFocusOut"
             @input="updateValue"
             @keyup="onKeyUp">
      </input>
      <!--UNIT-->
      <div v-if="$scopedSlots.unit" class="vuestro-text-field-unit-slot">
        <slot name="unit"></slot>
      </div>
      <!--CLEAR BUTTON-->
      <vuestro-button v-if="(!invalid && clearable && isContent && !readonly) || variant === 'search'"
                      class="vuestro-text-field-button"
                      size="sm" round no-border @click.stop="onClear">
        <vuestro-icon name="times"></vuestro-icon>
      </vuestro-button>
      <!--VALIDATION-->
      <div v-if="invalid" class="vuestro-text-field-invalid-msg">{{ invalid }}</div>
      <!--EDITING BUTTONS-->
      <div v-else-if="editingButtons" class="vuestro-text-field-editing-buttons">
        <vuestro-button v-if="!invalid" class="vuestro-text-field-button"
                        round no-border size="sm" variant="success" @click="onSaveButton">
          <vuestro-icon name="save"></vuestro-icon>
        </vuestro-button>
        <vuestro-button class="vuestro-text-field-button"
                        round no-border size="sm" variant="danger" @click="onCancelButton">
          <vuestro-icon name="trash"></vuestro-icon>
        </vuestro-button>
      </div>
      <!--SHOW PASSWORD BUTTON-->
      <span class="vuestro-text-field-show-password"
            v-if="type === 'password' || type === 'hidden'"
            @click="showPassword = !showPassword">
        <vuestro-icon v-if="!showPassword" name="eye-slash" :scale="iconScale"></vuestro-icon>
        <vuestro-icon v-if="showPassword" name="eye" :scale="iconScale"></vuestro-icon>
      </span>
    </div>
    <!--TEMPLATIZED DROPDOWN MENU-->
    <div v-if="$scopedSlots.dropdown"
         class="vuestro-text-field-dropdown vuestro-dark"
         :style="{ visibility: showDropdown ? 'visible':'hidden'}">
        <slot name="dropdown"></slot>
    </div>
    <!--DYNAMIC PLACEHOLDER (only for regular and outline variants)-->
    <div v-if="placeholder && (variant === 'regular' || variant === 'outline')"
         ref="placeholder"
         class="vuestro-text-field-placeholder"
         :class="{ active: raisedPlaceholder }"
         :style="placeholderStyle">
      {{ placeholder }}
    </div>
  </div>
</template>

<script>

/* global _ */

export default {
  name: 'VuestroTextField',
  props: {
    value: { type: null, default: '' },               // initial value, or bind with v-model, not required for standalone mode
    placeholder: { type: String, default: null },     // custom placeholder, doesn't use input el standard placeholder
    variant: { type: String, default: 'regular' },    // regular, outline, shaded, search
    type: { type: String, default: 'text' },          // standard input el type string
    hint: { type: String, default: null },            // uses input el placeholder to provide additional hint, only shown when focused
    center: { type: Boolean, default: false },        // set true to center text
    noMargin: { type: Boolean, default: false },      // disable standard vuestro control margins
    clearable: { type: Boolean, default: false },     // set true to show X button to clear
    size: { type: String, default: 'md' },            // standard vuestro size string
    editingButtons: { type: Boolean, default: false }, // set true to show save/cancel buttons
    selected: { type: Boolean, default: false },      // set true for all text selected by default
    readonly: { type: Boolean, default: false },      // set true for readonly
    validate: { type: Function, default: () => { return false; } }, // return true or string to set invalid state
    autocomplete: { type: String, default: null },    // standard autocomplete field for input el
    spellcheck: { type: String, default: null },      // standard spellcheck field for input el
    stretch: { type: Boolean, default: false },       // set true for flexbox grow
    autoFocus: { type: Boolean, default: false },     // set true for focus on mount (last one wins)
  },
  data() {
    return {
      focused: false,           // true when the input is focused
      raisedPlaceholder: false, // flag for when the placeholder is raised out of the way
      showPassword: false,      // flag to show password in the clear
      showDropdown: false,      // flag to show dropdown template
      inputBuffer: this.value,  // the local buffer for the input element
      style: {},                // style object
      placeholderStyle: {},     // placeholder style object
      beginValidation: false,   // flag to delay validation until user has typed something
    };
  },
  computed: {
    invalid() {
      if (this.beginValidation) {
        // send inputBuffer to validation function
        let validation = this.validate(this.inputBuffer);
        if (_.isString(validation)) {
          return validation;
        }
      }
      return false;
    },
    // convenience computed var to know when the text box has content
    isContent() {
      if (this.value || this.value === 0 || this.inputBuffer.length > 0) {
        return true;
      }
      return false;
    },
    // scale the search icon with size
    iconScale() {
      switch (this.size) {
        case 'sm':
          return 0.6;
        case 'md':
          return 0.8;
        case 'lg':
          return 1.0;
        case 'xl':
          return 1.05;
      }
    },
    // compute the placeholder for the input el, we use this as the main placeholder
    // for the search variant. All others only specify it if a hint was provided
    inputPlaceholder() {
      if (this.variant === 'search') {
        return this.placeholder || 'Search';
      }
      if (this.focused) {
        return this.hint;
      }
      return null;
    },
  },
  watch: {
    value(newVal) {
      if (newVal || newVal === 0 || this.focused) {
        this.raisedPlaceholder = true;
      } else {
        this.raisedPlaceholder = false;
      }
      this.inputBuffer = newVal;
      this.updateStyle();
    }
  },
  mounted() {
    // special sauce to see if browser autofilled in this text field, if so,
    // move the placeholder out of the way
    this.checkPlaceholder();
    setTimeout(this.checkPlaceholder, 300);
    setTimeout(this.checkPlaceholder, 600);
    setTimeout(this.checkPlaceholder, 900);
    setTimeout(this.checkPlaceholder, 1200);
    if (this.selected) {
      this.$nextTick(() => {
        this.$refs.inputEl.focus();
        this.$refs.inputEl.setSelectionRange(0, 999);
      });
    }
    if (this.autoFocus) {
      this.$nextTick(() => {
        this.focus();
      });
    }
    this.$nextTick(() => {
      this.updateStyle();
    });
  },
  methods: {
    updateStyle() {
      if (this.variant === 'regular') {
        this.style = {};
      }
      setTimeout(() => {
        if (this.placeholder && this.raisedPlaceholder && this.$refs.placeholder) {
          let placeholderWidth = window.getComputedStyle(this.$refs.placeholder, null).getPropertyValue('width');
          this.$set(this.style, 'clip-path', `polygon(0 -10%, 0px 110%, 110% 110%, 110% -10%, calc(${placeholderWidth} - var(--vuestro-control-border-radius)*2) -10%, calc(${placeholderWidth} - var(--vuestro-control-border-radius)*2) 4px, calc(var(--vuestro-control-border-radius)*2) 4px, calc(var(--vuestro-control-border-radius)*2) -10%)`);
        } else {
          this.$delete(this.style, 'clip-path');
        }
        this.$forceUpdate();
      }, 100);
    },
    checkPlaceholder() {
      if (this.$refs.inputEl &&
         (window.getComputedStyle(this.$refs.inputEl).content === `"${String.fromCharCode(0xFEFF)}"` ||
          this.isContent || this.focused)) {
        this.raisedPlaceholder = true;
      } else {
        this.raisedPlaceholder = false;
      }
      if (!this.center && this.$refs.iconSlot) {
        let iconWidth = this.$refs.iconSlot.getBoundingClientRect().width;
        if (this.variant == 'regular') {
          this.placeholderStyle = { left: `${iconWidth*2.0}px` };
        } else {
          this.placeholderStyle = { left: `${iconWidth*1.5}px` };
        }
      }
      this.updateStyle();
    },
    focus() { // proxy the focus() call
      if (!this.readonly) {
        this.$nextTick(() => {
          this.$refs.inputEl.focus();
        });
      }
    },
    // fine-grained update, called with every keystroke so parent
    // can update value prop according to v-model convention, this also
    // updates the local buffer for standalone operation
    updateValue(e) {
      this.$emit('input', e.target.value);
      // always update local input buffer
      this.inputBuffer = e.target.value;
    },
    // keyup passthrough to allow 'keyup.enter'-type binding
    onKeyUp(e) {
      this.beginValidation = true; // begin validation
      this.$emit('keyup', e);
    },
    onFocus(e) {
      if (this.$scopedSlots.dropdown) {
        this.showDropdown = true;
      }
      this.focused = true;
      this.raisedPlaceholder = true;
      this.checkPlaceholder();
      this.updateStyle();
    },
    onFocusOut() {
      if (!this.$scopedSlots.dropdown) {
        this.focused = false;
      }
      this.checkPlaceholder();
    },
    closeDropdown() {
      if (this.$scopedSlots.dropdown) {
        this.showDropdown = false;
        this.focused = false;
      }
    },
    onSaveButton() {
      let retVal = null;
      if (_.isBoolean(this.value)) {
        retVal = this.inputBuffer === 'true';
      } else if (_.isNumber(this.value)) {
        retVal = parseFloat(this.inputBuffer);
      } else if (_.isDate(this.value)) {
        retVal = new Date(this.inputBuffer);
      } else {
        retVal = this.inputBuffer;
      }
      this.$emit('save', retVal);
    },
    onCancelButton() {
      this.$emit('cancel');
    },
    onClear() {
      this.$emit('input', '');
      this.inputBuffer = '';
      this.focus();
    },
  },
};

</script>

<style>

.vuestro-app {
  --vuestro-text-field-font-weight: 300;
  --vuestro-text-field-fg: var(--vuestro-text-color);
  --vuestro-text-field-placeholder: var(--vuestro-text-color-muted);
  --vuestro-text-field-placeholder-font-weight: 400;
}

</style>

<style scoped>

/*SIZE DERIVATION*/
.vuestro-text-field.sm {
  font-size: calc(var(--vuestro-control-sm-height) * 0.7);
  --vuestro-text-field-local-height: var(--vuestro-control-sm-height);
}
.vuestro-text-field.md {
  font-size: calc(var(--vuestro-control-md-height) * 0.6);
  --vuestro-text-field-local-height: var(--vuestro-control-md-height);
}
.vuestro-text-field.lg {
  font-size: calc(var(--vuestro-control-lg-height) * 0.5);
  --vuestro-text-field-local-height: var(--vuestro-control-lg-height);
}
.vuestro-text-field.xl {
  font-size: calc(var(--vuestro-control-xl-height) * 0.5);
  --vuestro-text-field-local-height: var(--vuestro-control-xl-height);
}
/*OUTER*/
.vuestro-text-field {
  position: relative;
  margin: var(--vuestro-control-margin-v) var(--vuestro-control-margin-h);
  display: flex;
  height: var(--vuestro-text-field-local-height);
}
.vuestro-text-field.noMargin {
  margin: 0;
}
.vuestro-text-field.stretch {
  flex-grow: 1;
}
.vuestro-text-field.focused,
.vuestro-text-field.focused .vuestro-text-field-input-el-wrapper {
  border-color: var(--vuestro-primary);
}
.vuestro-text-field.readonly {
  pointer-events: none;
}
.vuestro-text-field.invalid {
  border-color: var(--vuestro-danger);
}
/*OUTLINE*/
.vuestro-text-field-outline .vuestro-text-field-input-el-wrapper {
  border: var(--vuestro-control-border-width) solid var(--vuestro-outline);
}
/*REGULAR*/
.vuestro-text-field-regular {
  border-bottom: var(--vuestro-control-border-width) solid var(--vuestro-outline);
}
/*SHADED*/
.vuestro-text-field-shaded {
  border: none;
  border-radius: var(--vuestro-control-border-radius);
  background-color: var(--vuestro-field-bg);
}
/*SEARCH*/
.vuestro-text-field-search {
  border: none;
  border-radius: var(--vuestro-text-field-search-radius, 999px);
  background-color: var(--vuestro-field-bg);
}

/*DYNAMIC PLACEHOLDER (ONLY REGULAR AND OUTLINE*/
.vuestro-text-field-placeholder {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1em; /* full size when not active */
  font-weight: var(--vuestro-text-field-placeholder-font-weight);
  top: 50%;
  max-width: 100%;
  transform: translate(0, -50%);
  transition: all 0.15s;
  position: absolute;
  color: var(--vuestro-text-field-placeholder);
  pointer-events: none;
}
.vuestro-text-field.center .vuestro-text-field-placeholder {
  left: 50% !important;
  transform: translate(-50%, -50%);
}
.vuestro-text-field-placeholder.active {
  top: 0px;
  font-size: 0.7em; /* smaller when active */
  padding-left: 3px;
  padding-right: 3px;
}
.vuestro-text-field-outline .vuestro-text-field-placeholder {
  padding: 0 calc(var(--vuestro-control-border-radius)*2);
}
.vuestro-text-field-outline .vuestro-text-field-placeholder.active {
  left: 0 !important;
  padding: 0 calc(var(--vuestro-control-border-radius)*3);
}

/*SHADED PLACEHOLDER*/
.vuestro-text-field-shaded-placeholder {
  color: var(--vuestro-text-field-placeholder);
}

/*INPUT ELEMENT*/
.vuestro-text-field-input-el-wrapper {
  flex: 1 1 auto;
  display: flex;
  padding: var(--vuestro-text-field-input-padding, 0 0.4em 0 0.4em);
  transition: all 0.15s;
  border-radius: var(--vuestro-control-border-radius);
  align-items: center;
}
.vuestro-text-field-input-el-wrapper > input:-webkit-autofill,
.vuestro-text-field-input-el-wrapper > input:-webkit-autofill:hover,
.vuestro-text-field-input-el-wrapper > input:-webkit-autofill:focus {
  content: "\feff"; /* magic value to detect browser autofill */
  border: var(--vuestro-control-border-width) solid var(--vuestro-gray);
  -webkit-text-fill-color: var(--vuestro-black);
  -webkit-box-shadow: 0 0 0px 1000px var(--vuestro-gray) inset;
}

.vuestro-text-field-input-el {
  font-size: inherit;
  font-weight: var(--vuestro-text-field-font-weight);
  align-self: center;
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  color: var(--vuestro-text-field-fg);
  padding: 0;
}
.vuestro-text-field.center .vuestro-text-field-input-el {
  text-align: center;
}


.vuestro-text-field-show-password {
  margin-left: 4px;
  color: var(--vuestro-outline);
  cursor: pointer;
  display: flex;
  align-items: center;
}

.vuestro-text-field-editing-buttons {
  display: flex;
}
.vuestro-text-field.sm .vuestro-text-field-button {
  --vuestro-control-sm-height: calc(var(--vuestro-text-field-local-height) - 2px);
}
.vuestro-text-field-button {
  flex-shrink: 0;
}

/*VALIDATION*/
.vuestro-text-field-invalid-msg {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: var(--vuestro-danger);
  display: flex;
  align-items: center;
  white-space: nowrap;
  padding-left: 2px;
  padding-right: 5px;
  border-top-right-radius: var(--vuestro-control-border-radius);
  border-bottom-right-radius: var(--vuestro-control-border-radius);
}
/* render the left-pointing angle on the invalid msg */
.vuestro-text-field-invalid-msg:before {
  content: '';
  position: absolute;
	right: calc(100%);
  width: 0;
  height: 0;
  --vuestro-text-field-invalid-msg-px: calc(var(--vuestro-text-field-local-height) / 2);
  border-top: var(--vuestro-text-field-invalid-msg-px) solid transparent;
	border-right: calc(var(--vuestro-text-field-invalid-msg-px)*0.7) solid var(--vuestro-danger);
	border-bottom: var(--vuestro-text-field-invalid-msg-px) solid transparent;
}

/*DROPDOWN*/
.vuestro-text-field-dropdown {
  background: var(--vuestro-dropdown-content-bg);
  color: var(--vuestro-dropdown-content-fg);
  box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.5);
  position: absolute;
  top: calc(100% + 0.4em);
  left: 0;
  right: 0;
  overflow: auto;
  max-height: 90vh;
  border: var(--vuestro-control-border-width) solid var(--vuestro-dropdown-outline);
  border-radius: var(--vuestro-control-border-radius);
  z-index: 999;
  padding: 0.4em;
}

/*EXTRA SLOTS*/
.vuestro-text-field-unit-slot {
  margin-right: 0.25em;
  font-size: 1.2em;
  color: var(--vuestro-secondary);
  display: flex;
  align-items: center;
}

.vuestro-text-field-icon-slot {
  display: flex;
  align-items: center;
}
.vuestro-text-field-icon-slot.active {
  margin-left: 0.2em;
  margin-right: 0.6em;
}

</style>