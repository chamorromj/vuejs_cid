<template>
  <q-layout view="lHh lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <MenuBar />
    </q-header>

    <LeftDrawer />

    <q-page-container>
      <router-view />
    </q-page-container>

    <Footer />
  </q-layout>
</template>

<script>
import { useStore } from "vuex";
import { defineAsyncComponent } from "vue";
export default {
  name: "BaseLayout",
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
  setup() {
    return {};
  },
};
</script>
