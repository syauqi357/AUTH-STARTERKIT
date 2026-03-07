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
			error = err instanceof Error ? err.message : 'An error occurred';
		} finally {
			isLoading = false;
		}
	}
</script>

<div class="flex min-h-screen flex-col justify-center bg-[#0a0a0a] px-4 font-mono">
	<div class="mx-auto w-full max-w-sm">
		<!-- Header -->
		<div class="mb-10">
			<p class="mb-3 text-xs tracking-widest text-white/20 uppercase">Starterkit</p>
			<h1 class="text-3xl font-bold tracking-tight text-white/90">Reset password</h1>
			<p class="mt-2 text-sm text-white/30">Enter your new password below</p>
		</div>

		<!-- Form -->
		<form onsubmit={handleResetPassword} class="space-y-4">
			{#if error}
				<div class=" border border-red-500/10 bg-red-500/5 px-4 py-3 text-xs text-red-400/80">
					{error}
				</div>
			{/if}

			<div class="space-y-1.5">
				<label class="text-xs tracking-widest text-white/20 uppercase" for="newPasswordreset"
					>New Password</label
				>
				<input
					type="password"
					bind:value={newPassword}
					name="newPasswordreset"
					required
					autocomplete="new-password"
					class="w-full border border-dashed border-white/8 bg-white/3 px-4 py-3 text-sm text-white/80 placeholder-white/20 transition-colors focus:border-white/20 focus:outline-none"
				/>
			</div>

			<button
				type="submit"
				disabled={isLoading}
				class="mt-2 w-full bg-white py-3 text-xs font-medium tracking-widest text-black uppercase transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-30"
			>
				{isLoading ? 'Resetting...' : 'Reset Password'}
			</button>
		</form>

		<!-- Footer -->
		<div class="mt-8 flex items-center gap-3">
			<div class="h-px flex-1 bg-white/4"></div>
			<a
				href="/login"
				class="text-xs tracking-wider text-white/20 transition-colors hover:text-white/40"
			>
				Back to sign in
			</a>
			<div class="h-px flex-1 bg-white/4"></div>
		</div>
	</div>
</div>
