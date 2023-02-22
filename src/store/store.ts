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
                state.widgetUser = state.widgetUser.flatMap(item =>{
                    if(item.id == model.id){
                        item.line = model.line;
                        item.position = model.position
                    }
                    return item;
                })
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
                return state.widgetUser.filter(item => item.line == line).sort((a, b) => {
                    if(a.position > b.position){
                        return 1
                    }
                    if(a.position < b.position){
                        return -1
                    }
                    return 0
                })
            },
            lines : state => {
                const array : number[] = []
                state.widgetUser.forEach(item => {
                    if(array.indexOf(item.line) == -1){
                        array.push(item.line)
                    }
                })
                array.push(Math.max(...array)+1)
                console.log("lines : "+array)
                return Math.max(...array);
            }
        }
    });
    return storeApp;
}