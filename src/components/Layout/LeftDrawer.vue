<template>
  <q-drawer
    :width="250"
    show-if-above
    class="bg-primary overflow-auto"
    side="left"
    bordered
  >
    <q-list>
      <q-item-label header class="cursor-pointer">
        <img
          alt="CultureInDaHouse logo"
          src="~assets/logo.png"
          style="width: 100%"
          @click="$router.push('/')"
        />
      </q-item-label>
      <template v-if="isSuperAdminUser">
        <EssentialLink
          v-for="link in linksSuper"
          :key="link.title"
          v-bind="link"
        />
      </template>
      <template v-else-if="isAdminUser">
        <EssentialLink
          v-for="link in linksAdmin"
          :key="link.title"
          v-bind="link"
        />
      </template>
      <template v-else>
        <EssentialLink
          v-for="link in categoriesLinks"
          :key="link.title"
          v-bind="link"
      /></template>
    </q-list>
  </q-drawer>
</template>

<script>
import { ref, defineAsyncComponent, computed } from "vue";
import { useStore } from "vuex";
import CategoryService from "../../services/Administration/category.service";
export default {
  name: "LeftDrawer",
  components: {
    EssentialLink: defineAsyncComponent(() => import("./EssentialLink.vue")),
  },
  watch: {
    isAdminUser,
  },
  setup() {
    const categoriesLinks = ref([]);
    const store = useStore();
    const getCategories = async () => {
      const categoryService = new CategoryService();
      const response = await categoryService.listAllCategories();
      const tempArray = [];
      tempArray.value = await response.forEach((element) => {
        const link = [];
        link.title = element.name;
        link.icon = "public";
        link.caption = element.description;
        link.link = "/events/" + link.title;
        tempArray.push(link);
      });
      categoriesLinks.value = tempArray;
    };
    getCategories();
    return {
      linksSuper: [
        {
          title: "Categories",
          caption: "Create, consult and update categories",
          icon: "bookmark",
          link: "CategoryListView",
        },
        {
          title: "Labels",
          caption: "Create, remove, consult and update labels",
          icon: "label",
          link: "LabelListView",
        },
        {
          title: "Administrators",
          caption: "Create, consult and update administrators",
          icon: "badge",
          link: "AdministratorListView",
        },
        {
          title: "Event Organizers",
          caption: "Create, consult, assign and update event organizers",
          icon: "portrait",
          link: "EventOrganizerListView",
        },
        {
          title: "Questions",
          caption: "Answer questions from the forums",
          icon: "forum",
          link: "QuestionListView",
        },
      ],
      linksAdmin: [
        {
          title: "Events",
          caption: "Create, consult and update events",
          icon: "event",
          link: "EventsManagement",
        },
        {
          title: "Questions",
          caption: "Answer questions from the forums",
          icon: "forum",
          link: "QuestionListView",
        },
      ],
      categoriesLinks,
      getCategories,
      isAdminUser: computed(() => store.getters["user/isAdminUser"]),
      isSuperAdminUser: computed(() => store.getters["user/isSuperAdminUser"]),
    };
  },
};
</script>

<style></style>
