<template>
  <router-view />
</template>
<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "App",
  setup() {
    const store = useStore();
    const authStatus = computed(() => store.getters["user/currentState"]);
    const checkAuthStatus = async () => {
      const resp = await store.dispatch("user/checkAuthentication");
      return resp;
    };

    checkAuthStatus();

    return {
      authStatus,
    };
  },
});
</script>
