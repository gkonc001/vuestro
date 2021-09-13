<template>
  <div class="vuestro-sidebar">

    <!--HEADER BLOCK-->
    <div class="vuestro-sidebar-header">
      <div v-if="$scopedSlots.toolbar" class="vuestro-sidebar-toolbar">
        <slot name="toolbar">
        </slot>
      </div>

      <!--LOGO-->
      <div v-if="$scopedSlots.logo" class="vuestro-sidebar-logo">
        <slot name="logo"></slot>
      </div>

    </div>

    <!--TITLE BLOCK-->
    <transition v-if="title" name="vuestro-title-text" mode="out-in">
      <div v-if="!mini" class="vuestro-title-text">{{ title }}</div>
    </transition>

    <!--USER BLOCK-->
    <template v-if="user">
      <vuestro-geo-pattern class="vuestro-user-block" :seed="user" @color="(c) => {this.geoColor = c}">
        <div v-if="userImg">
          <img
               :src="userImg"
               :class="{ clickable: $listeners.profile }"
               @click="onUserImgClick"/>
        </div>
        <transition name="vuestro-user-block" mode="out-in">
          <div v-if="!mini" class="vuestro-user-block-text">
            <span class="vuestro-sidebar-username">{{ user }}</span>
            <span>{{ role }}</span>
          </div>
        </transition>
      </vuestro-geo-pattern>
    </template>

    <!--MENU-->
    <transition name="vuestro-sidebar" mode="out-in" @after-leave="afterLeave">
      <vuestro-sidebar-menu v-if="!mini"
                            :role="role"
                            :routes="routes"
                            @click="toggleSidebar"></vuestro-sidebar-menu>
      <vuestro-mini-sidebar-menu v-else
                                 :role="role"
                                 :routes="routes"
                                 @click="toggleSidebar">
      </vuestro-mini-sidebar-menu>
    </transition>

    <!--FOOTER BLOCK-->
    <div class="vuestro-sidebar-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>

/* global _, window, Event */
import VuestroSidebarMenu from './VuestroSidebarMenu.vue';
import VuestroMiniSidebarMenu from './VuestroMiniSidebarMenu.vue';

export default {
  name: 'VuestroSidebar',
  components: {
    VuestroSidebarMenu,
    VuestroMiniSidebarMenu,
  },
  props: {
    title: { type: String, default: '' }, // app title
    user: { type: String, default: '' }, // username
    userImg: { type: String, default: null }, // user image
    role: { type: [String, Array], default: '' }, // user role
    link: { type: String, default: '' }, // user link
    mini: { type: Boolean, default: false }, // mini sidebar
    routes: {
      type: Array,
      default: function() {
        return _.cloneDeep(this.$router.options.routes);
      }
    },
  },
  data() {
    return {
      geoColor: '', // the geopattern base color
    };
  },
  beforeMount() {
    this.checkSidebar();
  },
  watch: {
    mini(newVal) {
      this.checkSidebar();
    },
  },
  methods: {
    toggleSidebar() {
      this.$emit('update:mini', !this.mini);
      this.checkSidebar();
    },
    checkSidebar() {
      if (this.mini) {
        document.body.classList.add('vuestro-mini-sidebar');
      } else {
        document.body.classList.remove('vuestro-mini-sidebar');
      }
    },
    afterLeave() {
      this.$nextTick(() => {
        this.$nextTick(() => {
          window.dispatchEvent(new Event('resize'));
          setTimeout(() => {
            this.debounceAuto = false;
          }, 1000);
        });
      });
    },
    onUserImgClick() {
      if (this.$listeners.profile) {
        this.$emit('profile');
      }
    },
  },
};
</script>

