<script setup lang="ts">
useHead({
  title: "Create Contact",
});
</script>

<template>
  <div>
    <div class="mx-auto">
      <ContactsForm :contact="null" />
    </div>
  </div>
</template>
