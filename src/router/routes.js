const routes = [
  {
    path: "/",
    component: () => import("layouts/BaseLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
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
      },
      {
        path: "favorites",
        name: "favorites",
        component: () => import("pages/Media/FavoritesListView.vue"),
      },
      {
        path: "orders",
        name: "orders",
        component: () => import("pages/Event/OrderListView.vue"),
      },
      {
        path: "order",
        name: "order",
        component: () => import("pages/Event/EventOrderView.vue"),
      },
      {
        path: "events/:category",
        name: "events",
        component: () => import("pages/Event/EventListView.vue"),
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
      },
      {
        path: "labels-list",
        name: "LabelListView",
        component: () => import("src/pages/Administration/LabelListView.vue"),
      },
      {
        path: "organizers-list",
        name: "EventOrganizerListView",
        component: () =>
          import("src/pages/Administration/EventOrganizerListView.vue"),
      },
      {
        path: "event-list",
        name: "EventsManagement",
        component: () => import("src/pages/Event/EventListView.vue"),
      },
      {
        path: "questions-list",
        name: "QuestionListView",
        component: () => import("src/pages/Media/QuestionListView.vue"),
      },
      {
        path: "administrators-list",
        name: "AdministratorListView",
        component: () =>
          import("src/pages/Administration/AdministratorListView.vue"),
      },
      {
        path: "add-label",
        name: "LabelAddView",
        component: () => import("src/pages/Administration/LabelAddView.vue"),
      },
      {
        path: "add-category",
        name: "CategoryAddView",
        component: () => import("src/pages/Administration/CategoryAddView.vue"),
      },
      {
        path: "add-organizer",
        name: "EventOrganizerAddView",
        component: () =>
          import("src/pages/Administration/EventOrganizerAddView.vue"),
      },
      {
        path: "add-event",
        name: "AddNewEvent",
        component: () => import("src/pages/Profile/EventProfileAddView.vue"),
      },
      {
        path: "add-administrator",
        name: "AdministratorAddView",
        component: () =>
          import("src/pages/Administration/AdministratorAddView.vue"),
      },
      {
        path: "update-label",
        name: "LabelUpdateView",
        component: () => import("src/pages/Administration/LabelUpdateView.vue"),
      },
      {
        path: "update-administrator",
        name: "AdministratorUpdateView",
        component: () =>
          import("src/pages/Administration/AdministratorUpdateView.vue"),
      },
      {
        path: "assign-administrator",
        name: "AdministratorAssignationView",
        component: () =>
          import("src/pages/Administration/AdministratorAssignationView.vue"),
      },
      {
        path: "update-category",
        name: "CategoryUpdateView",
        component: () =>
          import("src/pages/Administration/CategoryUpdateView.vue"),
      },
      {
        path: "update-organizer",
        name: "EventOrganizerUpdateView",
        component: () =>
          import("src/pages/Administration/EventOrganizerUpdateView.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("src/pages/ErrorView.vue"),
  },
];

export default routes;

