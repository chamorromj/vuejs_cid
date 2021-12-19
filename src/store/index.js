import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import user from "./user";
import event from "./event";
import media from "./media";
import administration from "./administration";
import ui from "./ui"

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      user,
      event,
      media,
      administration,
      ui
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
