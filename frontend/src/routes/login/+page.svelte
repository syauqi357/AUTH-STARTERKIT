<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';
	import type { PageProps } from './$types';

	let username = $state('');
	let password = $state('');
	let error = $state('');
	let isLoading = $state(false);

	let { data }: PageProps = $props();
	async function handleLogin() {
		error = '';
		isLoading = true;
		const { data, error: authError } = await authClient.signIn.username({
			username,
			password
		});

		isLoading = false;

		if (authError) {
			error = authError.message ?? 'An error occurred during sign in.';
			return;
		}

		// Berhasil → redirect
		window.location.href = '/dashboard';
	}

	function createAccwithSignup() {
		goto('/signUp');
	}
</script>

<div>
	<h1>login</h1>
	<form class="space-y-6" onsubmit={handleLogin}>
		{#if error}
			<div class="text-sm text-red-500">{error}</div>
		{/if}

		<!-- Email Input -->
		<div>
			<input
				type="text"
				bind:value={username}
				placeholder="username"
				required
				class="w-full border-0 border-b border-gray-800 bg-black px-0 py-2 text-white placeholder-gray-700 focus:border-gray-600 focus:ring-0 focus:outline-none"
			/>
		</div>

		<!-- Password Input -->
		<div>
			<input
				type="password"
				bind:value={password}
				placeholder="Password"
				required
				class="w-full border-0 border-b border-gray-800 bg-black px-0 py-2 text-white placeholder-gray-700 focus:border-gray-600 focus:ring-0 focus:outline-none"
			/>
		</div>

		<!-- Sign In Button -->
		<button
			type="submit"
			disabled={isLoading}
			class="mt-8 w-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
		>
			{isLoading ? 'Signing in...' : 'Sign in'}
		</button>
	</form>
</div>
