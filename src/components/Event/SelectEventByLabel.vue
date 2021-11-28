<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row relative-position">
      <q-input
        dense
        filled
        type="search"
        label="Search by Label"
        placeholder="Start typing..."
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
  </div>
</template>
