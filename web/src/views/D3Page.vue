<!--
  * @Author: Fred R. Zhen
  * @Date: 2023/1/24 12:40
  * @Email: fred.zhen@gmail.com
-->
<script lang="ts" setup>
import BarChart from "../components/BarChart.vue";
import DonutChart from "../components/DonutChart.vue";
import LineGraphs from "../components/LineGraphs.vue";
import CirclePackingGraph from "../components/CirclePackingGraph.vue";
import OrgTree from "../components/OrgTree.vue";


</script>

<template>
  <div class="box">
    <div class="columns">
      <div class="column">
        <BarChart />
      </div>
      <div class="column">
        <DonutChart />
      </div>
    </div>
    <hr>
    <div class="columns">
      <div class="column">
        <LineGraphs />
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <CirclePackingGraph />
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <OrgTree />
      </div>
    </div>
  </div>

</template>

