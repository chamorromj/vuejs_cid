<template>
  <q-layout view="hHh lpr fFf">
    <q-header elevated class="bg-primary text-white">
      <MenuBar/>
    </q-header>

    <LeftDrawer v-model="sideMenuOpen"/>

    <q-page-container>
      <router-view />
    </q-page-container>

    <Footer />
  </q-layout>
</template>

<script>
import { useStore } from "vuex";
import {computed, defineAsyncComponent} from "vue";

export default {
  name: "MainLayout",
  components: {
    LeftDrawer: defineAsyncComponent(() =>
      import("../components/Layout/LeftDrawer.vue")
    ),
    Footer: defineAsyncComponent(() =>
      import("../components/Layout/Footer.vue")
    ),
    MenuBar: defineAsyncComponent(() =>
      import("../components/Layout/MenuBar.vue")
    ),
  },
  setup(){
    const store = useStore()
    return{
      sideMenuOpen: computed({
        get() {
          return store.getters['ui/isSideMenuOpen']
        },
        set(val) {
          store.commit('ui/toggleSideMenu')
        }
      }),
    }
  }


};
</script>
