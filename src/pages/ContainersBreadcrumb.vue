<template>
  <vuestro-breadcrumb :pages="pages"></vuestro-breadcrumb>
</template>

<script>

/* global Vue */
import Home from '@/pages/breadcrumb/Home';
Vue.component('Home', Home);
import Edit from '@/pages/breadcrumb/Edit';
Vue.component('Edit', Edit);
import FileBrowser from '@/pages/breadcrumb/FileBrowser';
Vue.component('FileBrowser', FileBrowser);

export default {
  name: 'ContainersBreadcrumb',
  data() {
    return {
      pages: [
        {
          title: 'Home',
          icon: 'home',
          component: 'home',
          // color: 'var(--vuestro-purple)',
          data: [],
          options: {},
        },
      ],
    };
  },
  mounted() {
  }
};

</script>