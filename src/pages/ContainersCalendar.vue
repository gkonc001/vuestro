<template>
  <vuestro-container no-wrap>
    <vuestro-card color="var(--vuestro-salmon)">
      <template #heading>VuestroCalendar</template>
      <template #description>
        <span>A component to facilitate viewing a schedule, provides a <vuestro-code>day</vuestro-code> slot which provides <vuestro-code>date</vuestro-code> and <vuestro-code>isToday</vuestro-code> vars for use by your template.
        </span>
      </template>
      <!--<vuestro-panel>-->
        <vuestro-calendar>
          <template #day="{ date, isToday }">
            <!--<div v-if="isToday">Today</div>-->
            <vuestro-pill v-if="show()" size="sm" class="appointment-pill" geopattern>
              <template #title>{{ getTime() }}</template>
              <template #value>{{ getJob() }}</template>
            </vuestro-pill>
            <vuestro-pill v-if="show()" size="sm" class="appointment-pill" geopattern>
              <template #title>{{ getTime() }}</template>
              <template #value>{{ getJob() }}</template>
            </vuestro-pill>
          </template>
        </vuestro-calendar>
      <!--</vuestro-panel>-->
    </vuestro-card>
  </vuestro-container>
</template>

<script>

export default {
  name: 'ContainersCalendar',
  methods: {
    show() {
      return Math.random() > 0.6;
    },
    getTime() {
      return this.times[Math.floor(Math.random()*(100))].time;
    },
    getJob() {
      return this.jobs[Math.floor(Math.random()*(100))].job;
    },
  },
  data() {
    return {
      times: [{"time":"6:55 PM"},
              {"time":"6:21 AM"},
              {"time":"7:25 AM"},
              {"time":"2:59 AM"},
              {"time":"11:51 PM"},
              {"time":"6:28 AM"},
              {"time":"2:01 PM"},
              {"time":"12:41 PM"},
              {"time":"5:35 PM"},
              {"time":"6:45 PM"},
              {"time":"1:32 PM"},
              {"time":"2:41 PM"},
              {"time":"3:15 PM"},
              {"time":"7:34 PM"},
              {"time":"4:45 PM"},
              {"time":"6:17 AM"},
              {"time":"2:52 AM"},
              {"time":"12:05 PM"},
              {"time":"4:36 AM"},
              {"time":"11:37 AM"},
              {"time":"7:38 AM"},
              {"time":"6:17 PM"},
              {"time":"1:51 PM"},
              {"time":"2:38 AM"},
              {"time":"12:31 PM"},
              {"time":"1:51 AM"},
              {"time":"10:21 PM"},
              {"time":"4:07 AM"},
              {"time":"3:41 AM"},
              {"time":"4:50 PM"},
              {"time":"2:58 PM"},
              {"time":"8:53 AM"},
              {"time":"10:51 PM"},
              {"time":"6:30 PM"},
              {"time":"2:28 AM"},
              {"time":"9:42 PM"},
              {"time":"5:07 PM"},
              {"time":"12:24 AM"},
              {"time":"2:28 AM"},
              {"time":"1:18 PM"},
              {"time":"6:22 PM"},
              {"time":"5:58 PM"},
              {"time":"3:04 PM"},
              {"time":"10:50 AM"},
              {"time":"11:10 AM"},
              {"time":"1:59 AM"},
              {"time":"7:10 PM"},
              {"time":"11:16 PM"},
              {"time":"10:04 PM"},
              {"time":"8:38 AM"},
              {"time":"1:17 PM"},
              {"time":"6:05 AM"},
              {"time":"3:56 AM"},
              {"time":"10:39 AM"},
              {"time":"10:48 AM"},
              {"time":"9:36 AM"},
              {"time":"11:00 AM"},
              {"time":"3:27 PM"},
              {"time":"7:10 PM"},
              {"time":"11:40 AM"},
              {"time":"2:24 PM"},
              {"time":"12:12 PM"},
              {"time":"2:59 AM"},
              {"time":"7:22 AM"},
              {"time":"6:36 PM"},
              {"time":"5:11 PM"},
              {"time":"3:31 PM"},
              {"time":"6:54 AM"},
              {"time":"10:54 PM"},
              {"time":"10:42 PM"},
              {"time":"4:11 PM"},
              {"time":"12:16 AM"},
              {"time":"4:39 AM"},
              {"time":"8:46 PM"},
              {"time":"3:57 PM"},
              {"time":"2:04 AM"},
              {"time":"5:01 PM"},
              {"time":"8:31 AM"},
              {"time":"5:54 PM"},
              {"time":"5:27 PM"},
              {"time":"10:44 AM"},
              {"time":"4:18 PM"},
              {"time":"11:51 AM"},
              {"time":"7:11 AM"},
              {"time":"1:29 AM"},
              {"time":"1:51 PM"},
              {"time":"5:29 AM"},
              {"time":"11:48 PM"},
              {"time":"4:51 AM"},
              {"time":"7:05 PM"},
              {"time":"9:50 AM"},
              {"time":"2:17 AM"},
              {"time":"1:00 AM"},
              {"time":"3:46 PM"},
              {"time":"5:51 AM"},
              {"time":"3:11 PM"},
              {"time":"7:47 AM"},
              {"time":"6:45 PM"},
              {"time":"9:06 AM"},
              {"time":"11:52 PM"}],
      jobs: [{"job":"Professor"},
            {"job":"Developer II"},
            {"job":"Recruiter"},
            {"job":"Administrative Assistant IV"},
            {"job":"Civil Engineer"},
            {"job":"Staff Scientist"},
            {"job":"Safety Technician III"},
            {"job":"Registered Nurse"},
            {"job":"Chief Design Engineer"},
            {"job":"Analyst Programmer"},
            {"job":"Web Developer II"},
            {"job":"Geological Engineer"},
            {"job":"Project Manager"},
            {"job":"Marketing Assistant"},
            {"job":"Marketing Manager"},
            {"job":"Food Chemist"},
            {"job":"Biostatistician I"},
            {"job":"Community Outreach Specialist"},
            {"job":"Project Manager"},
            {"job":"Systems Administrator II"},
            {"job":"Design Engineer"},
            {"job":"Design Engineer"},
            {"job":"Assistant Media Planner"},
            {"job":"Marketing Assistant"},
            {"job":"VP Product Management"},
            {"job":"Marketing Assistant"},
            {"job":"Accountant III"},
            {"job":"Health Coach IV"},
            {"job":"Data Coordiator"},
            {"job":"Social Worker"},
            {"job":"Account Representative II"},
            {"job":"Professor"},
            {"job":"Budget/Accounting Analyst I"},
            {"job":"Accountant I"},
            {"job":"Social Worker"},
            {"job":"Sales Associate"},
            {"job":"Compensation Analyst"},
            {"job":"Data Coordiator"},
            {"job":"Recruiter"},
            {"job":"Nuclear Power Engineer"},
            {"job":"Product Engineer"},
            {"job":"Speech Pathologist"},
            {"job":"Senior Developer"},
            {"job":"Chief Design Engineer"},
            {"job":"Recruiter"},
            {"job":"Senior Quality Engineer"},
            {"job":"VP Product Management"},
            {"job":"Payment Adjustment Coordinator"},
            {"job":"Assistant Media Planner"},
            {"job":"Occupational Therapist"},
            {"job":"Civil Engineer"},
            {"job":"Financial Advisor"},
            {"job":"Cost Accountant"},
            {"job":"Chief Design Engineer"},
            {"job":"Human Resources Assistant II"},
            {"job":"Financial Analyst"},
            {"job":"Social Worker"},
            {"job":"Paralegal"},
            {"job":"Executive Secretary"},
            {"job":"Pharmacist"},
            {"job":"Graphic Designer"},
            {"job":"Professor"},
            {"job":"Software Consultant"},
            {"job":"Electrical Engineer"},
            {"job":"Business Systems Development Analyst"},
            {"job":"Analyst Programmer"},
            {"job":"VP Marketing"},
            {"job":"Internal Auditor"},
            {"job":"Assistant Media Planner"},
            {"job":"Programmer IV"},
            {"job":"Speech Pathologist"},
            {"job":"Staff Scientist"},
            {"job":"Office Assistant II"},
            {"job":"Operator"},
            {"job":"Systems Administrator I"},
            {"job":"Marketing Assistant"},
            {"job":"General Manager"},
            {"job":"Associate Professor"},
            {"job":"Health Coach I"},
            {"job":"Design Engineer"},
            {"job":"Automation Specialist II"},
            {"job":"Community Outreach Specialist"},
            {"job":"Tax Accountant"},
            {"job":"Pharmacist"},
            {"job":"Recruiting Manager"},
            {"job":"Community Outreach Specialist"},
            {"job":"Product Engineer"},
            {"job":"Senior Cost Accountant"},
            {"job":"Teacher"},
            {"job":"VP Quality Control"},
            {"job":"Assistant Professor"},
            {"job":"Sales Associate"},
            {"job":"Geological Engineer"},
            {"job":"Social Worker"},
            {"job":"Occupational Therapist"},
            {"job":"Senior Developer"},
            {"job":"Developer I"},
            {"job":"VP Marketing"},
            {"job":"Senior Developer"},
            {"job":"Account Coordinator"}],
    };
  }
};

</script>

<style scoped>

.appointment-pill {
  --vuestro-control-margin-v: 1px;
  --vuestro-control-margin-h: 2px;
}


</style>