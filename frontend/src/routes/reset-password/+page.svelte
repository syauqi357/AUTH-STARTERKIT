<script lang="ts">
	import { goto } from '$app/navigation';
import { authClient } from '$lib/auth-client';
    import type { PageProps } from './$types';
    let { data }: PageProps = $props();

  let newPassword = $state('');
  let token = $state('');
  let error = $state('');
  let isLoading = $state(false);

    export async function handleResetPassword(e: Event) {
        e.preventDefault();
        error = '';
        isLoading = true;

        const { data, error } = await authClient.resetPassword({
            newPassword: data.newPassword,
            token: data.token
        });

        if(!token){

            goto('/login');
    }

    }
</script>

<form action="" onsubmit={handleResetPassword}>
<label for="newPassword">password baru</label>
    <input type="password" name="newPassword" placeholder="New Password" bind:value={newPassword} required />
<button onclick={handleResetPassword}>
    Reset Password
</button>
</form>