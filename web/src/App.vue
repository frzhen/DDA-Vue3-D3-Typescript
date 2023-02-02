<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HomeContent from './components/HomeContent.vue';
import D3Page from "./views/D3Page.vue";

</script>

<template>
  <div class="box">
    <img alt="Vue logo" src="./assets/svg/logo.svg" width="200" height="200" />
    <HomeContent msg="This is a D3.js project with Vue3 written in Typescript" />
  </div>
  <div class="box">
    <span>
      <img alt="total icon" src="./assets/svg/total.svg" width="60" height="60" />
    </span>
    <span>
      <img alt="used icon" src="./assets/svg/used.svg" width="60" height="60" />
    </span>
    <span>
      <img alt="remain icon" src="./assets/svg/remain.svg" width="60" height="60" />
    </span>
    <span>
      <img alt="expired icon" src="./assets/svg/expired.svg" width="60" height="60" />
    </span>
    <span>
      <img alt="ratio icon" src="./assets/svg/ratio.svg" width="60" height="60" />
    </span>
  </div>
  <D3Page />

</template>

<style>

</style>
