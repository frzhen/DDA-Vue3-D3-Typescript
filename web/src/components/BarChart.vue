<!--
  * @Author: Fred R. Zhen
  * @Date: 2023/1/24 17:58
  * @Email: fred.zhen@gmail.com
-->
<script lang="ts" setup>
import { createBarChar } from "../d3/bar-chart";
import { onMounted } from "vue";
import { useMenu } from "../store/dishes";

const menuData = useMenu();

onMounted(() => {
  menuData.fetchMenuData().then((data: any) => createBarChar(data));
});

</script>

<template>
  <h3 class="is-size-3">Dishes Bar Chart</h3>
  <div id="barChart">
</div>
</template>
