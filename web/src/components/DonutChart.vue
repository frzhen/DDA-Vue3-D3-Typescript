<!--
  * @Author: Fred R. Zhen
  * @Date: 2023/1/27 17:38
  * @Email: fred.zhen@gmail.com
-->
<script lang="ts" setup>
import { createDonutChart } from "../d3/donut-chart";
import { onMounted } from "vue";
import { useBudget } from "../store/budget";

const budgetData = useBudget();

onMounted(() => {
  budgetData.fetchBudgetItems().then((data: any) => createDonutChart(data));
})
</script>

<template>
  <h3>Monthly Budget Donut Chart</h3>
  <div id="donutChart">
  </div>
</template>

<style lang='scss' scoped>

</style>
