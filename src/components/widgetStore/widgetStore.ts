import Vue from 'vue'
import Component from "vue-class-component";
import WidgetComponent from "@/components/widget/WidgetComponent.vue";
import {Widget} from "@/store/model";
import {Inject} from "vue-property-decorator";
import axios from "axios";
import WorkPlace from "@/components/workPlace/workPlace";

@Component({
    components: {
        WidgetComponent
    }
})
export default class WidgetStore extends Vue {

    @Inject("widgetStore")
    private widgetStore : Array<Widget> | undefined;
    @Inject("widgetUser")
    private widgetUser : Array<Widget> | undefined;

    created(){
    }

    mounted(){
    }

    public onDrop(event : DragEvent, item : Widget){
        const isStr = event.dataTransfer?.getData('itemID')
        if(isStr){
            const id = Number.parseInt(isStr)
            const find : Widget | undefined = this.widgetUser?.find((item =>{
                if(item.id == id){
                    return item
                }
            }));
            if(find){
                const index = this.widgetUser?.indexOf(find);
                if (index != undefined && index > -1) {
                    axios.delete(process.env.VUE_APP_MAIN_WIDGET_URL+'/api/user_widgets/'+find.id)
                        .then((response: any) => {
                                //this.loadMask(false);
                                this.widgetStore?.push(find.widget)
                                this.widgetUser?.splice(index, 1);
                                let skip = false
                                this.widgetUser?.forEach((item,index) => {
                                    if(item.type.name == find.type.name){
                                        if(!skip) {
                                            item.show = true
                                            this.sendShow(item,true)
                                            skip = true
                                        }
                                    }
                                })
                            }
                        )
                        .catch((error) => {
                            //this.loadMask(false);
                            console.log('Ошибка! Не могу связаться с API. ' + error);
                        }).then((data)=>{
                    })
                }
            }
        }
    }

    private sendShow(widget : Widget, show : boolean){
        axios.patch(process.env.VUE_APP_MAIN_WIDGET_URL+'/api/user_widgets/'+widget.id,widget)
            .then((response: any) => {
                    //this.loadMask(false);
                    return response.data;
                }
            )
            .catch((error) => {
                //this.loadMask(false);
                console.log('Ошибка! Не могу связаться с API. ' + error);
            }).then((data)=>{
        })
    }

}