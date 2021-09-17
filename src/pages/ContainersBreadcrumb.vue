<template>
  <vuestro-container>
    <vuestro-card>
      <template #heading>Default Style</template>
      <template #subheading><vuestro-code>variant="regular"</vuestro-code></template>
      <vuestro-breadcrumb :pages="pages" gutter="none"></vuestro-breadcrumb>
    </vuestro-card>
    <vuestro-card>
      <template #heading>Tab Style</template>
      <template #subheading><vuestro-code>variant="tabs"</vuestro-code></template>
      <vuestro-breadcrumb :pages="pages" gutter="none" variant="tabs"></vuestro-breadcrumb>
    </vuestro-card>
    <vuestro-card>
      <template #heading>Fit into VuestroPanel Style</template>
      <template #subheading><vuestro-code>variant="panel"</vuestro-code></template>
      <vuestro-panel>
        <vuestro-breadcrumb :pages="pages" gutter="none" variant="panel"></vuestro-breadcrumb>
      </vuestro-panel>
    </vuestro-card>
  </vuestro-container>
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