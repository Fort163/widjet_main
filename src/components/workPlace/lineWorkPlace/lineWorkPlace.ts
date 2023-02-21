import Component from "vue-class-component";
import Vue from "vue";
import WidgetNew from "@/components/widgetNew/WidgetNew.vue";
import resize from "vue-resize-directive";

@Component({
    components: {
        WidgetNew
    },
    directives: {
        resize
    }
})
export default class LineWorkPlace extends Vue {

}