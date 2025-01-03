<script setup lang="ts">
import type { Contact } from "~/server/db/schema";
const { data, error, status }: { data: Contact[]; error: any; status: any } =
  await useAsyncData<Contact[]>(() => $fetch("/api/contacts"));
</script>

<template>
  <div class="bg-blue-500">Hello World</div>
  <div v-if="status === 'pending'">Loading....</div>
  <div v-else>
    <div v-for="item in data" :key="item.id">
      {{ item.first_name }}
      {{ item.last_name }}
    </div>
  </div>
</template>
