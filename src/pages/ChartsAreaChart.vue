<template>
  <vuestro-container>
    <vuestro-card color="var(--vuestro-purple)" overflow-hidden>
      <template #heading><span class="drag">Area Chart</span></template>
      <template #description><span>The VuestroAreaChart component is flexible enough to be used with a categorical x axis as well as a time scale. Since time series are so common for area charts, that is the default behavior and can be disabled with the <em>timeSeries: false</em> option.</span></template>
      <vuestro-panel class="chart-wrapper">
        <vuestro-area-chart :data="data" :options="options1"></vuestro-area-chart>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card overflow-hidden>
      <template #subheading><span>Set the <em>notFilled: true</em> option for a line chart</span></template>
      <vuestro-panel class="chart-wrapper">
        <vuestro-area-chart :data="data" :options="options2"></vuestro-area-chart>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card overflow-hidden>
      <template #subheading><span>Set the <em>stacked: true</em> option to render as stacked areas</span></template>
      <vuestro-panel class="chart-wrapper">
        <vuestro-area-chart :data="data" :options="options5"></vuestro-area-chart>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card overflow-hidden>
      <template #subheading><span>Set the <em>granularity</em> option to apply aggregation by date units. Usable values are <em>{ 'year' 'month', 'quarter', 'week', 'isoWeek', 'day', 'date', 'hour', 'minute', 'second' }</em></span></template>
      <vuestro-panel class="chart-wrapper">
        <vuestro-area-chart :data="data" :options="options6"></vuestro-area-chart>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card overflow-hidden>
      <template #subheading>Set the showAxes: true option to show axes and use a render function to manipulate value scale labels</template>
      <vuestro-panel class="chart-wrapper">
        <vuestro-area-chart :data="data" :options="options3"></vuestro-area-chart>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card overflow-hidden>
      <template #subheading><span>Set the <em>title</em> slot to add a title</span></template>
      <vuestro-panel class="chart-wrapper">
        <vuestro-area-chart :data="data" :options="options3">
          <template #title>The Title</template>
        </vuestro-area-chart>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card overflow-hidden>
      <template #subheading>Change the data property and the chart will update</template>
      <vuestro-panel class="chart-wrapper">
        <vuestro-area-chart :data="dynamicData" :options="options4"></vuestro-area-chart>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card overflow-hidden>
      <template #subheading>Change the options property and the chart will update (set transition = 0 to avoid weird animation effects)</template>
      <vuestro-panel collapsible>
        <template #title>Series</template>
        <vuestro-container>
          <vuestro-button @click="dynamicOptions.series.push({field:'value1', title:'Series 1'})">Add Series 1</vuestro-button>
          <vuestro-button @click="dynamicOptions.series.push({field:'value2', title:'Series 2'})">Add Series 2</vuestro-button>
          <vuestro-button @click="dynamicOptions.series.push({field:'value3', title:'Series 3'})">Add Series 3</vuestro-button>
          <vuestro-button @click="dynamicOptions.series.push({field:'value3', title:'Disabled', disabled: true})">Add Disabled Series</vuestro-button>
          <vuestro-button @click="dynamicOptions.series = []" variant="danger">Clear Series</vuestro-button>
        </vuestro-container>
      </vuestro-panel>
      <vuestro-panel collapsible>
        <template #title>Misc Options</template>
        <vuestro-container>
          <vuestro-button checkbox v-model="dynamicOptions.timeSeries">Time Series</vuestro-button>
          <vuestro-button checkbox v-model="dynamicOptions.smooth">Smooth</vuestro-button>
          <vuestro-button checkbox v-model="dynamicOptions.showAxes">Axes</vuestro-button>
          <vuestro-button checkbox v-model="dynamicOptions.showGrid">Grid</vuestro-button>
          <vuestro-button checkbox v-model="dynamicOptions.hideTooltip">Hide Tooltip</vuestro-button>
          <vuestro-button checkbox v-model="dynamicOptions.notFilled">No Fill</vuestro-button>
          <vuestro-button checkbox v-model="dynamicOptions.gradientFill">Gradient</vuestro-button>
          <vuestro-button checkbox v-model="dynamicOptions.count">Count Agg</vuestro-button>
          <vuestro-text-field placeholder="Fill Opacity" v-model="dynamicOptions.fillOpacity"></vuestro-text-field>
          <vuestro-text-field placeholder="Grid DashArray" v-model="dynamicOptions.gridDashArray"></vuestro-text-field>
          <vuestro-text-field placeholder="Stroke Width" v-model="dynamicOptions.strokeWidth"></vuestro-text-field>
          <vuestro-dropdown>
            <template #button>
              <vuestro-button rounded size="lg">
                <template #placeholder>
                  Granularity
                </template>
                {{ dynamicOptions.granularity }}
                </vuestro-button>
            </template>
            <vuestro-list-button @click="dynamicOptions.granularity = 'year'">year</vuestro-list-button>
            <vuestro-list-button @click="dynamicOptions.granularity = 'month'">month</vuestro-list-button>
            <vuestro-list-button @click="dynamicOptions.granularity = 'quarter'">quarter</vuestro-list-button>
            <vuestro-list-button @click="dynamicOptions.granularity = 'week'">week</vuestro-list-button>
            <vuestro-list-button @click="dynamicOptions.granularity = 'isoWeek'">isoWeek</vuestro-list-button>
            <vuestro-list-button @click="dynamicOptions.granularity = 'day'">day</vuestro-list-button>
            <vuestro-list-button @click="dynamicOptions.granularity = 'date'">date</vuestro-list-button>
            <vuestro-list-button @click="dynamicOptions.granularity = 'hour'">hour</vuestro-list-button>
            <vuestro-list-button @click="dynamicOptions.granularity = 'minute'">minute</vuestro-list-button>
            <vuestro-list-button @click="dynamicOptions.granularity = 'second'">second</vuestro-list-button>
          </vuestro-dropdown>
        </vuestro-container>
      </vuestro-panel>
      <vuestro-panel collapsible>
        <template #title>Options Object</template>
        <vuestro-object-browser :data="dynamicOptions" :options="{ editable: true }"></vuestro-object-browser>
      </vuestro-panel>
      <vuestro-panel class="chart-wrapper">
        <vuestro-area-chart :data="data" :options="dynamicOptions"></vuestro-area-chart>
      </vuestro-panel>
    </vuestro-card>

  </vuestro-container>
