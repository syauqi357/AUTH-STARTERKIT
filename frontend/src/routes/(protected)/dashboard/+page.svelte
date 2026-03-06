<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth-client';
	import { onMount } from 'svelte';

	let session = $state<any>(null);

	onMount(async () => {
		const res = await authClient.getSession();
		session = res.data;
	});

	async function handlelogout() {
		await authClient.signOut();
		goto('/login');
	}
</script>

<div>
	{#if session}
		<div>
			<p>
				{session.user.name}
			</p>
			<button
				onclick={handlelogout}
				class="rounded-md bg-red-500 px-4 py-1.5 text-red-50 hover:bg-red-600"
			>
				Sign Out
			</button>
		</div>
	{/if}
</div>
