<template>
  <div class="vuestro-date-picker">
    <template v-for="m in monthOffsets">
      <div class="vuestro-date-picker-block">
        <!--YEAR PICKER MODE-->
        <div v-if="pickYear">
          <div class="vuestro-date-picker-header">
            <vuestro-button class="back" round size="sm" no-margin no-border @click="backYears">
              <vuestro-icon name="angle-left"></vuestro-icon>
            </vuestro-button>
            <div class="name">{{ getYear() - 5 }} - {{ getYear() + 6 }}</div>
            <vuestro-button class="forward" round size="sm" no-margin no-border @click="forwardYears">
              <vuestro-icon name="angle-right"></vuestro-icon>
            </vuestro-button>
          </div>
          <div class="vuestro-date-picker-body">
            <table>
              <tbody>
                <tr v-for="r in 4">
                  <td v-for="c in 3">
                    <vuestro-date-picker-year :year="parseInt(getYear()) - 6 + 3*(r-1) + c" @click="onClickYear"/>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!--MONTH PICKER MODE-->
        <div v-else-if="pickMonth">
          <div class="vuestro-date-picker-header">
            <div class="name single" @click="onSelectYear">{{ getYear() }}</div>
          </div>
          <div class="vuestro-date-picker-body">
            <table>
              <tbody>
                <tr>
                  <td><vuestro-date-picker-month :year="getYear()" month="Jan" @click="onClickMonth"/></td>
                  <td><vuestro-date-picker-month :year="getYear()" month="Feb" @click="onClickMonth"/></td>
                  <td><vuestro-date-picker-month :year="getYear()" month="Mar" @click="onClickMonth"/></td>
                </tr>
                <tr>
                  <td><vuestro-date-picker-month :year="getYear()" month="Apr" @click="onClickMonth"/></td>
                  <td><vuestro-date-picker-month :year="getYear()" month="May" @click="onClickMonth"/></td>
                  <td><vuestro-date-picker-month :year="getYear()" month="Jun" @click="onClickMonth"/></td>
                </tr>
                <tr>
                  <td><vuestro-date-picker-month :year="getYear()" month="Jul" @click="onClickMonth"/></td>
                  <td><vuestro-date-picker-month :year="getYear()" month="Aug" @click="onClickMonth"/></td>
                  <td><vuestro-date-picker-month :year="getYear()" month="Sep" @click="onClickMonth"/></td>
                </tr>
                <tr>
                  <td><vuestro-date-picker-month :year="getYear()" month="Oct" @click="onClickMonth"/></td>
                  <td><vuestro-date-picker-month :year="getYear()" month="Nov" @click="onClickMonth"/></td>
                  <td><vuestro-date-picker-month :year="getYear()" month="Dec" @click="onClickMonth"/></td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
        <!--NORMAL (MONTH) MODE-->
        <template v-else>
          <div class="vuestro-date-picker-header">
            <vuestro-button class="back" v-if="m == monthOffsets[0]" round no-border @click="backMonth">
              <vuestro-icon name="angle-left"></vuestro-icon>
            </vuestro-button>
            <div class="name" :class="{ single: monthOffsets.length === 1 }" @click.stop="onSelectMonth">{{ getMonthName(m) }}</div>
            <vuestro-button class="forward" v-if="m == monthOffsets[monthOffsets.length - 1]" round no-border @click="forwardMonth">
              <vuestro-icon name="angle-right"></vuestro-icon>
            </vuestro-button>
          </div>
          <div class="vuestro-date-picker-body">
            <table>
              <thead>
                <th>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th>
              </thead>
              <tbody>
                <tr v-for="w in 6">
                  <td v-for="d in 7">
                    <vuestro-date-picker-day :date="getDate(m, w, d)"
                                             :value="value"
                                             :utc="utc"
                                             @click="onClickDay">
                    </vuestro-date-picker-day>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script>

/* global _ */
import moment from 'moment';
import VuestroDatePickerDay from './VuestroDatePickerDay';
import VuestroDatePickerMonth from './VuestroDatePickerMonth';
import VuestroDatePickerYear from './VuestroDatePickerYear';

