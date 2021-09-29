<template>
  <vuestro-panel frame draggable>
    <template #title>{{ options.title }}</template>
    <vuestro-container content="center" justify="center">
      <vuestro-button @click="$refs.theModal.onOpen()">
        Open Modal
      </vuestro-button>
    </vuestro-container>
    <vuestro-modal ref="theModal" close-on-blur>
      <template #title>Test Modal</template>
    </vuestro-modal>
  </vuestro-panel>
</template>

<script>

export default {
  name: 'ModalTestWidget',
  props: ['data', 'options'],
};

</script>