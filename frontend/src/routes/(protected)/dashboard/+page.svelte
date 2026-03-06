<script lang="ts">
	import { authClient } from '$lib/auth-client';

	let session = $state<any>(null);

	$effect(() => {
		authClient.getSession().then((res) => {
			console.log(res);
			session = res.data;
		});
	});

	async function handlelogout() {
		await authClient.signOut();
	}
</script>

<div>
	{#if session}
		<div>
			<p>
				{$session.user.name}
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
