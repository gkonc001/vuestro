<template>
  <div class="vuestro-geo-pattern" :style="{ 'background-image': geoPattern }">
    <slot></slot>
  </div>
</template>

<script>

import GeoPattern from 'geopattern/geopattern.js';

export default {
  name: 'VuestroGeoPattern',
  props: {
    seed: { type: String, required: true },
  },
  computed: {
    geoPattern() {
      let geo = GeoPattern.generate(this.seed);
      this.$emit('color', geo.color);
      return geo.toDataUrl();
    },
  },
  methods: {
    getColor() {
      return GeoPattern.generate(this.seed).color;
    },
  },
};

</script>

<style scoped>

.vuestro-geo-pattern {
  background-repeat: repeat;
}

</style>