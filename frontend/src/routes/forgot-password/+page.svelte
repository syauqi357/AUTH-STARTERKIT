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
			// goto('/dashboard');
		} catch (err) {
			error = err instanceof Error ? err.message : 'error occurred.';
		} finally {
			isLoading = false;
		}
	}
</script>

<div class="flex min-h-screen flex-col justify-center bg-gray-100 px-4 py-12">
	<!-- Logo -->
	<div class="mb-6 flex justify-center">
		<div class="flex h-16 w-16 items-center justify-center rounded-full bg-gray-800"></div>
	</div>

	<!-- Card -->
	<div class="mx-auto w-full max-w-md rounded-lg bg-white px-8 py-8 shadow-sm">
		{#if success}
			<!-- Success state -->
			<div class="text-center">
				<div
					class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100"
				>
					<svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 13l4 4L19 7"
						/>
					</svg>
				</div>
				<h2 class="mb-2 text-xl font-semibold text-gray-800">Check your email</h2>
				<p class="mb-6 text-sm text-gray-500">
					We sent a password reset link to <span class="font-medium text-gray-700">{email}</span>
				</p>
				<button
					onclick={() => goto('/login')}
					class="text-sm font-medium text-gray-700 hover:underline"
				>
					Back to sign in
				</button>
			</div>
		{:else}
			<!-- Form state -->
			<h2 class="mb-2 text-center text-2xl font-semibold text-gray-800">Forgot password?</h2>
			<p class="mb-6 text-center text-sm text-gray-500">
				Enter your email and we'll send you a reset link
			</p>

			<form onsubmit={handleForgotPassword} class="space-y-5">
				{#if error}
					<div class="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
						{error}
					</div>
				{/if}

				<div>
					<label class="mb-1 block text-sm font-medium text-gray-700">Email</label>
					<input
						type="email"
						bind:value={email}
						required
						autocomplete="email"
						class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none"
					/>
				</div>

				<button
					type="submit"
					disabled={isLoading}
					class="w-full rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{isLoading ? 'Sending...' : 'Send reset link'}
				</button>
			</form>
		{/if}
	</div>

	<!-- Footer -->
	<p class="mt-6 text-center text-sm text-gray-500">
		Remembered your password?
		<a href="/login" class="font-medium text-gray-700 hover:underline">Sign in</a>
	</p>
</div>
