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
    currentActivity: 'Cycling'
  }),
  actions: {
    async get_fitness_data() {
      const res = await axios.get('/api/fitness');
      let activities = res.data;
      activities.forEach((activity: any) => {
        activity.date =new  Date(activity.date);
      })
      return activities;
    },
    updateIsActive(buttonName: string) {
      this.data.forEach((d: any) => d.isActive = d.activityName == buttonName);
      this.currentActivity = buttonName;
    }
  },
});
