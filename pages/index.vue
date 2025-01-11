<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const param = route.query.param;
</script>

<template>
  <div>
    <ContactsList />
  </div>
</template>
