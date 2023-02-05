/**
 * @Author: Fred R. Zhen
 * @Date: 2023/2/5 22:04
 * @Email: fred.zhen@gmail.com
 */
import { defineStore } from "pinia";
import axios from "axios";

export const useOrg = defineStore('Org-Tree',{
  state: ()=> ({
    graphItems: {},
    portal_width: 0
  }),
  actions: {
    async get_org_data(){
      const res = await axios.get('/api/org');
      return res.data;
    }
  }
})
