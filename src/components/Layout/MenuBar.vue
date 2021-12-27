<template>
  <q-toolbar class="bg-primary text-black shadow-2">
    <q-avatar class="lt-sm">
      <img src="~assets/avatar_logo.png" to="/">
    </q-avatar>
    <q-item-label header class="gt-xs cursor-pointer justify-center">
      <img
        alt="CultureInDaHouse logo"
        src="~assets/logo.png"
        style="width: 200px"
        @click="$router.push('/')"
      />
    </q-item-label>
    <q-btn flat round dense icon="search" class="q-mr-sm" @click="toggleSideMenu">
      <q-tooltip>Search options</q-tooltip>
    </q-btn>


    <q-space/>




    <div v-if="userUsername">
      <span class="txt-subtitle2 text-weight-bold q-mx-sm gt-sm">{{ userUsername }}</span>
    </div>

    <q-btn-dropdown
      v-if="isSuperAdminUser"
      flat
      top
      start
      round
      dense
      icon="admin_panel_settings"
      class="q-mr-xs"
    >
      <q-list>
        <q-item clickable v-close-popup to="/labels-list">
          <q-item-section avatar>
            <q-avatar
              icon="label"
              color="primary"
              size="md"
              text-color="white"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-subtitle2 text-bold"
            >Labels</q-item-label
            >
          </q-item-section>
        </q-item>
        <q-item clickable v-close-popup to="/administrators-list">
          <q-item-section avatar>
            <q-avatar
              icon="manage_accounts"
              color="primary"
              size="md"
              text-color="white"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-subtitle2 text-bold"
            >Administrators</q-item-label
            >
          </q-item-section>
        </q-item>
        <q-item clickable v-close-popup to="/categories-list">
          <q-item-section avatar>
            <q-avatar
              icon="category"
              color="primary"
              size="md"
              text-color="white"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-subtitle2 text-bold"
            >Categories</q-item-label
            >
          </q-item-section>
        </q-item>
        <q-item clickable v-close-popup to="/organizers-list">
          <q-item-section avatar>
            <q-avatar
              icon="business_center"
              color="primary"
              size="md"
              text-color="white"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-subtitle2 text-bold"
            >Event Organizers</q-item-label
            >
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup to="/questions-list">
          <q-item-section avatar>
            <q-avatar
              icon="format_list_bulleted"
              color="primary"
              text-color="white"
              size="md"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-subtitle2 text-bold">Questions</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-btn-dropdown>

    <q-btn-dropdown
      v-else-if="isAdminUser"
      flat
      top
      start
      round
      dense
      icon="admin_panel_settings"
      class="q-mr-xs"
    >
      <q-list>
        <q-item clickable v-close-popup to="/events-list">
          <q-item-section avatar>
            <q-avatar
              icon="local_activity"
              color="primary"
              size="md"
              text-color="white"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-subtitle2 text-bold"
            >Events</q-item-label
            >
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup to="/questions-list">
          <q-item-section avatar>
            <q-avatar
              icon="format_list_bulleted"
              color="primary"
              text-color="white"
              size="md"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-subtitle2 text-bold">Questions</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-btn-dropdown>

    <q-btn-dropdown
      v-else-if="userUsername"
      flat
      top
      start
      round
      dense
      icon="account_circle"
      class="q-mr-xs"
    >
      <q-list>
        <q-item clickable v-close-popup @click="goToUpdateUser()">
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
            <q-item-label class="text-subtitle2 text-bold">Orders</q-item-label>
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
    <div v-else class="row">
      <q-btn
        flat
        round
        dense
        label="Register"
        class="q-mx-md"
        to="/register"
      />
      <q-separator vertical inset/>
      <q-btn
        flat
        round
        dense
        label="Login"
        class="q-mx-md"
        to="/login"
      />
    </div>


    <q-btn
      name="logout"
      flat
      round
      dense
      icon="logout"
      class="q-mr-xs"
      @click="logout()"
      to="/"
      v-if="userUsername"
    >
      <q-tooltip> Log out </q-tooltip>
    </q-btn>
  </q-toolbar>
</template>

<script>
import { ref, computed, onMounted, defineAsyncComponent } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import LabelService from "src/services/Administration/label.service";
import LeftDrawer from "components/Layout/LeftDrawer";

export default {
  name: "MenuBar",
  setup() {

    const store = useStore()
    const router = useRouter()
    const user = store.getters["user/getUser"]

    /*onMounted(async () => {
      const labelService = new LabelService();
      const labels = await labelService.listAllLabels();
      store.commit("label/setLabels", labels);
    });*/

    const logout = () => {
      store.commit("user/logout");
      location.replace("/");
    };

    const goToUpdateUser = ()=>{
      router.push("/update-user")
    }

    return {
      goToUpdateUser,
      isAdminUser: computed(() => store.getters["user/isAdminUser"]),
      isSuperAdminUser: computed(() => store.getters["user/isSuperAdminUser"]),
      userUsername: computed(()=> store.getters["user/getUserUserName"]),
      user,
      logout,
      toggleSideMenu() { store.commit('ui/toggleSideMenu') },

    };
  },
};
</script>
