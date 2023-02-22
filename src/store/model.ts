import Vue, {Component, ComponentOptions} from "vue";
import WidgetComponent from "@/components/widget/widgetComponent";
import {createStore} from "@/store/store";

export interface State{
    mask : MaskModel;
    settings : boolean;
    drag : boolean;
    widgetUser: Array<WidgetUser>;
    widgetStore: Array<Widget>;
}

export interface ModalWindow{
    message: string | null,
    show: boolean
}

export interface MaskModel {
    modalWindow : ModalWindow | null
    loadMask : LoadMask | null
}

export interface LoadMask{
    show: boolean
}

export interface Entity{
    id : number
}

export interface TypeWidget extends Entity{
    name : string
    width : string
    height : string
}

export interface Widget extends Entity{
    name : string
    url : string
    description : string
    actionUrl : string
    type : TypeWidget
}

export interface WidgetUser extends Entity{
    userID : string
    //widget : Widget
    width : number
    height : number
    line : number
    lineHeight : number
    position : number
}

export class DropModel{
    id : number
    line : number
    position : number
    constructor(id : number, line : number,position : number) {
        this.id = id
        this.line = line
        this.position = position
    }
}