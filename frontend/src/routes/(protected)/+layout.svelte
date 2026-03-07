<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	// import { browser } from '$app/environment';

	let { children } = $props();

	onMount(async () => {
		const res = await authClient.getSession();
		if (!res.data) {
			goto('/login');
		}
	});
</script>

{@render children()}
<!-- {@render children()} -->
