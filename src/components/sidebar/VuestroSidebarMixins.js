/* global _ */
module.exports = {
  methods: {
    isShown(role, route) {
      function makeArray(d) {
        if (!_.isArray(d)) {
          return [d];
        }
        return d;
      }
      if (route.meta) {
        if (route.meta.sidebar || route.meta.sidebarBottom) {
          if (route.meta.role) {
            if (route.meta.role === role) {
              return true;
            } else if (_.intersection(makeArray(route.meta.role), makeArray(role)).length > 0) {
              return true;
            }
          } else if (route.meta.showFunc) {
            return route.meta.showFunc(route);
          } else {
            return true;
          }
        }
      }
      return false;
    },
  },
};