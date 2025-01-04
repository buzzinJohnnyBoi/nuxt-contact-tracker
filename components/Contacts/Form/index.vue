<script setup lang="ts">
import type { Contact } from "~/server/db/schema";

const props = defineProps<{
  contact?: Contact | null;
}>();

const existingContact = props.contact;

const newContact = reactive({
  firstName: existingContact?.firstName || "",
  lastName: existingContact?.lastName || "John",
  birthDate: existingContact?.birthDate || null,
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
  <div class="w-1/2 mx-auto">
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
              <ContactsFormInput
                type="text"
                v-model="newContact.firstName"
                label="First Name"
                name="first_name"
                autocomplete="given-name"
              />
            </div>

            <div class="sm:col-span-3">
              <ContactsFormInput
                type="text"
                v-model="newContact.lastName"
                label="Last Name"
                name="last_name"
                autocomplete="family-name"
              />
            </div>
          </div>

          <div class="mt-10">
            <div>
              <ContactsFormInput
                type="text"
                v-model="newContact.email"
                label="Email"
                name="email"
                autocomplete="email"
              />
            </div>
          </div>

          <div class="mt-10">
            <div>
              <ContactsFormInput
                type="date"
                v-model="newContact.birthDate"
                label="Birth Date"
                name="date"
                autocomplete="date"
              />
            </div>
          </div>

          <div class="mt-10">
            <div>
              <ContactsFormInput
                type="text"
                v-model="newContact.phone"
                label="Phone"
                name="phone"
                autocomplete="phone"
              />
            </div>
          </div>

          <div class="mt-10">
            <div>
              <ContactsFormInput
                type="text"
                v-model="newContact.address"
                label="Address"
                name="address"
                autocomplete="address"
              />
            </div>
          </div>
        </div>
      </div>
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white p-3 rounded"
      >
        Create New Contact
      </button>
    </form>
  </div>
</template>
