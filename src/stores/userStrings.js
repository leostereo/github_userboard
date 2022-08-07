import { defineStore } from "pinia";

export const userStrings = defineStore({
  id: "userStrings",
  state: () => ({
    counter: 0,
    user_detail: "",
    user_find: "",
  }),

  getters: {
    doubleCount: (state) => state.counter * 2,
    get_findString: (state) => state.user_find,
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});
