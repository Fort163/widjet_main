import Component from "vue-class-component";
import Vue from "vue";
import WidgetNew from "@/components/widgetNew/WidgetNew.vue";
import resize from "vue-resize-directive";
import WorkPlace from "@/components/workPlace/WorkPlace.vue";
import {DropModel, LineInfo, Widget} from "@/store/model";
import {Prop} from "vue-property-decorator";

@Component({
    components: {
        WidgetNew
    },
    directives: {
        resize
    }
})
export default class LineWorkPlace extends Vue {

    @Prop({required : true})
    // @ts-ignore
    private line: number;
    private positions : string[] = ['1pos','2pos','3pos','4pos','5pos','6pos','7pos','8pos','9pos','10pos']

    private height : number = 1
    private heightStile = (this.height * 10) + '%';

    mounted(){
    }

    get lineInfo() : LineInfo {
        return this.$store.getters.lineInfo(this.line)
    }

    get emptyPosition() : Array<number>{
        return  this.lineInfo.getEmptyPosition()
    }

    public setHeight(height : number){
        console.log("setHeight !!!!!!")
        this.height = height;
        this.heightStile = (this.height * 10) + '%';
        (<WorkPlace>this.$parent).updateHeight()
    }

    public getHeight() : number{
        return this.height
    }

    public onDrop(event: DragEvent,position : number) {
        const isStr = event.dataTransfer?.getData('itemID')
        if (isStr && this.line) {
            const id = Number.parseInt(isStr)
            this.$store.dispatch("dropWidgetUser", new DropModel(id, this.line, position))
                .then(r => console.log(""))
        }
    }

}