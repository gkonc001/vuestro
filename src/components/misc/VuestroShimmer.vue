<template>
  <div class="vuestro-shimmer" :class="[size, { pill, noMargin }]"></div>
</template>

<script>

export default {
  name: 'VuestroShimmer',
  props: {
    pill: { type: Boolean, default: false },
    size: { type: String, default: 'md' },
    noMargin: { type: Boolean, default: false },
  },
};

</script>

<style scoped>

.vuestro-shimmer {
  height: 1em;
  margin: var(--vuestro-control-margin-v) var(--vuestro-control-margin-h);
  flex: 1 1 auto;
  position: relative;
  overflow: hidden;
  background-color: #eee;
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
  border-radius: 999px;
}

.vuestro-shimmer::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  content: '';
  transform: translateX(-65%);
  background-image: linear-gradient(to right, transparent 25%, var(--vuestro-gray-dark) 50%, transparent 85%);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  100% {
    transform: translateX(65%);
  }
}

.vuestro-dark .vuestro-shimmer {
  background: var(--vuestro-gray);
}

</style>