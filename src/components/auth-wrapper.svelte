<script lang="ts">
    import { onMount } from "svelte";
    import Auth from './auth.svelte';
    import {user} from '../stores/user.store';
    
    let isLoggedIn = false
onMount(async () => {
    const cached = localStorage.getItem('user');
    if (cached) {
        user.set(JSON.parse(cached));
        isLoggedIn = true
    }
})

</script>
{#if $user === null}
<Auth />
{:else}
<slot></slot>

{/if}