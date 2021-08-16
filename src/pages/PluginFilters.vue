<template>
  <vuestro-container>
    <vuestro-card color="var(--vuestro-magenta)">
      <template #heading>Filters</template>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>vuestroCommas</template>
      <template #description>Render a number with comma thousands separators</template>
      {{ testNumber }} -> {{ testNumber | vuestroCommas }}
    </vuestro-card>

    <vuestro-card>
      <template #subheading>vuestroPhoneUS</template>
      <template #description>Render a string or number into US phone number format</template>
      {{ testNumber }} -> {{ testNumber | vuestroPhoneUS }}
    </vuestro-card>

    <vuestro-card>
      <template #subheading>vuestroHMS</template>
      <template #description>Render simple hours:minutes:seconds from a Date object, string, or UNIX time</template>
      <div>{{ testDate }} -> {{ testDate | vuestroHMS }}</div>
      <div>{{ testUnix }} -> {{ testUnix | vuestroHMS }}</div>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>vuestroIsoDate</template>
      <template #description>Render ISO8601 date from a Date object, string, or UNIX time</template>
      {{ testDate }} -> {{ testDate | vuestroIsoDate }}
    </vuestro-card>

    <vuestro-card>
      <template #subheading>vuestroDate</template>
      <template #description>Render localized datetime from a Date object, string, or UNIX time</template>
      {{ testDate }} -> {{ testDate | vuestroDate }}
    </vuestro-card>

    <vuestro-card>
      <template #subheading>vuestroLocaleDate</template>
      <template #description>Render localized date only from a Date object, string, or UNIX time</template>
      {{ testDate }} -> {{ testDate | vuestroLocaleDate }}
    </vuestro-card>

    <vuestro-card>
      <template #subheading>vuestroBytes</template>
      <template #description>Render number as humanized byte count</template>
      {{ testNumber }} -> {{ testNumber | vuestroBytes }}
    </vuestro-card>

    <vuestro-card>
      <template #subheading>vuestroTitleCase</template>
      <template #description>Render string with title case</template>
      <div>{{ testString1 }} -> {{ testString1 | vuestroTitleCase }}</div>
      <div>{{ testString2 }} -> {{ testString2 | vuestroTitleCase }}</div>
      <div>{{ testString3 }} -> {{ testString3 | vuestroTitleCase }}</div>
    </vuestro-card>

  </vuestro-container>
</template>

<script>

export default {
  name: 'PluginFilters',
  data() {
    return {
      testNumber: 2373373432,
      testDate: new Date(),
      testUnix: 48748,
      testString1: 'imagine working with vuestro',
      testString2: 'i also handle special-cases',
      testString3: 'and having the word "and" at the beginning',
    };
  },
};

</script>