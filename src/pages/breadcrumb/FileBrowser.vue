<template>
  <vuestro-container>
    <vuestro-card>
      <vuestro-panel>
        <template #title>Directories</template>
        <vuestro-table :data="directories" :options="dirOptions">
          <template #row="{ item }">
            <td>{{ item.name }}</td>
            <td>{{ vuestroGet(item.directories, 'length', '0') }}</td>
            <td>{{ vuestroGet(item.files, 'length', '0') }}</td>
          </template>
          <template #row-buttons="{ item }">
            <vuestro-button round no-border @click="openSubDirectory(item)">
              <vuestro-icon name="folder-open"></vuestro-icon>
            </vuestro-button>
          </template>
        </vuestro-table>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card>
      <vuestro-panel>
        <template #title>Files</template>
        <vuestro-table :data="files" :options="fileOptions"></vuestro-table>
      </vuestro-panel>
    </vuestro-card>
  </vuestro-container>
</template>

<script>

export default {
  name: 'FileBrowser',
  props: ['data', 'options'],
  data() {
    return {
      dirOptions: {
        columns: [
          {
            title: 'Name',
          },
          {
            title: 'Directories',
          },
          {
            title: 'Files',
          },
        ],
      },
      fileOptions: {
        columns: [
          {
            title: 'Name',
            field: 'name',
          },
          {
            title: 'Size',
            field: 'size',
          },
        ],
      },
    };
  },
  computed: {
    ...Vuex.mapGetters(['getFileTreePath']),
    directories() {
      return this.getFileTreePath(this.options.path).directories;
    },
    files() {
      return this.getFileTreePath(this.options.path).files;
    },
  },
  methods: {
    onCancel() {
      this.$emit('ascend');
    },
    onSave() {
      this.$emit('ascend', {
        callbackName: 'refresh',
      });
    },
    openSubDirectory(d) {
      let newPath;
      if (this.options.path === '/') {
        newPath = `/${d.name}`;
      } else {
        newPath = `${this.options.path}/${d.name}`;
      }
      this.$emit('descend', {
        title: d.name,
        component: 'file-browser',
        color: 'var(--vuestro-blue)',
        options: {
          path: newPath,
        },
      });
    },
  },
};

</script>

<style scoped>

.vuestro-table >>> td {
  padding: 5px 10px;
}

</style>