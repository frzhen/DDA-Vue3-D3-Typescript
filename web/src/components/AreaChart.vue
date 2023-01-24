<!--
  * @Author: Fred R. Zhen
  * @Date: 2023/1/24 17:58
  * @Email: fred.zhen@gmail.com
-->
<script lang="ts" setup>
import { scaleLinear, scaleBand } from 'd3-scale';
import { min, max } from 'd3-array';
import { menu } from '../util/types'
import {computed, defineProps, ref} from "vue";

const props = defineProps<{
  chartData: menu,
  width: number,
  height: number,
}>();

const margin = { top: 20, right: 20, bottom: 100, left: 100 };

const graphWidth = ref(props.width - margin.left - margin.right);
const graphHeight = ref(props.height - margin.top - margin.bottom);

const data = props.chartData;
const minValue = min(data, d => d.orders) || 100;
const maxValue = max(data, d => d.orders) || 1200;

const scaleX = computed(() => {
  return scaleBand()
    .domain(data.map(item => item.name))
    .range([0, 500])
    .paddingInner(0.3)
    .paddingOuter(0.2);
});

const scaleY = computed(() => {
  return scaleLinear()
    .domain([minValue-20, maxValue])
    .range([props.height - margin.top - margin.bottom, 0]);
});
</script>

<template>
  <svg :width="width" :height="height">
    <g :style="{width: graphWidth, height: graphHeight}" >
      <rect v-for="d in data"
            :key="d.name"
            :style="{
              height: graphHeight - scaleY(d.orders),
              x: scaleX(d.name),
              y: scaleY(d.orders)
            }"
      />
    </g>
  </svg>
</template>

<style scoped>
 rect {
  color: orange;
 }
</style>
