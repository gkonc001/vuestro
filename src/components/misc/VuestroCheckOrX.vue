<template>
  <vuestro-icon v-if="value" name="check"></vuestro-icon>
  <vuestro-icon v-else name="times"></vuestro-icon>
</template>

<script>

export default {
  name: 'VuestroCheckOrX',
  props: ['value'],
};

</script>
