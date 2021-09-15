<template>
  <vuestro-container>
    <vuestro-card color="var(--vuestro-salmon)">
      <template #heading>Misc</template>
      <template #subheading>Miscellaneous components to help complete a Vuestro app</template>
    </vuestro-card>

    <vuestro-card>
      <template #heading>VuestroShimmer</template>
      <template #subheading>Use VuestroShimmer to build customized loading indicators</template>
      <template #description>
        <span>Props:<br>
          <vuestro-code>pill</vuestro-code> - pill mode<br>
          <vuestro-code>size</vuestro-code> - standard vuestro size option<br>
        </span>
      </template>
      <vuestro-container>
        <vuestro-card cols="4">
          <vuestro-shimmer size="sm"></vuestro-shimmer>
          <vuestro-shimmer></vuestro-shimmer>
          <vuestro-shimmer size="lg"></vuestro-shimmer>
          <vuestro-shimmer pill></vuestro-shimmer>
        </vuestro-card>
      </vuestro-container>
    </vuestro-card>

  </vuestro-container>
</template>

<script>

export default {
  name: 'Misc',
};

</script>