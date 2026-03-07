<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let session = $state<any>(null);
	let name = $state('');
	let username = $state('');
	let currentPassword = $state('');
	let newPassword = $state('');

	let profileSuccess = $state('');
	let profileError = $state('');
	let passwordSuccess = $state('');
	let passwordError = $state('');
	let isUpdatingProfile = $state(false);
	let isUpdatingPassword = $state(false);

	onMount(async () => {
		const res = await authClient.getSession();
		session = res.data;
		name = session?.user?.name ?? '';
		username = session?.user?.username ?? '';
	});

	async function handleUpdateProfile(e: Event) {
		e.preventDefault();
		profileError = '';
		profileSuccess = '';
		isUpdatingProfile = true;

		try {
			const { error } = await authClient.updateUser({ name, username });
			if (error) throw new Error(error.message);
			profileSuccess = 'Profile updated successfully';
		} catch (err) {
			profileError = err instanceof Error ? err.message : 'An error occurred';
		} finally {
			isUpdatingProfile = false;
		}
	}

	async function handleChangePassword(e: Event) {
		e.preventDefault();
		passwordError = '';
		passwordSuccess = '';
		isUpdatingPassword = true;

		try {
			const { error } = await authClient.changePassword({
				currentPassword,
				newPassword,
				revokeOtherSessions: true
			});
			if (error) throw new Error(error.message);
			passwordSuccess = 'Password changed successfully';
			currentPassword = '';
			newPassword = '';
		} catch (err) {
			passwordError = err instanceof Error ? err.message : 'An error occurred';
		} finally {
			isUpdatingPassword = false;
		}
	}

	function handlegotoDashboard() {
		goto('/dashboard');
	}
</script>

<div class="min-h-screen bg-[#0a0a0a] font-mono">
	<!-- Topbar -->
	<header class="border-b border-white/6 px-6 py-4">
		<div class="mx-auto flex max-w-3xl items-center justify-between">
			<div class="flex items-center gap-4">
				<button
					class="flex items-center gap-2 text-sm tracking-widest text-white/20 uppercase transition-colors hover:text-white/40"
					onclick={handlegotoDashboard}
				>
					<span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
							fill="none"
							id="Arrow-Left--Streamline-Majesticons"
							height="16"
							width="16"
						>
							<desc> Arrow Left Streamline Icon: https://streamlinehq.com </desc>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1.3333"
								d="m3.333333333333333 8 4 -4m-4 4 4 4m-4 -4h9.333333333333332"
							></path>
						</svg>
					</span> Dashboard
				</button>
			</div>
			<span class="text-xs tracking-widest text-white/20 uppercase">Profile</span>
		</div>
	</header>

	<main class="mx-auto max-w-3xl space-y-px px-6 py-12">
		<!-- Profile info header -->
		{#if session}
			<div class="mb-12">
				<div
					class="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-white/60"
				>
					{session.user.name?.charAt(0).toUpperCase()}
				</div>
				<h1 class="text-2xl font-light text-white/90">{session.user.name}</h1>
				<p class="mt-1 text-sm text-white/30">{session.user.email}</p>
			</div>
		{/if}

		<!-- Update profile -->
		<div class="overflow-hidden border border-white/6">
			<div class="border-b border-white/4 px-6 py-4">
				<p class="text-xs tracking-widest text-white/40 uppercase">Profile information</p>
			</div>
			<div class="px-6 py-6">
				<form onsubmit={handleUpdateProfile} class="space-y-4">
					{#if profileError}
						<div class=" border border-red-500/10 bg-red-500/5 px-4 py-3 text-xs text-red-400/80">
							{profileError}
						</div>
					{/if}
					{#if profileSuccess}
						<div
							class=" border border-emerald-500/10 bg-emerald-500/5 px-4 py-3 text-xs text-emerald-400/80"
						>
							{profileSuccess}
						</div>
					{/if}

					<div class="grid grid-cols-2 gap-4">
						<div class="space-y-1.5">
							<label for="name" class="text-xs tracking-widest text-white/20 uppercase"
								>Full name</label
							>
							<input
								type="text"
								bind:value={name}
								required
								name="name"
								class="w-full border border-white/8 bg-white/3 px-4 py-3 text-sm text-white/80 placeholder-white/20 transition-colors focus:border-white/20 focus:outline-none"
							/>
						</div>
						<div class="space-y-1.5">
							<label for="username" class="text-xs tracking-widest text-white/20 uppercase"
								>Username</label
							>
							<input
								type="text"
								bind:value={username}
								required
								name="username"
								class="w-full border border-white/8 bg-white/3 px-4 py-3 text-sm text-white/80 placeholder-white/20 transition-colors focus:border-white/20 focus:outline-none"
							/>
						</div>
					</div>

					<div class="flex justify-end">
						<button
							type="submit"
							disabled={isUpdatingProfile}
							class=" bg-white px-6 py-2.5 text-xs font-medium tracking-widest text-black uppercase transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-30"
						>
							{isUpdatingProfile ? 'Saving...' : 'Save changes'}
						</button>
					</div>
				</form>
			</div>
		</div>

		<!-- Change password -->
		<div class="mt-4 overflow-hidden border border-white/6">
			<div class="border-b border-white/4 px-6 py-4">
				<p class="text-xs tracking-widest text-white/40 uppercase">Change password</p>
			</div>
			<div class="px-6 py-6">
				<form onsubmit={handleChangePassword} class="space-y-4">
					{#if passwordError}
						<div class=" border border-red-500/10 bg-red-500/5 px-4 py-3 text-xs text-red-400/80">
							{passwordError}
						</div>
					{/if}
					{#if passwordSuccess}
						<div
							class=" border border-emerald-500/10 bg-emerald-500/5 px-4 py-3 text-xs text-emerald-400/80"
						>
							{passwordSuccess}
						</div>
					{/if}

					<div class="space-y-1.5">
						<label for="currentPasswordset" class="text-xs tracking-widest text-white/20 uppercase"
							>Current password</label
						>
						<input
							type="password"
							bind:value={currentPassword}
							required
							name="currentPasswordset"
							autocomplete="current-password"
							class="w-full border border-white/8 bg-white/3 px-4 py-3 text-sm text-white/80 placeholder-white/20 transition-colors focus:border-white/20 focus:outline-none"
						/>
					</div>

					<div class="space-y-1.5">
						<label class="text-xs tracking-widest text-white/20 uppercase" for="newPassword"
							>New password</label
						>
						<input
							type="password"
							bind:value={newPassword}
							required
							autocomplete="new-password"
							name="newPassword"
							class="w-full border border-dashed border-white/8 bg-white/3 px-4 py-3 text-sm text-white/80 placeholder-white/20 transition-colors focus:border-white/20 focus:outline-none"
						/>
					</div>

					<div class="flex justify-end">
						<button
							type="submit"
							disabled={isUpdatingPassword}
							class=" bg-white px-6 py-2.5 text-xs font-medium tracking-widest text-black uppercase transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-30"
						>
							{isUpdatingPassword ? 'Updating...' : 'Update password'}
						</button>
					</div>
				</form>
			</div>
		</div>
	</main>
</div>
