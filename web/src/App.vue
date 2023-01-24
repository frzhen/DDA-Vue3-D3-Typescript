<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HomeContent from './components/HomeContent.vue';
import D3Page from "./views/D3Page.vue";

</script>

<template>
  <div class="box">
    <img alt="Vue logo" src="./assets/logo.svg" width="200" height="200" />
    <HomeContent msg="This is a D3.js project with Vue3 written in Typescript" />
  </div>
  <D3Page />

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
