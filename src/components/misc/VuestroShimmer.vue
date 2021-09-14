// Shimmer component for building modern loading indicators
//
// CSS Vars:
// --vuestro-shimmer-bg - the background color
// --vuestro-shimmer-fg - the color of the shimmer
// --vuestro-pill-radius - border radius for pill mode (same as VuestroPill)
// --vuestro-control-margin-v - standard vuestro vertical margin
// --vuestro-control-margin-h - standard vuestro horizontal margin
//
<template>
  <div class="vuestro-shimmer" :class="[size, { pill, noMargin }]"></div>
</template>

<script>

export default {
  name: 'VuestroShimmer',
  props: {
    pill: { type: Boolean, default: false },     // pill mode
    size: { type: String, default: 'md' },       // standard vuestro size string
    noMargin: { type: Boolean, default: false }, // remove margins
  },
};

</script>

<style>

.vuestro-app {
  --vuestro-shimmer-bg: var(--vuestro-gray);
  --vuestro-shimmer-fg: var(--vuestro-gray-med);
}

</style>

<style scoped>

.vuestro-shimmer {
  height: 1em;
  margin: var(--vuestro-control-margin-v) var(--vuestro-control-margin-h);
  flex: 1 1 auto;
  position: relative;
  overflow: hidden;
  background-color: var(--vuestro-shimmer-bg);
  z-index: 1;
}
.vuestro-shimmer.sm {
  height: var(--vuestro-control-sm-height);
}
.vuestro-shimmer.md {
  height: var(--vuestro-control-md-height);
}
.vuestro-shimmer.lg {
  height: var(--vuestro-control-lg-height);
}
.vuestro-shimmer.xl {
  height: var(--vuestro-control-xl-height);
}
.vuestro-shimmer.pill {
  border-radius: var(--vuestro-pill-radius);
}

.vuestro-shimmer::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  content: '';
  transform: translateX(-65%);
  background-image: linear-gradient(to right, transparent 25%, var(--vuestro-shimmer-fg) 50%, transparent 85%);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  100% {
    transform: translateX(65%);
  }
}

</style>