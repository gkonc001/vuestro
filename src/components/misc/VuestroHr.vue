<template>
  <div class="vuestro-hr"
       :style="style">
  </div>
</template>

<script>

export default {
  name: 'VuestroHr',
  props: {
    margin: { type: String, default: '0' },
  },
  computed: {
    style() {
      return {
        'margin-top': this.margin,
        'margin-bottom': this.margin,
      };
    },
  },
};

</script>

<style scoped>

.vuestro-hr {
  width: 100%;
  border-bottom: 1px solid var(--vuestro-outline);
}

</style>