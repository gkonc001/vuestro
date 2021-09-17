<template>
  <div class="vuestro-notifications">
    <vuestro-dropdown ref="theDropdown" @leave="popupMode = false">
      <!--NAVBAR ICON-->
      <template #title>
        <div class="vuestro-notifications-icon">
          <vuestro-icon v-if="muted" name="bell-slash"></vuestro-icon>
          <vuestro-icon v-else name="bell">
            <div v-if="unread.length > 0" class="vuestro-notifications-icon-count">
              <vuestro-pill color="var(--vuestro-info)" size="sm" no-margin>
                <template #title>{{ unread.length }}</template>
              </vuestro-pill>
            </div>
          </vuestro-icon>
        </div>
      </template>
      <template #default>
        <!--TEMPORARY POPUP (timed display of new notification)-->
        <template v-if="popupMode">
          <div class="vuestro-notification-item" @click="onClick(latest)" @mouseover="onDropdownHover">
            <div class="vuestro-notification-icon">
              <div class="vuestro-notification-item-dot" :class="{ unread: latest.unread }"></div>
            </div>
            <vuestro-container gutter="none" no-wrap align="center">
              <vuestro-container gutter="none" column>
                <div class="vuestro-notification-item-title">
                  {{ latest.title }}
                  <vuestro-icon v-if="latest.path" scale="0.8" name="share"></vuestro-icon>
                </div>
                <div class="vuestro-notification-item-desc">{{ latest.description }}</div>
              </vuestro-container>
              <div class="vuestro-notification-item-date">{{ latest.created | vuestroLocaleDate }}<br>{{ latest.created | vuestroLocaleTime }}</div>
            </vuestro-container>
          </div>
          <div v-if="popupMode"
               class="vuestro-notification-timer"
               :style="{ 'animation-duration': `${popupTimeout}ms`}">
          </div>
        </template>
        <!--NORMAL POPUP-->
        <template v-else>
          <!--HEADER-->
          <vuestro-container justify="space-between" align="center" gutter="none" no-wrap>
            <!--SEARCH BOX-->
            <vuestro-text-field class="vuestro-notification-search-box"
                                variant="search"
                                v-model="searchTerm"
                                no-margin>
            </vuestro-text-field>
            <!--COUNT-->
            <div class="vuestro-notification-count">{{ allNotifications.length }} notifications</div>
            <!--HEADER BUTTONS-->
            <vuestro-container gutter="none" justify="flex-end" no-wrap>
              <vuestro-button variant="info" pill value size="sm" @click="onMarkAllRead">
                Mark All as Read
              </vuestro-button>
              <vuestro-button variant="danger" pill value size="sm" @click="onClear">
                Clear
              </vuestro-button>
              <vuestro-button pill value size="sm"
                              :variant="muted ? 'danger':'secondary'"
                              @click="toggleMute">
                <vuestro-icon name="volume-mute"></vuestro-icon>
              </vuestro-button>
            </vuestro-container>
          </vuestro-container>
          <vuestro-hr margin="0.2em"></vuestro-hr>
          <!--NOTIFICATIONS LIST-->
          <div class="vuestro-notification-item"
               v-for="item in sortedFilteredData" :key="item[idName]"
               @click="onClick(item)" @mouseover="onDropdownHover">
            <!--DOT (OR NUMBERED PILL FOR GROUPED MODE)-->
            <div v-if="item.grouped && item.grouped.length > 0" class="vuestro-notification-icon">
              <vuestro-pill size="sm"
                            :color="item.unread ? 'var(--vuestro-info)':'var(--vuestro-secondary)'">
                <template #title>{{ item.grouped.length }}</template>
              </vuestro-pill>
            </div>
            <div v-else class="vuestro-notification-icon">
              <div class="vuestro-notification-item-dot" :class="{ unread: item.unread }"></div>
            </div>
            <!--BLOCK CONTENT-->
            <vuestro-container gutter="none" no-wrap align="center">
              <vuestro-container gutter="none" column>
                <div class="vuestro-notification-item-title">
                  {{ item.title }}
                  <vuestro-icon v-if="item.path" scale="0.8" name="share"></vuestro-icon>
                </div>
                <div class="vuestro-notification-item-desc">{{ item.description }}</div>
              </vuestro-container>
              <div class="vuestro-notification-item-date">{{ item.created | vuestroLocaleDate }}<br>{{ item.created | vuestroLocaleTime }}</div>
            </vuestro-container>
          </div>
          <div v-if="sortedFilteredData.length === 0"
               class="vuestro-no-notifications">
            No Notifications
          </div>
        </template>
      </template>
    </vuestro-dropdown>
  </div>
</template>

<script>

/* global _ */

