<script setup lang="ts">
import type { Contact } from "~/server/db/schema";

const props = defineProps<{
  contact?: Contact | null;
}>();

const existingContact = props.contact;

const newContact = reactive({
  first_name: existingContact?.first_name || "",
  last_name: existingContact?.last_name || "",
  // birth_date: existingContact?.birth_date || "",
  email: existingContact?.email || "",
  phone: existingContact?.phone || "",
  address: existingContact?.address || "",
});
async function login() {
  $fetch("/api/contacts/create", {
    method: "POST",
    body: newContact,
  });
}
</script>

<template>
  <form @submit.prevent="login">
    <div class="space-y-12">
      <div class="border-b border-gray-900/10 pb-12 w-1/2">
        <h2 class="text-base/7 font-semibold text-gray-900">
          Contact Information
        </h2>
        <p class="mt-1 text-sm/6 text-gray-600">
          Fill in all or none of the fields below.
        </p>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label
              for="first_name"
              class="block text-sm/6 font-medium text-gray-900"
              >First name</label
            >
            <div class="mt-2">
              <input
                type="text"
                name="first_name"
                autocomplete="given-name"
                v-model="newContact.first_name"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label
              for="last_name"
              class="block text-sm/6 font-medium text-gray-900"
              >Last name</label
            >
            <div class="mt-2">
              <input
                type="text"
                name="last_name"
                autocomplete="family-name"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
        </div>

        <div class="mt-10">
          <div>
            <label for="email" class="block text-sm/6 font-medium text-gray-900"
              >Email</label
            >
            <div>
              <input
                type="text"
                name="email"
                id="email"
                autocomplete="email"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <input v-model="newContact.first_name" placeholder="first name" />
    <input v-model="newContact.last_name" placeholder="last name" />
    <!-- <input v-model="newContact.birth_date" placeholder="birth date" /> -->
    <input v-model="newContact.email" placeholder="email" />
    <input v-model="newContact.phone" placeholder="phone" />
    <input v-model="newContact.address" placeholder="address" />
    <button type="submit">Create New Contact</button>
  </form>
</template>
