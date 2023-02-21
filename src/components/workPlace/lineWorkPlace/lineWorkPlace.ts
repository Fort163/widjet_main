import Component from "vue-class-component";
import Vue from "vue";
import WidgetNew from "@/components/widgetNew/WidgetNew.vue";
import resize from "vue-resize-directive";
import WorkPlace from "@/components/workPlace/WorkPlace.vue";

@Component({
    components: {
        WidgetNew
    },
    directives: {
        resize
    }
})
export default class LineWorkPlace extends Vue {

    private height : number = 1

    public setHeight(height : number){
        this.height = height;
        (<WorkPlace>this.$parent).updateHeight()
    }

    public getHeight() : number{
        return this.height
    }

}