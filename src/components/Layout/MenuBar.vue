<template>
  <q-toolbar class="bg-primary text-black shadow-2" glossy>
    <q-toolbar-title>
      <div class="text-weight-bold">Welcome</div>
    </q-toolbar-title>

    <SelectEventByName class="q-mr-lg" />

    <SelectEventByLabel class="q-mr-lg" />

    <q-separator vertical inset class="q-ml-md" />

    <q-btn
      flat
      round
      dense
      label="Register"
      class="q-mx-md"
      to="/register"
      v-if="!user"
    />
    <q-separator vertical inset />
    <q-btn
      flat
      round
      dense
      label="Login"
      class="q-mx-md"
      to="/login"
      v-if="!user"
    />

    <div v-if="user">
      <span class="txt-subtitle2 text-weight-bold q-mx-sm"
        ><template v-if="user.surname">{{ user.surname }},</template>
        {{ user.username }}</span
      >
    </div>
    <q-btn-dropdown
      v-if="!isAdminUser && !isSuperAdminUser && user"
      flat
      top
      start
      round
      dense
      icon="account_circle"
      class="q-mr-xs"
    >
      <q-list>
        <q-item clickable v-close-popup to="/update-user">
          <q-item-section avatar>
            <q-avatar
              icon="account_box"
              color="primary"
              size="md"
              text-color="white"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-subtitle2 text-bold"
              >User Data</q-item-label
            >
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup to="/orders">
          <q-item-section avatar>
            <q-avatar
              icon="format_list_bulleted"
              color="primary"
              text-color="white"
              size="md"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-subtitle2 text-bold"
              >Purchases</q-item-label
            >
          </q-item-section>
        </q-item>
        <q-item clickable v-close-popup to="/favorites">
          <q-item-section avatar>
            <q-avatar
              icon="star"
              color="primary"
              size="md"
              text-color="white"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-subtitle2 text-bold"
              >Favorites</q-item-label
            >
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>

    <q-btn
      name="logout"
      flat
      round
      dense
      icon="logout"
      class="q-mr-xs"
      @click="logout()"
      to="/"
      v-if="user"
    >
      <q-tooltip> Log out </q-tooltip>
    </q-btn>
  </q-toolbar>
</template>

<script>
import { ref, computed, onMounted, defineAsyncComponent } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "MenuBar",
  components: {
    SelectEventByName: defineAsyncComponent(() =>
      import("../Event/SelectEventByName.vue")
    ),
    SelectEventByLabel: defineAsyncComponent(() =>
      import("../Event/SelectEventByLabel.vue")
    ),
  },
  setup() {
    const leftDrawerOpen = ref(false);

    const store = useStore();
    const router = useRouter();
    const user = computed(() => store.getters["user/getUser"]);

    const logout = () => {
      store.commit("user/logout");
      location.replace("/");
    };

    return {
      isAdminUser: computed(() => store.getters["user/isAdminUser"]),
      isSuperAdminUser: computed(() => store.getters["user/isSuperAdminUser"]),
      user,
      logout,
    };
  },
};
</script>

<style></style>
