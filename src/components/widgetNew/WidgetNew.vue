<template>
  <div :class="[this.vertical ? 'vertical' : '', this.horizontal ? 'horizontal' : '', 'resizable-content']"
       v-bind:style="{width : (item.width * 10)+'%', height : (item.height * 10)+'%'}"
       v-resize:throttle="onResize"
       :draggable="this.draggable"
       @dragstart="startDrag($event)"
       @dragend="endDrag($event)"
       @dragenter="enterDrag($event)"
  >
    <div class="vertical-button"
         @mouseUp="mouseUp($event)"
         @mousemove="mouseMove($event)"
         @mousedown="mouseDown($event)"
         @mouseout="mouseOut($event)"
    >V</div>
    <div class="horizontal-button"> > </div>
    Id : {{this.item.id}} <br> {{this.getHeight}} {{this.getWidth}}
    <br> position : {{this.item.position}}
  </div>
</template>
<!--       v-resize:debounce.50="onResize"-->
<script src="./widgetNew.ts"></script>
<style src="./widgetNew.css"></style>