//
// This is the main entry point to Vuestro, your app should have this at the outermost layer
//
<template>
  <div class="vuestro-app" :class="{ mobile: $root.mobile, 'vuestro-dark': isDark }">
    <transition name="vuestro-app-modes" mode="out-in">
      <!--MAIN TEMPLATE-->
      <div v-if="authenticated && !loading" key="main">

        <!--SLOT WITH DEFAULT NAVBAR-->
        <slot name="navbar">
          <vuestro-navbar :title="title">
            <template #mobile-sidebar>
              <slot name="sidebar">
                <vuestro-sidebar :user="user"
                                 :user-img="userImg"
                                 :role="role">
                  <template #logo>
                    <slot name="sidebar-logo"></slot>
                  </template>
                  <template #footer>
                    <slot name="sidebar-footer"></slot>
                  </template>
                </vuestro-sidebar>
              </slot>
            </template>
            <template #logo>
              <slot name="navbar-logo"></slot>
            </template>
            <template #default>
              <slot name="navbar-slot"></slot>
            </template>
          </vuestro-navbar>
        </slot>

        <div class="vuestro-content">
          <!--SLOT WITH DEFAULT SIDEBAR-->
          <template v-if="!$root.mobile">
            <slot name="sidebar">
              <vuestro-sidebar :user="user"
                               :user-img="userImg"
                               :role="role">
                <template #logo>
                  <slot name="sidebar-logo"></slot>
                </template>
                <template #footer>
                  <slot name="sidebar-footer"></slot>
                </template>
              </vuestro-sidebar>
            </slot>
          </template>

          <!--MAIN PAGE VIEW-->
          <div ref="routerView" class="vuestro-router-view" @scroll="onScroll">
            <slot name="pre-content"></slot>
            <keep-alive> <!-- vue router option for persistent state -->
              <transition name="vuestro-app-pages" mode="out-in" @after-leave="onRouterTransitionDone">
                <router-view/>
              </transition>
            </keep-alive>
            <slot name="footer"></slot>
          </div>
        </div>
      </div>

      <!--SLOT FOR CUSTOM LOADING PAGE-->
      <div v-else-if="authenticated && loading" key="loading">
        <slot name="loading"></slot>
      </div>

      <!--SLOT FOR CUSTOM LOGIN PAGE-->
      <div v-else key="login">
        <slot name="login"></slot>
      </div>
    </transition>
  </div>
</template>

<script>

/* global Event, navigator */
import VuestroNavbar from './VuestroNavbar.vue';
import VuestroSidebar from './sidebar/VuestroSidebar.vue';

export default {
  name: 'VuestroApp',
  components: {
    VuestroNavbar,
    VuestroSidebar,
  },
  props: {
    authenticated: { type: Boolean, default: true },
    loading: { type: Boolean, default: false },
    logo: { type: String, default: null },
    title: { type: String, default: '' },     // app title
    user: { type: String, default: '' },      // username
    userImg: { type: String, default: null }, // user image
    role: { type: String, default: '' },      // user role
    dark: { type: Boolean, default: false },  // dark mode
  },
  computed: {
    isDark() {
      // if store is setup to provide isDarkUI, use it
      if (this.$store && this.$store.getters.isDarkUI) {
        return this.$store.getters.isDarkUI;
      }
      // default to prop
      return this.dark;
    },
  },
  data() {
    return {
      toRoute: null,
    };
  },
  watch: {
    '$route'(to, from) {
      this.toRoute = to;
    }
  },
  beforeMount() {
    console.log('vuestro-app beforeMount');
    console.log('window width', window.innerWidth);
    console.log('ua', navigator.userAgent);
    if (navigator.userAgent.match(/Mobile/)) {
      console.log('vuestro-app going into MOBILE mode');
      this.$root.mobile = true;
    }
  },
  methods: {
    onScroll(e) {
      // save content-container scroll position to this route's meta
      this.$route.meta.scrollTop = this.$refs.routerView.scrollTop;
      window.dispatchEvent(new Event('scroll'));
    },
    onRouterTransitionDone() {
      // only works if we delay 2 ticks
      this.$nextTick(() => {
        this.$nextTick(() => {
          this.$refs.routerView.scrollTop = this.toRoute.meta.scrollTop;
        });
      });
      // emit a global resize event so widgets/charts can resize
      window.dispatchEvent(new Event('resize'));
    },
  }
};

