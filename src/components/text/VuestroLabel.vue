<template>
  <span class="vuestro-label" :class="{ flushLeft, flushRight }">
    <slot></slot>
  </span>
</template>

<script>

export default {
  name: 'VuestroLabel',
  props: {
    flushLeft: { type: Boolean, default: false },
    flushRight: { type: Boolean, default: false },
  }
};

</script>

<style>

.vuestro-app {
  --vuestro-label-margin: 0 0.4em;
  --vuestro-label-font-size: 1em;
  --vuestro-label-font-weight: initial;
  --vuestro-label-text-transform: none;
}

</style>

<style scoped>

.vuestro-label {
  margin: var(--vuestro-label-margin);
  font-size: var(--vuestro-label-font-size);
  font-weight: var(--vuestro-label-font-weight);
  text-transform: var(--vuestro-label-text-transform);
}
.vuestro-label.flushLeft {
  margin-left: 0;
}
.vuestro-label.flushRight {
  margin-right: 0;
}


</style>