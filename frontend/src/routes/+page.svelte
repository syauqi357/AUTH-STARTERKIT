<script lang="ts">
	import { goto } from '$app/navigation';

	export function gotoLogin() {
		goto('/login');
	}

	export function gotoSignUp() {
		goto('/signup');
	}
</script>

<div class="mx-auto min-h-screen flex flex-col items-center justify-center">
	<h1 class="text-3xl font-bold">WELCOME TO THE AUTH STARTERKIT!</h1>
	<p class="mt-3 text-lg">
		This is a starterkit for authentication using <a href="https://better-auth.com/" class="text-blue-500 hover:text-blue-800">better-auth</a> . It includes a simple login form and a
		protected route.
	</p>
<span class="flex gap-3 my-5 items-center">
   <button onclick={gotoLogin} class="bg-slate-700 px-5 text-slate-50 rounded-md py-2 "> login </button>
   <button onclick={gotoSignUp} class="bg-slate-50 border border-slate-500 px-5 text-slate-500 rounded-md py-2"> signup </button>
</span>

</div>
