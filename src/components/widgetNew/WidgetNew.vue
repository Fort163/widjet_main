<template>
  <div class="resizable-content"
       v-bind:style="this.style"
       v-resize:throttle="onResize"
       draggable="true"
       @dragstart="startDrag($event)"
       @dragend="endDrag($event)">
  H1 {{this.getHeight}} {{getWidth}}</div>
</template>
<!--       v-resize:debounce.50="onResize"-->
<script src="./widgetNew.ts"></script>
<style src="./widgetNew.css"></style>