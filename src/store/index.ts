import { createStore } from "vuex";

export default createStore({
  state: {
    appTheme: "light",
  },
  mutations: {
    setAppTheme(state, theme) {
      state.appTheme = theme;
    },
  },
});
