import axios from "axios";
import {Store} from "vuex";
import {LoadMask} from "@/store/model";

interface LoginApi {
    accessToken: string,
    getApi<T>(uri:string):Promise<T>,
    postApi<T>(uri:string,data?:any):Promise<T>,
}

export class FastWebApi implements LoginApi{
    private _URL : string;
    private _accessToken: string;
    private store: Store<any>
    constructor(accessToken:string,store: Store<any>) {
        this._accessToken = accessToken;
        this._URL = process.env.VUE_APP_BASE_URL_SERVER_B2B;
        this.store = store;
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

    getApi<T>(uri: string, map?: Map<string, Object>): Promise<T> {
        this.loadMask(true);
        if (map) {
            uri = this.addParameterToUri(uri,map);
        }
        return axios.get(this._URL + uri,
            {headers: {"Authorization": "Bearer " + this._accessToken}}
        )
            .then((response: any) => {
                    this.loadMask(false);
                    return response.data;
                }
            )
            .catch((error) => {
                this.loadMask(false);
                console.log('Ошибка! Не могу связаться с API. ' + error);
            })
    }

    postApi<T>(uri:string,data?:any): Promise<T> {
        this.loadMask(true);
        return axios.post(this._URL + uri,data,
            {headers: {"Authorization": "Bearer " + this._accessToken}}
        )
            .then((response:any) => {
                    this.loadMask(false);
                    return response.data;
                }
            )
            .catch((error: any) => {
                this.loadMask(false);
                console.log('Ошибка! Не могу связаться с API. ' + error);
            })

    }


    private loadMask(value: boolean) {
        this.store.commit('setLoadMask', new class implements LoadMask {
            show: boolean = value;
        });
    }

    private addParameterToUri(uri: string, map: Map<string, Object>): string {
        uri = uri.concat('?')
        for (const item of map.keys()) {
            uri = uri.concat(item, '=', map.get(item)?.toString() || '')
            uri = uri.concat('&')
        }
        uri = uri.substring(0, uri.length - 1)
        return uri;
    }

}