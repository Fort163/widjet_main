<template>
  <div :class="'line-main'">
    <template v-for="item in this.$store.getters.widgetByLine(this.line)">
      <WidgetNew :item=item :key="item.id"/>
    </template>

    <template v-if="this.$store.getters.drag">
      <div :class="'drop-conteiner'" >
        <template v-for="position in this.positions">
          <div :class="['drop','background-style']" :style="{height: heightStile}" :key="position"
               @drop="onDrop($event,position)"
               @dragover.prevent
               @dragenter.prevent>
          </div>
        </template>
      </div>
    </template>

  </div>
</template>


<script src="./lineWorkPlace.ts"></script>
<style src="./lineWorkPlace.css"></style>