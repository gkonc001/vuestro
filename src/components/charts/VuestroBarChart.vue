<template>
  <div class="vuestro-bar-chart" :class="{ showGrid }"
       @mouseleave="onMouseleave" :style="style">
    <slot></slot>
    <div class="vuestro-bar-chart-inner">
      <svg :width="width"
           :height="height"
           :style="{ transform: `translate(${margin.left}px, ${margin.top}px)` }"
           @mousemove="onMouseover">
        <!--GRID-->
        <template v-if="showGrid">
          <g v-axis:x="scale" class="vuestro-bar-chart-x-axis" :class="{ showGrid }"></g>
          <g v-axis:y="scale" class="vuestro-bar-chart-y-axis" :class="{ showGrid }"></g>
        </template>
        <!--BARS-->
        <g v-for="d in localData">
          <rect v-for="s in processedSeries" :key="`${s.field}_1`"
                class="vuestro-bar-chart-bar"
                :x="d[`${s.field}_x`]"
                v-animate:y="d[`${s.field}_y`]"
                :width="d.width"
                v-animate:height="d[`${s.field}_height`]"
                :fill="s.color"
                :fill-opacity="fillOpacity"
                :stroke="s.color">
          </rect>
          <rect v-for="s in processedSeries" :key="`${s.field}_2`"
                class="vuestro-bar-chart-bar"
                :x="d[`${s.field}_x`]"
                v-animate:y="d[`${s.field}_y`]"
                :width="d.width"
                :height="strokeWidth"
                :fill="s.color"
                :stroke="s.color">
          </rect>
          <!--BAR LABEL-->
          <text v-if="showBarLabels"
                v-for="s in processedSeries" :key="`${s.field}_3`"
                class="vuestro-bar-chart-bar-label"
                :x="stacked ? d.center:d[`${s.field}_x`]+d.width/2"
                v-animate:y="d[`${s.field}_y`] - barLabelOffset"
                text-anchor="middle">
            {{ d[s.field] | valueFilterProxy(valueAxis) }}
          </text>
        </g>

        <!--AXES-->
        <template v-if="showAxes || showXLabels || showYLabels">
          <g v-axis:x="scale" class="vuestro-bar-chart-x-axis" :class="{ showAxes, showXLabels }"></g>
          <g v-axis:y="scale" class="vuestro-bar-chart-y-axis" :class="{ showAxes, showYLabels }"></g>
        </template>
        <!--TOOLTIP-->
        <template v-if="!hideTooltip && cursorLine.length > 0">
          <path class="vuestro-bar-chart-cursor" :d="cursorLine" />
          <vuestro-svg-tooltip :x="lastHoverPoint.x"
                               :x-max="width"
                               :categoryField="categoryField"
                               :utc="utc"
                               :series="processedSeries"
                               :values="localData[lastHoverPoint.index]">
          </vuestro-svg-tooltip>
        </template>
      </svg>
      <!--ONLY SHOW IF TOOLTIP NOT SHOWN-->
      <vuestro-title v-if="cursorLine.length === 0">
        <slot name="title"></slot>
      </vuestro-title>
    </div>
  </div>
</template>

<script>

/* global _ */
import * as d3 from 'd3';

