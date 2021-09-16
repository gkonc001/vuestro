<template>
  <vuestro-container>
    <vuestro-card cols="12" color="#f47633">
      <template #heading>Text Inputs</template>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>VuestroTextField</template>
      <template #description>
        VuestroTextField is a very versatile component. It can function as a simple text field as well as provide a templatized dropdown for advanced options.
      </template>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>
        Four variants and four sizes
      </template>
      <vuestro-container>
        <vuestro-card cols="3">
          <vuestro-text-field placeholder="Regular sm size" size="sm" v-model="exampleText"></vuestro-text-field>
          <vuestro-text-field placeholder="Regular default size" v-model="exampleText"></vuestro-text-field>
          <vuestro-text-field placeholder="Regular lg size" size="lg" v-model="exampleText"></vuestro-text-field>
          <vuestro-text-field placeholder="Regular xl size" size="xl" v-model="exampleText"></vuestro-text-field>
        </vuestro-card>
        <vuestro-card cols="3">
          <vuestro-text-field variant="outline" placeholder="Outline sm size" size="sm" v-model="exampleText"></vuestro-text-field>
          <vuestro-text-field variant="outline" placeholder="Outline default size" v-model="exampleText"></vuestro-text-field>
          <vuestro-text-field variant="outline" placeholder="Outline lg size" size="lg" v-model="exampleText"></vuestro-text-field>
          <vuestro-text-field variant="outline" placeholder="Outline xl size" size="xl" v-model="exampleText"></vuestro-text-field>
        </vuestro-card>
        <vuestro-card cols="3">
          <vuestro-text-field variant="shaded" placeholder="Shaded sm size" size="sm" v-model="exampleText"></vuestro-text-field>
          <vuestro-text-field variant="shaded" placeholder="Shaded default size" v-model="exampleText"></vuestro-text-field>
          <vuestro-text-field variant="shaded" placeholder="Shaded lg size" size="lg" v-model="exampleText"></vuestro-text-field>
          <vuestro-text-field variant="shaded" placeholder="Shaded xl size" size="xl" v-model="exampleText"></vuestro-text-field>
        </vuestro-card>
        <vuestro-card cols="3">
          <vuestro-text-field variant="search" placeholder="Search sm size" size="sm" v-model="exampleText"></vuestro-text-field>
          <vuestro-text-field variant="search" placeholder="Search default size" v-model="exampleText"></vuestro-text-field>
          <vuestro-text-field variant="search" placeholder="Search lg size" size="lg" v-model="exampleText"></vuestro-text-field>
          <vuestro-text-field variant="search" placeholder="Search xl size" size="xl" v-model="exampleText"></vuestro-text-field>
        </vuestro-card>
      </vuestro-container>
    </vuestro-card>
    <vuestro-card>
      <template #subheading>
        Additional options
      </template>
      <vuestro-container>
        <vuestro-card cols="4">
          <vuestro-text-field size="lg" placeholder="Existing Value" v-model="exampleEditableText"></vuestro-text-field>
    			<vuestro-text-field size="lg" placeholder="Responsive Value" v-model="delayedText"></vuestro-text-field>
          <vuestro-text-field size="lg" variant="outline" placeholder="With Hint" hint="go on, type something..." v-model="exampleText"></vuestro-text-field>
        </vuestro-card>
        <vuestro-card cols="4">
          <vuestro-text-field size="lg" placeholder="With Clear Button" hint="type something and the clear button will appear!" v-model="exampleText" clearable></vuestro-text-field>
          <vuestro-text-field size="lg" placeholder="Centered Cursor" hint="centered hint, too!" center v-model="exampleText"></vuestro-text-field>
        </vuestro-card>
        <vuestro-card cols="4">
          <vuestro-text-field size="lg" placeholder="Icon slot" hint="with hint" v-model="exampleText">
            <template #icon>
              <vuestro-icon name="star"></vuestro-icon>
            </template>
          </vuestro-text-field>
          <vuestro-text-field size="lg" variant="outline" placeholder="Icon slot" hint="with hint" v-model="exampleText">
            <template #icon>
              <vuestro-icon name="star"></vuestro-icon>
            </template>
          </vuestro-text-field>
        </vuestro-card>
      </vuestro-container>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>
        Non-String Text Fields
      </template>
      <div class="example-flexbox">
        <vuestro-text-field placeholder="Enter a number" v-model="exampleNumber" clearable></vuestro-text-field>
        <vuestro-text-field placeholder="Enter a number" v-model="exampleNumber" clearable>
          <template #unit>cm</template>
        </vuestro-text-field>
        <vuestro-text-field placeholder="Enter a date string" v-model="exampleDate" clearable></vuestro-text-field>
        <vuestro-text-field placeholder="Enter a boolean" v-model="exampleBoolean" :invalid="isBooleanString(exampleBoolean)" clearable></vuestro-text-field>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>
        Text Field providing dropdown template for additional controls, such as search matches
      </template>
      <div class="example-flexbox">
        <vuestro-text-field ref="dropdownField"
                            size="lg"
                            clearable
                            variant="outline"
                            placeholder="With Templated Dropdown"
                            v-model="selectedText">
          <template #dropdown>
            <vuestro-list-button v-for="d in filteredDatasetWithIds" :key="d.id" @click="onSelect(d)">{{ d.val }}</vuestro-list-button>
          </template>
        </vuestro-text-field>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>
        Text Field with Save/Cancel buttons
      </template>
      <vuestro-container>
        <vuestro-card cols="4">
          <vuestro-text-field variant="outline" size="sm" clearable v-model="exampleText" editing-buttons @save="onSaveButton" @cancel="onCancelButton"></vuestro-text-field>
          <vuestro-text-field variant="outline" clearable v-model="exampleText" editing-buttons @save="onSaveButton" @cancel="onCancelButton"></vuestro-text-field>
          <vuestro-text-field variant="outline" size="lg" clearable v-model="exampleText" editing-buttons @save="onSaveButton" @cancel="onCancelButton"></vuestro-text-field>
          <vuestro-text-field variant="outline" size="xl" clearable v-model="exampleText" editing-buttons @save="onSaveButton" @cancel="onCancelButton"></vuestro-text-field>
        </vuestro-card>
        <vuestro-card cols="4">
          <vuestro-text-field variant="shaded" size="sm" clearable hint="filename" v-model="exampleText" editing-buttons @save="onSaveButton" @cancel="onCancelButton"></vuestro-text-field>
          <vuestro-text-field variant="shaded" clearable hint="filename" v-model="exampleText" editing-buttons @save="onSaveButton" @cancel="onCancelButton"></vuestro-text-field>
          <vuestro-text-field variant="shaded" size="lg" clearable hint="filename" v-model="exampleText" editing-buttons @save="onSaveButton" @cancel="onCancelButton"></vuestro-text-field>
          <vuestro-text-field variant="shaded" size="xl" clearable hint="filename" v-model="exampleText" editing-buttons @save="onSaveButton" @cancel="onCancelButton"></vuestro-text-field>
        </vuestro-card>
      </vuestro-container>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>
        <span>Set the <vuestro-code>readonly</vuestro-code> property for a text field which ignores pointer events</span>
      </template>
      <div class="example-flexbox"  >
        <vuestro-text-field variant="outline" v-model="exampleEditableText" readonly clearable></vuestro-text-field>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>
        <span>Set the <vuestro-code>invalid</vuestro-code> property to true or a string to provide validation feedback.</span>
      </template>
      <div class="example-flexbox">
        <vuestro-text-field variant="outline" v-model="exampleBoolean" editing-buttons clearable :validate="isBooleanString"></vuestro-text-field>
        <vuestro-text-field variant="outline" placeholder="Age" v-model="validateNumber" editing-buttons clearable :validate="isNumber"></vuestro-text-field>
        <vuestro-text-field variant="outline" placeholder="Email" size="lg" v-model="validateEmail" editing-buttons clearable :validate="isEmail"></vuestro-text-field>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>
        Autocompletes (e.g. by the browser)
      </template>
      <div class="example-flexbox">
        <form>
          <vuestro-text-field type="password" v-model="exampleText" autocomplete="new-password"></vuestro-text-field>
          <vuestro-text-field type="email" v-model="exampleText" autocomplete="email"></vuestro-text-field>
        </form>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>
        Editable Text
      </template>
      <div class="example-flexbox">
        <vuestro-editable-text v-model="exampleEditableText"></vuestro-editable-text>
      </div>
      <div class="example-flexbox-fixed">
        <vuestro-editable-text v-model="exampleEditableText2"></vuestro-editable-text>
      </div>
    </vuestro-card>

  </vuestro-container>
