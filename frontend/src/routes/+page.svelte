<script lang="ts">
	import { goto } from '$app/navigation';
	import HeadLine from '$lib/components/headline.svelte';

	export function gotoLogin() {
		goto('/login');
	}

	export function gotoSignUp() {
		goto('/signup');
	}
</script>

<div class="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] px-4 font-mono">
	<!-- Logo strip -->
	<HeadLine/>

	<!-- Content -->
	<div class="max-w-md text-center">
		<p class="mb-4 text-xs tracking-widest text-white/20 uppercase">Starterkit</p>
		<h1 class="mb-4 text-4xl font-bold tracking-tight text-white/90">
			Auth <span class="text-orange-600">StarterKit</span>
		</h1>
		<p class="mb-10 text-sm leading-relaxed text-white/30">
			A fullstack authentication starter for <a
				href="https://svelte.dev/"
				class="text-white/50 underline underline-offset-4 transition-colors hover:text-white/70"
				>svelteKit</a
			>
			using
			<a
				href="https://better-auth.com/"
				class="text-white/50 underline underline-offset-4 transition-colors hover:text-white/70"
			>
				better-auth
			</a>
			includes login, register, forgot password, and protected routes.
		</p>

		<div class="flex items-center justify-center gap-3">
			<button
				onclick={gotoLogin}
				class=" bg-white px-6 py-2.5 text-xs font-medium tracking-widest text-black uppercase transition-colors hover:bg-white/90"
			>
				Sign in
			</button>
			<button
				onclick={gotoSignUp}
				class=" border border-dashed border-white/10 px-6 py-2.5 text-xs font-medium tracking-widest text-white/40 uppercase transition-colors hover:border-white/20 hover:text-white/60"
			>
				Sign up
			</button>
		</div>
	</div>

	<!-- Bottom -->
	<div class="absolute bottom-8 text-xs tracking-widest text-white/10 uppercase">
		SvelteKit · Express · Better Auth · MySQL
	</div>
</div>
