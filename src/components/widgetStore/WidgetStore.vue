<template>
  <div :class="[this.$store.getters.drag ? 'store background-style' : 'store']"
      @drop="onDrop($event)"
       @dragover.prevent
       @dragenter.prevent>
    <h2>Доступные виджеты</h2>
    <WidgetComponent v-for="(item) in this.widgetStore" :info="item" :isWork="false" :key="item.id" />
  </div>
</template>

<script src="./widgetStore.ts"></script>
<style src="./widgetStore.css"></style>
