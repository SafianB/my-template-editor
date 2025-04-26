<template>
    <div v-if="store.currentTemplate">
      <input 
        v-model="store.currentTemplate.title" 
        @input="store.updateTemplate"
      >
    </div>
  </template>
  
  <script setup>
  import { useTemplateStore } from '../stores/useTemplateStore';
  const store = useTemplateStore();
  </script>