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

<div class="flex min-h-screen flex-col justify-center bg-gray-100 px-4 py-12">
	<!-- Logo -->
	<div class="mb-6 flex justify-center">
		<div class="flex h-16 w-16 gap-2 items-center justify-center">
			<img src="../src/lib/assets/favicon.svg" alt="" srcset="" />
			<img src="../src/lib/assets/plus.svg" alt="" srcset="" />
			<img src="../src/lib/assets/better-auth.png" alt="" srcset="" />
			<img src="../src/lib/assets/plus.svg" alt="" srcset="" />
			<img src="../src/lib/assets/express.svg" alt="" srcset="" />
		</div>
	</div>

	<!-- Card -->
	<div class="mx-auto w-full max-w-md rounded-lg bg-white px-8 py-8 shadow-sm">
		<h2 class="mb-6 text-center text-2xl font-semibold text-gray-800">Sign in</h2>

		<form onsubmit={handleLogin} class="space-y-5">
			{#if error}
				<div class="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
					{error}
				</div>
			{/if}

			<div>
				<label class="mb-1 block text-sm font-medium text-gray-700" for="username">Username</label>
				<input
					type="text"
					id="username"
					bind:value={username}
					required
					autocomplete="username"
					class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none"
				/>
			</div>

			<div>
				<label class="mb-1 block text-sm font-medium text-gray-700" for="password">Password</label>
				<input
					type="password"
					bind:value={password}
					required
					autocomplete="current-password"
					class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none"
				/>
			</div>

			<div class="flex items-center justify-between">
				<a href="/forgot-password" class="text-sm text-gray-500 hover:text-gray-700">
					Forgot password?
				</a>
			</div>

			<button
				type="submit"
				disabled={isLoading}
				class="w-full rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
			>
				{isLoading ? 'Signing in...' : 'Sign in'}
			</button>
		</form>
	</div>

	<!-- Footer -->
	<p class="mt-6 text-center text-sm text-gray-500">
		Don't have an account?
		<a href="/signup" class="font-medium text-gray-700 hover:underline">Sign up</a>
	</p>
</div>
