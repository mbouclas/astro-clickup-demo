import { PublicClientApplication, type Configuration, type AuthenticationResult } from "@azure/msal-browser";

// MSAL configuration
export const msalConfig: Configuration = {
    auth: {
        clientId: import.meta.env.PUBLIC_MS_CLIENTID, // Replace with your app's Client ID
        authority: "https://login.microsoftonline.com/common", // Use "common" for multi-tenant
        redirectUri: import.meta.env.PUBLIC_LOGIN_REDIRECT // Replace with your redirect URI
    },
    cache: {
        cacheLocation: "localStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
    }
};

export const loginRequest = {
    scopes: ["User.Read"]
};

const msalInstance = new PublicClientApplication(msalConfig);

export async function signIn() {
    try {
        const loginResponse = await msalInstance.loginPopup(loginRequest);
        console.log("id_token acquired at: " + new Date().toString());
        console.log(loginResponse);
    } catch (error) {
        console.error(error);
    }

}