export default {
  name: 'VuestroBarChart',
  props: {
    data: { type: Array, default: () => [] },
    options: { type: Object, default: () => {} },
  },
  data() {
    return {
      width: 0,
      height: 0,
      localData: [],
      lastHoverPoint: {},
      cursorLine: '',
      colors: d3.schemeCategory10,
      margin: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      valueAxis: {
        // render() {}
      },
      categoryField: 'key',
      series: [{
        field: 'value'
      }],
      stacked: false,
      padding: 0.1,
      axisXPadding: 20, // padding for X axes labels
      axisYPadding: 20, // padding for Y axes labels
      hideTooltip: false,
      utc: false,
      transition: 800, // animation transition period
      fillOpacity: 0.7, // opacity for filled bars
      gridDashArray: 1, // svg grid dash array
      strokeWidth: '2px', // svg stroke width
      scale: {}, // d3 axes renderers
      showAxes: false,
      showXLabels: false,
      showYLabels: false,
      showGrid: false,
      showBarLabels: true,
      barLabelOffset: 2,
    };
  },
  computed: {
    color() {
      return d3.scaleOrdinal(this.colors);
    },
    style() {
      return {
        '--vuestro-bar-chart-grid-dasharray': this.gridDashArray,
        '--vuestro-bar-chart-stroke-width': this.strokeWidth,
      };
    },
    // process series prop by adding default colors
    processedSeries() {
      return this.series.map((s) => {
        if (s.field && !s.color) {
          s.color = this.color(s.field);
        }
        return s;
      });
    },
    getCursor() {
      return d3.area().x(d => d.center).y0(this.height - this.axisXPadding).y1(0);
    },
  },
  watch: {
    data(newVal) {
      this.redraw();
    },
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
    resize() {
      if (this.$el.clientWidth > 0 && this.$el.clientHeight > 0) {
        this.width = this.$el.clientWidth - this.margin.left - this.margin.right;
        this.height = this.$el.clientHeight - this.margin.top - this.margin.bottom;
        this.redraw();
      }
    },
    getBar(v) {
    },
    redraw() {
      this.localData = _.cloneDeep(this.data);

      let scaleX = d3.scaleBand()
                     .domain(this.data.map((d) => { return d[this.categoryField]; }))
                     .padding(this.padding);
      // factor in padding for opposite axis
      if (this.showAxes || this.showYLabels) {
        scaleX.rangeRound([this.margin.left + this.axisYPadding, this.width - this.margin.right]);
      } else {
        scaleX.rangeRound([this.margin.left, this.width - this.margin.right]);
      }

      let scaleY;
      // factor in padding for opposite axis
      if (this.showAxes || this.showXLabels) {
        scaleY = d3.scaleLinear().range([this.height - this.axisXPadding, 0]);
      } else {
        scaleY = d3.scaleLinear().range([this.height, 0]);
      }

      this.scale = {
        x: d3.axisBottom(scaleX).tickSize(this.height),
        y: d3.axisLeft(scaleY).tickSize(-this.width),
      };

      // use value axis render function if provided
      if (this.valueAxis.render && typeof(this.valueAxis.render) === 'function') {
        this.scale.y.tickFormat((d) => {
          if (d) {
            return this.valueAxis.render(d);
          }
          return '';
        });
      }

      let stackedData;
      let extents;
      if (this.stacked) {
        let keys = _.flatMap(this.series, 'field');
        stackedData = d3.stack().keys(keys)(this.localData);
        extents = this.series.map((series, idx) => {
          return d3.extent(_.flatten(stackedData[idx]));
        });
      } else {
        extents = this.series.map((series) => {
          return d3.extent(this.localData, function(d) { return d[series.field]; });
        });
      }
      scaleY.domain([0, d3.max(extents, function(d) { return d[1] * 1.1; })]);

      // set the bar dimensions
      for (let [di, d] of this.localData.entries()) {
        for (const [si, s] of this.series.entries()) {
          if (stackedData) {
            d.width = scaleX.bandwidth();
            d[`${s.field}_x`] = scaleX(d[this.categoryField]);
            d[`${s.field}_y`] = scaleY(stackedData[si][di][1]);
            d[`${s.field}_height`] = scaleY(stackedData[si][di][0]) - d[`${s.field}_y`];
            d.center = scaleX(d[this.categoryField]) + scaleX.bandwidth() / 2;
          } else {
            d.width = scaleX.bandwidth() / this.series.length;
            d[`${s.field}_x`] = scaleX(d[this.categoryField]) + si*(d.width + 1);
            d[`${s.field}_y`] = scaleY(d[s.field]) - 1;
            d[`${s.field}_height`] = scaleY(0) - scaleY(d[s.field]);
            d.center = scaleX(d[this.categoryField]) + scaleX.bandwidth() / 2;
          }
        }
      }
    },
    onMouseover({ offsetX }) {
      if (this.localData.length > 0) {
        const x = offsetX;
        const closestPoint = this.getClosestPoint(x);
        if (this.lastHoverPoint.index !== closestPoint.index) {
          const point = this.localData[closestPoint.index];
          this.cursorLine = this.getCursor([point]);
          this.$emit('select', this.data[closestPoint.index]);
          this.lastHoverPoint = closestPoint;
        }
      }
    },
    getClosestPoint(x) {
      return this.localData
        .map((point, index) => ({
          x: point[`${this.series[this.series.length-1].field}_x`],
          diff: Math.abs(point[`${this.series[this.series.length-1].field}_x`] - x),
          index,
        }))
        .reduce((memo, val) => (memo.diff < val.diff ? memo : val));
    },
    onMouseleave() {
      this.cursorLine = '';
    },
  },
  directives: {
    axis: {
      update(el, binding, vnode) {
        d3.select(el).transition().duration(vnode.context.transition).ease(d3.easeLinear).call(binding.value[binding.arg]);
      }
    },
    animate: {
      bind(el, binding, vnode) {
        let initialValue = 0;
        if (binding.arg === 'y') {
          let scale = vnode.context.scale.y.scale();
          initialValue = scale(0);
        }
        d3.select(el)
          .attr(binding.arg, initialValue)
          .transition(binding.arg).duration(vnode.context.transition)
          .attr(binding.arg, binding.value);
      },
      update(el, binding, vnode) {
        d3.select(el)
          .attr(binding.arg, binding.oldValue)
          .transition().duration(vnode.context.transition)
          .attr(binding.arg, binding.value);
      },
    },
  },
  filters: {
    valueFilterProxy(value, valueAxis) {
      if (valueAxis && valueAxis.render) {
        return valueAxis.render(value);
      } else {
        return value;
      }
    }
  },
};

