<template>
  <div class="vuestro-ombre">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'VuestroOmbre',
  props: {
    startColor: { type: String, default: 'var(--vuestro-primary)' },
  },

};

</script>

<style>

.vuestro-app {
  --vuestro-ombre-border-radius: var(--vuestro-control-border-radius);
}

</style>

<style scoped>

.vuestro-ombre {
  border-radius: var(--vuestro-ombre-border-radius);
  display: flex;
  flex-direction: column;
}

.vuestro-ombre > div {
  
}

</style>