/**
 * @Author: Fred R. Zhen
 * @Date: 2023/2/5 17:21
 * @Email: fred.zhen@gmail.com
 */
import { defineStore } from 'pinia';
import axios from "axios";

export const useStratify = defineStore('stratify', {
  state: () => ({
    data: []
  }),
  actions: {
    async get_stratify_data() {
      const res = await axios.get('/api/stratify');
      return res.data;
    }
  }
})
