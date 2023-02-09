<template>
  <div :class="[this.isWork ? this.$store.getters.settings ? 'widget-work widget-work-settings': 'widget-work' : 'widget-store']"
       draggable="true"
       @dragstart="startDrag($event)"
       @dragend="endDrag($event)">
    <template v-if="!isWork">
      <iframe :src="this.url" :width="'100%'" :height="'100%'" style="pointer-events: none" :frameBorder="0"></iframe>
      <h4>Описание : {{description}}</h4>
    </template>

    <template v-if="isWork">
        <iframe :src="this.url" :width="'100%'" :height="'100%'" :class="[this.$store.getters.drag ? 'off-frame' :'']" :frameBorder="0"></iframe>
        <h6 @click="redirect()">{{id}}</h6>
    </template>
  </div>
</template>


<script src="./widgetComponent.ts"></script>
<style src="./widgetComponent.css"></style>