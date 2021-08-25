<template>
  <div class="vuestro-donut-chart" @mouseleave="onMouseleave">
    <slot></slot>
    <div class="vuestro-donut-chart-inner">
      <svg :width="width"
           :height="height"
           :style="{ transform: `translate(${margin.left}px, ${margin.top}px)` }">
        <!--THE ARCS (all centered)-->
        <g v-for="(d, idx) in localData" :key="idx"
           :transform="`translate(${centerX},${centerY})`">
          <path v-animate:d="d"
                :fill="d.color"
                :opacity="fillOpacity"
                @mouseenter="onMouseenter(idx, ...arguments)"/>
          <path v-animate:d="d"
                fill="none"
                :stroke-width="strokeWidth"
                :stroke="d.color"/>
          <text v-if="showLabels"
                class="vuestro-donut-labels"
                :x="d.label[0]"
                :y="d.label[1]"
                text-anchor="middle"
                alignment-baseline="middle">
            {{ d[categoryField] }}
          </text>
        </g>
        <!--DONUT CENTER LABEL-->
        <g>
          <text class="vuestro-donut-text"
                :x="centerX"
                :y="centerY"
                text-anchor="middle"
                alignment-baseline="middle">
            {{ donutTextValue }}
            <slot name="text"></slot>
          </text>
          <text class="vuestro-donut-title"
                :x="centerX"
                :y="centerY + titleOffset"
                text-anchor="middle"
                alignment-baseline="middle">
            {{ donutTitle }}
            <slot name="title"></slot>
          </text>
        </g>

        <!--TOOLTIP-->
        <template v-if="!hideTooltip && hoverIdx > -1">
          <vuestro-svg-tooltip :x="toolTipLocationX"
                               :x-max="width"
                               :y="toolTipLocationY"
                               :y-max="height"
                               :categoryField="categoryField"
                               :utc="utc"
                               :series="[localData[hoverIdx]]"
                               :values="localData[hoverIdx]"/>
        </template>
        <!--LEGEND-->
        <template v-for="(pieSection, index) in localData">
          <vuestro-svg-legend v-if="showLegend"
                              :pieSection="pieSection"
                              :x="pieX-pieY*1.6"
                              :y="18*(index+1)"
                              :key="index"/>
        </template>
      </svg>
    </div>
  </div>
</template>


<script>

/* global _ */
import * as d3 from 'd3';

