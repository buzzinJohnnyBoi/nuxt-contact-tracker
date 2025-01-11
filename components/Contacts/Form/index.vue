<script setup lang="ts">
import type { Contact } from "~/server/db/schema";

const props = defineProps<{
  contact?: Contact | null;
}>();

const existingContact = props.contact;

const newContact = reactive({
  firstName: existingContact?.firstName || "",
  lastName: existingContact?.lastName || "",
  birthDate: existingContact?.birthDate || null,
  email: existingContact?.email || "",
  phone: existingContact?.phone || "",
  address: existingContact?.address || "",
});

const message = ref<string | null>(null);
const error = ref<string | null>(null);

async function saveContact() {
  if (existingContact) {
    var response = await $fetch(`/api/contacts/${existingContact.id}`, {
      method: "PUT",
      body: newContact,
    });
  } else {
    var response = await $fetch("/api/contacts/create", {
      method: "POST",
      body: newContact,
    });
  }

  if (response.success) {
    message.value = response.message;
    error.value = null;
  } else {
    error.value = response.message;
    message.value = null;
  }
}
</script>

<template>
  <div>
    <form @submit.prevent="saveContact">
      <div>
        <div class="border-b border-gray-900/10 pb-12 w-10/12 md:w-1/2 m-auto">
          <h2
            class="text-base/7 font-semibold text-gray-900 dark:text-gray-100"
          >
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
      <div>
        <div v-if="message" class="text-green-500">{{ message }}</div>
        <div v-if="error" class="text-red-500">{{ error }}</div>
      </div>
      <div class="mt-4 flex justify-center items-end">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white p-3 rounded"
        >
          Save Contact
        </button>
      </div>
    </form>
  </div>
</template>
