import { store } from "quasar/wrappers";
import { createStore } from "vuex";
import user from "./user";
import event from "./event";
import administration from "./administration";
import media from "./media";
import label from "./label";
import ui from "./ui"

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      media,
      label,
      user,
      event,
      administration,
      ui
    },

    strict: process.env.DEBUGGING,
  });

  return Store;
});