<style>
.vuestro-app {
  --vuestro-sidebar-normal-width: 180px;
  --vuestro-sidebar-mini-width: 70px;
  --vuestro-sidebar-header-bg: var(--vuestro-content-bg);
  --vuestro-sidebar-header-fg: var(--vuestro-black);
  --vuestro-sidebar-bg: var(--vuestro-content-bg);
  --vuestro-sidebar-fg: var(--vuestro-text-color);
  --vuestro-sidebar-border: none;
  --vuestro-sidebar-item-height: 50px;
  --vuestro-sidebar-item-padding-right: 15px;
  --vuestro-sidebar-item-hover: var(--vuestro-hover);
  --vuestro-sidebar-item-active-bg: var(--vuestro-active);
  --vuestro-sidebar-item-active-fg: #278ffd;
  --vuestro-sidebar-radius: calc(var(--vuestro-sidebar-item-height) / 2);
  --vuestro-sidebar-subroutes-spacing: 2px;
  --vuestro-sidebar-active-border: 3px solid #278ffd;
  --vuestro-sidebar-subroute-active-fg: var(--vuestro-orange);
  --vuestro-sidebar-subroute-active-border: 3px solid var(--vuestro-orange);
  --vuestro-sidebar-user-image-width: 40px;
  --vuestro-sidebar-font-weight: 400;
  --vuestro-sidebar-item-font-size: 16px;
  --vuestro-sidebar-sub-item-font-size: 15px;
  --vuestro-sidebar-subroutes-padding-left: 40px;
  --vuestro-sidebar-subroutes-item-height: 30px;
}
.vuestro-app.mobile {
  --vuestro-sidebar-normal-width: 400px;
  --vuestro-sidebar-item-height: 100px;
  --vuestro-sidebar-item-font-size: 1.2em;
  --vuestro-sidebar-sub-item-font-size: 1.2em;
  --vuestro-sidebar-user-image-width: 70px;
  --vuestro-sidebar-subroutes-spacing: 6px;
  --vuestro-sidebar-subroutes-padding-left: 55px;
  --vuestro-sidebar-subroutes-item-height: 80px;
}
</style>

<style scoped>

.vuestro-sidebar {
  color: var(--vuestro-sidebar-fg);
  background: var(--vuestro-sidebar-bg);
  border-right: var(--vuestro-sidebar-border);
  max-width: var(--vuestro-sidebar-normal-width);
  width: var(--vuestro-sidebar-normal-width);
  transition: all 0.4s;
  flex: none;
  display: flex;
  flex-direction: column;
  font-weight: var(--vuestro-sidebar-font-weight);
  position: relative;
}

/* .vuestro-mini-sidebar is added to body */
.vuestro-mini-sidebar .vuestro-sidebar {
  max-width: var(--vuestro-sidebar-mini-width);
  width: var(--vuestro-sidebar-mini-width);
}

.vuestro-sidebar-header {
  background-color: var(--vuestro-sidebar-header-bg);
  color: var(--vuestro-sidebar-header-fg);
}

.vuestro-sidebar-logo {
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  transition: all 0.4s;
  display: flex;
  justify-content: center;
}

.vuestro-mini-sidebar .vuestro-sidebar-logo {
  padding-bottom: 15px;
}

.vuestro-user-block {
  display: flex;
  justify-content: flex-start;
  color: white;
  padding-top: 1em;
  padding-bottom: 1em;
  padding-left: 0.6em;
  margin-right: calc(var(--vuestro-sidebar-item-padding-right) / 2);
  border-top-right-radius: calc(var(--vuestro-sidebar-radius) * 2);
  border-bottom-right-radius: calc(var(--vuestro-sidebar-radius) * 2);
}
.vuestro-user-block img {
  align-self: center;
  width: var(--vuestro-sidebar-user-image-width);
  height: var(--vuestro-sidebar-user-image-width);
  border-radius: 50%;
}
.vuestro-user-block img.clickable {
  cursor: pointer;
}

.vuestro-user-block-text {
  align-self: center;
  display: flex;
  flex-direction: column;
  margin-left: 0.7em;
  overflow: hidden;
  cursor: default;
}
.vuestro-user-block-text > span {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.vuestro-user-block-text .vuestro-sidebar-username {
  font-weight: calc(var(--vuestro-sidebar-font-weight) + 200);
}
.vuestro-user-block-enter-active, .vuestro-user-blockleave-active {
  transition: all 1s;
}
.vuestro-user-block-enter, .vuestro-user-block-leave-to {
  opacity: 0;
}

/* transitions */
.vuestro-sidebar-enter-active, .vuestro-sidebar-leave-active {
  transition: opacity 0.4s;
}
.vuestro-sidebar-enter, .vuestro-sidebar-leave-to {
  opacity: 0;
}

.vuestro-title-text {
  background-color: var(--vuestro-sidebar-header-bg);
  color: var(--vuestro-sidebar-header-fg);
  text-align: center;
  font-size: 34px;
  padding: 5px 0;
  font-weight: var(--vuestro-sidebar-font-weight);
}
.vuestro-title-text-enter-active, .vuestro-title-text-leave-active {
  transition: all 0.4s;
}
.vuestro-title-text-enter, .vuestro-title-text-leave-to {
  opacity: 0;
  font-size: 0;
}

.vuestro-sidebar-toolbar {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}

/* put footer all the way down */
.vuestro-sidebar-footer {
  margin-top: auto;
}

</style>