<template>
  <div class="vuestro-navbar">
    <!--MOBILE SIDEBAR-->
    <template v-if="$root.mobile">
        <vuestro-button class="vuestro-hamburger"
                        no-border rounded
                        size="xl"
                        :value="showSidebar"
                        @click="showSidebar = !showSidebar">
          <vuestro-icon name="bars"></vuestro-icon>
        </vuestro-button>
        <transition name="vuestro-mobile-frost" mode="out-in">
          <div v-if="showSidebar" class="vuestro-mobile-frosted" @click="showSidebar = false"></div>
        </transition>
        <transition name="vuestro-mobile-sidebar" mode="out-in">
          <div v-if="showSidebar" class="vuestro-mobile-sidebar-wrapper">
            <slot name="mobile-sidebar"></slot>
          </div>
        </transition>
      </vuestro-dropdown>
    </template>
    <!--LOGO SLOT-->
    <slot name="logo"></slot>
    <!--OPTIONAL TEXTUAL APP TITLE-->
    <div v-if="title" class="vuestro-title-text">{{ title }}</div>
    <div class="vuestro-v-separator"></div>
    <!--SLOT FOR USER WIDGETS-->
    <div class="vuestro-navbar-slot">
      <slot>
        <!--DEMO WIDGET-->
        <vuestro-text-field variant="search"
                            stretch
                            size="lg"
                            v-model="search">
          <template #dropdown>
            <vuestro-container no-wrap gutter="none">
              <vuestro-card cols="4" color='var(--vuestro-purple)'>
                <template #heading>Search Tools</template>
                <vuestro-list-button>Lots</vuestro-list-button>
                <vuestro-list-button>of</vuestro-list-button>
                <vuestro-list-button>Tools</vuestro-list-button>
              </vuestro-card>
              <vuestro-card cols="8">
                <template #heading>You can put anything in here to help users search...</template>
                <vuestro-container gutter="none">
                  <vuestro-button v-for="b in 10" :key="b" @click="exampleText = `Button ${b}`">Button {{ b }}</vuestro-button>
                </vuestro-container>
              </vuestro-card>
            </vuestro-container>
          </template>
        </vuestro-text-field>
        <vuestro-notifications grouped></vuestro-notifications>
      </slot>
    </div>
  </div>
</template>

<script>

import VuestroButton from './VuestroButton.vue';

export default {
  name: 'VuestroNavbar',
  components: {
    VuestroButton,
  },
  props: {
    title: { type: String, default: '' }, // app title
  },
  watch: {
    '$route'() {
      this.showSidebar = false;
    }
  },
  data() {
    return {
      search: '',
      showSidebar: false,
    };
  },
};

</script>

<style>
/* override these global css vars to set syle */
.vuestro-app {
  --vuestro-navbar-title-font-size: 2em;
  --vuestro-navbar-height: 60px;
  --vuestro-navbar-bg: var(--vuestro-content-bg);
  --vuestro-navbar-fg: var(--vuestro-text-color);
  --vuestro-navbar-border: transparent;
  --vuestro-navbar-separator: 1px solid var(--vuestro-outline);
}
.vuestro-app.mobile {
  --vuestro-navbar-title-font-size: 2em;
  --vuestro-navbar-height: 100px;
}
</style>

<style scoped>

.vuestro-navbar {
  width: 100%;
  height: var(--vuestro-navbar-height);
  background-color: var(--vuestro-navbar-bg);
  color: var(--vuestro-navbar-fg);
  border-bottom: 1px solid var(--vuestro-navbar-border);
  flex: none; /* don't let flexbox reduce our size */
  display: flex;
  align-items: center;
  padding-right: 5px;
  z-index: 9999;
  position: relative;
  transition: background-color 0.4s;
}

.vuestro-title-text {
  color: var(--vuestro-text-color);
  font-size: var(--vuestro-navbar-title-font-size);
  line-height: 1;
  padding: 0px 15px;
  margin-bottom: 10px;
  font-weight: 300;
  white-space: nowrap;
}

.vuestro-v-separator {
  border-right: var(--vuestro-navbar-separator);
  height: calc(var(--vuestro-navbar-height) / 2);
  margin-right: 10px;
}

.vuestro-navbar-slot {
  display: flex;
  flex-grow: 1;
  align-self: stretch;
  align-items: center;
}

.vuestro-hamburger {
  margin-left: 10px;
}

.vuestro-mobile-sidebar-wrapper {
  position: fixed;
  top: var(--vuestro-navbar-height);
  bottom: 0;
  overflow: auto;
  left: 0;
  --vuestro-sidebar-bg: linear-gradient(to right, var(--vuestro-content-bg) 25%, rgba(255,255,255,0) 100%);
  --vuestro-sidebar-border: none;
}
.vuestro-dark .vuestro-mobile-sidebar-wrapper {
  --vuestro-sidebar-bg: linear-gradient(to right, var(--vuestro-content-bg) 25%, rgba(0,0,0,0) 100%);
}

.vuestro-mobile-sidebar-enter-active, .vuestro-mobile-sidebar-leave-active {
  transition: all 0.4s;
}
.vuestro-mobile-sidebar-enter, .vuestro-mobile-sidebar-leave-to {
  left: calc(var(--vuestro-sidebar-normal-width)*-1);
}

.vuestro-mobile-frosted {
  position: fixed;
  top: var(--vuestro-navbar-height);
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.vuestro-mobile-frost-enter-active, .vuestro-mobile-frost-leave-active {
  transition: all 0.4s;
}
.vuestro-mobile-frost-enter, .vuestro-mobile-frost-leave-to {
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

</style>