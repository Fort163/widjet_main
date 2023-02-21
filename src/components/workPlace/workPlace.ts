import Vue from 'vue'
import Component from "vue-class-component";
import WidgetComponent from "@/components/widget/WidgetComponent.vue";
import {TypeWidget, Widget, WidgetUser} from "@/store/model";
import {Inject} from "vue-property-decorator";
import axios, {AxiosResponse} from "axios";
import WidgetNew from "@/components/widgetNew/WidgetNew.vue";
import resize from "vue-resize-directive";
import LineWorkPlace from "@/components/workPlace/lineWorkPlace/LineWorkPlace.vue";

@Component({
    components: {
        WidgetComponent,
        LineWorkPlace
    },
    directives: {
        resize
    }
})
export default class WorkPlace extends Vue {

    @Inject("widgetStore")
    private widgetStore : Array<Widget> | undefined;
    @Inject("widgetUser")
    private widgetUser : Array<Widget> | undefined;
    @Inject("typeWidget")
    private typeWidget : Array<TypeWidget> | undefined;


    created(){

    }

    mounted(){
        const v1 : WidgetNew = new WidgetNew()
        console.log(this.$children.length)
        this.$children.push(v1)
        console.log(this.$children.length)
    }

    public onDrop(event : DragEvent, typeStr : String){
        const isStr = event.dataTransfer?.getData('itemID')
        const typeFilter = this.typeWidget?.filter((item) => {
            if(item.name == typeStr){
                return item;
            }
        });
        let type : TypeWidget = <TypeWidget>new Object();
        if(typeFilter && typeFilter.length > 0){
            type = typeFilter[0]
        }
        if(isStr){
            const id = Number.parseInt(isStr)
            console.log(id)
            const find : Widget | undefined = this.widgetStore?.find((item =>{
                if(item.id == id){
                    return item
                }
            }));
            if(find){
                if(typeFilter && typeFilter.length > 0){
                    find.type = typeFilter[0]
                }
                const index = this.widgetStore?.indexOf(find);
                if (index != undefined && index > -1) {
                    const widgetUser : WidgetUser = new class implements WidgetUser {

                        height: string | undefined
                        id: number = -1
                        positionX: string | undefined
                        positionY: string | undefined
                        show: boolean = true
                        type: TypeWidget | undefined = find?.type
                        userID: string | undefined
                        widget: Widget = <Widget>find
                        width: string | undefined
                    }
                    axios.post<Widget>(process.env.VUE_APP_MAIN_WIDGET_URL+'/api/user_widgets',widgetUser)
                        .then((response: AxiosResponse<Widget>) => {
                                const filter = this.widgetUser?.filter((item, index) => {
                                    if(item.type.name == response.data.type.name && item.show){
                                        return item;
                                    }
                                });
                                if(filter && filter.length > 0) {
                                    this.widgetUser?.forEach((item, index) => {
                                        if (item.type.name == response.data.type.name) {
                                            item.show = false
                                            this.sendShow(item,false);
                                        }
                                    })
                                }
                                this.widgetUser?.push(response.data)
                                this.widgetStore?.splice(index, 1);
                            }
                        )
                        .catch((error) => {
                            //this.loadMask(false);
                            console.log('Ошибка! Не могу связаться с API. ' + error);
                        }).then((data)=>{
                    })
                }
            }
            else {
                const findUser : Widget | undefined = this.widgetUser?.find((item =>{
                    if(item.id == id){
                        return item
                    }
                }));
                if(findUser){
                    const oldType : TypeWidget = findUser.type
                    findUser.type = type
                    axios.post<Widget>(process.env.VUE_APP_MAIN_WIDGET_URL+'/api/user_widgets',findUser)
                        .then((response: AxiosResponse<Widget>) => {
                                const filterOldType = this.widgetUser?.filter((item, index) => {
                                    if(item.type.name == oldType.name && item.show){
                                        return item;
                                    }
                                });
                                if(filterOldType && filterOldType.length == 0){
                                    const skip = false;
                                    this.widgetUser?.forEach((item, index) => {
                                        if(!skip) {
                                            if (item.type.name == oldType.name) {
                                                item.show = true
                                                this.sendShow(item, false);
                                            }
                                        }
                                    })
                                }
                                const filterNewType = this.widgetUser?.filter((item, index) => {
                                    if(item.type.name == type.name && item.show){
                                        return item;
                                    }
                                });
                                if(filterNewType && filterNewType.length > 0) {
                                    this.widgetUser?.forEach((item, index) => {
                                        if(findUser.id == item.id){
                                            item.show = true
                                            this.sendShow(item,true);
                                        }
                                        else {
                                            if(item.type.name == type.name) {
                                                item.show = false
                                                this.sendShow(item,false);
                                            }
                                        }
                                    })
                                }
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

    public checkCount(container : string) : number {
        if(this.widgetUser) {
            return this.widgetUser.filter((item, index) => {
                if (item.type.name == container) {
                    return item;
                }
            }).length
        }
        else {
            return -1;
        }
    }

    public setShow(widget : Widget){
        let skip = false
        const indexOf = this.widgetUser?.indexOf(widget);
        this.widgetUser?.forEach((item,index) => {
            if(item.type.name == widget.type.name){
                if(item.id == widget.id) {
                    item.show = false
                    this.sendShow(item,false);
                }
                else {
                    if(!skip) {
                        if(indexOf != undefined && index > indexOf) {
                            item.show = true
                            this.sendShow(item,true);
                            skip = true
                        }
                    }
                }
            }
        })
        if(!skip){
            this.widgetUser?.forEach((item,index) => {
                if(item.type.name == widget.type.name){
                    if(item.id == widget.id) {
                        item.show = false
                        this.sendShow(item,false);
                    }
                    else {
                        if(!skip) {
                            if(indexOf != undefined && index != indexOf) {
                                item.show = true
                                this.sendShow(item,true);
                                skip = true
                            }
                        }
                    }
                }
            })
        }
        const widgetUser = this.widgetUser
        this.widgetUser = new Array<Widget>()
        this.widgetUser = widgetUser
        //Нужно поправить чтоб не дергать каждый раз ссылку
        /*const index = this.widgetStore?.indexOf(widget);
        if (index != undefined && index > -1) {
            this.widgetUser?.splice(index, 1);
            this.widgetUser?.push(widget)
        }*/
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