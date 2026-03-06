<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(async () => {
		const session = await authClient.getSession();
		if (!session.data) {
			goto('/login');
		}
	});
</script>