</template>

<script>

/* global Vue */
export default {
  name: 'AreaChart',
  data() {
    return {
      data: [
        {
          key: '2019-10-01T00:00:00Z',
          value1: 40,
          value2: 12,
          value3: 8,
        },
        {
          key: '2019-10-01T01:00:00Z',
          value1: 2,
          value2: 6,
          value3: 19,
        },
        {
          key: '2019-10-01T02:00:00Z',
          value1: 3,
          value2: 33,
          value3: 8,
        },
        {
          key: '2019-10-01T03:00:00Z',
          value1: 6,
          value2: 13,
          value3: 2,
        },
        {
          key: '2019-10-01T04:00:00Z',
          value1: 1,
          value2: 13,
          value3: 2,
        },
        {
          key: '2019-10-01T04:30:00Z',
          value1: 1,
          value2: 13,
          value3: 2,
        },
        {
          key: '2019-10-01T05:00:00Z',
          value1: 1,
          value2: 13,
          value3: 3,
        },
        {
          key: '2019-10-01T06:00:00Z',
          value1: 32,
          value2: 13,
          value3: 2,
        },
      ],

      options1: {
        series: [
          {
            title: 'Series 1',
            field: 'value1',
          },
          {
            title: 'Series 2',
            field: 'value2',
            render(d) {
              return d.toFixed(2);
            },
          },
          {
            title: 'Series 3',
            field: 'value3',
          },
        ],
      },
      options2: {
        notFilled: true,
        series: [
          {
            title: 'Series 1',
            field: 'value1',
          },
          {
            title: 'Series 2',
            field: 'value2',
            render: Vue.filter('vuestroBytes'),
          },
          {
            title: 'Series 3',
            field: 'value3',
          },
        ],
      },
      options3: {
        gradientFill: true,
        showAxes: true,
        valueAxis: {
          render(d) {
            return `${d.toFixed(2)} kb`;
          },
        },
        series: [
          {
            title: 'Series 1',
            field: 'value1',
            color: 'green'
          },
          {
            title: 'Series 2',
            field: 'value2',
          },
          {
            title: 'Series 3',
            field: 'value3',
          },
        ],
      },
      options5: {
        stacked: true,
        series: [
          {
            title: 'Series 1',
            field: 'value1',
          },
          {
            title: 'Series 2',
            field: 'value2',
          },
          {
            title: 'Series 3',
            field: 'value3',
          },
        ],
      },
      options6: {
        granularity: 'hour',
        series: [
          {
            title: 'Series 1',
            field: 'value1',
          },
          {
            title: 'Series 2',
            field: 'value2',
          },
          {
            title: 'Series 3',
            field: 'value3',
          },
        ],
      },
      dynamicData: [],
      options4: {
        utc: true,
        showAxes: true,
        slide: true,
        series: [
          {
            title: 'CPU1',
            field: 'cpu1',
          },
          {
            title: 'CPU2',
            field: 'cpu2',
          },
        ],
      },
      dynamicOptions: {
        timeSeries: true,
        granularity: 'hour',
        count: false,
        smooth: true,
        showAxes: true,
        showGrid: true,
        notFilled: false,
        hideTooltip: false,
        fillOpacity: 0.6,
        gridDashArray: 5,
        strokeWidth: 2,
        series: [
          {
            title: 'Series 1',
            field: 'value1',
          },
          {
            title: 'Series 2',
            field: 'value2',
          },
          {
            title: 'Series 3',
            field: 'value3',
          },
        ],
      },
    };
  },
  beforeMount() {
    for (let i=100; i>0; i--) {
      this.dynamicData.push(this.getPoint(i));
    }
  },
  mounted() {
    setInterval(() => {
      this.dynamicData.push(this.getPoint());
      this.dynamicData.shift();
    }, 1000);
  },
  methods: {
    getPoint(i=0) {
      return {
        key: new Date(Date.now() - 1000*i),
        cpu1: Math.floor(Math.random()*(100+1)),
        cpu2: Math.floor(Math.random()*(100+1)),
      };
    }
  }
};

</script>


<style scoped>

.chart-wrapper {
  height: 300px;
}

</style>