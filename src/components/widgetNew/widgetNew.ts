import Component from "vue-class-component";
import Vue from "vue";
// @ts-ignore
import resize from "vue-resize-directive";
import {Inject, Prop} from "vue-property-decorator";

@Component({
    components: {

    },
    directives: {
        resize
    }
})
export default class WidgetNew extends Vue {

    private prevRect : DOMRect | null = null;
    @Prop({required:true})
    private widthPercent : number | undefined;
    @Prop({required:true})
    private heightPercent : number | undefined;
    private width : number = 1
    private height : number = 1
    private style: String = new String();

    created(){

    }

    mounted(){
        this.onResize(this.$el)
        this.style = "width : "+(this.width*10)+"%"+"; height : "+(this.height*10)+"%"+";";
    }

    public onResize(element : Element){
        const currentRect : DOMRect = element.getBoundingClientRect();
        if(this.widthPercent && this.heightPercent){
            this.width = Math.round(currentRect.width/this.widthPercent)
            this.height = Math.round(currentRect.height/this.heightPercent)
        }
        if(this.createStyle()!=element.getAttribute("style")){
            this.prevRect = null;
            element.setAttribute("style",this.createStyle())
        }
    }

    public createStyle() : string{
        return "width : "+(this.width*10)+"%"+"; height : "+(this.height*10)+"%"+";"
    }

    get getWidth() : String{
        return (this.width*10)+"%";
    }

    get getHeight() : String{
        return (this.height*10)+"%";
    }

    public startDrag(event : DragEvent){
        if(event.dataTransfer != null) {
            event.dataTransfer.dropEffect = "move"
            event.dataTransfer.effectAllowed = "move"
            event.dataTransfer.setData('itemID', 'this.id+')
        }
        this.$store.commit('setDrag',true);
    }

    public endDrag(event : DragEvent){
        this.$store.commit('setDrag',false);
    }

}