</script>

<style>

/* GLOBAL STYLE VARIABLES */
.vuestro-app {
  /* global dimensions */
  --vuestro-font-size: 14px;
  --vuestro-selection-border-radius: 8px;
  --vuestro-control-border-width: 1px;
  --vuestro-control-border-radius: 5px;
  --vuestro-control-sm-height: 18px;
  --vuestro-control-md-height: 24px;
  --vuestro-control-lg-height: 30px;
  --vuestro-control-xl-height: 36px;
  --vuestro-control-margin-v: 5px;
  --vuestro-control-margin-h: 2px;
  --vuestro-primary-transition-time: 0.4s;
  --vuestro-secondary-transition-time: 0.2s;

  /* palette */
  --vuestro-indigo: #682fa1;
  --vuestro-purple: #551A8B;
  --vuestro-magenta: #ed23a9;
  --vuestro-pink: #f13c6e;

  --vuestro-prussian: #1f2233;
  --vuestro-royal: #101c5a;
  --vuestro-blue: #217ada;
  --vuestro-cobalt: #2163C9;
  --vuestro-cyan: #42b9cc;
  --vuestro-teal: #87e6ca;

  --vuestro-green: #4bbc79;
  --vuestro-emerald: #229649;
  --vuestro-yellow: #fff700;
  --vuestro-gold: #fce228;

  --vuestro-orange: #f47633;
  --vuestro-salmon: #f13c6e;
  --vuestro-brick: #8a270c;
  --vuestro-red: #ea4958;

  --vuestro-white: #fff;
  --vuestro-light: #f5f5f5;
  --vuestro-light-med: #ececec;
  --vuestro-gray: #c3cbe0;
  --vuestro-gray-med: #b3b3b3;
  --vuestro-gray-dark: #676a6f;
  --vuestro-dark: #1b1c21;
  --vuestro-darker: #131313;
  --vuestro-black: #000;

  /* semantic colors */
  --vuestro-primary: var(--vuestro-cobalt);
  --vuestro-secondary: #757575;
  --vuestro-success: var(--vuestro-green);
  --vuestro-info: var(--vuestro-cyan);
  --vuestro-warning: var(--vuestro-yellow);
  --vuestro-danger: var(--vuestro-red);

  /* colors responsible for change to dark */
  --vuestro-content-bg: #dfdfdf;

  --vuestro-widget-light-bg: #e8e9ec;
  --vuestro-widget-dark-bg: #2f353f;

  --vuestro-field-bg: #c7c5c5;

  --vuestro-popup-bg: #464748;
  --vuestro-popup-fg: #eee;

  --vuestro-tooltip-opacity: 0.8;

  --vuestro-selection: #aab9d0;
  --vuestro-outline: #aaa;
  --vuestro-active: #cfdaee;
  --vuestro-hover: #d4d7da;

  --vuestro-notifications-bg: var(--vuestro-salmon);

  /* text colors */
  --vuestro-text-color: #323334;
  --vuestro-text-color-secondary: #696969;
  --vuestro-text-color-muted: #777;
  --vuestro-text-color-inverse: #eee; /* inverse text, changes with theme */
  --vuestro-text-color-dark: #323334; /* meant for always dark text */
  --vuestro-text-color-light: #ccc; /* meant for always light text */
}

