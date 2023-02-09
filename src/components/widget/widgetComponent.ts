import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {TypeWidget, Widget} from "@/store/model";

@Component({
    components: {
    }
})
export default class WidgetComponent extends Vue implements Widget{

    @Prop({required: true})
    // @ts-ignore
    private info: Widget;

    @Prop({required: true})
    // @ts-ignore
    private isWork: boolean | undefined;

    private settings : boolean = true

    // @ts-ignore
    actionUrl = this.info.widget ? this.info.widget.actionUrl : this.info.actionUrl
    // @ts-ignore
    defaultHeight = this.info.widget ? this.info.widget.defaultHeight : this.info.defaultHeight;
    // @ts-ignore
    defaultWidth = this.info.widget ? this.info.widget.defaultWidth : this.info.defaultWidth;
    // @ts-ignore
    description = this.info.widget ? this.info.widget.description : this.info.description;
    // @ts-ignore
    id = this.info.id;
    // @ts-ignore
    name = this.info.widget ? this.info.widget.name : this.info.name;
    // @ts-ignore
    type = this.info.type;
    // @ts-ignore
    url = this.info.widget ? this.info.widget.url : this.info.url;
    // @ts-ignore
    show = this.info.widget ? this.info.widget.show : this.info.show
    // @ts-ignore
    widget = this.info.widget

    created(){
    }

    mounted(){

    }

    public redirect(){
        window.location.href = this.actionUrl+"?redirect_back="+window.location.href
    }

    public startDrag(event : DragEvent){
        if(event.dataTransfer != null) {
            event.dataTransfer.dropEffect = "move"
            event.dataTransfer.effectAllowed = "move"
            event.dataTransfer.setData('itemID', this.id+'')
        }
        this.$store.commit('setDrag',true);
    }

    public endDrag(event : DragEvent){
        this.$store.commit('setDrag',false);
    }



}