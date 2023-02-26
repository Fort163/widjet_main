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

export class WidgetUser implements Entity{
    userID : string | undefined
    //widget : Widget
    id: number;
    width : number
    height : number
    line : number
    lineHeight : number
    position : number

    constructor(id: number, width : number, height : number, line : number, lineHeight : number, position : number) {
        this.id = id
        this.width = width
        this.height = height
        this.line = line
        this.lineHeight = lineHeight
        this.position = position
    }

    newPosition(position : number) : Position{
        return new Position(position,position+this.width-1)
    }

    currentPosition() : Position{
        return new Position(this.position,this.position+this.width-1)
    }

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

export class LineInfo{

    private emptyPosition : Array<number>
    private fillPosition : Array<Position>
    constructor() {
        this.emptyPosition = [1,2,3,4,5,6,7,8,9,10]
        this.fillPosition =  new Array<Position>()
    }

    public addFillPosition(position : Position){
        this.emptyPosition = this.emptyPosition.filter(item => position.start > item || item > position.end)
        this.fillPosition.push(position)
    }

    public getFillPosition(){
        return this.fillPosition
    }

    public getEmptyPosition(){
        return this.emptyPosition
    }

}

export class Position{
    private _start : number
    private _end : number
    constructor(start : number,end : number) {
        this._start = start
        this._end = end
    }

    get positionArray() : Array<number>{
        return Array.from(
            { length: (this.end - this.start) + 1 },
            (value, index) => this.start + index
        )
    }

    get end(): number {
        return this._end;
    }
    get start(): number {
        return this._start;
    }

}