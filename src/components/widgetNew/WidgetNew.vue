<template>
  <div :class="[this.vertical ? 'vertical' : '', this.horizontal ? 'horizontal' : '', 'resizable-content']"
       v-bind:style="{width : (item.width * 10)+'%', height : (item.height * 10)+'%'}"

       :draggable="this.draggable"
       @dragstart="startDrag($event)"
       @dragend="endDrag($event)"
       @dragenter="enterDrag($event)"
  >
    <!--       v-resize:throttle="onResize"-->
<!--    this.$store.getters.settings-->
    <template v-if="this.$store.getters.settings">
      <div class="resize-button resize-left"
           @click="resize('left')"
           @mousemove="mouseMove($event)"
           @mouseout="mouseOut($event)"
      />
      <div class="resize-button resize-right"
           @click="resize('right')"
           @mousemove="mouseMove($event)"
           @mouseout="mouseOut($event)"
      />
      <div class="resize-button resize-top"
           @click="resize('top')"
           @mousemove="mouseMove($event)"
           @mouseout="mouseOut($event)"
      />
      <div class="resize-button resize-bottom"
           @click="resize('bottom')"
           @mousemove="mouseMove($event)"
           @mouseout="mouseOut($event)"
      />
    </template>
    Id : {{this.item.id}} <br> {{this.getHeight}} {{this.getWidth}}
    <br> position : {{this.item.position}}
  </div>
</template>
<!--       v-resize:debounce.50="onResize"-->
<script src="./widgetNew.ts"></script>
<style src="./widgetNew.css"></style>