import Vuex, {Store} from "vuex";
import {
    DropModel, Position,
    LoadMask, MaskModel,
    ModalWindow, State, Widget, WidgetUser, LineInfo
} from "@/store/model";



class AppState implements State{
    mask : MaskModel;
    settings : boolean;
    drag : boolean;
    widgetUser: Array<WidgetUser>;
    widgetStore: Array<Widget>
    constructor() {
        this.settings = false
        this.drag  = false
        this.widgetUser = new Array<WidgetUser>()
        this.widgetStore = new Array<Widget>()
        this.mask = new class implements MaskModel {
            loadMask: LoadMask | null = null;
            modalWindow: ModalWindow | null = null;
        };
    }
}

export function createStore() : Store<State>{
    const storeApp = new Vuex.Store({
        state: new AppState(),
        actions:{
            dropWidgetUser (context,model : DropModel) {
                context.dispatch("checkPosition",model).then(result => {
                    if(result > -1){
                        const widgets : Array<WidgetUser> = context.getters.widgetUserByLineAndPosition(model.line,result)
                        context.dispatch("shiftWidget",widgets).then(result => {
                            if(result){
                                //Тут рекурсия
                                context.dispatch("dropWidgetUser",model)
                            }
                        })
                    }
                    else {
                        context.commit("dropWidgetUser",model)
                    }
                })
                return true
            },
            checkPosition(context,model : DropModel){
                const lineInfo : LineInfo = context.getters.lineInfo(model.line);
                const widgetUserById : WidgetUser = context.getters.widgetUserById(model.id);
                const emptyPosition = lineInfo.getEmptyPosition();
                let badPosition = -1
                widgetUserById.newPosition(model.position).positionArray.forEach(item => {
                    if( item < 10 && emptyPosition.indexOf(item) == -1 && badPosition == -1){
                        badPosition = item;
                    }
                })
                return badPosition
            },
            shiftWidget(context,widgets : Array<WidgetUser>){
                const widgetsOld = context.getters.widgetUserByLineAndPosition(widgets[0].line,widgets[0].position + 1)
                if(widgetsOld.length > 0) {
                    context.dispatch("shiftWidget", widgetsOld).then(result => {
                        widgets.forEach(item => {
                            item.position += 1;
                        })
                    })
                }
                else {
                    widgets.forEach(item => {
                        item.position += 1;
                    })
                }
                return true
            }
        },
        mutations: {
            setSettings (state : State,value : boolean) {
                state.settings = value;
                console.log("Set settings " + value)
            },
            setDrag (state : State,value : boolean) {
                state.drag = value;
                console.log("Set drag " + value)
            },
            setWidgetUser(state : State,value : Array<WidgetUser>) {
                state.widgetUser = value;
                console.log("Set widgetUser " + value.length)
            },
            setStoreWidget(state : State,value : Array<Widget>) {
                state.widgetStore = value;
                console.log("Set widgetStore " + value.length)
            },
            dropWidgetUser(state : State,model : DropModel) {
               if(state.widgetUser.filter(item => item.id == model.id).length > 0){
                   state.widgetUser.forEach(item =>{
                       if(item.id == model.id){
                           item.line = model.line;
                           item.position = model.position
                       }
                       return item;
                   })
               }else {
                   console.warn("Создать новую запись")
               }
               console.log("dropWidgetUser id : " + model.id + " line : "+model.line + " position : "+model.position)
            }
        },
        getters: {
            widgetUser : state => {
                return state.widgetUser
            },
            settings : state => {
                return state.settings
            },
            drag : state => {
                return state.drag
            },
            widgetByLine : (state) => (line : number) =>{
                const lineArray = state.widgetUser.filter(item => item.line == line).sort((a, b) => {
                    if(a.position > b.position){
                        return 1
                    }
                    if(a.position < b.position){
                        return -1
                    }
                    return 0
                })
                return lineArray
            },
            lineInfo: (state) => (line : number) => {
                const lineInfo : LineInfo = new LineInfo();
                const lineWidget = state.widgetUser.filter(item => item.line == line)
                lineWidget.forEach(item => {
                    if(item.line == line){
                        lineInfo.addFillPosition(item.currentPosition())
                    }
                })
                return lineInfo
            },
            lines : state => {
                const array : number[] = []
                state.widgetUser.forEach(item => {
                    if(array.indexOf(item.line) == -1){
                        array.push(item.line)
                    }
                })
                array.push(Math.max(...array)+1)
                return Math.max(...array);
            },
            widgetUserById : (state) => (id : number) =>{
                const filter = state.widgetUser.filter(item => item.id == id);
                if(filter.length > 0)
                    return filter[0]
                else
                    return null;
            },
            widgetUserByLineAndPosition : (state) => (line : number,position : number) =>{
                const filter = state.widgetUser.filter(item => item.line == line && item.position == position);
                if(filter.length > 0)
                    return filter
                else
                    return [];
            }
        }
    });
    return storeApp;
}