<script lang="ts">
	import { goto } from '$app/navigation';

	export function gotoLogin() {
		goto('/login');
	}

	export function gotoSignUp() {
		goto('/signup');
	}
</script>

<div>
	<h1 class="text-3xl font-bold">WELCOME TO THE AUTH STARTERKIT!</h1>
	<p class="mt-3 text-lg">
		This is a starterkit for authentication using better-auth. It includes a simple login form and a
		protected route.
	</p>

	<button onclick={gotoLogin}> login </button>

	<button onclick={gotoSignUp}> signup </button>
</div>
