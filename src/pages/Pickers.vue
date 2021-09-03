<template>
  <vuestro-container>
    <vuestro-card color="var(--vuestro-purple)">
      <template #heading>Pickers</template>
      <template #description>
        Pickers are a necessary part of input to any Web application. Vuestro attempts to provide a comprehensive set of pickers for any need, from datetime pickers to color pickers.
      </template>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>Vuestro Color Picker</template>
      <template #description><span>
        Simple drop-down color picker to choose within a pre-defined palette. There are <vuestro-code>placeholder</vuestro-code> and <vuestro-code>extra</vuestro-code> slots available.
      </span></template>
      <vuestro-container>
        <vuestro-color-picker v-model="color" size="lg"></vuestro-color-picker>
        <vuestro-color-picker v-model="color" size="md"></vuestro-color-picker>
        <vuestro-color-picker v-model="color" size="sm"></vuestro-color-picker>
        <vuestro-color-picker v-model="color" size="lg" pill>
          <template #title>Title</template>
          <template #extra>
            <vuestro-button pill>Auto</vuestro-button>
          </template>
        </vuestro-color-picker>
        <vuestro-color-picker v-model="color" size="md" pill></vuestro-color-picker>
        <vuestro-color-picker v-model="color" size="sm" pill right></vuestro-color-picker>
      </vuestro-container>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span><vuestro-code>variant="shaded"</vuestro-code></span>
      </template>
      <vuestro-container>
        <vuestro-color-picker v-model="color" variant="shaded">
          <template #title>Title</template>
          <template #extra>
            <vuestro-button pill>Auto</vuestro-button>
          </template>
        </vuestro-color-picker>
      </vuestro-container>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span><vuestro-code>variant="outline"</vuestro-code></span>
      </template>
      <vuestro-container>
        <vuestro-color-picker v-model="color" variant="outline">
          <template #title>Title</template>
          <template #extra>
            <vuestro-button pill>Auto</vuestro-button>
          </template>
        </vuestro-color-picker>
      </vuestro-container>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>Vuestro Time Picker</template>
    </vuestro-card>

    <vuestro-card cols="6">
      <template #description>
        Select time by using spinner controls or typing in each field.
      </template>
      <vuestro-time-picker v-model="exampleTime"></vuestro-time-picker>
    </vuestro-card>

    <vuestro-card cols="6">
      <template #description>
        ...include seconds by setting the seconds property
      </template>
      <vuestro-time-picker v-model="exampleTime" seconds></vuestro-time-picker>
    </vuestro-card>

    <vuestro-card cols="6">
      <template #description>
        <span>Use UTC by setting the <em>utc</em> property</span>
      </template>
      <vuestro-time-picker v-model="exampleTime" utc seconds></vuestro-time-picker>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>Vuestro Date Picker</template>
    </vuestro-card>

    <vuestro-card>
      <template #description>Single date - value is selected date</template>
      <vuestro-container justify="space-between">
        <vuestro-date-picker v-model="exampleDate"></vuestro-date-picker>
        <div>value: {{ exampleDate }}</div>
      </vuestro-container>
      <vuestro-container justify="space-between">
        <vuestro-date-picker v-model="exampleDateString" utc></vuestro-date-picker>
        <div>value: {{ exampleDateString }}</div>
      </vuestro-container>
    </vuestro-card>

    <vuestro-card>
      <template #description><span>Date range - set the <em>range</em> property to use an array as the value with [start, end] dates</span></template>
      <vuestro-container justify="space-between">
        <vuestro-date-picker v-model="exampleDateRange" range></vuestro-date-picker>
        <div>value: {{ exampleDateRange }}</div>
      </vuestro-container>
    </vuestro-card>

    <vuestro-card>
      <template #description><span>In a popup</span></template>
      <vuestro-container justify="space-between">
        <vuestro-dropdown no-scroll>
          <template #title>{{ exampleDateString }}</template>
          <vuestro-date-picker v-model="exampleDateString"></vuestro-date-picker>
        </vuestro-dropdown>
        <vuestro-dropdown no-scroll>
          <template #title>{{ formatRange(exampleDateRange) }}</template>
          <vuestro-date-picker v-model="exampleDateRange" range></vuestro-date-picker>
        </vuestro-dropdown>
      </vuestro-container>
    </vuestro-card>

    <vuestro-card>
      <template #description><span>Use UTC by setting the <em>utc</em> property</span></template>
      <vuestro-container justify="space-between">
        <vuestro-dropdown no-scroll>
          <template #title>{{ formatIsoRange(exampleDateRange) }}</template>
          <vuestro-date-picker v-model="exampleDateRange" range utc></vuestro-date-picker>
        </vuestro-dropdown>
      </vuestro-container>
    </vuestro-card>

    <vuestro-card>
      <template #description><span>Combine date picker with time picker</span></template>
      <vuestro-container justify="space-between">
        <vuestro-dropdown no-scroll>
          <template #title>{{ formatIsoRange(exampleDateRange) }}</template>
          <vuestro-date-picker v-model="exampleDateRange" range utc></vuestro-date-picker>
          <vuestro-container justify="space-between">
            <vuestro-time-picker v-model="exampleDateRange[0]" utc seconds></vuestro-time-picker>
            <vuestro-time-picker v-model="exampleDateRange[1]" utc seconds></vuestro-time-picker>
          </vuestro-container>
        </vuestro-dropdown>
      </vuestro-container>
    </vuestro-card>

  </vuestro-container>
</template>

<script>

import moment from 'moment';

export default {
  name: 'Pickers',
  data() {
    return {
      color: '#2163C9',
  		exampleTime: new Date().toISOString(),
  		exampleDate: moment().subtract(1, 'day'),
  		exampleDateString: moment().subtract(1, 'day').toISOString(),
  		exampleDateRange: [moment().subtract(7, 'days').toDate(), new Date()],
    };
  },
  methods: {
    formatRange(ary) {
      return `${ary[0].toLocaleString()} - ${ary[1].toLocaleString()}`;
    },
    formatIsoRange(ary) {
      return `${ary[0].toISOString()} - ${ary[1].toISOString()}`;
    },
  },
};

</script>

<style scoped>

.vuestro-container {
}

</style>