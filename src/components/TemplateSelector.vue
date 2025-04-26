<template>
    <div class="template-selector">
      <!-- Search Bar -->
      <input 
        v-model="searchQuery" 
        placeholder="Search templates..."
        class="search-bar"
      >
  
      <!-- Template Gallery -->
      <div class="template-gallery">
        <div
          v-for="template in filteredTemplates"
          :key="template.id"
          class="template-card"
          :class="{ 'active': template.id === activeTemplate?.id }"
          @click="selectTemplate(template)"
        >
          <img 
            :src="template.thumbnail || '/default-thumbnail.jpg'" 
            :alt="template.name"
            class="template-thumbnail"
          >
          <div class="template-info">
            <h3>{{ template.name }}</h3>
            <p>{{ template.description }}</p>
            <div class="template-tags">
              <span v-for="tag in template.tags" :key="tag" class="tag">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Category Filters -->
      <div class="category-filters">
        <button
          v-for="category in categories"
          :key="category"
          @click="setCategoryFilter(category)"
          :class="{ 'active': activeCategory === category }"
        >
          {{ category }}
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useTemplateStore } from '@/stores/useTemplateStore';
  
  const store = useTemplateStore();
  const searchQuery = ref('');
  const activeCategory = ref('all');
  
  // Sample template data (replace with your actual data)
  const defaultTemplates = [
    {
      id: 'birthday',
      name: 'Birthday Card',
      description: 'Colorful birthday celebration template',
      tags: ['celebration', 'party'],
      category: 'cards',
      thumbnail: '/templates/birthday-thumb.jpg',
      elements: [
        { id: 'title', type: 'text', content: 'Happy Birthday!' }
      ]
    },
    {
      id: 'wedding',
      name: 'Wedding Invitation',
      description: 'Elegant wedding template',
      tags: ['formal', 'wedding'],
      category: 'invitations',
      thumbnail: '/templates/wedding-thumb.jpg',
      elements: [
        { id: 'title', type: 'text', content: 'Join Our Celebration' }
      ]
    }
  ];
  
  // Computed properties
  const categories = computed(() => {
    return ['all', ...new Set(defaultTemplates.map(t => t.category))];
  });
  
  const filteredTemplates = computed(() => {
    return defaultTemplates.filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                           template.description.toLowerCase().includes(searchQuery.value.toLowerCase());
      const matchesCategory = activeCategory.value === 'all' || 
                            template.category === activeCategory.value;
      return matchesSearch && matchesCategory;
    });
  });
  
  const activeTemplate = computed(() => store.currentTemplate);
  
  // Methods
  const selectTemplate = (template) => {
    store.currentTemplate = JSON.parse(JSON.stringify(template));
  };
  
  const setCategoryFilter = (category) => {
    activeCategory.value = category;
  };
  </script>
  
  <style scoped>
  .template-selector {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .search-bar {
    width: 100%;
    padding: 12px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .template-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }
  
  .template-card {
    border: 1px solid #eee;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .template-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
  
  .template-card.active {
    border: 2px solid #4CAF50;
  }
  
  .template-thumbnail {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }
  
  .template-info {
    padding: 15px;
  }
  
  .template-info h3 {
    margin: 0 0 8px 0;
    font-size: 1.2rem;
  }
  
  .template-info p {
    color: #666;
    margin: 0 0 12px 0;
  }
  
  .template-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  
  .tag {
    background: #f0f0f0;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
  }
  
  .category-filters {
    display: flex;
    gap: 10px;
    margin-top: 20px;
    flex-wrap: wrap;
  }
  
  .category-filters button {
    padding: 8px 16px;
    background: #f0f0f0;
    border: none;
    border-radius: 20px;
    cursor: pointer;
  }
  
  .category-filters button.active {
    background: #4CAF50;
    color: white;
  }
  </style>
