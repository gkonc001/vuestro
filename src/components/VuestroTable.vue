<template>
  <div class="vuestro-table" :class="{ scroll }">
    <table class="vuestro-table-table">
      <slot v-if="$scopedSlots.thead" name="thead" :headers="headers"></slot>
      <thead v-else-if="!noHeader"
             class="vuestro-table-header-row"
             :class="{ transparentHeader }">
        <!-- spacer for detail expander -->
        <th v-if="$scopedSlots.detail" class="vuestro-table-header vuestro-table-header-spacer"></th>
        <slot v-if="$scopedSlots['header-row']" name="header-row" :headers="headers"></slot>
        <th v-else v-for="column in headers"
            class="vuestro-table-header"
            :style="column.padding !== undefined && `padding: ${column.padding}px`">
          <slot v-if="$scopedSlots['header-cell']" name="header-cell" :item="column"></slot>
          <template v-else>
            <div class="vuestro-table-header-cell"
                 :class="[ column.align && `vuestro-table-align-${column.align}` ]">
              <span>{{ column.title }}</span>
              <vuestro-button v-if="column.sortable"
                    no-border
                    round
                    size="sm"
                    class="vuestro-table-header-sort"
                    :class="{ active: isSortActive(column), desc: isSortDescending(column) }"
                    @click="onSort(column)">
                <vuestro-icon name="arrow-up"></vuestro-icon>
              </vuestro-button>
            </div>
          </template>
        </th>
        <th v-if="$scopedSlots['header-buttons']" class="vuestro-table-header">
          <div class="vuestro-table-header-buttons">
            <slot name="header-buttons"></slot>
          </div>
        </th>
        <th v-else-if="$scopedSlots['row-buttons']" class="vuestro-table-header"></th>
      </thead>
      <tbody>
        <tr v-if="sortedFilteredData.length === 0" class="vuestro-table-row">
          <td :colspan="headers.length + 1" align="center"><!-- plus one in case there are header buttons -->
            <div class="vuestro-table-no-data-slot">
              <slot name="no-data"></slot>
            </div>
          </td>
        </tr>
        <template v-for="(row, idx) in sortedFilteredData">
          <tr class="vuestro-table-row" @click.exact="onRowClick(row)">
            <!-- detail expander caret, always give it minimum width -->
            <td v-if="$scopedSlots.detail" style="width:1px">
              <vuestro-caret :collapsed="!isExpanded(idx)" @click.stop="toggleDetail(idx)"></vuestro-caret>
            </td>
            <!--ROW SLOT-->
            <slot v-if="$scopedSlots.row" name="row" :item="row" :index="idx"></slot>
            <td v-else v-for="column in headers"
                class="vuestro-table-cell"
                :class="[ `vuestro-table-align-${column.align}`, getClasses(column.classes, column.field, row)]"
                :style="`padding: ${column.padding}px`">
              <!--CELL SLOT-->
              <slot v-if="$scopedSlots.cell" name="cell" :item="{ column, row }"></slot>
              <component v-else-if="column.component" :is="column.component" v-model="row[column.field]"></component>
              <template v-else>
                <template v-if="column.async && getField(row, column.field) == null">
                  <vuestro-icon scale="0.7" name="spinner" pulse></vuestro-icon>
                </template>
                <template v-else>
                  {{ getField(row, column.field) | cellFilterProxy(column.render, row) }}
                </template>
              </template>
            </td>
            <!--ROW BUTTONS-->
            <td v-if="$scopedSlots['row-buttons']">
              <div class="vuestro-table-row-buttons">
                <slot name="row-buttons" :item="row" :index="idx"></slot>
              </div>
            </td>
          </tr>
          <!--DETAIL ROW-->
          <tr v-if="$scopedSlots.detail && isExpanded(idx)" class="vuestro-table-detail-row">
            <td v-if="$scopedSlots.detail"><!-- gutter/spacer --></td>
            <td :colspan="headers.length + ($scopedSlots['row-buttons'] ? 1:0)">
              <slot name="detail" :item="row" :index="idx"></slot>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>

/* global _ */

