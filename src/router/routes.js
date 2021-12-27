const routes = [
  {
    path: "/",
    component: () => import("layouts/BaseLayout.vue"),
    children: [
      { path: "",
        component: () => import("pages/Index.vue"),
      },
      {
        path: "register",
        name: "register",
        component: () => import("src/pages/Profile/RegisterView.vue"),
      },
      {
        path: "login",
        name: "login",
        component: () => import("src/pages/Profile/LoginView.vue"),
      },
      {
        path: "update-user",
        name: "update-user",
        component: () => import("src/pages/Profile/UpdateUserView.vue"),
        meta: {protected: true}
      },
      {
        path: "favorites",
        name: "favorites",
        component: () => import("pages/Media/FavoritesListView.vue"),
        meta: {protected: true}
      },
      {
        path: "orders",
        name: "orders",
        component: () => import("pages/Event/OrderListView.vue"),
        meta: {protected: true}
      },
      /*      {
              path: "order",
              name: "order",
              component: () => import("components/Event/EventOrderView.vue"),
              meta: {protected: true}
            },*/
      {
        path: "events/:category",
        name: "events",
        component: () => import("pages/Event/EventsListView.vue"),
      },
      {
        path: "labels/:id",
        name: "labels",
        component: () => import("pages/Event/EventsByLabelView.vue"),
      },
      {
        path: "event/:id",
        name: "event",
        component: () => import("pages/Event/EventDetailView.vue"),
      },
      {
        path: "categories-list",
        name: "CategoryListView",
        component: () =>
          import("src/pages/Administration/CategoryListView.vue"),
        meta: {super: true}
      },
      {
        path: "labels-list",
        name: "LabelListView",
        component: () => import("src/pages/Administration/LabelListView.vue"),
        meta: {super: true}
      },
      {
        path: "organizers-list",
        name: "EventOrganizerListView",
        component: () =>
          import("src/pages/Administration/EventOrganizerListView.vue"),
        meta: {super: true}
      },

      {
        path: "events-list",
        name: "EventsManagement",
        component: () => import("src/pages/Event/EventListView.vue"),
        meta: {admin: true}
      },
      {
        path: "questions-list",
        name: "QuestionListView",
        component: () => import("src/pages/Media/QuestionListView.vue"),
        meta: {both: true}
      },
      {
        path: "administrators-list",
        name: "AdministratorListView",
        component: () =>
          import("src/pages/Administration/AdministratorListView.vue"),
        meta: {super: true}
      },
      {
        path: "add-label",
        name: "LabelAddView",
        component: () => import("src/pages/Administration/LabelAddView.vue"),
        meta: {super: true}
      },
      {
        path: "add-category",
        name: "CategoryAddView",
        component: () => import("src/pages/Administration/CategoryAddView.vue"),
        meta: {super: true}
      },
      {
        path: "add-organizer",
        name: "EventOrganizerAddView",
        component: () =>
          import("src/pages/Administration/EventOrganizerAddView.vue"),
        meta: {super: true}
      },
      {
        path: "add-event",
        name: "AddNewEvent",
        component: () => import("src/pages/Profile/EventProfileAddView.vue"),
        meta: {admin: true}
      },
      {
        path: "update-event/:id",
        name: "UpdateEvent",
        component: () => import("src/pages/Profile/EventProfileUpdateView.vue"),
        meta: {admin: true}
      },
      {
        path: "add-administrator",
        name: "AdministratorAddView",
        component: () =>
          import("src/pages/Administration/AdministratorAddView.vue"),
        meta: {super: true}
      },
      {
        path: "update-label",
        name: "LabelUpdateView",
        component: () => import("src/pages/Administration/LabelUpdateView.vue"),
        meta: {super: true}
      },
      {
        path: "update-administrator",
        name: "AdministratorUpdateView",
        component: () =>
          import("src/pages/Administration/AdministratorUpdateView.vue"),
        meta: {super: true}
      },
      {
        path: "assign-administrator",
        name: "AdministratorAssignationView",
        component: () =>
          import("src/pages/Administration/AdministratorAssignationView.vue"),
        meta: {super: true}
      },
      {
        path: "update-category",
        name: "CategoryUpdateView",
        component: () =>
          import("src/pages/Administration/CategoryUpdateView.vue"),
        meta: {super: true}
      },
      {
        path: "update-organizer",
        name: "EventOrganizerUpdateView",
        component: () =>
          import("src/pages/Administration/EventOrganizerUpdateView.vue"),
        meta: {super: true}
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorView.vue"),
  },
];



export default routes;
