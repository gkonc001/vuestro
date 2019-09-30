/* global Vue */
import Router from 'vue-router';

import Dashboard from '../pages/Dashboard.vue';
import Charts from '../pages/Charts.vue';
import ChartsAreaChart from '../pages/ChartsAreaChart.vue';
import ChartsBarChart from '../pages/ChartsBarChart.vue';
import ChartsSankey from '../pages/ChartsSankey.vue';
import ChartsForceGraph from '../pages/ChartsForceGraph.vue';
import Buttons from '../pages/Buttons.vue';
import Pickers from '../pages/Pickers.vue';
import Pills from '../pages/Pills.vue';
import Inputs from '../pages/Inputs.vue';
import InputsSpinner from '../pages/InputsSpinner.vue';
import InputsText from '../pages/InputsText.vue';
import InputsSearch from '../pages/InputsSearch.vue';
import Containers from '../pages/Containers.vue';
import ContainerContainer from '../pages/ContainerContainer.vue';
import CardContainer from '../pages/CardContainer.vue';
import ColumnContainer from '../pages/ColumnContainer.vue';
import PanelContainer from '../pages/PanelContainer.vue';
import Popups from '../pages/Popups.vue';
import Data from '../pages/Data.vue';
import DataTable from '../pages/DataTable.vue';
import DataObjectBrowser from '../pages/DataObjectBrowser.vue';
import Typography from '../pages/Typography.vue';
import Plugin from '../pages/Plugin.vue';
import PluginDirectives from '../pages/PluginDirectives.vue';
import PluginMixins from '../pages/PluginMixins.vue';
import PluginFilters from '../pages/PluginFilters.vue';
import InputsEditor from '../pages/InputsEditor.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      meta: {
        title: 'Dashboard',
        sidebar: true,
        icon: 'tachometer-alt',
      },
      name: 'dashboard',
      path: '/dashboard',
      component: Dashboard,
    },
    {
      meta: {
        title: 'Containers',
        sidebar: true,
        icon: 'boxes',
      },
      name: 'containers',
      path: '/containers',
      component: Containers,
      children: [
        {
          meta: {
            title: 'Container',
            sidebar: true,
          },
          name: 'container',
          path: 'container',
          component: ContainerContainer,
        },
        {
          meta: {
            title: 'Cards',
            sidebar: true,
          },
          name: 'card-container',
          path: 'card-container',
          component: CardContainer,
        },
        {
          meta: {
            title: 'Columns',
            sidebar: true,
          },
          name: 'column-container',
          path: 'column-container',
          component: ColumnContainer,
        },
        {
          meta: {
            title: 'Panels',
            sidebar: true,
          },
          name: 'panel-container',
          path: 'panel-container',
          component: PanelContainer,
        },
      ],
    },
    {
      meta: {
        title: 'Charts',
        sidebar: true,
        icon: 'chart-area',
      },
      name: 'charts',
      path: '/charts',
      component: Charts,
      children: [
        {
          meta: {
            title: 'Area Chart',
            sidebar: true,
          },
          name: 'area-chart',
          path: 'area-chart',
          component: ChartsAreaChart,
        },
        {
          meta: {
            title: 'Bar Chart',
            sidebar: true,
          },
          name: 'bar-chart',
          path: 'bar-chart',
          component: ChartsBarChart,
        },
        {
          meta: {
            title: 'Sankey',
            sidebar: true,
          },
          name: 'sankey-charts',
          path: 'sankey-charts',
          component: ChartsSankey,
        },
        {
          meta: {
            title: 'Force Graph',
            sidebar: true,
          },
          name: 'force-graph',
          path: 'force-graph',
          component: ChartsForceGraph,
        },
      ]
    },
    {
      meta: {
        title: 'Buttons',
        sidebar: true,
        icon: 'th',
      },
      name: 'buttons',
      path: '/buttons',
      component: Buttons,
    },
    {
      meta: {
        title: 'Pickers',
        sidebar: true,
        icon: 'hand-point-left',
      },
      name: 'pickers',
      path: '/pickers',
      component: Pickers,
    },
    {
      meta: {
        title: 'Popups',
        sidebar: true,
        icon: 'layer-group',
      },
      name: 'popups',
      path: '/popups',
      component: Popups,
    },
    {
      meta: {
        title: 'Pills',
        sidebar: true,
        icon: 'capsules',
      },
      name: 'pills',
      path: '/pills',
      component: Pills,
    },
    {
      meta: {
        title: 'Typography',
        sidebar: true,
        icon: 'font',
      },
      name: 'typography',
      path: '/typography',
      component: Typography,
    },
    {
      meta: {
        title: 'Data',
        sidebar: true,
        icon: 'table',
      },
      name: 'datacontainers',
      path: '/datacontainers',
      component: Data,
      children: [
        {
          meta: {
            title: 'Table',
            sidebar: true,
          },
          name: 'table',
          path: 'table',
          component: DataTable,
        },
        {
          meta: {
            title: 'Object Browser',
            sidebar: true,
          },
          name: 'object-browser',
          path: 'object-browser',
          component: DataObjectBrowser,
        },
      ]
    },
    {
      meta: {
        title: 'Inputs',
        sidebar: true,
        icon: 'i-cursor',
      },
      name: 'inputs',
      path: '/inputs',
      component: Inputs,
      children: [
        {
          meta: {
            title: 'Text',
            sidebar: true,
          },
          name: 'inputs-text',
          path: 'inputs-text',
          component: InputsText,
        },
        {
          meta: {
            title: 'Spinner',
            sidebar: true,
          },
          name: 'inputs-spinner',
          path: 'inputs-spinner',
          component: InputsSpinner,
        },
        {
          meta: {
            title: 'Search',
            sidebar: true,
          },
          name: 'inputs-search',
          path: 'inputs-search',
          component: InputsSearch,
        },
        {
          meta: {
            title: 'Editor',
            sidebar: true,
          },
          name: 'inputs-editor',
          path: 'inputs-editor',
          component: InputsEditor,
        },
      ]
    },
    {
      meta: {
        title: 'Plugin',
        sidebar: true,
        icon: 'puzzle-piece',
        bgColor: 'var(--vuestro-purple)',
        fgColor: 'var(--vuestro-light)',
      },
      name: 'plugin',
      path: '/plugin',
      component: Plugin,
      children: [
        {
          meta: {
            title: 'Directives',
            sidebar: true,
          },
          name: 'directives',
          path: 'directives',
          component: PluginDirectives,
        },
        {
          meta: {
            title: 'Mixins',
            sidebar: true,
          },
          name: 'mixins',
          path: 'mixins',
          component: PluginMixins,
        },
        {
          meta: {
            title: 'Filters',
            sidebar: true,
          },
          name: 'filters',
          path: 'filters',
          component: PluginFilters,
        },
      ]
    },
    { path: '/*', redirect: '/dashboard' } // redirect to dashboard
  ],
});

