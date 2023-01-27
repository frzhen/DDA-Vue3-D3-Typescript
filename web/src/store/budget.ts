/**
 * @Author: Fred R. Zhen
 * @Date: 2023/1/27 17:42
 * @Email: fred.zhen@gmail.com
 */
import { defineStore } from "pinia";
import axios from "axios";


export const useBudget = defineStore("budgetItems", {
  state: () => ({
    budgetItems: [],
  }),
  actions: {
    async fetchBudgetItems() {
      const res = await axios.get('/api/budgets');
      return res.data;
    },
  }
});