export default {
  name: 'VuestroTable',
  props: {
    data: { type: Array, default: () => [] },
    options: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      sort: [],
      filter: [],
      noHeader: false,
      scroll: false,
      expandedRows: [],
      transparentHeader: false,
    };
  },
  beforeMount() {
    _.merge(this, this.options);
  },
  mounted() {
    if (this.options.columns) {
      // add any columns with default sort to sort array, only on mount
      this.options.columns.forEach((k) => {
        if (k.sort) {
          this.sort.push({
            field: k.field,
            direction: k.sort,
          });
        }
      });
    }
  },
  computed: {
    headers() {
      if (this.options.columns) {
        return this.options.columns;
      } else {
        // auto-create headers from keys of first data items (assumes data is homogenous)
        if (this.data.length > 0) {
          let headers = [];
          Object.keys(this.data[0]).forEach((k) => {
            headers.push({
              title: k,
              field: k,
              align: 'left',
            });
          });
          return headers;
        }
        return []; // no data...no headers
      }
    },
    sortedFilteredData() {
      if (this.sort.length === 0 && this.filter.length === 0) {
        return this.data;
      } else {
        // filter data
        let filteredData = this.data;
        if (this.filter.length > 0) {
          for (let f of this.filter) {
            switch (f.op) {
              case 'include':
                filteredData = _.filter(filteredData, function(d) {
                  return d[f.field].indexOf(f.value) > -1;
                });
                break;
              case 'exclude':
                filteredData = _.reject(filteredData, function(d) {
                  return d[f.field].indexOf(f.value) > -1;
                });
                break;
            }
          }
        }
        // return sorted results
        return _.orderBy(filteredData, _.flatMap(this.sort, 'field'), _.flatMap(this.sort, 'direction'));
      }
    },
  },
  methods: {
    isSortActive(c) {
      return _.find(this.sort, { field: c.field });
    },
    isSortDescending(c) {
      return _.find(this.sort, { field: c.field, direction: 'desc' });
    },
    onSort(c) {
      let o = _.find(this.sort, { field: c.field });
      if (o) {
        this.toggleSortDirection(o);
      } else {
        this.sort.push({
          field: c.field,
          direction: 'asc',
        });
      }
    },
    toggleSortDirection(o) {
      if (o.direction === 'asc') {
        o.direction = 'desc';
      } else {
        // remove sort definition
        let idx = _.findIndex(this.sort, { field: o.field });
        this.sort.splice(idx, 1);
      }
    },
    isExpanded(idx) {
      return this.expandedRows.indexOf(idx) > -1;
    },
    onRowClick(row) {
      this.$emit('row-click', row);
    },
    toggleDetail(idx) {
      let expandedRowsIdx = this.expandedRows.indexOf(idx);
      if (expandedRowsIdx > -1) {
        this.expandedRows.splice(expandedRowsIdx, 1);
      } else {
        this.expandedRows.push(idx);
      }
    },
    expandAll() {
      this.expandedRows = [...Array(this.data.length).keys()];
    },
    collapseAll() {
      this.expandedRows = [];
    },
    addFilter(field, value, op='include') {
      if (!_.find(this.filter, { field, value })) {
        this.filter.push({
          field,
          value,
          op,
        });
      }
    },
    removeFilter(field, value) {
      let idx = _.findIndex(this.filter, { field, value });
      if (idx > -1) {
        this.filter.splice(idx, 1);
      }
    },
    getField: _.get, // alias lodash function
    getClasses(classes, field, row) {
      if (_.isFunction(classes)) {
        return classes(field, row);
      }
      return classes;
    },
  },
  filters: {
    cellFilterProxy(value, renderer, row) {
      if (renderer) {
        return renderer(value, row);
      } else {
        return value;
      }
    }
  }
};

</script>

<style>

.vuestro-app {
  --vuestro-table-header-bg: transparent;
  --vuestro-table-header-fg: var(--vuestro-text-color-muted);
  --vuestro-table-header-fg-active: var(--vuestro-text-color);
  --vuestro-table-alternate-bg: rgba(10,9,8,0.02);
  --vuestro-table-hover-bg: rgba(10,9,8,0.06);
  --vuestro-table-border-color: rgba(0,0,0,0.12);
}
.vuestro-dark {
  --vuestro-table-border-color: #222324;
  --vuestro-table-alternate-bg: rgba(10,9,8,0.15);
}

</style>

<style scoped>

.vuestro-table {
  flex-grow: 1;
  min-width: 0;
}
.vuestro-table.scroll {
  overflow: auto;
}

.vuestro-table-table {
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
}

.vuestro-table-header-row {
  background-color: var(--vuestro-table-header-bg);
}
.vuestro-table-header-row.transparentHeader {
  background-color: transparent;
}

.vuestro-table-header {
  padding: 0.4em 0.6em;
  color: var(--vuestro-table-header-fg);
  font-weight: 500;
  border-bottom: 1px solid var(--vuestro-table-border-color);
}
.vuestro-table-header:hover {
  color: var(--vuestro-table-header-fg-active);
}
.vuestro-table-header-cell {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.vuestro-table-header-cell.vuestro-table-align-right {
  justify-content: flex-end;
}
.vuestro-table-header-cell.vuestro-table-align-center {
  justify-content: center;
}
.vuestro-table-header-sort {
  opacity: 0;
  transition: opacity 0.4s;
}
.vuestro-table-header:hover .vuestro-table-header-sort {
  opacity: 1;
}
.vuestro-table-header-sort.active {
  opacity: 1;
  color: var(--vuestro-table-header-fg-active);
}
.vuestro-table-header-sort >>> svg {
  transition: transform 0.4s;
}
.vuestro-table-header-sort.desc >>> svg {
  transform: rotate(180deg);
}
.vuestro-table-header-spacer {
  width: 0.8em;
}

.vuestro-table-row {
  height: 1.7em;
  border-bottom: 1px solid var(--vuestro-table-border-color);
  background-color: var(--vuestro-table-alternate-bg);
}
.vuestro-table-row:nth-child(even) {
  background-color: transparent;
}
.vuestro-table-row:last-child {
  border-bottom: none;
}
.vuestro-table-row:hover {
  background-color: var(--vuestro-table-hover-bg);
}
.vuestro-table-detail-row {
  border-bottom: 1px solid var(--vuestro-table-border-color);
}

.vuestro-table-cell {
  padding: 0.4em 0.6em;
}
.vuestro-table-cell.vuestro-table-align-right {
  text-align: right;
}
.vuestro-table-cell.vuestro-table-align-center {
  text-align: center;
}
.vuestro-table-row-buttons {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-end;
  padding-right: 0.6em;
}
.vuestro-table-header-buttons {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-end;
}

.vuestro-table-no-data-slot {
  margin: 1em 0;
}

</style>