<template>
  <div class="resizable-content"
       v-bind:style="this.style"
       v-resize:throttle="onResize"
       draggable="true"
       @dragstart="startDrag($event)"
       @dragend="endDrag($event)">
    Id : {{this.item.id}} <br> {{this.getHeight}} {{this.getWidth}}
    <br> position : {{this.item.position}}
  </div>
</template>
<!--       v-resize:debounce.50="onResize"-->
<script src="./widgetNew.ts"></script>
<style src="./widgetNew.css"></style>