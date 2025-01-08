<script setup lang="ts">
useHead({
  title: "Update Contact",
});

import type { Contact } from "~/server/db/schema";
const route = useRoute();
const id = route.params.id;

const {
  data,
  error,
  status,
}: { data: Contact | null; error: any; status: any } =
  await useLazyAsyncData<Contact>(() => $fetch("/api/contacts/" + id));
</script>

<template>
  <div class="mx-auto">
    <div v-if="status === 'pending'">Loading....</div>
    <div v-else>
      <ContactsForm :contact="data" />
    </div>
  </div>
</template>
