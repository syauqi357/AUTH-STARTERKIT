<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const session = authClient.useSession();

	async function handlelogout() {
		await authClient.signOut();
	}
</script>

<div>
	{#if $session.data}
		<div>
			<p>
				{$session.data.user.name}
			</p>
			<button onclick={handlelogout} class="bg-red-500 text-red-50 rounded-md px-4 py-1.5 hover:bg-red-600"> Sign Out </button>
		</div>
	{/if}
</div>
