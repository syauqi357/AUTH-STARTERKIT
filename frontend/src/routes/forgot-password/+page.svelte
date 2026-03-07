<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';

	let email = $state('');
	let error = $state('');
	let isLoading = $state(false);
	let success = $state(false);

	async function handleForgotPassword(e: Event) {
		e.preventDefault();
		error = '';
		isLoading = true;

		try {
			const { error: authError } = await authClient.requestPasswordReset({
				email,
				redirectTo: `${import.meta.env.VITE_APP_URL}/reset-password`
			});

			if (authError) throw new Error(authError.message);
			success = true;
		} catch (err) {
			error = err instanceof Error ? err.message : 'error occurred.';
		} finally {
			isLoading = false;
		}
	}
</script>

<div class="flex min-h-screen flex-col justify-center bg-[#0a0a0a] px-4 font-mono">
	<div class="mx-auto w-full max-w-sm">
		{#if success}
			<!-- Success state -->
			<div class="text-center">
				<div
					class="mx-auto mb-6 flex h-10 w-10 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/5"
				>
					<svg
						class="h-4 w-4 text-emerald-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 13l4 4L19 7"
						/>
					</svg>
				</div>
				<h2 class="mb-2 text-xl font-light text-white/90">Check your email</h2>
				<p class="mb-8 text-sm text-white/30">
					Reset link sent to <span class="text-white/60">{email}</span>
				</p>
				<button
					onclick={() => goto('/login')}
					class="text-xs tracking-widest text-white/20 uppercase transition-colors hover:text-white/50"
				>
					Back to sign in
				</button>
			</div>
		{:else}
			<!-- Header -->
			<div class="mb-10">
				<p class="mb-3 text-xs tracking-widest text-white/20 uppercase">Starterkit</p>
				<h1 class="text-3xl font-light tracking-tight text-white/90">Forgot password?</h1>
				<p class="mt-2 text-sm text-white/30">We'll send a reset link to your email</p>
			</div>

			<!-- Form -->
			<form onsubmit={handleForgotPassword} class="space-y-4">
				{#if error}
					<div class=" border border-red-500/10 bg-red-500/5 px-4 py-3 text-xs text-red-400/80">
						{error}
					</div>
				{/if}

				<div class="space-y-1.5">
					<label class="text-xs tracking-widest text-white/20 uppercase" for="email">Email</label>
					<input
						type="email"
						bind:value={email}
						required
						name="email"
						autocomplete="email"
						class="w-full border border-white/8 bg-white/3 px-4 py-3 text-sm text-white/80 placeholder-white/20 transition-colors focus:border-white/20 focus:outline-none"
					/>
				</div>

				<button
					type="submit"
					disabled={isLoading}
					class="mt-2 w-full bg-white py-3 text-xs font-medium tracking-widest text-black uppercase transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-30"
				>
					{isLoading ? 'Sending...' : 'Send reset link'}
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
		{/if}
	</div>
</div>
