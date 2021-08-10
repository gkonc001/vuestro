<template>
  <vuestro-container>
    <vuestro-card color="#f47633">
      <template #heading>VuestroObjectBrowser</template>
      <template #description>
        VuestroObjectBrowser allows browsing of a generic JavaScript object. No restructuring is necessary, it can take any JavaScript Object as input.
      </template>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>
        Basic VuestroObjectBrowser just set the 'data' property with the object.
      </template>
      <vuestro-panel>
        <vuestro-object-browser :data="testObject"></vuestro-object-browser>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>
        <span>Set the <em>startExpanded</em> option to expand all objects and arrays at mount</span>
      </template>
      <vuestro-panel>
        <vuestro-object-browser :options="{ startExpanded: true }" :data="testObject"></vuestro-object-browser>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>
        VuestroObjectBrowser also works for a top-level array
      </template>
      <vuestro-panel>
        <vuestro-object-browser :data="testArray"></vuestro-object-browser>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>
        <span>Set the <em>editable</em> and/or <em>extendable</em> options to provide editing controls that directly modify the bound object.</span>
      </template>
      <vuestro-panel>
        <vuestro-object-browser :data="testObject" :options="{ editable: true, extendable: true }"></vuestro-object-browser>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>
        <span>VuestroObjectBrowser provides a <em>post-value</em> slot to add buttons or any other component. The slot receives <em>k</em>, <em>v</em>, and <em>parent</em> slot scope fields.</span>
      </template>
      <vuestro-panel>
        <vuestro-object-browser :options="{ startExpanded: true }" :data="testObject">
          <template #post-value="{ k, v, parent }">
            <vuestro-button size="sm">button</vuestro-button>
          </template>
        </vuestro-object-browser>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>
        <span>VuestroObjectBrowser calls out empty objects</span>
      </template>
      <vuestro-panel>
        <vuestro-object-browser :data="{}"></vuestro-object-browser>
      </vuestro-panel>
    </vuestro-card>


    <vuestro-card>
      <template #subheading>
        <span>VuestroObjectBrowser with a string as data</span>
      </template>
      <vuestro-panel>
        <vuestro-object-browser data="hello! I'm a string!"></vuestro-object-browser>
      </vuestro-panel>
    </vuestro-card>


    <vuestro-card>
      <template #subheading>
        <span>VuestroObjectBrowserModal is a useful modal for inspecting raw objects</span>
      </template>
      <vuestro-object-browser-modal ref="browserModal">
        <template #title>VuestroObjectBrowserModal</template>
      </vuestro-object-browser-modal>
      <vuestro-button @click="$refs.browserModal.openWithObj(testObject)">Open</vuestro-button>
    </vuestro-card>


  </vuestro-container>
</template>

<script>

export default {
  name: 'ObjectBrowser',
  data() {
    return {
      testObject: {
        subObject1: {
          subObjectKey1: 'subObjectValue1',
          subObjectKey2: 'subObjectValue2',
          subObjectKey3: {
            'subSubObjectKey1': 'subSubObjectVal1',
          },
        },
        subObject2: [
          'subObject2ArrayVal1',
          'subObject2ArrayVal2',
          'subObject2ArrayVal3',
          'subObject2ArrayVal4',
        ],
        booleanVal1: true,
        stringVal2: "hello world........ super loooooong striiiiing",
        dateVal1: new Date(),
        numberVal1: 324,
        numberVal2: 8.32,
        emptyObject: {},
        emptyArray: [],
        nullValue: null,
        undefinedValue: undefined,
      },
      testArray: [
        'stringVal',
        133.24,
        true,
        { x: 1 },
      ],
    };
  },
};

</script>

<style scoped>


</style>