export default {
  name: 'VuestroDonutChart',
  props: {
    data: { type: Array, default: () => [] },
    options: { type: Object, default: () => {} },
  },
  data() {
    return {
      width: 0, // derived width
      height: 0, // derived height
      centerX: 0, // derived center X
      centerY: 0, // derived center Y
      localData: [], // local copy of data
      colors: d3.schemeCategory10,
      margin: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      padding: 15, // percentage padding around the donut
      titleOffset: 30, // pixel offset for title from center
      categoryField: 'key',
      valueField: 'value',
      valueTitle: 'Value',
      utc: false,
      transition: 1000, // animation transition period
      hideTooltip: false,
      hoverIdx: -1,
      maxRadius: 0, // max radius without overflow
      toolTipLocationX: 0,
      toolTipLocationY: 0,
      showLegend: false,
      showLabels: false,
      gaugeMode: false,
      fillOpacity: 0.6, // opacity for filled area
      strokeWidth: '2px', // svg stroke width
      donutRadius: 70, // percentage for donut hole (0 = pie chart)
      donutTextValue: '',
      donutTextRender: null,
      donutTitle: '',
    };
  },
  computed: {
    color() {
      return d3.scaleOrdinal(this.colors);
    },
  },
  watch: {
    data(newVal) {
      this.redraw();
    },
    options: {
      handler() {
        _.merge(this, this.options);
        // overwrite series separately
        this.$nextTick(() => {
          this.redraw();
        });
      },
      deep: true,
    }
  },
  beforeMount() {
    _.merge(this, this.options);
  },
  mounted() {
    window.addEventListener('resize', this.resize);
    this.resize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  },
  methods: {
    // redraw if window changes
    resize() {
      if (this.$el.clientWidth > 0 && this.$el.clientHeight > 0) {
        this.width = this.$el.clientWidth - this.margin.left - this.margin.right;
        this.centerX = this.width/2;
        this.height = this.$el.clientHeight - this.margin.top - this.margin.bottom;
        this.centerY = this.height/2;
        this.maxRadius = Math.min(this.centerX, this.centerY) * (100 - this.padding) / 100.0;
        if (this.gaugeMode && this.width > this.height*1.2) {
          this.maxRadius *= 1.2;
          this.centerY *= 1.2;
        }
        this.redraw();
      }
    },
    redraw() {
      this.localData = _.cloneDeep(this.data);
      // refresh donut center text
      this.donutValueRender();
      // get arc angles from d3 pie generator
      let arcGen = d3.pie().value((d) => { return d[this.valueField]; });
      // restrict angles for gauge mode
      if (this.gaugeMode) {
        arcGen
        .startAngle(-0.7 * Math.PI)
        .endAngle(0.7 * Math.PI);
      }
      let arcData = arcGen(this.localData);
      // save all relevant data for generating chart
      for (let [di, d] of this.localData.entries()) {
        d.field = this.valueField; // alias for tooltip to pick up color too
        d.title = this.valueTitle; // alias for tooltip to pick up color too
        d.startAngle = arcData[di]["startAngle"];
        d.endAngle = arcData[di]["endAngle"];
        d.innerRadius = this.maxRadius * this.donutRadius / 100.0;
        d.outerRadius = this.maxRadius;
        if (!d.color) {
          d.color = this.color(d[this.valueField]);
        }
        if (this.showLabels) {
          this.arcLabels(arcData, di, this.maxRadius * this.donutRadius / 100.0, d3.arc());
        }
      }
    },
    onMouseenter(idx, e) {
      this.toolTipLocationX = e.offsetX;
      this.toolTipLocationY = e.offsetY;
      this.hoverIdx = idx;
    },
    onMouseleave() {
      this.hoverIdx = -1;
    },
    arcLabels(data, index, innerRadius, arcGenerator) {
      // create label coordinates
      let labelData = arcGenerator.centroid({
        startAngle: data[index]["startAngle"],
        endAngle: data[index]["endAngle"],
        innerRadius: innerRadius,
        outerRadius: this.maxRadius,
      });
      // set label coordinates into local data
      this.localData[index]["label"] = labelData;
    },
    // try to execute render function, otherwise leave donutTextValue alone
    donutValueRender() {
      if (this.donutTextRender && typeof(this.donutTextRender) === 'function') {
        this.donutTextValue = this.donutTextRender();
      }
    },
  },
  directives: {
    animate: {
      bind(el, binding, vnode) {
        let initialD = d3.arc()({
          startAngle: binding.value.startAngle,
          endAngle: binding.value.endAngle,
          innerRadius: binding.value.innerRadius*0.5,
          outerRadius: binding.value.outerRadius*0.5,
        });
        let finalD = d3.arc()({
          startAngle: binding.value.startAngle,
          endAngle: binding.value.endAngle,
          innerRadius: binding.value.innerRadius,
          outerRadius: binding.value.outerRadius,
        });
        d3.select(el)
          .attr(binding.arg, initialD)
          .transition().duration(vnode.context.transition).ease(d3.easeElasticOut)
          .attr(binding.arg, finalD);
      },
    }
  }
};

</script>

<style>

.vuestro-app {
  --vuestro-donut-label-font-size: 0.8em;
  --vuestro-donut-title-font-size: 1em;
  --vuestro-donut-text-font-size: 2em;
}

</style>

<style scoped>

.vuestro-donut-chart {
  position: relative;
  width: 100%;
  height: 100%;
  flex-grow: 1;
  overflow: hidden;
}

.vuestro-donut-chart-inner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.vuestro-donut-labels {
  fill: var(--vuestro-text-color);
  font-size: var(--vuestro-donut-label-font-size);
}

.vuestro-donut-text {
  fill: var(--vuestro-text-color);
  font-size: var(--vuestro-donut-text-font-size);
}
.vuestro-donut-title {
  fill: var(--vuestro-text-color);
  font-size: var(--vuestro-donut-title-font-size);
}


</style>