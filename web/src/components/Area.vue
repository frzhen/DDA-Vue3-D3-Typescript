<!--
  * @Author: Fred R. Zhen
  * @Date: 2023/1/24 17:57
  * @Email: fred.zhen@gmail.com
-->
<script lang="ts" setup>
import AreaChart from "../components/AreaChart.vue";
import { ref } from "vue";
import { menu } from '../util/types';

const menu = ref<menu>([
    {
      name: "veg soup",
      orders: 200
    },
{
  name: "veg curry",
  orders: 600
},
{
  name: "veg pasta",
  orders: 300
},
{
  name: "veg surprise",
  orders: 900
},
{
  name: "veg burger",
  orders: 1200
}
]);

</script>

<template>
  <AreaChart :chartData="menu" :width="600" :height="600"/>
</template>

<style lang='scss' scoped>

</style>
