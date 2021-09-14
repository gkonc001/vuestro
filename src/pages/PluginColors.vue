<template>
  <vuestro-container>
    <vuestro-card cols="12" color="var(--vuestro-green)">
      <template #heading>VuestroGeopattern</template>
      <template #description><span>
        Vuestro also provides a component: VuestroGeoPattern which will set its background to a generated geometric pattern based on the content or a seed given through a property.
      </span></template>
      <vuestro-geo-pattern class="color-chip" :seed="gpString">
        <vuestro-text-field v-model="gpString" size="lg" placeholder="Seed"></vuestro-text-field>
      </vuestro-geo-pattern>
    </vuestro-card>

    <vuestro-card cols="12" color="var(--vuestro-brick)">
      <template #heading>CSS Colors</template>
      <template #description><span>Vuestro provides many pre-defined CSS vars for a rainbow of colors. Any of these may be redefined in your app by setting them on <em>.vuestro-app</em>. These color names can be obtained for use in a palette by calling the <em>vuestroColorPalette()</em> mixin.</span></template>
    </vuestro-card>
    <vuestro-card cols="3" v-for="c in colorVars" :key="c">
      <div class="color-chip" :style="{'background-color': `var(${c})`}">
        {{ c }}
      </div>
    </vuestro-card>

    <vuestro-card cols="12">
      <template #subheading>And the grayscale</template>
    </vuestro-card>
    <vuestro-card cols="3" v-for="c in grayScale" :key="c">
      <div class="color-chip" :style="{'background-color': `var(${c})`}">
        {{ c }}
      </div>
    </vuestro-card>

    <vuestro-card cols="12">
      <template #subheading>Some of the above are aliased using semantic variant names</template>
    </vuestro-card>
    <vuestro-card cols="3" v-for="c in semanticColors" :key="c">
      <div class="color-chip" :style="{'background-color': `var(${c})`}">
        {{ c }}
      </div>
    </vuestro-card>

    <vuestro-card cols="12">
      <template #subheading>...and text colors</template>
    </vuestro-card>
    <vuestro-card cols="3" v-for="c in textColors" :key="c">
      <div class="color-chip" :style="{color: 'white', 'background-color': `var(${c})`}">
        {{ c }}
      </div>
    </vuestro-card>

    <vuestro-card cols="12">
      <template #subheading><span>Vuestro also provides <em>vuestroChartColorGenerator()</em> a color palette generator for chart colors that works with either numbers or strings.</span></template>
    </vuestro-card>
    <vuestro-card cols="3" v-for="c in 10" :key="c">
      <div class="color-chip" :style="{color: 'white', 'background-color': vuestroChartColorGenerator(c)}">
        {{ c }}
      </div>
    </vuestro-card>

  </vuestro-container>
</template>

<script>

export default {
  name: 'Colors',
  data() {
    return {
      gpString: 'edit this string to change pattern',
      colorVars: [
        '--vuestro-indigo',
        '--vuestro-purple',
        '--vuestro-magenta',
        '--vuestro-pink',

        '--vuestro-prussian',
        '--vuestro-navy',
        '--vuestro-royal',
        '--vuestro-blue',
        '--vuestro-cobalt',
        '--vuestro-cyan',
        '--vuestro-teal',

        '--vuestro-green',
        '--vuestro-emerald',
        '--vuestro-yellow',
        '--vuestro-gold',

        '--vuestro-orange',
        '--vuestro-salmon',
        '--vuestro-brick',
        '--vuestro-red',
      ],
      grayScale: [
        '--vuestro-white',
        '--vuestro-light',
        '--vuestro-light-med',
        '--vuestro-gray',
        '--vuestro-gray-med',
        '--vuestro-gray-dark',
        '--vuestro-dark',
        '--vuestro-darker',
        '--vuestro-black',
      ],
      semanticColors: [
        '--vuestro-primary',
        '--vuestro-muted-primary',
        '--vuestro-secondary',
        '--vuestro-muted-secondary',
        '--vuestro-success',
        '--vuestro-muted-success',
        '--vuestro-info',
        '--vuestro-muted-info',
        '--vuestro-warning',
        '--vuestro-muted-warning',
        '--vuestro-danger',
        '--vuestro-muted-danger',
        '--vuestro-content-bg',
        '--vuestro-widget-dark-bg',
        '--vuestro-widget-light-bg',
        '--vuestro-field-bg',
        '--vuestro-popup-bg',
        '--vuestro-popup-fg',
        '--vuestro-selection',
        '--vuestro-outline',
        '--vuestro-active',
        '--vuestro-hover',
        '--vuestro-notifications-bg',
      ],
      textColors: [
        '--vuestro-text-color',
        '--vuestro-text-color-secondary',
        '--vuestro-text-color-muted',
        '--vuestro-text-color-inverse',
      ],
    };
  },
};

</script>

<style scoped>

.color-chip {
  padding: 1em;
  border-radius: var(--vuestro-selection-border-radius);
  color: white;
  text-shadow: 0 0 5px black;
}

.vuestro-container {
  --vuestro-text-field-fg: white;
  --vuestro-text-field-placeholder: white;
}

</style>