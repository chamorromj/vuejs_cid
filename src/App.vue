<template>
<!--   <q-circular-progress
    v-if="authStatus === 'authenticating'"
    :value="0"
    size="50px"
    color="orange"
    class="q-ma-md"
  />-->
  <router-view />
</template>
<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "App",
  setup() {
    const store = useStore();
    const checkAuthStatus = async () => {
      const resp = await store.dispatch("user/checkAuthentication");
      return resp;
    };

    checkAuthStatus();


    return {
      authStatus: computed(() => store.getters["user/currentState"]),
      checkAuthStatus,
    };
  },
});
</script>
