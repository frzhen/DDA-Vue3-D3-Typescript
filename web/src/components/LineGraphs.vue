<!--
  * @Author: Fred R. Zhen
  * @Date: 2023/2/2 13:15
  * @Email: fred.zhen@gmail.com
-->
<script lang="ts" setup>
import { useFitness } from "../store/fitness";
import { onMounted } from "vue";
import { createGraph, updateGraph } from "../d3/line-chart";

const fitnessStore = useFitness();

onMounted(() => {
  fitnessStore
    .get_current_activity_data()
    .then((d: any) => {
      fitnessStore.graphItems = createGraph();
      updateGraph(d, fitnessStore.graphItems);
      }
    );
})
const handleClick = (event: any) => {

  fitnessStore.updateIsActive(event.target.innerText);
  fitnessStore
    .get_current_activity_data()
    .then((d: any) => updateGraph(d, fitnessStore.graphItems));
}

</script>

<template>
  <div class="box">
    <h2 class="is-size-2 mb-4"> Fitness Tracker </h2>
    <div class="columns">
      <div id="line-graph-selector" class="column is-one-quarter">
        <div v-for="d in fitnessStore.data" :key=d.activityName class="columns">
          <button class="button column mx-6 my-2 p-1"
                  :class="{
            'is-info': d.isActive,
            'is-light': !d.isActive
          }"
                  @click.prevent="handleClick"
          >{{ d.activityName }}</button>
        </div>
      </div>
      <div  class="column">
        <div class="box">
          <h3 class="is-size-3">Line Graphs</h3>
          <div class="field is-grouped is-grouped-multiline is-justify-content-center">
            <div class="control">
              <div class="tags has-addons">
                <span class="tag is-grey">Fitness Type</span>
                <span class="tag is-success">{{ fitnessStore.currentActivity }}</span>
              </div>
            </div>
          </div>
          <div id="line-graph">
            <!--this is where you insert d3 graph-->
          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<style lang='scss' scoped>
</style>
