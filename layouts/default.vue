<script setup lang="ts">
import { useEventListener, refDebounced } from "@vueuse/core";
const router = useRouter();

onMounted(() => {
  useEventListener(window, "keydown", (event) => {
    if (event.ctrlKey && event.key === "q") {
      router.push("/contacts/create");
    } else if (event.ctrlKey && event.key === "i") {
      router.push("/");
    }
  });
});
</script>

<template>
  <div>
    <nav class="bg-gray-800 p-4">
      <div class="flex space-x-12 items-center">
        <div>
          <NuxtLink to="/" class="text-white">Home</NuxtLink>
        </div>
        <div>
          <NuxtLink to="/contacts/create" class="text-white"
            >New Contact</NuxtLink
          >
        </div>
      </div>
    </nav>
    <div class="container mx-auto">
      <slot />
    </div>
  </div>
</template>
