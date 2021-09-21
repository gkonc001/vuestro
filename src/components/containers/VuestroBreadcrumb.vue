// Breadcrumb component which uses the url to save the stack for bookmarkable trails
//
// CSS Vars:
// --vuestro-breadcrumb-trail-bg - background for breadcrumb bar, defaults to transparent
//
<template>
  <vuestro-container class="vuestro-breadcrumb" :gutter="gutter">
    <div class="vuestro-breadcrumb-trail"
         :class="`vuestro-breadcrumb-trail-${variant}`">
      <template v-for="(p, idx) in stack">
        <div v-if="idx !== 0 && variant !== 'tabs' && variant !== 'panel'"
             class="vuestro-breadcrumb-delimiter">
          <vuestro-icon :name="delimiter"></vuestro-icon>
        </div>
        <div class="vuestro-breadcrumb-item"
             :class="`vuestro-breadcrumb-item-${variant}`"
             :style="getItemStyle(p)"
             @click="onClickTrail(idx)">
          <vuestro-icon v-if="p.icon" :name="p.icon"></vuestro-icon>
          <div class="vuestro-breadcrumb-title">{{ p.title }}</div>
          <template v-if="variant === 'tabs' || variant === 'panel'">
            <div class="vuestro-breadcrumb-item-arrow"
                 :style="getItemArrowStyle(p)">
            </div>
            <div class="vuestro-breadcrumb-item-arrow-border"></div>
          </template>
        </div>
      </template>
    </div>
    <template v-if="top && top.component">
      <component ref="top" :is="top.component" :data="top.data" :options="top.options" @descend="onDescend" @ascend="onAscend"></component>
    </template>
    <vuestro-container v-else>
      <slot name="no-data">
        No selection
      </slot>
    </vuestro-container>
  </vuestro-container>
</template>

<script>

/* global atob, btoa */

export default {
  name: 'VuestroBreadcrumb',
  props: {
    pages: { type: Array, default: () => [] },
    delimiter: { type: String, default: 'angle-right' },
    gutter: { type: String, default: 'md' },   // proxy vuestro-container option
    variant: { type: String, default: 'regular' }, // regular, tabs, panel
  },
  data() {
    return {
      stack: [],
    };
  },
  computed: {
    top() {
      return this.stack[this.stack.length - 1];
    },
  },
  mounted() {
    // initialize stack with either query param or the pages param
    if (Object.keys(this.$route.query).length > 0) {
      try {
        this.stack = JSON.parse(atob(this.$route.query.p));
      } catch (e) {
        console.error('error parsing breadcrumb query param', e);
        this.stack = this.pages;
      }
    } else {
      this.stack = this.pages;
    }
  },
  methods: {
    getItemStyle(item) {
      if (this.variant === 'tabs' || this.variant === 'panel') {
        return {
          'background-color': item.color || 'var(--vuestro-breadcrumb-fallback-color)',
        };
      }
      return {
        'background-color': item.color || 'transparent',
      };
    },
    getItemArrowStyle(item) {
      return {
        'border-left': `var(--vuestro-breadcrumb-tab-arrow-width) solid ${item.color || 'var(--vuestro-breadcrumb-fallback-color)'}`,
      };
    },
    // re-read the stack from the pages prop or take the arg if provided
    reset(pages) {
      // provide next tick as convenience so caller doesn't have to
      this.$nextTick(() => {
        this.stack = pages || this.pages;
        this.updateUrl();
      });
    },
    // add the given pageObj to the stack
    onDescend(pageObj) {
      // add to stack if it has the required fields
      if (pageObj.title && pageObj.component) {
        this.stack.push(pageObj);
        this.updateUrl();
      } else {
        console.warn('missing fields for breadcrumb push');
      }
    },
    // ascend one level
    onAscend(d) {
      this.stack.pop();
      this.updateUrl();
      // if a callbackName was provided (such as 'refresh') call it
      // on the new top component
      this.$nextTick(() => {
        if (d && d.callbackName) {
          let fn = this.$refs.top[d.callbackName];
          if (fn && fn instanceof Function) {
            fn();
          }
        }
      });
    },
    // jump to location on click trail, this means dumping
    // the stack after the given index
    onClickTrail(idx) {
      this.stack = this.stack.slice(0, idx+1);
      this.updateUrl();
    },
    // re-render the stack onto the URL as a query string
    updateUrl() {
      this.$router.push({ query: { p: btoa(JSON.stringify(this.stack)) }}).catch(()=>{});
    },
  },
};