</template>

<script>

export default {
  name: 'TextInputs',
  data() {
    return {
      exampleEditableText: '',
      exampleEditableText2: '',
      exampleText: '',
      exampleNumber: '32.23',
      exampleDate: (new Date()).toISOString(),
      exampleBoolean: 'true',
			delayedText: '',
      selectedId: null,
      selectedText: '',
      exampleDatasetWithIds: [
        {
          id: 'id0',
          val: 'Bigtax',
        },
        {
          id: 'id1',
          val: 'Daltfresh',
        },
        {
          id: 'id2',
          val: 'Pannier',
        },
        {
          id: 'id3',
          val: 'Asoka',
        },
        {
          id: 'id4',
          val: 'Bytecard',
        },
        {
          id: 'id5',
          val: 'Matsoft',
        },
      ],
      validateNumber: '',
      validateEmail: '',
    };
  },
  computed: {
    filteredDatasetWithIds() {
      if (this.selectedText.length > 0) {
        let regex = new RegExp(this.selectedText, 'i');
        return _.filter(this.exampleDatasetWithIds, (o) => {
          return regex.test(o.val);
        });
      }
      return this.exampleDatasetWithIds;
    },
  },
	mounted() {
		this.exampleEditableText = 'edit me';
		this.exampleEditableText2 = 'reallllllly long editable text should fit in width';
		setTimeout(() => {
			this.delayedText = 'delayed  value';
		}, 1000);
	},
  methods: {
    onSaveButton(v) {
      this.exampleText = v;
    },
    onCancelButton() {
      console.log('cancelled');
    },
    isBooleanString(str) {
      return (str === 'true' || str === 'false') || 'should be a boolean';
    },
    isNumber(str) {
      return _.isFinite(_.toNumber(str)) || 'should be number';
    },
    isEmail(str) {
      return str.match(/\w+@\w+.\w+/) || 'should be valid email';
    },
    onSelect(d) {
      this.selectedId = d.id;
      this.selectedText = d.val;
      this.$refs.dropdownField.closeDropdown();
    }
  }
};

</script>

<style scoped>

.example-container {
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
}
.example-container.dark {
  padding: 40px;
  background-color: var(--vuestro-popup-bg);
  position: relative;
}

.example-flexbox > div {
  margin-top: 10px;
}
.example-flexbox-fixed {
  margin-top: 10px;
  width: 80px !important;
  overflow: hidden;
}

</style>