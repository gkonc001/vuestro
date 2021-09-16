<template>
  <vuestro-container>
    <vuestro-card color="var(--vuestro-green)">
      <template #heading>Modals</template>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span>VuestroModal with all slots labelled (opened using <vuestro-code>$refs</vuestro-code>)</span>
      </template>
      <vuestro-button value @click="$refs.slotLabelModal.onOpen()">Open Modal</vuestro-button>
      <vuestro-modal ref="slotLabelModal">
        <template #title><vuestro-code>#title</vuestro-code></template>
        <template #toolbar><vuestro-code>#toolbar</vuestro-code></template>
        <template #default><vuestro-code>#default</vuestro-code></template>
        <template #footer><vuestro-code>#footer</vuestro-code></template>
        <template #buttons><vuestro-code>#buttons</vuestro-code></template>
      </vuestro-modal>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span>VuestroModal with example components opened using <vuestro-code>active</vuestro-code> prop</span>
      </template>
      <vuestro-button value @click="modalOpen1 = true">Open Modal</vuestro-button>
      <vuestro-modal :active.sync="modalOpen1" no-scroll>
        <template #title>VuestroModal</template>
        <template #toolbar>
          <vuestro-tooltip position="top">
            <vuestro-button pill variant="primary">Button w/Tooltip</vuestro-button>
            <template #content>
              Tooltip Test
            </template>
          </vuestro-tooltip>
        </template>
        <vuestro-container no-grow>
          <vuestro-dropdown>
            <template #button>
              <vuestro-button rounded>
                <template #icon>
                  <vuestro-icon name="car"></vuestro-icon>
                </template>
                Make
              </vuestro-button>
            </template>
            <vuestro-list-button>Acura</vuestro-list-button>
            <vuestro-list-button>Cadillac</vuestro-list-button>
            <vuestro-list-button>Chevy</vuestro-list-button>
            <vuestro-list-button>Dodge</vuestro-list-button>
            <vuestro-list-button>Ford</vuestro-list-button>
            <vuestro-list-button>Honda</vuestro-list-button>
            <vuestro-list-button>Infiniti</vuestro-list-button>
            <vuestro-list-button>Nissan</vuestro-list-button>
            <vuestro-list-button>Lexus</vuestro-list-button>
            <vuestro-list-button>Toyota</vuestro-list-button>
            <vuestro-list-button>Super-loooooooong-title</vuestro-list-button>
          </vuestro-dropdown>
          <vuestro-dropdown>
            <template #button>
              <vuestro-button rounded>
                <template #icon>
                  <vuestro-icon name="car"></vuestro-icon>
                </template>
                <span>Model</span>
              </vuestro-button>
            </template>
            <vuestro-list-button>Suburban</vuestro-list-button>
            <vuestro-list-button>Ram</vuestro-list-button>
            <vuestro-list-button>Festiva</vuestro-list-button>
            <vuestro-list-button>Civic</vuestro-list-button>
            <vuestro-list-button>Camry</vuestro-list-button>
          </vuestro-dropdown>
          <vuestro-tooltip position="bottom">
            <vuestro-button>Button w/Tooltip</vuestro-button>
            <template #content>
              Tooltip Test
            </template>
          </vuestro-tooltip>
        </vuestro-container>
        <template #footer>
          <vuestro-container>
            This could show contextual help
          </vuestro-container>
        </template>
        <template #buttons>
          <vuestro-container gutter="none">
            <vuestro-button checkbox value>Enabled</vuestro-button>
            <vuestro-dropdown close-on-content-click>
              <template #button>
                <vuestro-button>
                  <template #icon>
                    <vuestro-icon name="list"></vuestro-icon>
                  </template>
                  Dropdown Button
                </vuestro-button>
              </template>
              <vuestro-list-button>Item 1</vuestro-list-button>
              <vuestro-list-button>Item 2</vuestro-list-button>
            </vuestro-dropdown>
          </vuestro-container>
          <vuestro-tooltip position="bottom">
            <vuestro-button variant="info">Button w/Tooltip</vuestro-button>
            <template #content>
              Tooltip Test
            </template>
          </vuestro-tooltip>
          <vuestro-button variant="success" value>
            <template #icon>
              <vuestro-icon name="save"></vuestro-icon>
            </template>
            Save
          </vuestro-button>
        </template>
      </vuestro-modal>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        Close modal when clicking outside by setting the close-on-blur property
      </template>
      <vuestro-button value @click="modalOpen2 = true">Open Modal</vuestro-button>
      <vuestro-modal :active.sync="modalOpen2" close-on-blur>
        <template #title>VuestroModal</template>
        <template #buttons></template>
        <vuestro-container>
          <vuestro-text-field variant="outline" placeholder="Message" auto-focus></vuestro-text-field>
          <vuestro-button rounded>
            <template #icon>
              <vuestro-icon name="hospital"></vuestro-icon>
            </template>
            SOS
          </vuestro-button>
        </vuestro-container>
      </vuestro-modal>
    </vuestro-card>

  </vuestro-container>
</template>

<script>

import Icon from 'vue-awesome/components/Icon';

export default {
  name: 'Popups',
  components: {
    Icon,
  },
  data() {
    return {
      modalOpen1: false,
      modalOpen2: false,
      modalOpen3: false,
    };
  },
	methods: {
		onClick() {
			console.log('click');
		},
		onAfterOpen() {
		  console.log('opened');
		},
	}
};

</script>

<style scoped>

.example-container {
  display: flex;
  align-items: flex-start;
  font-size: 59px;
}
.example-container-center {
  display: flex;
  justify-content: center;
}
.example-container.dark:before {
  content: "Example Dark Background";
  position: absolute;
  top: 0;
  left: 0;
  color: white;
}
.example-container.dark {
  padding: 30px 20px 80px 10px;
  background-color: var(--vuestro-popup-bg);
  position: relative;
  justify-content: space-between;
}

.example-vertical-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

</style>