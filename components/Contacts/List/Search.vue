<script setup lang="ts">
import { refDebounced } from "@vueuse/core";
import { ref, watch } from "vue";

const props = defineProps<{
  reloadSearch: (searchParams?: string, page?: number) => void;
  totalContacts: number;
  limit: number;
}>();

const page = ref(1);

const searchValue = ref("");
const debounced = refDebounced(searchValue, 300);

watch(page, (newPage: number) => {
  props.reloadSearch(searchValue.value, newPage);
});

watch(debounced, () => {
  props.reloadSearch(searchValue.value, page.value);
});

const totalContacts = props.totalContacts;
const limit = props.limit;
</script>

<template>
  <div>
    <div>
      <div class="mx-auto w-1/2">
        <input
          type="text"
          name="search"
          :value="searchValue"
          @input="searchValue = $event?.target?.value"
          placeholder="Search"
          class="block w-full rounded-md bg-dark px-3 py-1.5 mb-4 text-base text-white-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
        <UPagination
          v-model="page"
          :page-count="limit"
          :total="totalContacts"
        />
      </div>
    </div>
  </div>
</template>
