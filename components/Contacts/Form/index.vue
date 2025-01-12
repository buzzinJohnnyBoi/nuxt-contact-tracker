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
  note: existingContact?.note || "",
});

const message = ref<string | null>(null);
const error = ref<string | null>(null);

const router = useRouter();

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
    router.push("/");
  } else {
    error.value = response.message;
    message.value = null;
  }
}

async function deleteContact() {
  if (existingContact) {
    const response = await $fetch(`/api/contacts/${existingContact.id}`, {
      method: "DELETE",
      body: newContact,
    });
    if (response.success) {
      message.value = response.message;
      error.value = null;
      router.push("/");
    } else {
      error.value = response.message;
      message.value = null;
    }
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

          <div class="mt-10">
            <div>
              <textarea
                v-model="newContact.note"
                id="note"
                name="note"
                rows="3"
                class="block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 text-base text-gray-900 dark:text-gray-100 outline outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                placeholder="Add a note"
              ></textarea>
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
          class="bg-blue-500 hover:bg-blue-700 text-white p-3 rounded mr-4"
        >
          Save Contact
        </button>
        <button
          v-if="existingContact"
          :onclick="deleteContact"
          class="bg-red-500 hover:bg-red-700 text-white p-3 rounded"
        >
          Delete Contact
        </button>
      </div>
    </form>
  </div>
</template>
