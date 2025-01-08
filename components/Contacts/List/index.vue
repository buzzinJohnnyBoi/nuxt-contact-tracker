<script setup lang="ts">
import type { Contact } from "~/server/db/schema";
const { data, status }: { data: Contact[]; error: any; status: any } =
  await useAsyncData<Contact[]>(() => $fetch("/api/contacts"));
</script>

<template>
  <div class="bg-blue-500">Hello World</div>
  <div v-if="status === 'pending'">Loading....</div>
  <div v-else>
    <table class="table-auto w-full">
      <thead>
        <tr>
          <th class="px-4 py-2 text-left"></th>
          <th class="px-4 py-2 text-left">First Name</th>
          <th class="px-4 py-2">Last Name</th>
          <th class="px-4 py-2">Email</th>
          <th class="px-4 py-2">Phone</th>
          <th class="px-4 py-2">Address</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id">
          <td class="px-4 py-2">
            <NuxtLink
              class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
              :to="'/contacts/update/' + item.id"
            >
              Update
            </NuxtLink>
          </td>
          <td class="px-4 py-2">{{ item.firstName }}</td>
          <td class="px-4 py-2">{{ item.lastName }}</td>
          <td class="px-4 py-2">{{ item.email }}</td>
          <td class="px-4 py-2">{{ item.phone }}</td>
          <td class="px-4 py-2">{{ item.address }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
