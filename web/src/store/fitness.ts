/**
 * @Author: Fred R. Zhen
 * @Date: 2023/2/3 21:25
 * @Email: fred.zhen@gmail.com
 */
import { defineStore } from 'pinia';
import axios from "axios";

export const useFitness = defineStore("fitnessData", {
  state: () => ({
    data: [
      {
        activityName: 'Cycling',
        isActive: true
      },
      {
        activityName: 'Running',
        isActive: false
      },
      {
        activityName: 'Swimming',
        isActive: false
      },
      {
        activityName: 'Walking',
        isActive: false
      }
    ],
    currentActivity: 'Cycling',
    graphItems: {},
    linePathType: 'Fill the path',
    linePathFill: 'none'
  }),
  actions: {
    async get_fitness_data() {
      const res = await axios.get('/api/fitness');
      return res.data;
    },
   async  get_current_activity_data() {
     const all_data = await this.get_fitness_data();
     const current_activity = this.currentActivity;
     return  all_data.filter((actData: any) => {
       if (actData.activity == current_activity) {
         return actData
       }
     }).sort((a: any, b: any) => {
       return +new Date(a.date) - +new Date(b.date);
     });
    },
    updateIsActive(buttonName: string) {
      this.data.forEach((d: any) => d.isActive = d.activityName == buttonName);
      this.currentActivity = buttonName;
    },
    togglePathFill() {
      if (this.linePathFill == 'none') {
        this.linePathType = "Don't fill the path";
        this.linePathFill = '#41D0F0';
      } else {
        this.linePathType = "Fill the path";
        this.linePathFill = 'none';
      }
    }
  },
});
