<!--
  * @Author: Fred R. Zhen
  * @Date: 2023/1/24 17:58
  * @Email: fred.zhen@gmail.com
-->
<script lang="ts" setup>
import { createBarChart } from "../d3/bar-chart";
import { onMounted } from "vue";

onMounted(() => createBarChart());

</script>

<template>
  <div id="canvas">
  </div>
</template>

