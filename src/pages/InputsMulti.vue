<template>
  <vuestro-container>
    <vuestro-card cols="12" color="#327633">
      <template #heading>Multi Select</template>
      <template #description>
      </template>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>
        <span>VuestroMultiSelect provides a templatized multi-select which allows a lot of control over the contents.
          <p>The templates are <em>title</em>, <em>item</em>, and <em>dropdown</em></p>
        </span>
      </template>
      <vuestro-multi-select size="xl" :value="exampleValue" @keyup="onSearch" @clear="onClear">
        <template #title>Choices</template>
        <!--<template #item="{ item }">{{ item }}</template>-->
        <template #dropdown>
          <vuestro-container gutter="none">
            <template v-if="filtered.length > 0">
              <vuestro-pill v-for="e in filtered" :key="e.id"
                            clickable @click="onSelect(e)">
                <template #value>{{ e.value }}</template>
              </vuestro-pill>
            </template>
            <template v-else>
              <vuestro-button variant="info" value @click="onAddNew">
                Add {{ searchTerm }} as new value
              </vuestro-button>
            </template>
          </vuestro-container>
        </template>
      </vuestro-multi-select>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>Single Selection</template>
      <vuestro-multi-select size="xl" single :value="exampleValue" @keyup="onSearch" @clear="onClear">
        <template #title>Just one</template>
        <template #dropdown="{ searchTerm, closeDropdown, clearSearchTerm }">
          <vuestro-container gutter="none">
            <template v-if="filtered.length > 0">
              <vuestro-pill v-for="e in filtered" :key="e.id"
                            clickable @click="onSelect(e)">
                <template #value>{{ e.value }}</template>
              </vuestro-pill>
            </template>
            <template v-else>
              <vuestro-button variant="info" value @click="onAddNew">
                Add {{ searchTerm }} as new value
              </vuestro-button>
              <vuestro-button variant="warning" value @click="closeDropdown">
                I can close the dropdown!
              </vuestro-button>
              <vuestro-button variant="danger" value @click="clearSearchTerm">
                I can clear the search field!
              </vuestro-button>
            </template>
          </vuestro-container>
        </template>
      </vuestro-multi-select>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>Super long list</template>
      <vuestro-multi-select size="xl"
                            :value="exampleValue2"
                            valueField="first_name"
                            @keyup="onSearch2" @clear="onClear2">
        <template #title>It's Long</template>
        <template #dropdown>
          <vuestro-container gutter="none" column>
            <template v-if="filteredLong.length > 0">
              <vuestro-pill v-for="e in filteredLong" :key="e.id"
                            clickable @click="onSelect2(e)">
                <template #value>{{ e.first_name }}</template>
              </vuestro-pill>
            </template>
          </vuestro-container>
        </template>
      </vuestro-multi-select>
    </vuestro-card>

    <vuestro-card>
      <template #subheading><span><vuestro-code>no-margin</vuestro-code> prop</span></template>
      <vuestro-multi-select size="xl" placeholder="" no-margin>
        <template #title>No margin</template>
      </vuestro-multi-select>
    </vuestro-card>

    <vuestro-card>
      <template #subheading><span><vuestro-code>variant="shaded"</vuestro-code> prop</span></template>
      <vuestro-multi-select size="xl" variant="shaded">
        <template #title>Shaded</template>
      </vuestro-multi-select>
    </vuestro-card>

    <vuestro-card>
      <template #subheading><span><vuestro-code>readonly</vuestro-code> prop</span></template>
      <vuestro-multi-select size="xl" readonly :value="exampleValue3">
        <template #title>Read Only</template>
        <template #dropdown>
          <vuestro-container gutter="none" column>
            <template v-if="filteredLong.length > 0">
              <vuestro-pill v-for="e in filteredLong" :key="e.id"
                            clickable @click="onSelect2(e)">
                <template #value>{{ e.first_name }}</template>
              </vuestro-pill>
            </template>
          </vuestro-container>
        </template>
      </vuestro-multi-select>
    </vuestro-card>

    <vuestro-card>
      <template #subheading><span>Icon as title</span></template>
      <vuestro-multi-select size="xl" readonly :value="exampleValue3">
        <template #title>
          <vuestro-icon name="search"></vuestro-icon>
        </template>
        <template #dropdown>
          <vuestro-container gutter="none" column>
            <template v-if="filteredLong.length > 0">
              <vuestro-pill v-for="e in filteredLong" :key="e.id"
                            clickable @click="onSelect2(e)">
                <template #value>{{ e.first_name }}</template>
              </vuestro-pill>
            </template>
          </vuestro-container>
        </template>
      </vuestro-multi-select>
    </vuestro-card>

    <vuestro-card>
      <template #subheading><span>No title</span></template>
      <vuestro-multi-select size="xl" readonly :value="exampleValue3">
        <template #dropdown>
          <vuestro-container gutter="none" column>
            <template v-if="filteredLong.length > 0">
              <vuestro-pill v-for="e in filteredLong" :key="e.id"
                            clickable @click="onSelect2(e)">
                <template #value>{{ e.first_name }}</template>
              </vuestro-pill>
            </template>
          </vuestro-container>
        </template>
      </vuestro-multi-select>
    </vuestro-card>

  </vuestro-container>
