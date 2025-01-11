<script setup lang="ts">
import type { Contact } from "~/server/db/schema";

let { data, status }: { data: Contact[]; error: any; status: any } =
  await useAsyncData<Contact[]>(() => $fetch("/api/contacts"));

let totalContacts: { data: number; error: any; status: any } =
  await useAsyncData<number>(() => $fetch("/api/contacts/total"));

const contacts = ref(data);

const reloadContacts = async (searchParams?: string, pageNumber?: number) => {
  const params = new URLSearchParams();
  if (searchParams) {
    params.append("search", searchParams);
  }
  if (pageNumber && pageNumber > 1) {
    params.append("page", pageNumber.toString());
  }
  const data = await $fetch("/api/contacts" + "?" + params.toString());
  contacts.value = data;
};
</script>

<template>
  <div class="bg-gray-900 p-4">
    <ContactsListSearch
      :reloadSearch="reloadContacts"
      :totalContacts="totalContacts.data"
      :limit="10"
    />
  </div>
  <div v-if="status === 'pending'">Loading....</div>
  <div v-else>
    <table class="table-auto w-full">
      <thead>
        <tr>
          <th class="px-4 py-2"></th>
          <th class="px-4 py-2 text-left">First Name</th>
          <th class="px-4 py-2 text-left">Last Name</th>
          <th class="px-4 py-2 text-left">Email</th>
          <th class="px-4 py-2 text-left">Phone</th>
          <th class="px-4 py-2 text-left">Address</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in contacts" :key="item.id">
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
