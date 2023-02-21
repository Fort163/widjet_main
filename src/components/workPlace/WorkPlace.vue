<template>
  <div class="work-place-widget-main"
       @drop="onDrop($event,'top-left')"
       @dragover.prevent
       @dragenter.prevent>
      <LineWorkPlace/>
      <LineWorkPlace/>
      <LineWorkPlace/>
<!--   <div :class="[this.$store.getters.settings ? this.$store.getters.drag ? 'top-left-setting background-style' : 'top-left-setting':'top-left']"
         @drop="onDrop($event,'top-left')"
         @dragover.prevent
         @dragenter.prevent>
      <template v-for="(item) in this.widgetUser">
        <template v-if="item.type.name == 'top-left'">
          <template v-if="item.show">
            <WidgetComponent :info="item" :isWork="true" :key="item.id"/>
            <template v-if="checkCount('top-left') > 1">
              <button class="button-next" @click="setShow(item)" :key="item.name"/>
            </template>
          </template>
        </template>
      </template>
    </div>
    <div :class="[this.$store.getters.drag ? 'top-center background-style' : 'top-center']"
         @drop="onDrop($event,'top-center')"
         @dragover.prevent
         @dragenter.prevent>
      <template v-for="(item) in this.widgetUser">
        <template v-if="item.type.name == 'top-center'">
          <template v-if="item.show">
            <WidgetComponent :info="item" :isWork="true" :key="item.id"/>
            <template v-if="checkCount('top-center') > 1">
              <button class="button-next" @click="setShow(item)" :key="item.name"/>
            </template>
          </template>
        </template>
      </template>
    </div>
    <div :class="[this.$store.getters.drag ? 'top-right background-style' : 'top-right']"
         @drop="onDrop($event,'top-right')"
         @dragover.prevent
         @dragenter.prevent>
      <template v-for="(item) in this.widgetUser">
        <template v-if="item.type.name == 'top-right'">
          <template v-if="item.show">
            <WidgetComponent :info="item" :isWork="true" :key="item.id"/>
            <template v-if="checkCount('top-right') > 1">
              <button class="button-next" @click="setShow(item)" :key="item.name"/>
            </template>
          </template>
        </template>
      </template>
    </div>
    <div :class="[this.$store.getters.settings ? this.$store.getters.drag ? 'center-left-setting background-style' : 'center-left-setting':'center-left']"
         @drop="onDrop($event,'center-left')"
         @dragover.prevent
         @dragenter.prevent>
      <template v-for="(item) in this.widgetUser">
        <template v-if="item.type.name == 'center-left'">
          <template v-if="item.show">
            <WidgetComponent :info="item" :isWork="true" :key="item.id"/>
            <template v-if="checkCount('center-left') > 1">
              <button class="button-next" @click="setShow(item)" :key="item.name"/>
            </template>
          </template>
        </template>
      </template>
    </div>
    <div :class="[this.$store.getters.drag ? 'center-right background-style' : 'center-right']"
         @drop="onDrop($event,'center-right')"
         @dragover.prevent
         @dragenter.prevent>
      <template v-for="(item) in this.widgetUser">
        <template v-if="item.type.name == 'center-right'">
          <template v-if="item.show">
            <WidgetComponent :info="item" :isWork="true" :key="item.id"/>
            <template v-if="checkCount('center-right') > 1">
              <button class="button-next" @click="setShow(item)" :key="item.name"/>
            </template>
          </template>
        </template>
      </template>
    </div>
    <div :class="[this.$store.getters.settings ? this.$store.getters.drag ? 'bottom-left-setting background-style' : 'bottom-left-setting':'bottom-left']"
         @drop="onDrop($event,'bottom-left')"
         @dragover.prevent
         @dragenter.prevent>
      <template v-for="(item) in this.widgetUser">
        <template v-if="item.type.name == 'bottom-left'">
          <template v-if="item.show">
            <WidgetComponent :info="item" :isWork="true" :key="item.id"/>
            <template v-if="checkCount('bottom-left') > 1">
              <button class="button-next" @click="setShow(item)" :key="item.name"/>
            </template>
          </template>
        </template>
      </template>
    </div>
    <div :class="[this.$store.getters.drag ? 'bottom-center background-style' : 'bottom-center']"
         @drop="onDrop($event,'bottom-center')"
         @dragover.prevent
         @dragenter.prevent>
      <template v-for="(item) in this.widgetUser">
        <template v-if="item.type.name == 'bottom-center'">
          <template v-if="item.show">
            <WidgetComponent :info="item" :isWork="true" :key="item.id"/>
            <template v-if="checkCount('bottom-center') > 1">
              <button class="button-next" @click="setShow(item)" :key="item.name"/>
            </template>
          </template>
        </template>
      </template>
    </div>
    <div :class="[this.$store.getters.drag ? 'bottom-right background-style' : 'bottom-right']"
         @drop="onDrop($event,'bottom-right')"
         @dragover.prevent
         @dragenter.prevent>
      <template v-for="(item) in this.widgetUser">
        <template v-if="item.type.name == 'bottom-right'">
          <template v-if="item.show">
            <WidgetComponent :info="item" :isWork="true" :key="item.id"/>
            <template v-if="checkCount('bottom-right') > 1">
              <button class="button-next" @click="setShow(item)" :key="item.name"/>
            </template>
          </template>
        </template>
      </template>
    </div>-->
  </div>
</template>

<script src="./workPlace.ts"></script>
<style src="./workPlace.css"></style>
