<!--
  * @Author: Fred R. Zhen
  * @Date: 2023/2/2 13:15
  * @Email: fred.zhen@gmail.com
-->
<script lang="ts" setup>
import { ref } from "vue";

const fitnessType = ref('Cycling');

</script>

<template>
  <div class="container">
    <h2 class="is-size-2"> Line Graphs </h2>
    <div class="columns">
      <div id="line-graph-selector" class="column is-one-third">
        <div class="columns">
          <button class="button is-info my-1">Cycling</button>
        </div>
        <div class="columns">
          <button class="button is-info my-1">Running</button>
        </div>
        <div class="columns">
          <button class="button is-info my-1">Swimming</button>
        </div>
        <div class="columns">
          <button class="button is-info my-1">Walking</button>
        </div>



      </div>
      <div  class="column">
        <div class="box">
          <h3 class="is-size-3">Fitness Tracker</h3>
          <div class="field is-grouped is-grouped-multiline">
            <div class="control">
              <div class="tags has-addons">
                <span class="tag is-dark">Type</span>
                <span class="tag is-success">{{ fitnessType }}</span>
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