</script>

<style>

.vuestro-app {
  --vuestro-breadcrumb-height: 30px;
  --vuestro-breadcrumb-root-bg: var(--vuestro-primary);
  --vuestro-breadcrumb-font-size: 1.2em;
  --vuestro-breadcrumb-font-weight: 500;
  --vuestro-breadcrumb-tab-arrow-width: 1em;
  --vuestro-breadcrumb-fallback-color: var(--vuestro-gray-dark);
}

</style>

<style scoped>

.vuestro-breadcrumb-trail {
  flex: none;
  height: var(--vuestro-breadcrumb-height);
  width: 100%;
  display: flex;
  align-items: center;
  font-size: var(--vuestro-breadcrumb-font-size);
  font-weight: var(--vuestro-breadcrumb-font-weight);
  overflow: hidden;
  background-color: var(--vuestro-breadcrumb-trail-bg, transparent);
}
.vuestro-breadcrumb-trail-panel {
  border-bottom: 1px solid var(--vuestro-outline);
  border-top-left-radius: calc(var(--vuestro-control-border-radius) - 1px);
  border-top-right-radius: calc(var(--vuestro-control-border-radius) - 1px);
}
.vuestro-breadcrumb-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.2em 0.4em;
  border-radius: var(--vuestro-control-border-radius);
  position: relative;
}
.vuestro-breadcrumb-item-tabs,
.vuestro-breadcrumb-item-panel {
  height: 100%;
  padding-right: 0;
  border-radius: 0;
}
.vuestro-breadcrumb-item-panel:first-child {
  border-top-left-radius: calc(var(--vuestro-control-border-radius) - 1px);
}
.vuestro-breadcrumb-item-tabs:not(:first-child),
.vuestro-breadcrumb-item-panel:not(:first-child) {
  padding-left: 1.5em;
}

.vuestro-breadcrumb-item-arrow {
  border-top: var(--vuestro-breadcrumb-height) solid transparent;
  border-bottom: var(--vuestro-breadcrumb-height) solid transparent;
  position: absolute;
  top: 50%;
  margin-top: calc(var(--vuestro-breadcrumb-height)*-1);
  left: 100%;
  z-index: 4;
}
.vuestro-breadcrumb-item-arrow-border {
  border-top: var(--vuestro-breadcrumb-height) solid transparent;
  border-bottom: var(--vuestro-breadcrumb-height) solid transparent;
  border-left: var(--vuestro-breadcrumb-tab-arrow-width) solid var(--vuestro-outline);
  position: absolute;
  top: 50%;
  margin-top: calc(var(--vuestro-breadcrumb-height)*-1);
  left: calc(100% + 1px);
  z-index: 1;
}
/*CHANGE TAB COLOR ON HOVER*/
.vuestro-breadcrumb-item:hover {
  background-color: var(--vuestro-selection) !important;
}
/*CHANGE ARROW COLOR ON HOVER */
.vuestro-breadcrumb-item:hover .vuestro-breadcrumb-item-arrow {
  border-left-color: var(--vuestro-selection) !important;
}
.vuestro-breadcrumb-item > .vuestro-icon {
  margin-right: 0.4em;
}
.vuestro-breadcrumb-title {
  font-size: 0.9em;
}

.vuestro-breadcrumb-delimiter {
  padding: 0 0.3em;
}

</style>
