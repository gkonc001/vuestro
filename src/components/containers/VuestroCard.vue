<template>
  <div class="vuestro-card" :class="[`basis-${cols}`, gutter, { overflowHidden, stretch, shrink, row }]">
    <!--SLOT FOR HEADER TEXT (only show if "heading" slot was provided)-->
    <div v-if="$scopedSlots.heading"
         class="vuestro-card-heading"
         :style="colorBarStyle">
      <slot name="heading"></slot>
    </div>
    <div v-if="$scopedSlots.subheading"
         class="vuestro-card-subheading">
      <slot name="subheading"></slot>
    </div>
    <!--SLOT FOR DESCRIPTION (only show if "description" slot was provided)-->
    <div v-if="$scopedSlots.description"
         class="vuestro-card-description">
      <slot name="description"></slot>
    </div>
    <!--DEFAULT SLOT-->
    <div v-if="scroll" class="vuestro-card-scroll-outer">
      <div class="vuestro-card-scroll-inner">
        <slot></slot>
      </div>
    </div>
    <template v-else>
      <slot></slot>
    </template>
  </div>
</template>

<script>

export default {
  name: 'VuestroCard',
  props: {
    cols: { default: 12 },
    color: { type: String, default: null },
    overflowHidden: { type: Boolean, default: null },
    stretch: { type: Boolean, default: false },
    shrink: { type: Boolean, default: false },
    row: { type: Boolean, default: false },
    gutter: { type: String, default: '' },
    scroll: { type: Boolean, default: false },
  },
  computed: {
    colorBarStyle() {
      let borderWidth = '0.15em';
      if (this.$root.mobile) {
        borderWidth = '0.2em';
      }
      if (this.color) {
        return {
          'border-left': `${borderWidth} solid ${this.color}`,
          'padding-left': this.$root.mobile ? '14px':'6px',
        };
      }
    },
  },
  methods: {
    resize() {
      this.$scopedSlots.default.resize && this.$scopedSlots.default.resize();
    },
  },
};

</script>

<style>
.vuestro-app {
  --vuestro-card-heading-font-size: 1.6em;
  --vuestro-card-heading-font-weight: 300;
  --vuestro-card-subheading-font-size: 1.4em;
  --vuestro-card-subheading-font-weight: 300;
  --vuestro-card-description-font-size: 1.2em;
  --vuestro-card-description-font-weight: 300;
}
</style>

<style scoped>

/* these gutter sizes are usually inherited from vuestro-container */
/* they are only set when a gutter prop is manually set on a card */
.vuestro-card.xl {
  --vuestro-gutter: var(--vuestro-gutter-xl);
}
.vuestro-card.lg {
  --vuestro-gutter: var(--vuestro-gutter-lg);
}
.vuestro-card.md {
  --vuestro-gutter: var(--vuestro-gutter-md);
}
.vuestro-card.sm {
  --vuestro-gutter: var(--vuestro-gutter-sm);
}
.vuestro-card.none {
  --vuestro-gutter: 0px;
}

.vuestro-card {
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  flex-direction: column;
  min-width: 0;
  padding: var(--vuestro-gutter); /* inherit from vuestro-container */
}
.vuestro-card.stretch {
  flex-grow: 1;
}
.vuestro-card.shrink {
  flex-shrink: 1;
}
.vuestro-card.row {
  flex-direction: row;
}
.vuestro-card.overflowHidden {
  overflow: hidden;
}
.vuestro-card-heading {
  font-size: var(--vuestro-card-heading-font-size);
  font-weight: var(--vuestro-card-heading-font-weight);
  padding: 0px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: default;
}

.vuestro-card-subheading {
  font-size: var(--vuestro-card-subheading-font-size);
  font-weight: var(--vuestro-card-subheading-font-weight);
  padding: 2px 0px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: default;
}

.vuestro-card-description {
  font-size: var(--vuestro-card-description-font-size);
  font-weight: var(--vuestro-card-description-font-weight);
  padding: 2px 0px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: default;
}

.vuestro-card.basis-0 {
  flex-basis: auto;
}
.vuestro-card.basis-1 {
  flex-basis: 8.333333%;
}
.vuestro-card.basis-2 {
  flex-basis: 16.666666%;
}
.vuestro-card.basis-3 {
  flex-basis: 25%;
}
.vuestro-card.basis-4 {
  flex-basis: 33.333333%;
}
.vuestro-card.basis-5 {
  flex-basis: 41.666666%;
}
.vuestro-card.basis-6 {
  flex-basis: 50%;
}
.vuestro-card.basis-7 {
  flex-basis: 58.333333%;
}
.vuestro-card.basis-8 {
  flex-basis: 66.666666%;
}
.vuestro-card.basis-9 {
  flex-basis: 75%;
}
.vuestro-card.basis-10 {
  flex-basis: 83.333333%;
}
.vuestro-card.basis-11 {
  flex-basis: 91.666666%;
}
.vuestro-card.basis-12 {
  flex-basis: 100%;
}

.vuestro-card-scroll-outer {
  flex: 1 1 auto;
  overflow: auto;
  position: relative;
}
.vuestro-card-scroll-inner {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

</style>