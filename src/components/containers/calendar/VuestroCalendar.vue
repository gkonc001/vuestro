<template>
  <div class="vuestro-calendar">
    <div class="vuestro-calendar-header">
      <!--ICON SLOT-->
      <slot name="icon"></slot>
      <div class="vuestro-calendar-month-name">
        {{ getMonthName() }}
      </div>
      <div class="vuestro-calendar-year">
        {{ getYear() }}
      </div>
      <div class="vuestro-calendar-header-buttons">
        <!--TOOLBAR SLOT-->
        <slot name="toolbar"></slot>

        <vuestro-button class="back" value no-border @click="backMonth">
          <vuestro-icon name="angle-left"></vuestro-icon>
        </vuestro-button>
        <vuestro-button value no-border @click="goToToday">Today</vuestro-button>
        <vuestro-button class="forward" value no-border @click="forwardMonth">
          <vuestro-icon name="angle-right"></vuestro-icon>
        </vuestro-button>
      </div>
    </div>
    <div class="vuestro-calendar-body">
      <table>
        <thead>
          <th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>
        </thead>
        <tbody>
          <tr v-for="w in 6">
            <td v-for="d in 7" :class="`vuestro-calendar-day-cell-${d}`">
              <vuestro-calendar-day :date="getDate(w, d)"
                                    :utc="utc">
                <template #default="{ date, isToday }">
                  <slot name="day" :date="date" :isToday="isToday"></slot>
                </template>
              </vuestro-calendar-day>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

/* global moment */
import VuestroCalendarDay from './VuestroCalendarDay';

export default {
  name: 'VuestroCalendar',
  components: {
    VuestroCalendarDay,
  },
  props: {
    utc: { type: Boolean, default: false }, // utc mode
  },
  data() {
    return {
      displayedMoment: moment().startOf('month'), // default to this month
    };
  },
  methods: {
    getMonth() {
      return moment(this.displayedMoment);
    },
    getMonthName() {
      return this.getMonth().format('MMMM');
    },
    getYear() {
      return moment(this.displayedMoment).year();
    },
    getDate(w, d) {
      let m = this.getMonth();
      let startDay = m.startOf('month').day();
      let maxDay = m.daysInMonth();
      if (w === 1 && d > startDay) {
        return m.add(d - startDay - 1, 'days');
      } else {
        let dayNum = (d - startDay - 1) + (w-1)*7;
        if (dayNum > 0 && dayNum < maxDay) {
          return m.add(dayNum, 'days');
        }
      }
      return null;
    },
    backMonth() {
      this.displayedMoment.subtract(1, 'month');
      this.$forceUpdate();
    },
    forwardMonth() {
      this.displayedMoment.add(1, 'month');
      this.$forceUpdate();
    },
    goToToday() {
      this.displayedMoment = moment();
    },
  }
};

</script>

<style>

.vuestro-app {
  --vuestro-calendar-title-font-size: 1.6em;
  --vuestro-calendar-month-font-weight: 700;
  --vuestro-calendar-year-font-weight: 300;
  --vuestro-calendar-weekend-bg: var(--vuestro-light);
}
.vuestro-dark {
  --vuestro-calendar-weekend-bg: rgba(255,255,255,0.05);
}

</style>

<style scoped>

.vuestro-calendar {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.vuestro-calendar-header {
  width: 100%;
  flex: none;
  display: flex;
  align-items: center;
}

.vuestro-calendar-header-buttons {
  margin-left: auto;
  display: flex;
  margin-right: 0.2em;
}

.vuestro-calendar-month-name {
  margin-left: 0.3em;
  font-size: var(--vuestro-calendar-title-font-size);
  font-weight: var(--vuestro-calendar-month-font-weight);
}
.vuestro-calendar-year {
  margin-left: 0.2em;
  font-size: var(--vuestro-calendar-title-font-size);
  font-weight: var(--vuestro-calendar-year-font-weight);
}

.vuestro-calendar-body {
  flex-grow: 1;
}

.vuestro-calendar-body > table {
  width: 100%;
  height: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  table-layout: fixed;
}
.vuestro-calendar-body > table > thead {
  border-bottom: 2px solid var(--vuestro-outline);
}
.vuestro-calendar-body > table > thead > th {
  text-align: right;
  padding-right: 0.5em;
  padding-bottom: 0.4em;
}

.vuestro-calendar-body td {
  padding: 0;
  border: 1px solid var(--vuestro-outline);
}
.vuestro-calendar-body tr {
  height: 14.285714285714286%;
}
.vuestro-calendar-body .vuestro-calendar-day-cell-1 {
  border-left: none;
  background-color: var(--vuestro-calendar-weekend-bg);
}

.vuestro-calendar-body .vuestro-calendar-day-cell-7 {
  border-right: none;
  background-color: var(--vuestro-calendar-weekend-bg);
}

</style>