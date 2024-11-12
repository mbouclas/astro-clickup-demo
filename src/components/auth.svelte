<script>
    import { onMount } from "svelte";
    import { PublicClientApplication } from "@azure/msal-browser";
    import { msalConfig, loginRequest } from "../services/login";
  
    let msalInstance;

onMount(async () => {
    console.log(msalConfig)
  msalInstance = new PublicClientApplication(msalConfig);
  await msalInstance.initialize();
});

async function signIn() {
  try {
    const loginResponse = await msalInstance.loginPopup(loginRequest);
    console.log("id_token acquired at: " + new Date().toString());
    console.log(loginResponse);
  } catch (error) {
    console.error(error);
  }
}
  </script>
  
  <button on:click={signIn} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Sign in with Microsoft
  </button>