<template>
  <div v-if="day" class="vuestro-calendar-day">
    <div class="vuestro-calendar-day-header">
      <div class="vuestro-calendar-day-label" :class="{ isToday }">
        {{ day }}
      </div>
    </div>
    <slot :date="date" :isToday="isToday"></slot>
  </div>
</template>

<script>

import moment from 'moment';

export default {
  name: 'VuestroCalendarDay',
  props: ['date', 'utc'],
  computed: {
    isToday() {
      return this.date && moment(this.date).isSame(moment(), 'day');
    },
    day() {
      if (this.date) {
        return this.date.date();
      }
      return '';
    },
  },
};

</script>

<style scoped>


.vuestro-calendar-day {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.vuestro-calendar-day-header {
  display: flex;
  flex-direction: row-reverse;
  padding: 0.2em;
}
.vuestro-calendar-day-label {
  width: 1.2em;
  height: 1.2em;
  text-align: center;
  font-size: 1.2em;
}

.vuestro-calendar-day-label.isToday {
  font-weight: 700;
  background-color: var(--vuestro-salmon);
  border-radius: 50%;
}

</style>