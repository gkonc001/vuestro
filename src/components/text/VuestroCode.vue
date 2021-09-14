// An inline component to denote code, keywords, key-strokes
//
// CSS Vars:
// --vuestro-code-border - border style (default is 1px dashed)
//
<template>
  <span class="vuestro-code"><slot></slot></span>
</template>

<script>

export default {
  name: 'VuestroCode',
};

</script>

<style>

.vuestro-app {
  --vuestro-code-font-family: monospace;
}

</style>

<style scoped>

.vuestro-code {
  font-family: var(--vuestro-code-font-family);
  border: var(--vuestro-code-border, 1px dashed var(--vuestro-outline));
  padding: 0 0.3em;
  border-radius: var(--vuestro-selection-border-radius);
  background-color: var(--vuestro-field-bg);
  box-shadow: inset 0 0 0.2em var(--vuestro-gray-dark);
}

</style>