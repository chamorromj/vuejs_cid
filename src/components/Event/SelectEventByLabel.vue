<template>
  <div class="q-pa-md">

    <div class="q-gutter-md row relative-position">
      <q-input
        v-model="text"
        dense
        filled
        type="search"
        label="Search by Label"
        placeholder="Start typing..."
        @keyup="findLabels(text)"
      >
        <template v-slot:append>
          <q-icon name="search" @click="findLabels(text)" />
        </template>
      </q-input>
      <div
        class="
          column
          text-weight-bold
          absolute-right
          q-mt-xl
          text-black
        "
        style="top: 20px; width: 92%; background-color: gray; z-index:1"
      >
        <q-list bordered separator class="bg-white">
          <q-item
            clickable
            v-ripple
            v-for="result in searchResults"
            :key="result.id"
          >
            <q-item-section @click="goToEvent(result)">{{
              result.name
            }}</q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import LabelService from "../../services/Administration/label.service.js";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const searchResults = ref(null);
    const router = useRouter();
    const text = ref("");
    const store = useStore();


    const findLabels = async (text) => {
      if (text.length) {
        const labelService = new LabelService();
        const label = {
          name: text,
        };
        const results = await labelService.searchLabelByName(label);
        const res = [];
        if ((results != null) && (results.length > 0))
          results.forEach((element) => res.push(element));
        searchResults.value = res;
      }
    };

    const goToEvent = (label) => {
      emptyResults();
      store.commit('ui/toggleSideMenu')
      store.commit('administration/changeElement', label.name)
      router.push({ name: "labels", params: { id: label.id } });
    };

    const emptyResults = () => {
      text.value = '';
      searchResults.value = [];

    };

    return {
      text: ref(null),
      findLabels,
      searchResults,
      goToEvent,
      emptyResults,
    };
  },
};
</script>

