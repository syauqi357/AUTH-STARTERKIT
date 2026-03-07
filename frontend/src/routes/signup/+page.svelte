<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';

	let name = $state('');
	let username = $state('');
	let email = $state('');
	let password = $state('');
	let error = $state('');
	let isLoading = $state(false);

	async function handleSignup(e: Event) {
		e.preventDefault();
		error = '';
		isLoading = true;

		try {
			const { data, error: authError } = await authClient.signUp.email({
				name,
				username,
				email,
				password
			});

			if (authError) throw new Error(authError.message);

			goto('/login');
		} catch (err) {
			error = err instanceof Error ? err.message : 'error occurred during sign in.';
		} finally {
			isLoading = false;
		}
	}
</script>

<div class="flex min-h-screen flex-col justify-center bg-[#0a0a0a] px-4 font-mono">
	<div class="mx-auto w-full max-w-sm">
		<!-- Logo strip -->
		<div class="mb-12 flex items-center justify-center gap-2.5 opacity-40">
			<img src="../src/lib/assets/favicon.svg" alt="" class="h-6 w-6" />
			<span class="text-xs text-white/30">+</span>
			<img src="../src/lib/assets/better-auth.png" alt="" class="h-5" />
			<span class="text-xs text-white/30">+</span>
			<img src="../src/lib/assets/express.svg" alt="" class="h-5" />
		</div>

		<!-- Header -->
		<div class="mb-10">
			<p class="mb-3 text-xs tracking-widest text-white/20 uppercase">Starterkit</p>
			<h1 class="text-3xl font-light tracking-tight text-white/90">Create account</h1>
			<p class="mt-2 text-sm text-white/30 capitalize">get started</p>
		</div>

		<!-- Form -->
		<form onsubmit={handleSignup} class="space-y-4">
			{#if error}
				<div class=" border border-red-500/10 bg-red-500/5 px-4 py-3 text-xs text-red-400/80">
					{error}
				</div>
			{/if}

			<div class="space-y-1.5">
				<label class="text-xs tracking-widest text-white/20 uppercase" for="fullname"
					>Full name</label
				>
				<input
					type="text"
					name="fullname"
					bind:value={name}
					required
					autocomplete="name"
					class="w-full border border-white/8 bg-white/3 px-4 py-3 text-sm text-white/80 placeholder-white/20 transition-colors focus:border-white/20 focus:outline-none"
				/>
			</div>

			<div class="space-y-1.5">
				<label for="usernamesignup" class="text-xs tracking-widest text-white/20 uppercase"
					>Username</label
				>
				<input
					type="text"
					bind:value={username}
					required
					name="usernamesignup"
					autocomplete="username"
					class="w-full border border-white/8 bg-white/3 px-4 py-3 text-sm text-white/80 placeholder-white/20 transition-colors focus:border-white/20 focus:outline-none"
				/>
			</div>

			<div class="space-y-1.5">
				<label for="emailsignup" class="text-xs tracking-widest text-white/20 uppercase"
					>Email</label
				>
				<input
					type="email"
					name="emailsignup"
					bind:value={email}
					required
					autocomplete="email"
					class="w-full border border-white/8 bg-white/3 px-4 py-3 text-sm text-white/80 placeholder-white/20 transition-colors focus:border-white/20 focus:outline-none"
				/>
			</div>

			<div class="space-y-1.5">
				<label for="passwordSetup" class="text-xs tracking-widest text-white/20 uppercase"
					>Password</label
				>
				<input
					type="password"
					name="passwordSetup"
					bind:value={password}
					required
					autocomplete="new-password"
					class="w-full border border-white/8 bg-white/3 px-4 py-3 text-sm text-white/80 placeholder-white/20 transition-colors focus:border-white/20 focus:outline-none"
				/>
			</div>

			<button
				type="submit"
				disabled={isLoading}
				class="mt-2 w-full bg-white py-3 text-xs font-medium tracking-widest text-black uppercase transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-30"
			>
				{isLoading ? 'Creating account...' : 'Create account'}
			</button>
		</form>

		<!-- Footer -->
		<div class="mt-8 flex items-center gap-3">
			<div class="h-px flex-1 bg-white/4"></div>
			<p class="text-xs tracking-wider text-white/20">
				Have an account?
				<a href="/login" class="text-white/40 transition-colors hover:text-white/60">Sign in</a>
			</p>
			<div class="h-px flex-1 bg-white/4"></div>
		</div>
	</div>
</div>