/* DARK UI OVERRIDES */
.vuestro-dark {
  --vuestro-content-bg: #1b1c21;

  --vuestro-widget-dark-bg: #383b3f;
  --vuestro-widget-light-bg: var(--vuestro-widget-dark-bg);

  --vuestro-field-bg: #5a5959;
  --vuestro-outline: #7d7d7d;
  --vuestro-active: #37383a;
  --vuestro-hover: #535456;
  --vuestro-popup-bg: #323334;

  --vuestro-indigo: #441473;
  --vuestro-purple: #8747c1;
  --vuestro-magenta: #bd2c70;
  --vuestro-pink: #e04aad;

  --vuestro-prussian: #1f2233;
  --vuestro-royal: #101c5a;
  --vuestro-blue: #27538a;
  --vuestro-cobalt: #2163C9;
  --vuestro-cyan: #1787b0;
  --vuestro-teal: #136f6a;

  --vuestro-green: #137139;
  --vuestro-emerald: #229649;
  --vuestro-yellow: #c1a529;
  --vuestro-gold: #b38c05;

  --vuestro-orange: #ed6b26;
  --vuestro-salmon: #e25058;
  --vuestro-brick: #8a270c;
  --vuestro-red: #de1f31;

  --vuestro-light: #9e9999;
  --vuestro-light-med: #878585;

  --vuestro-gray: #656565;
  --vuestro-gray-med: #424141;
  --vuestro-gray-dark: #3a3a3a;

  --vuestro-primary: var(--vuestro-cobalt);
  --vuestro-secondary: var(--vuestro-light-med);
  --vuestro-success: var(--vuestro-green);
  --vuestro-info: var(--vuestro-cyan);
  --vuestro-warning: var(--vuestro-yellow);
  --vuestro-danger: var(--vuestro-red);

  --vuestro-selection: var(--vuestro-cobalt);

  --vuestro-text-color: #ccc;
  --vuestro-text-color-secondary: #696969;
  --vuestro-text-color-muted: #aaa;
  --vuestro-text-color-inverse: #323334; /* inverse text, changes with theme */
}

.vuestro-app.mobile {
  --vuestro-base-font-size: 32px;
  --vuestro-control-border-radius: 10px;
  --vuestro-control-border-width: 2px;
  --vuestro-control-sm-height: 42px;
  --vuestro-control-md-height: 50px;
  --vuestro-control-lg-height: 64px;
  --vuestro-control-xl-height: 74px;
  --vuestro-control-margin-v: 7px;
  --vuestro-control-margin-h: 5px;
}

.vuestro-mla {
  margin-left: auto;
}
.vuestro-mra {
  margin-right: auto;
}

</style>

<style scoped>

@font-face {
  font-family: 'Quicksand';
  src: url('../assets/Quicksand-Light.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
}
@font-face {
  font-family: 'Quicksand';
  src: url('../assets/Quicksand-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'Quicksand';
  src: url('../assets/Quicksand-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
}
@font-face {
  font-family: 'Quicksand';
  src: url('../assets/Quicksand-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
}

.vuestro-app >>> *, :after, :before {
  box-sizing: border-box;
}

.vuestro-app {
  color: var(--vuestro-text-color);
  font-size: var(--vuestro-base-font-size);
  font-family: 'Quicksand', sans-serif;
  -webkit-font-smoothing: subpixel-antialiased;
  text-rendering: optimizeLegibility;
  min-height: 100%; /* stretches app down to bottom edge of body */
  background-color: var(--vuestro-content-bg);
  transition: background-color 0.4s;
}
/* wrapper div to allow transitions to work between login, loading, main states */
.vuestro-app > div {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
}

.vuestro-app-modes-enter-active, .vuestro-app-modes-leave-active {
  transition: opacity var(--vuestro-primary-transition-time);
}
.vuestro-app-modes-enter, .vuestro-app-modes-leave-to {
  opacity: 0;
}

.vuestro-app-pages-enter-active, .vuestro-app-pages-leave-active {
  transition: opacity var(--vuestro-secondary-transition-time);
}
.vuestro-app-pages-enter, .vuestro-app-pages-leave-to {
  opacity: 0;
}

.vuestro-content {
  flex: 1 1 auto; /* make the content stretch to bottom of .vuestro-app */
  display: flex;
  overflow: hidden; /* lets .vuestro-router-view do the scrolling */
  transition: all var(--vuestro-primary-transition-time);
}

.vuestro-router-view {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  transition: all 0.4s;
  position: relative;
  overflow: auto;
}

.vuestro-app >>> input {
  font-family: 'Quicksand';
}

.vuestro-app >>> a {
  color: var(--vuestro-primary);
}
.vuestro-app >>> a:visited {
  color: var(--vuestro-purple);
}

</style>