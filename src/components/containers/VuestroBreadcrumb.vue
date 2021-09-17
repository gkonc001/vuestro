<template>
  <vuestro-container class="vuestro-breadcrumb" :gutter="gutter">
    <div class="vuestro-breadcrumb-trail">
      <template v-for="(p, idx) in stack">
        <div v-if="idx !== 0 && variant !== 'tabs' && variant !== 'arrows'"
             class="vuestro-breadcrumb-delimiter">
          <vuestro-icon :name="delimiter"></vuestro-icon>
        </div>
        <div class="vuestro-breadcrumb-item"

             :style="getItemStyle(p)"
             @click="onClickTrail(idx)">
          <vuestro-icon v-if="p.icon" :name="p.icon"></vuestro-icon>
          <div class="vuestro-breadcrumb-title">{{ p.title }}</div>
        </div>
      </template>
    </div>
    <template v-if="top && top.component">
      <component ref="top" :is="top.component" :data="top.data" :options="top.options" @descend="onDescend" @ascend="onAscend"></component>
    </template>
    <div v-else>Component not found</div>
  </vuestro-container>
</template>

<script>

/* global atob, btoa */

export default {
  name: 'VuestroBreadcrumb',
  props: {
    pages: { type: Array, required: true },
    delimiter: { type: String, default: 'angle-right' },
    gutter: { type: String, default: 'md' },   // proxy vuestro-container option
    variant: { type: String, default: 'regular' }, // regular, tabs
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
      return {
        'background-color': item.color || 'transparent',
      };
    },
    // re-read the stack from the pages prop
    reset() {
      this.stack = this.pages;
      this.updateUrl();
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
}

</style>

<style scoped>

.vuestro-breadcrumb-trail {
  padding-left: 0.2em;
  padding-right: 0.2em;
  flex: none;
  height: var(--vuestro-breadcrumb-height);
  width: 100%;
  display: flex;
  align-items: center;
  font-size: var(--vuestro-breadcrumb-font-size);
  font-weight: var(--vuestro-breadcrumb-font-weight);
}
.vuestro-breadcrumb-item {
  display: flex;
  cursor: pointer;
  padding: 0.2em 0.4em;
  border-radius: var(--vuestro-control-border-radius);
}
.vuestro-breadcrumb-item:hover {
  background-color: var(--vuestro-selection);
}
.vuestro-breadcrumb-title {
  padding-left: 0.2em;
  font-size: 0.9em;
}
.vuestro-breadcrumb-title:not(:only-child) {
  margin-left: 0.2em;
}

.vuestro-breadcrumb-delimiter {
  padding: 0 0.3em;
}
.vuestro-breadcrumb-item-tabs {
}

</style>
