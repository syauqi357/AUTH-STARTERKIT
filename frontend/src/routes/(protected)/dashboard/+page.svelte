<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth-client';
	import { onMount } from 'svelte';

	const greetings = [
		'Good to see you',
		'Welcome back',
		'Hey there',
		"Glad you're here",
		"What's up",
		"Look who's back",
		'Nice to see you',
		"You're back!",
		'Hello again',
		'Good to see you, 朋友 (péngyǒu)',
		'Welcome back, 歡喜轉來 (hoan-hí tńg-lâi)',
		'Hey there 你好 (nǐ hǎo)',
		"Glad you're here, 真歡喜 (tsin huann-hí)",
		"What's up 最近好無 (tsuē-kīn hó--bô)",
		"Look who's back, 是你 (sī lí)",
		'Nice to see you, 好久不見 (hǎojiǔ bùjiàn)',
		"You're back! 轉來了 (tńg-lâi--ah)",
		'Hello again, 又見面了 (yòu jiànmiàn le)',
		'Hey! 食飽未 (tsia̍h-pá--buē)',
		'Welcome! 歡迎光臨 (huānyíng guānglín)',
		'Great to see you, 歡喜 (hoan-hí)',
		'Missed you! 想我無 (siūnn guá bô)',
		'Yo! 喂 (uēi)',
		'Good day, 好天 (hó-thinn)',
		'مرحباً بعودتك',
		'أهلاً وسهلاً',
		'يسعدنا وجودك',
		'كيف حالك',
		'تشرفنا بزيارتك',
		'نورت المكان'
	];

	const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

	let session = $state<any>(null);

	onMount(async () => {
		const res = await authClient.getSession();
		session = res.data;
	});

	async function handlelogout() {
		await authClient.signOut();
		goto('/login');
	}

	async function gotoProfile() {
		goto('/profile');
	}
</script>

<div class="min-h-screen bg-[#0a0a0a] font-mono text-white">
	<!-- Topbar -->
	<header class="border-b border-white/6 px-6 py-4">
		<div class="mx-auto flex max-w-5xl items-center justify-between">
			<div class="flex items-center gap-3">
				<div class="h-6 w-6 bg-white"></div>
				<span class="text-sm font-medium tracking-widest text-white/60 uppercase">Starterkit</span>
			</div>

			{#if session}
				<div class="flex items-center gap-4">
					<button
						onclick={gotoProfile}
						class="cursor-pointer border border-white/20 px-4 py-2 transition-all ease-in-out hover:border-white/50 hover:bg-white/20"
					>
						<div class="flex items-center gap-2">
							<!-- <div
							class="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/10 text-xs text-white/70"
						>
							{session.user.name?.charAt(0).toUpperCase()}
						</div> -->
							<span class="text-xs text-white/50">{session.user.name}</span>
						</div>
					</button>
					<div class="h-4 w-px bg-white/10"></div>
					<button
						onclick={handlelogout}
						class="border border-red-500/20 px-4 py-2 text-xs tracking-wider text-red-400/50 uppercase transition-all hover:border-red-500/40 hover:bg-red-950 hover:text-red-400"
					>
						Sign out
					</button>
				</div>
			{/if}
		</div>
	</header>

	<!-- Main -->
	<main class="mx-auto max-w-5xl px-6 py-16">
		{#if session}
			<!-- Welcome -->
			<div class="mb-16">
				<p class="mb-3 text-xs tracking-widest text-white/20 uppercase">Dashboard</p>
				<h1 class="text-4xl font-light tracking-tight text-white/90">
					{randomGreeting}, <span class="text-white">{session.user.name}</span>
				</h1>
				<p class="mt-2 text-sm text-white/30">{session.user.email}</p>
			</div>

			<!-- Stats grid -->
			<div class="mb-8 grid grid-cols-3 gap-px overflow-hidden border border-white/6 bg-white/4">
				<div class="bg-[#0a0a0a] p-6">
					<p class="mb-2 text-xs tracking-widest text-white/20 uppercase">Status</p>
					<div class="flex items-center gap-2">
						<div class="h-1.5 w-1.5 rounded-full bg-emerald-400"></div>
						<span class="text-sm text-white/70">Active</span>
					</div>
				</div>
				<div class="border-l border-white/4 bg-[#0a0a0a] p-6">
					<p class="mb-2 text-xs tracking-widest text-white/20 uppercase">Username</p>
					<p class="text-sm text-white/70">{session.user.username ?? '—'}</p>
				</div>
				<div class="border-l border-white/4 bg-[#0a0a0a] p-6">
					<p class="mb-2 text-xs tracking-widest text-white/20 uppercase">Member since</p>
					<p class="text-sm text-white/70">
						{new Date(session.user.createdAt).toLocaleDateString('en-US', {
							month: 'short',
							year: 'numeric'
						})}
					</p>
				</div>
			</div>
		{:else}
			<!-- Loading state -->
			<div class="flex items-center gap-3 text-white/20">
				<div
					class="h-4 w-4 animate-spin rounded-full border border-white/10 border-t-white/40"
				></div>
				<span class="text-sm tracking-wider">Loading session...</span>
			</div>
		{/if}
	</main>
</div>
