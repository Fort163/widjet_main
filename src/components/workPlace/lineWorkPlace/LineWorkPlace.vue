<template>
  <div v-if="this.$store.getters.widgetByLine(this.line).length > 0 || this.$store.getters.lines == this.line" :class="'line-main'">

    <template v-for="position in 10">
      <template v-if="$store.getters.widgetUserByLineAndPosition(line,position).length > 0">
        <WidgetNew :item=$store.getters.widgetUserByLineAndPosition(line,position)[0] :key="position"/>
      </template>
      <template v-if="emptyPosition.indexOf(position) > -1">
        <div :class="[$store.getters.drag ? ['drop','background-style'] : 'drop']" :style="{height: '100%'}" :key="position"
             @drop="onDrop($event,position)"
             @dragover.prevent
             @dragenter.prevent>
        </div>
      </template>
    </template>


<!--    <template v-for="item in this.$store.getters.widgetByLine(this.line)">
      <WidgetNew :item=item :key="item.id"/>
    </template>

    <template v-if="this.$store.getters.drag">
      <div :class="'drop-conteiner'" >
        <template v-for="position in this.positions">
          <div :class="['drop','background-style']" :style="{height: (height * 10 - 2) + '%'}" :key="position"
               @drop="onDrop($event,position)"
               @dragover.prevent
               @dragenter.prevent>
          </div>
        </template>
      </div>
    </template>-->

  </div>
</template>


<script src="./lineWorkPlace.ts"></script>
<style src="./lineWorkPlace.css"></style>