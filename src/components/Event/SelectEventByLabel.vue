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
          shadow-2
          text-black
        "
        style="top: 25px; width: 92%"
      >
        <q-list bordered separator class="bg-white">
          <q-item
            clickable
            v-ripple
            v-for="result in searchResults"
            :key="result.id"
          >
            <q-item-section @click="goToEvent(result.id)">{{
                result.name
              }}</q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import LabelService from "../../services/Administration/label.service";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const searchResults = ref(null);
    const router = useRouter();
    const text = ref("");

    const findLabels = async (text) => {
      if (text.length) {
        const labelService = new LabelService();
        const label = {
          name: text,
        };
        const results = await labelService.searchEventByLabel(label);
        const res = [];
        if ((results != null) && (results.length > 0))
          results.forEach((element) => res.push(element));
        searchResults.value = res;
      }
    };

    const goToEvent = (labelId) => {
      emptyResults();
      router.push({ name: "labels", params: { id: labelId } });
    };

    const emptyResults = () => {
      searchResults.value = null;
      text.value = "";
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
