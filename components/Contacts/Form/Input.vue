<template>
  <div>
    <label
      :for="name"
      class="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
      >{{ label }}</label
    >
    <div class="mt-2">
      <input
        :type="type"
        :name="name"
        :id="name"
        :autocomplete="autocomplete"
        :value="modelValue"
        @input="$emit('update:modelValue', $event?.target?.value)"
        class="block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 text-base text-gray-900 dark:text-gray-100 outline outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "TextInput",
  props: {
    label: String,
    name: String,
    type: String,
    autocomplete: String,
    modelValue: String,
  },
  emits: ["update:modelValue"],
};
</script>