</template>

<script>

/* global _ */

export default {
  name: 'InputsSpinner',
  data() {
    return {
      searchTerm: '',
      searchTerm2: '',
      exampleDatasetWithIds: [
        {
          id: 'id0',
          value: 'Bigtax',
        },
        {
          id: 'id1',
          value: 'Daltfresh',
        },
        {
          id: 'id2',
          value: 'Pannier',
        },
        {
          id: 'id3',
          value: 'Asoka',
        },
        {
          id: 'id4',
          value: 'Bytecard',
        },
        {
          id: 'id5',
          value: 'Matsoft',
        },
      ],
      superLongList: [
        {"first_name":"Jeremias"},
        {"first_name":"Dorelia"},
        {"first_name":"Austen"},
        {"first_name":"Emmanuel"},
        {"first_name":"Rodina"},
        {"first_name":"Burke"},
        {"first_name":"Gasparo"},
        {"first_name":"Reynold"},
        {"first_name":"Dulciana"},
        {"first_name":"Kathie"},
        {"first_name":"Hillery"},
        {"first_name":"Christoph"},
        {"first_name":"Alethea"},
        {"first_name":"Ronnica"},
        {"first_name":"Zondra"},
        {"first_name":"Pacorro"},
        {"first_name":"Philippine"},
        {"first_name":"Lucky"},
        {"first_name":"Becca"},
        {"first_name":"Hirsch"},
        {"first_name":"Herculie"},
        {"first_name":"Ryan"},
        {"first_name":"Quill"},
        {"first_name":"Miguel"},
        {"first_name":"Mellisent"},
        {"first_name":"Lorine"},
        {"first_name":"Brian"},
        {"first_name":"Johny"},
        {"first_name":"Lib"},
        {"first_name":"Sindee"},
        {"first_name":"Urban"},
        {"first_name":"Harland"},
        {"first_name":"Ancell"},
        {"first_name":"Chickie"},
        {"first_name":"Feodora"},
        {"first_name":"Lotty"},
        {"first_name":"Tally"},
        {"first_name":"Kinnie"},
        {"first_name":"Nady"},
        {"first_name":"Shaylyn"},
        {"first_name":"Padget"},
        {"first_name":"Sheba"},
        {"first_name":"Jayson"},
        {"first_name":"Linoel"},
        {"first_name":"Harris"},
        {"first_name":"Gregor"},
        {"first_name":"Arv"},
        {"first_name":"Margalit"},
        {"first_name":"Milena"},
        {"first_name":"Roarke"},
        {"first_name":"Lin"},
        {"first_name":"Rustie"},
        {"first_name":"Christean"},
        {"first_name":"Orsa"},
        {"first_name":"Dion"},
        {"first_name":"Brittan"},
        {"first_name":"Tomasine"},
        {"first_name":"Gwen"},
        {"first_name":"Bendicty"},
        {"first_name":"Stevy"},
        {"first_name":"Tawnya"},
        {"first_name":"Ronni"},
        {"first_name":"Francois"},
        {"first_name":"Alexa"},
        {"first_name":"Trenna"},
        {"first_name":"Leonanie"},
        {"first_name":"Jenine"},
      ],
      exampleValue: [],
      exampleValue2: [],
      exampleValue3: [
        {
          key: 'Key',
          value: 'Value',
        },
      ],
    };
  },
  computed: {
    filtered() {
      if (this.searchTerm.length > 0) {
        let regex = new RegExp(this.searchTerm, 'i');
        return _.filter(this.exampleDatasetWithIds, (o) => {
          return regex.test(o.value);
        });
      }
      return this.exampleDatasetWithIds;
    },
    filteredLong() {
      if (this.searchTerm2.length > 0) {
        let regex = new RegExp(this.searchTerm2, 'i');
        return _.filter(this.superLongList, (o) => {
          return regex.test(o.first_name);
        });
      }
      return this.superLongList;
    },
  },
  methods: {
    onSelect(e) {
      this.exampleValue.push(e);
    },
    onSearch(e) {
      this.searchTerm = e.target.value;
    },
    onClear() {
      this.exampleValue = [];
    },
    onSelect2(e) {
      this.exampleValue2.push(e);
    },
    onSearch2(e) {
      this.searchTerm2 = e.target.value;
    },
    onClear2() {
      this.exampleValue2 = [];
    },
    onAddNew(d) {
      let newObj = {
        id: this.vuestroGenerateId(5),
        value: this.searchTerm,
      };
      this.exampleDatasetWithIds.push(newObj);
      this.exampleValue.push(newObj);
    },
  },
};

</script>

<style scoped>
  
  
</style>