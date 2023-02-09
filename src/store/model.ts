import Vue, {Component, ComponentOptions} from "vue";
import WidgetComponent from "@/components/widget/widgetComponent";
import {createStore} from "@/store/store";

export interface State{
    mask : MaskModel
    settings : boolean;
    drag : boolean
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
    defaultWidth : string
    defaultHeight : string
    description : string
    actionUrl : string
    type : TypeWidget
    show : boolean
    widget : Widget
}

export interface WidgetUser extends Entity{
    userID : string | undefined
    widget : Widget
    width : string | undefined
    height : string | undefined
    positionX : string | undefined
    positionY : string | undefined
    type : TypeWidget | undefined
    show : boolean
}