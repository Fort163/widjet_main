import Vuex, {Store} from "vuex";
import {
    LoadMask, MaskModel,
    ModalWindow, State
} from "@/store/model";



class AppState implements State{
    mask : MaskModel;
    settings : boolean;
    drag : boolean;
    constructor() {
        this.settings = false
        this.drag  = false
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
            }
        },
        getters: {
            settings : state => {
                return state.settings
            },
            drag : state => {
                return state.drag
            }
        }
    });
    return storeApp;
}