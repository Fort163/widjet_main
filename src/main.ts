import appComponent from './app/App.vue'
import keycloakInstance from "@/plugins/keycloak";
import Vue from "vue";


console.log("ENVIRONMENTS");
console.log(process.env);
console.log(keycloakInstance)
keycloakInstance.init({ onLoad: 'login-required' }).then((auth) => {
    if (!auth) {
        window.location.reload();
    } else {
        new Vue({
            render: h => h(appComponent)
        }).$mount('#mainDiv')
        window.onfocus = () => {
            keycloakInstance.updateToken(30)
        }
    }
})