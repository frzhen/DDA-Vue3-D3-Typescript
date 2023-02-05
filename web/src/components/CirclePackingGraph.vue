<!--
  * @Author: Fred R. Zhen
  * @Date: 2023/2/5 17:24
  * @Email: fred.zhen@gmail.com
-->
<script lang="ts" setup>

import {useStratify} from "../store/stratify";
import { onMounted } from "vue";
import { createGraph, updateGraph } from "../d3/circle-packing";


const stratifyStore = useStratify();

onMounted( () => {
  stratifyStore.get_stratify_data().then((d: any) => {
    stratifyStore.graphItems = createGraph();
    updateGraph(d, stratifyStore.graphItems);
  });

})

</script>

<template>
  <div class="box" >
    <h2 class="is-size-2 mb-4"> Packing Circles </h2>
    <div id="circlePacking">
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>