export default {
  name: 'VuestroDatePicker',
  components: {
    VuestroDatePickerDay,
    VuestroDatePickerMonth,
    VuestroDatePickerYear,
  },
  props: {
    value: { type: null, required: true },
    range: { type: Boolean, default: false },
    utc: { type: Boolean, default: false },
  },
  data() {
    return {
      displayedMoment: moment().startOf('month'), // default to this month
      dayRangeStart: null,
      dayRangeEnd: null,
      dayRangeState: 0, // 0=start date, 1=end date
      pickMonth: false,
      pickYear: false,
    };
  },
  computed: {
    monthOffsets() {
      if (this.range) {
        return [-1, 0, 1];
      }
      return [0];
    },
  },
  mounted() {
    this.updateDisplay();
  },
  methods: {
    updateDisplay() {
      if (this.value) {
        if (_.isArray(this.value) && this.value.length > 0) {
          this.displayedMoment = moment(this.value[this.value.length - 1]).startOf('month');
        } else if (_.isString(this.value)) {
          this.displayedMoment = moment(this.value);
        }
      } else {
        // use now
        this.displayedMoment = moment().startOf('month');
      }
      if (this.utc) {
        this.displayedMoment.utc();
      }
    },
    getMonth(offset) {
      return moment(this.displayedMoment).add(offset, 'months');
    },
    getMonthName(offset) {
      return this.getMonth(offset).format('MMMM YYYY');
    },
    getYear() {
      return moment(this.displayedMoment).year();
    },
    getDate(n, w, d) {
      let m = this.getMonth(n);
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
    onClickDay(d) {
      if (this.range == false) {
        if (_.isString(this.value)) {
          this.$emit('input', d.toISOString());
        } else {
          this.$emit('input', d);
        }
      } else {
        if (this.dayRangeState == 0) {
          // for first click, false as 2nd param
          this.$emit('input', [d, d], false);
          this.dayRangeState = 1;
        } else {
          let md = moment(d);
          if (this.utc) {
            md.utc();
          }
          // for 2nd click, send true as 2nd param
          if (md.isSameOrAfter(this.value[0])) {
            this.$emit('input', [this.value[0], md.endOf('day').toDate()], true);
          } else {
            this.$emit('input', [d, this.value[0]], true);
          }
          this.dayRangeState = 0;
        }
      }
    },
    backMonth() {
      this.displayedMoment.subtract(1, 'month');
      this.$forceUpdate();
    },
    forwardMonth() {
      this.displayedMoment.add(1, 'month');
      this.$forceUpdate();
    },
    onSelectMonth() {
      if (!this.range) {
        this.pickMonth = true;
      }
    },
    onClickMonth(d) {
      this.displayedMoment = d;
      this.pickMonth = false;
      this.$forceUpdate();
    },
    onSelectYear() {
      this.pickMonth = false;
      this.pickYear = true;
    },
    backYears() {
      this.displayedMoment.subtract(12, 'years');
      this.$forceUpdate();
    },
    forwardYears() {
      this.displayedMoment.add(12, 'years');
      this.$forceUpdate();
    },
    onClickYear(d) {
      this.displayedMoment = d;
      this.$nextTick(() => {
        this.pickYear = false;
        this.pickMonth = true;
        this.$forceUpdate();
      });
    },
  }
};

</script>

<style scoped>

.vuestro-date-picker {
  display: flex;
  margin: 5px;
}

.vuestro-date-picker-block {
  width: 180px;
}
.vuestro-date-picker-block:not(:first-child) {
  margin-left: 10px;
}
.vuestro-date-picker-header > .name {
  font-weight: 500
}
.vuestro-date-picker-header > .name.single {
  cursor: pointer;
}
.vuestro-date-picker-header {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 2px;
}
.vuestro-date-picker-header > .back {
  position: absolute;
  left: 0;
}
.vuestro-date-picker-header > .forward {
  position: absolute;
  right: 0;
}
.vuestro-date-picker-body > table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}
.vuestro-date-picker-body td {
  padding: 0;
}

</style>