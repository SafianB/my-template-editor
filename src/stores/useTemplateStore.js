// src/stores/useTemplateStore.js
import { defineStore } from 'pinia';

export const useTemplateStore = defineStore('template', {
  state: () => ({
    currentTemplate: null,
    templates: [
      {
        id: 'birthday',
        title: 'Birthday Card',
        elements: [
          { id: 1, type: 'text', content: 'Happy Birthday!' }
        ]
      }
    ]
  }),
  actions: {
    updateTemplate(payload) {
      this.currentTemplate = { ...this.currentTemplate, ...payload };
    }
  }
});