<!--
  * @Author: Fred R. Zhen
  * @Date: 2023/2/2 13:15
  * @Email: fred.zhen@gmail.com
-->
<script lang="ts" setup>
import { useFitness } from "../store/fitness";
import {onMounted} from "vue";

const fitnessStore = useFitness();

const handleClick = (event: any) => {
  fitnessStore.updateIsActive(event.target.innerText);
}

</script>

<template>
  <div class="container">
    <h2 class="is-size-2"> Line Graphs </h2>
    <div class="columns">
      <div id="line-graph-selector" class="column is-one-third">
        <div v-for="d in fitnessStore.data" :key=d.activityName class="columns">
          <button class="button my-1"
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
          <h3 class="is-size-3">Fitness Tracker</h3>
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
.button {
  width: 200px;
}
</style>