export default {
  name: 'VuestroNotifications',
  props: {
    notifications: { type: Array, default: () => []},
    getterName: { type: String, default: 'notifications' },       // name of Vuex getter
    readAction: { type: String, default: 'notificationRead' },    // name of Vuex read action
    clearAction: { type: String, default: 'notificationsClear' }, // name of Vuex clear action
    idName: { type: String, default: '_id' },                     // name of id field
    popupTimeout: { type: Number, default: 2000 },                // ms to keep popup open
    grouped: { type: Boolean, default: false },                   // grouped notifications by simple compare
  },
  data() {
    return {
      popupMode: false,
      popupTimer: null,
      searchTerm: '',
      muted: false,
    };
  },
  computed: {
    allNotifications() {
      let data;
      if (this.$store && this.$store.getters[this.getterName]) {
        data = this.$store.getters[this.getterName];
      } else {
        // use prop
        data = this.notifications;
      }
      return data;
    },
    sortedFilteredData() {
      let data = this.allNotifications;
      if (this.searchTerm.length > 0) {
        let regex = new RegExp(this.searchTerm, 'i');
        data = _.filter(data, (o) => {
          return regex.test(`${o.title} ${o.description}`);
        });
      }
      let ordered = _.orderBy(data, 'created', ['desc']);
      // process grouped notifications
      if (this.grouped) {
        let grouped = [];
        for (let current of ordered) {
          let previous = grouped[grouped.length-1];
          if (previous && current.title === previous.title &&
                          current.description === previous.description) {
            // duplicate, update previous with new count and drop this one
            if (previous.grouped === undefined) {
              previous.grouped = [];
            }
            previous.grouped.push(current[this.idName]);
          } else {
            // if not duplicate, push it
            grouped.push(current);
          }
        }
        return grouped;
      } else {
        return ordered;
      }
    },
    unread() {
      return _.filter(_.orderBy(this.allNotifications, 'created', ['desc']), 'unread');
    },
    latest() {
      return this.unread[0];
    },
  },
  watch: {
    unread(newVal, oldVal) {
      if (!this.muted && newVal.length > oldVal.length) {
        this.popupMode = true;
        // manual open dropdown
        this.$refs.theDropdown.open();
        clearTimeout(this.popupTimer); // clear out any previous
        this.popupTimer = setTimeout(() => {
          // manual close dropdown
          this.$refs.theDropdown.close();
          this.popupMode = false;
        }, this.popupTimeout);
      }
    },
  },
  methods: {
    onClick(item) {
      // mark the main item read
      this.$store.dispatch(this.readAction, item[this.idName]);
      // mark any duplicates from the ids in .grouped
      if (item.grouped) {
        for (let g of item.grouped) {
          this.$store.dispatch(this.readAction, g);
        }
      }
      if (item.path) {
        if (item.path !== this.$route.path) {
          this.$router.push(item.path);
        }
        this.$refs.theDropdown.close();
      }
    },
    onMarkAllRead() {
      for (let n of this.allNotifications) {
        this.$store.dispatch(this.readAction, n[this.idName]);
      }
    },
    onClear() {
      this.$store.dispatch(this.clearAction);
    },
    onDropdownHover() {
      // release dropdown to close normally
      this.$refs.theDropdown.release();
      // cancel timer
      clearTimeout(this.popupTimer);
      this.popupMode = false;
    },
    toggleMute() {
      this.muted = !this.muted;
      this.$emit('mute', this.muted);
    },
  },
};

</script>

<style scoped>

.vuestro-notifications {
  align-self: stretch;
}
.vuestro-dropdown {
  height: 100%;
}
.vuestro-notifications-icon {
  margin-right: 0.6em;
  margin-left: 0.6em;
}
.vuestro-app.mobile .vuestro-notifications-icon {
  margin-right: 1em;
}
.vuestro-notification-search-box {
  min-width: 10em;
}
.vuestro-notifications-icon-count {
  position: absolute;
  top: -0.7em;
  right: -0.5em;
}
.vuestro-app.mobile .vuestro-notifications-icon-count {
  right: -1em;
}
.vuestro-notification-item {
  display: flex;
  padding: 0.4em;
  border-radius: var(--vuestro-selection-border-radius);
  cursor: pointer;
}
.vuestro-notification-item:hover {
  background-color: var(--vuestro-selection);
}
.vuestro-notification-item-title {
  font-weight: 500;
  white-space: nowrap;
  display: flex;
}
.vuestro-notification-item-title .vuestro-icon {
  margin-left: 0.5em;
}
.vuestro-notification-item-date {
  color: var(--vuestro-text-color-muted);
  font-size: 0.8em;
  white-space: nowrap;
  margin-left: 0.5em;
  text-align: center;
}
.vuestro-notification-item-desc {
  color: var(--vuestro-text-color-muted);
  font-size: 0.9em;
  min-width: 25vw;
}
.vuestro-mobile .vuestro-notification-item-desc {
  min-width: 100vw;
}
.vuestro-notification-icon {
  min-width: 3em;
  display: flex;
  align-items: center;
  justify-content: center;
}
.vuestro-notification-item-dot {
  background-color: transparent;
  flex: none;
  height: 1em;
  width: 1em;
  align-self: center;
  border-radius: 50%;
  cursor: pointer;
}
.vuestro-notification-item-dot.unread {
  background-color: var(--vuestro-info);
}

.vuestro-notification-count {
  margin-left: 0.5em;
  margin-right: 0.5em;
  color: var(--vuestro-text-color-muted);
  font-size: 0.9em;
  white-space: nowrap;
}

.vuestro-no-notifications {
  color: var(--vuestro-text-color-muted);
  text-align: center;
  margin-top: 1em;
  margin-bottom: 0.5em;
}

.vuestro-notification-timer {
  height: 0.2em;
  background-color: var(--vuestro-info);
  animation-name: vuestro-notification-timer;
  animation-timing-function: linear;
  border-radius: 999px;
}
@keyframes vuestro-notification-timer {
  from {
    width: 100%;
  }
  to {
    width: 0;
  }
}

</style>