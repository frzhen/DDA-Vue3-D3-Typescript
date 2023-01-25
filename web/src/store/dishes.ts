/**
 * @Author: Fred R. Zhen
 * @Date: 2023/1/25 17:18
 * @Email: fred.zhen@gmail.com
 */
import { defineStore } from 'pinia';
import axios from 'axios';

export const useMenu = defineStore("menuItems", {
  state: () => ({
    menuItems: [],
  }),
  actions: {
    async fetchMenuData() {
      const res = await axios.get('/api/dishes');
      return res.data;
    }
  }
});
