import Vue from 'vue'
import {createStore} from '@/store/store.ts'
import Vuex from "vuex";
import Component from "vue-class-component";
import VueCookies from "vue-cookies";
import keycloakInstance from "@/plugins/keycloak";
import axios from "axios";
import WidgetStore from "@/components/widgetStore/WidgetStore.vue";
import WorkPlace from "@/components/workPlace/WorkPlace.vue";
import {Provide} from "vue-property-decorator";
import {TypeWidget, Widget, WidgetUser} from "@/store/model";
import {FastWebWS} from "@/components/api/fastWebWS";
import VueResizeObserver from "vue-resize-observer";

Vue.use(Vuex);
Vue.use(VueCookies);
Vue.use(VueResizeObserver);
@Component({
    components: {
        WidgetStore,
        WorkPlace
    },
    store:createStore()
})
export default class App extends Vue {

    @Provide("widgetStore")
    private widgetStore : Array<Widget> = new Array<Widget>();
    @Provide("widgetUser")
    private widgetUser : Array<WidgetUser> = new Array<WidgetUser>();
    @Provide("typeWidget")
    private typeWidget : Array<TypeWidget> = new Array<TypeWidget>();
    @Provide('socket') mainSocket: FastWebWS = new FastWebWS("accessToken",this.$store);

    private name = ''
    private widgetStoreDownload: boolean = false
    private widgetUserDownload: boolean = false

    created(){
        this.mainSocket.accessToken = <string>keycloakInstance.token;
        this.mainSocket.connect();
        axios.interceptors.request.use(async config => {
            const token = keycloakInstance.token
            config.headers.common['Authorization'] = `Bearer ${token}`
            return config
        })
        axios.get(process.env.VUE_APP_MAIN_WIDGET_URL+'/api/users/info')
            .then((response: any) => {
                    //this.loadMask(false);
                    return response.data.userFullName;
                }
            )
            .catch((error) => {
                //this.loadMask(false);
                console.log('Ошибка! Не могу связаться с API. ' + error);
            }).then((data)=>{
            this.name = data
        })
        axios.get(process.env.VUE_APP_MAIN_WIDGET_URL+'/api/types')
            .then((response: any) => {
                    //this.loadMask(false);
                    return response.data;
                }
            )
            .catch((error) => {
                //this.loadMask(false);
                console.log('Ошибка! Не могу связаться с API. ' + error);
            }).then((data : Array<TypeWidget>)=>{
            data.forEach((item =>{
                this.typeWidget.push(item)
            }))
            console.log(this.typeWidget)
        })
        axios.get(process.env.VUE_APP_MAIN_WIDGET_URL+'/api/widgets/withOutUserWidgets')
            .then((response: any) => {
                    //this.loadMask(false);
                    return response.data;
                }
            )
            .catch((error) => {
                //this.loadMask(false);
                console.log('Ошибка! Не могу связаться с API. ' + error);
            }).then((data : Array<Widget>)=>{
                this.$store.commit('setStoreWidget',data);
                this.widgetStoreDownload = true
        })
        /*axios.get(process.env.VUE_APP_MAIN_WIDGET_URL+'/api/user_widgets')
            .then((response: any) => {
                    //this.loadMask(false);
                    return response.data;
                }
            )
            .catch((error) => {
                //this.loadMask(false);
                console.log('Ошибка! Не могу связаться с API. ' + error);
            }).then((data : Array<WidgetUser>)=>{
            data.forEach((item =>{
                this.widgetUser.push(item)
            }))
            this.widgetUserDownload = true
        })*/
        //id: number, width : number, height : number, line : number, lineHeight : number, position : number
        const widget1 : WidgetUser = new WidgetUser(1, 2, 10, 1, 2, 4);
        this.widgetUser.push(widget1)
        const widget2 : WidgetUser = new WidgetUser(2, 2, 10, 1, 2, 1);
        this.widgetUser.push(widget2)
        const widget3 : WidgetUser = new WidgetUser(3, 2, 10, 1, 2, 7);
        this.widgetUser.push(widget3)
        const widget4 : WidgetUser = new WidgetUser(4, 4, 10, 2, 1, 2);
        this.widgetUser.push(widget4)
        const widget5 : WidgetUser = new WidgetUser(5, 4, 10, 3, 2, 2);
        this.widgetUser.push(widget5)
        const widget6 : WidgetUser = new WidgetUser(6, 2, 10, 3, 2, 7);
        this.widgetUser.push(widget6)
        /*const widget1 : WidgetUser = new class implements WidgetUser {
            height: number = 10;
            id: number = 1;
            line: number = 1;
            lineHeight: number = 2;
            position: number = 2;
            userID: string = "aaaaaa";
            width: number = 2;
        }
        this.widgetUser.push(widget1)
        const widget1 : WidgetUser = new class implements WidgetUser {
            height: number = 10;
            id: number = 1;
            line: number = 1;
            lineHeight: number = 2;
            position: number = 2;
            userID: string = "aaaaaa";
            width: number = 2;
        }
        this.widgetUser.push(widget1)
        const widget1 : WidgetUser = new class implements WidgetUser {
            height: number = 10;
            id: number = 1;
            line: number = 1;
            lineHeight: number = 2;
            position: number = 2;
            userID: string = "aaaaaa";
            width: number = 2;
        }
        this.widgetUser.push(widget1)
        const widget1 : WidgetUser = new class implements WidgetUser {
            height: number = 10;
            id: number = 1;
            line: number = 1;
            lineHeight: number = 2;
            position: number = 2;
            userID: string = "aaaaaa";
            width: number = 2;
        }
        this.widgetUser.push(widget1)
        const widget1 : WidgetUser = new class implements WidgetUser {
            height: number = 10;
            id: number = 1;
            line: number = 1;
            lineHeight: number = 2;
            position: number = 2;
            userID: string = "aaaaaa";
            width: number = 2;
        }
        this.widgetUser.push(widget1)*/
        this.$store.commit('setWidgetUser',this.widgetUser);
        this.widgetUserDownload = true
    }

    mounted(){

    }

    public onOffSettings(){
        this.$store.commit('setSettings',!this.$store.getters.settings);
    }

}