<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';

	let username = $state('');
	let password = $state('');
	let error = $state('');
	let isLoading = $state(false);

	async function handleLogin(e: Event) {
		e.preventDefault();
		error = '';
		isLoading = true;

		try {
			const { data, error: authError } = await authClient.signIn.username({
				username,
				password
			});

			if (authError) throw new Error(authError.message);

			goto('/dashboard');
		} catch (err) {
			error = err instanceof Error ? err.message : 'error occurred during sign in.';
		} finally {
			isLoading = false;
		}
	}

	function createAccwithSignup() {
		goto('/signup');
	}
</script>

<main class="container">
	<div class="mx-auto w-1/3">
		<h1>login</h1>
		<form class="space-y-6" onsubmit={handleLogin}>
			{#if error}
				<div class="text-sm text-red-500">{error}</div>
			{/if}

			<!-- Email Input -->
			<div>
				<input type="text" bind:value={username} placeholder="username" required class="w-full" />
			</div>

			<!-- Password Input -->
			<div>
				<input
					type="password"
					bind:value={password}
					placeholder="Password"
					required
					class="w-full"
				/>
			</div>

			<!-- Sign In Button -->
			<button
				type="submit"
				disabled={isLoading}
				class="w-full rounded bg-blue-500 px-4 py-2 text-white"
			>
				{#if isLoading}
					Signing in...
				{:else}
					Sign in
				{/if}
			</button>
		</form>
		<button onclick={createAccwithSignup} class="cursor-pointer">
			doesnt have an account? <span class="font-bold">create one here</span>
		</button>
	</div>
</main>
