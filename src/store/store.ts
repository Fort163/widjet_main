import Vuex, {Store} from "vuex";
import {
    DropModel,
    LoadMask, MaskModel,
    ModalWindow, State, Widget, WidgetUser
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

                lineArray.forEach(item => {
                    const index = lineArray.indexOf(item)
                    const prevItem = lineArray.slice(0,index)
                    let width = item.position == 1 ? 1 : 0
                    prevItem.forEach(prev => {
                        width = prev.position + prev.width
                    })
                    item.margin =  item.position - width
                })
                return lineArray
            },
            emptyPosition: (state) => (line : number, position : number) => {
                const positionNew = position
                console.log("check")
                state.widgetUser.forEach(item => {
                    if(item.line == line && (item.position + item.width - 1) >= position){
                        console.warn("занята элементом "+ item.id)
                    }
                })
                return positionNew
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
            }
        }
    });
    return storeApp;
}