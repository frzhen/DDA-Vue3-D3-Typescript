<!--
  * @Author: Fred R. Zhen
  * @Date: 2023/2/5 22:03
  * @Email: fred.zhen@gmail.com
-->
<script lang="ts" setup>
import { onMounted } from "vue";
import { useOrg } from "../store/org";
import { createGraph, updateGraph } from "../d3/org-hierarchy-tree";

const orgStore = useOrg();


onMounted(()=> {
  orgStore.get_org_data().then((d: any) => {
    orgStore.graphItems = createGraph();
    updateGraph(d, orgStore.graphItems);
  })
});

</script>

<template>
  <div class="box">
    <h2 class="is-size-2 mb-4"> Organization Tree</h2>
    <div id="org-tree">

    </div>
  </div>

</template>

<style lang='scss' scoped>

</style>
