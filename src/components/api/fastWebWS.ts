import SockJS from "sockjs-client";
import Stomp, {Client} from "webstomp-client";
import {Store} from "vuex";

export class FastWebWS {
    get ws(): WebSocket | null {
        return this._ws;
    }

    set ws(value: WebSocket | null) {
        this._ws = value;
    }

    get socket(): Client | null {
        return this._socket;
    }

    set socket(value: Client | null) {
        this._socket = value;
    }

    private _URL : string;
    private _accessToken: string;
    private store: Store<any>;
    private _ws : WebSocket | null = null;
    private _socket : Client | null = null;
    private _isConnect = false;

    constructor(accessToken:string,store: Store<any>) {
        this._accessToken = accessToken;
        this._URL = "http://localhost:8085/ws/message"
        this.store = store;
    }

    get isConnect(): boolean {
        return this._isConnect;
    }

    set isConnect(value: boolean) {
        this._isConnect = value;
    }

    get URL(): string {
        return this._URL;
    }

    set URL(value: string) {
        this._URL = value;
    }

    get accessToken(): string {
        return this._accessToken;
    }

    set accessToken(value: string) {
        this._accessToken = value;
    }

    public connect(){
        this._ws = new SockJS(this.URL);
        this._socket = Stomp.over(this._ws);
        this._socket.connect( {
            Authorization : 'Bearer ' + this._accessToken,
        },frame => {
            this._isConnect = true;
            console.log('Connected: ' + frame);
        });
    }



}