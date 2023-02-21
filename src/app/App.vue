<template>
  <div :class="'main'">
    <template v-if="this.$store.getters.settings">
      <div :class="'store-conteiner'">
        <template v-if="widgetStoreDownload">
          <WidgetStore/>
        </template>
      </div>
    </template>
    <div :class="[this.$store.getters.settings ? 'work-conteiner':'work-conteiner-big']">
      <template>
        <h4>{{ this.name }}</h4>
        <button @click="onOffSettings()">настроить</button>
      </template>
      <template v-if="widgetUserDownload">
        <div class="work-place">
          <WorkPlace/>
        </div>
      </template>
    </div>
  </div>
</template>

<script src="./app.ts"></script>
<style src="./app.css"></style>
