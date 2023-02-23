import Component from "vue-class-component";
import Vue from "vue";
// @ts-ignore
import resize from "vue-resize-directive";
import {Inject, Prop} from "vue-property-decorator";
import LineWorkPlace from "@/components/workPlace/lineWorkPlace/lineWorkPlace";
import {WidgetUser} from "@/store/model";

@Component({
    components: {

    },
    directives: {
        resize
    }
})
export default class WidgetNew extends Vue {

    @Prop({required: true})
    // @ts-ignore
    private item : WidgetUser

    private prevRect : DOMRect | null = null;
    private widthPercent : number | undefined;
    private heightPercent : number | undefined;
    private style: String = new String();

    created(){
    }

    mounted(){
        (<LineWorkPlace>this.$parent).setHeight(this.item.lineHeight);
        this.style = "width : "+(this.item.width * 10)+"%"+"; height : "+(this.item.height*10)+"%"+";";
    }

    public onResize(element : Element){
        this.updatePercent(element)
        const currentRect : DOMRect = element.getBoundingClientRect();
        if(this.widthPercent && this.heightPercent){
            this.item.width = Math.round(currentRect.width/this.widthPercent)
            this.item.height = Math.round(currentRect.height/this.heightPercent)
            if(this.item.width == 0){
                this.item.width = 1
            }
            if(this.item.height == 0){
                this.item.height = 1
            }
        }
        if(this.item.width + this.item.position > 11){
            this.item.width = 11 - this.item.position
            console.error(this.item.width)
        }
        if(this.item.height > 10){
            this.item.height = Math.floor(this.item.height / 2)
            this.item.lineHeight +=1;
            (<LineWorkPlace>this.$parent).setHeight(this.item.lineHeight);
            (<Array<WidgetNew>>this.$parent.$children).forEach(item => {
                item.item.lineHeight = this.item.lineHeight
            })
            element.parentElement?.setAttribute("style",this.heightParent())
        }
        if(this.createStyle()!=element.getAttribute("style")){
            this.prevRect = null;
            element.setAttribute("style",this.createStyle())
            if(!this.$store.getters.drag) {
                element.parentElement?.setAttribute("style", this.heightParent())
            }
        }
    }

    public createStyle() : string{
        return "width : "+(this.item.width*10)+"%"
            +"; height : "+(this.item.height*10)+"%;"
            +" margin-left: "+(this.item.margin ? this.item.margin < 0 ? 0 : this.item.margin*10 : 0)+"% ;"
    }


    public heightParent() : string{
        return "height : "+this.item.lineHeight*10+"%"+";"
    }

    public updatePercent(element : Element){
        const parentElement = element.parentElement;
        const boundingClientRect = parentElement?.getBoundingClientRect();
        if(boundingClientRect){
            this.widthPercent = boundingClientRect.width/10
            this.heightPercent = boundingClientRect.height/10
        }
    }

    get getWidth() : String{
        return (this.item.width*10)+"%";
    }

    get getHeight() : String{
        return (this.item.height*10)+"%";
    }

    public startDrag(event : DragEvent){
        if(event.dataTransfer != null) {
            event.dataTransfer.dropEffect = "move"
            event.dataTransfer.effectAllowed = "move"
            event.dataTransfer.setData('itemID', this.item.id+'')
        }
        this.$store.commit('setDrag',true);
    }

    public endDrag(event : DragEvent){
        this.$store.commit('setDrag',false);
        this.$el.setAttribute("style",this.createStyle())
    }

}