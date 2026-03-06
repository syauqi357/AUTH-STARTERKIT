<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth-client';
	import { page } from '$app/stores';

	let newPassword = $state('');
	let error = $state('');
	let isLoading = $state(false);

	async function handleResetPassword(e: Event) {
		e.preventDefault();
		error = '';
		isLoading = true;

		const token = $page.url.searchParams.get('token') ?? '';

		try {
			const { error: authError } = await authClient.resetPassword({
				newPassword,
				token
			});
			if (authError) throw new Error(authError.message);
            goto('/login');
		} catch (err) {
			error = err instanceof Error ? err.message : 'error occurred during password reset.';
		} finally {
			isLoading = false;
		}
	}
</script>

<form action="" onsubmit={handleResetPassword}>
	<label for="newPassword">password baru</label>
	<input
		type="password"
		name="newPassword"
		placeholder="New Password"
		bind:value={newPassword}
		required
	/>
	<button type="submit"> Reset Password </button>
</form>
