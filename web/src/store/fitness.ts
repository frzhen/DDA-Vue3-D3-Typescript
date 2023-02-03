/**
 * @Author: Fred R. Zhen
 * @Date: 2023/2/3 21:25
 * @Email: fred.zhen@gmail.com
 */
import { defineStore } from 'pinia';
import axios from "axios";

interface FitnessData{
  activityName: string,
  isActive: boolean
}
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
    updateIsActive(buttonName: string) {
      this.data.forEach((d: FitnessData) => d.isActive = d.activityName == buttonName);
      this.currentActivity = buttonName;
    }
  },
});
