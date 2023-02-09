import Keycloak, {KeycloakConfig} from 'keycloak-js'

const initOptions : KeycloakConfig = new class implements KeycloakConfig {
    url: string = process.env.VUE_APP_KEYCLOAK_URL
    realm: string = process.env.VUE_APP_KEYCLOAK_REALM
    clientId: string = process.env.VUE_APP_KEYCLOAK_CLIENT_ID
}

const keycloakInstance = new Keycloak(initOptions)

export default keycloakInstance;