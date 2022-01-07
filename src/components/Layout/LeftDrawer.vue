<template>
  <q-drawer
    overlay
    :width="250"
    class="bg-primary overflow-auto"
    side="left"
    bordered
  >

    <SelectEventByCategory class="q-my-md"/>

    <q-separator inset/>

    <SelectEventByLabel class="q-my-md"/>

    <q-separator inset/>

    <SelectEventByName class="q-mt-md"/>




  </q-drawer>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "LeftDrawer",
  components: {
    SelectEventByName: defineAsyncComponent(() =>
      import("../Event/SelectEventByName.vue")
    ),
    SelectEventByLabel: defineAsyncComponent(() =>
      import("../Event/SelectEventByLabel.vue")
    ),
    SelectEventByCategory: defineAsyncComponent(() =>
      import("../Event/SelecEventByCategory.vue")
    ),
  },
  setup(){
  }
};
</script>

<style></style>