</script>

<style>
.vuestro-app {
  --vuestro-bar-chart-font-size: 0.8em;
}
</style>

<style scoped>

.vuestro-bar-chart {
  position: relative;
  width: 100%;
  height: 100%;
  flex-grow: 1;
  overflow: hidden;
}

.vuestro-bar-chart-inner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.vuestro-bar-chart-cursor {
  stroke: var(--vuestro-outline);
  stroke-width: 2px;
  fill: none;
}

.vuestro-bar-chart-tooltip rect {
	fill: var(--vuestro-light);
}

/* always hide axes lines */
.vuestro-bar-chart-x-axis >>> path {
  display: none;
}
.vuestro-bar-chart-y-axis >>> path {
  display: none;
}

/* toggle x grid */
.vuestro-bar-chart-x-axis >>> line {
  display: none;
  stroke: var(--vuestro-outline);
  stroke-dasharray: var(--vuestro-bar-chart-grid-dasharray);
}
.vuestro-bar-chart-x-axis.showGrid >>> line {
  display: inline;
}
/* toggle x axes labels */
.vuestro-bar-chart-x-axis >>> text {
  display: none;
  transform: translateY(-15px);
  text-anchor: middle;
  alignment-baseline: baseline;
}
.vuestro-bar-chart-x-axis.showXLabels >>> text,
.vuestro-bar-chart-x-axis.showAxes >>> text {
  display: inline;
}
/* toggle y grid */
.vuestro-bar-chart-y-axis >>> line {
  display: none;
  stroke: var(--vuestro-outline);
  stroke-dasharray: var(--vuestro-bar-chart-grid-dasharray);
}
.vuestro-bar-chart-y-axis.showGrid >>> line {
  display: inline;
}
/* toggle y axes labels */
.vuestro-bar-chart-y-axis >>> text {
  display: none;
  transform: translate(10px, -6px);
  text-anchor: start;
}
.vuestro-bar-chart-y-axis.showYLabels >>> text,
.vuestro-bar-chart-y-axis.showAxes >>> text {
  display: inline;
}

.vuestro-bar-chart-bar-label {
  fill: var(--vuestro-text-color);
  font-size: var(--vuestro-bar-chart-font-size);
}


.vuestro-title {
  margin: 0.5em;
  position: absolute;
  top: 0;
  left: 0;
}

</style>