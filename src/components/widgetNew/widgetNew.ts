import Component from "vue-class-component";
import Vue from "vue";
// @ts-ignore
import resize from "vue-resize-directive";
import {Inject, Prop} from "vue-property-decorator";
import LineWorkPlace from "@/components/workPlace/lineWorkPlace/lineWorkPlace";
import {DropModel, WidgetUser} from "@/store/model";

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

    private widthPercent : number | undefined;
    private heightPercent : number | undefined;
    private vertical : boolean = false;
    private horizontal : boolean = false;
    private draggable : boolean = true;
    private down : boolean = false;

    created(){
    }

    mounted(){
        (<LineWorkPlace>this.$parent).setHeight(this.item.lineHeight);
        console.log( (<LineWorkPlace>this.$parent).getHeight())
        if(!this.$store.getters.drag) {
            console.log( (<LineWorkPlace>this.$parent).getHeight())
            this.$el.parentElement?.setAttribute("style", this.heightParent())
        }
        else {
            console.log( (<LineWorkPlace>this.$parent).getHeight())
            this.item.lineHeight = (<LineWorkPlace>this.$parent).getHeight()
        }
    }

    public onResize(element : Element){
        console.error('onResize')
        this.updatePercent(element)
        const currentRect : DOMRect = element.getBoundingClientRect();
        if(this.widthPercent && this.heightPercent){
            this.item.width = Math.round(currentRect.width/this.widthPercent)
            if(this.item.height > Math.round(currentRect.height/this.heightPercent)){
                this.item.lineHeight -=1;
                (<LineWorkPlace>this.$parent).setHeight(this.item.lineHeight);
                (<Array<WidgetNew>>this.$parent.$children).forEach(item => {
                    item.item.lineHeight = this.item.lineHeight
                })
                element.parentElement?.setAttribute("style",this.heightParent())
            }
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
            element.setAttribute("style",this.createStyle())
            if(!this.$store.getters.drag) {
                element.parentElement?.setAttribute("style", this.heightParent())
            }
        }
    }

    public createStyle() : string{
        return "width : "+(this.item.width*10)+"%"
            +"; height : "+(this.item.height*10)+"%;"
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

    //TODO если нужно сделать пляску элементов
    public enterDrag(event : DragEvent){
        /*this.item.position += 1
        if (this.item.margin) {
            this.item.margin += 1
        }
        this.$el.setAttribute("style", this.createStyle())*/
    }

    public setShowButton(value : boolean){
        this.down = value
    }

    public mouseMove(event : MouseEvent,type :string){
        this.draggable = false
        if(this.down){
            console.log(event)
        }

    }

    public mouseOut(event : MouseEvent){
        this.draggable = true
    }

    public mouseUp(event : MouseEvent){
        this.down = false
    }

    public mouseDown(event : MouseEvent,type :string){
        this.down = true
    }

    public resize(type : string){
        switch (type) {
            case 'left' : {
                if(this.item.position > 1){
                    this.item.position -= 1
                    this.item.width += 1
                }
                break;
            }
            case 'right' : {
                this.item.width += 1
                break;
            }
            case 'top' : {
                this.item.height -= 1;
                if(this.item.height < 8){
                    let flag = false;
                    (<Array<WidgetNew>>this.$parent.$children).forEach(item => {
                        if(this.item.height > 8){
                            flag = true
                        }
                    })
                    if(!flag){
                        console.error(flag);
                        (<Array<WidgetNew>>this.$parent.$children).forEach(item => {
                            item.item.lineHeight = this.item.lineHeight-1
                        });
                        (<LineWorkPlace>this.$parent).setHeight(this.item.lineHeight);
                    }
                }
                break;
            }
            case 'bottom' : {
                this.item.height+=1
                if(this.item.height > 10){
                    this.item.height = this.item.height - 1
                    this.item.lineHeight +=1;
                    (<LineWorkPlace>this.$parent).setHeight(this.item.lineHeight);
                    (<Array<WidgetNew>>this.$parent.$children).forEach(item => {
                        item.item.lineHeight = this.item.lineHeight
                    })
                    this.$el.parentElement?.setAttribute("style",this.heightParent())
                }
                break;
            }
        }
    }

}