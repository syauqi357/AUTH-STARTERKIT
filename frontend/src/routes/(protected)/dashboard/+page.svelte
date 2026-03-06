<script lang="ts">
  import { goto } from '$app/navigation'
  import { authClient } from '$lib/auth-client'
  import { onMount } from 'svelte'

  let session = $state<any>(null)

  onMount(async () => {
    const res = await authClient.getSession()
    session = res.data
  })

  async function handlelogout() {
    await authClient.signOut()
    goto('/login')
  }
</script>

<div class="min-h-screen bg-[#0a0a0a] text-white font-mono">

  <!-- Topbar -->
  <header class="border-b border-white/6 px-6 py-4">
    <div class="max-w-5xl mx-auto flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-6 h-6 bg-white rounded-sm"></div>
        <span class="text-sm font-medium tracking-widest uppercase text-white/60">Starterkit</span>
      </div>

      {#if session}
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-xs text-white/70">
              {session.user.name?.charAt(0).toUpperCase()}
            </div>
            <span class="text-sm text-white/50">{session.user.name}</span>
          </div>
          <div class="w-px h-4 bg-white/10"></div>
          <button
            onclick={handlelogout}
            class="text-xs text-white/30 hover:text-white/70 transition-colors tracking-wider uppercase"
          >
            Sign out
          </button>
        </div>
      {/if}
    </div>
  </header>

  <!-- Main -->
  <main class="max-w-5xl mx-auto px-6 py-16">
    {#if session}
      <!-- Welcome -->
      <div class="mb-16">
        <p class="text-xs text-white/20 tracking-widest uppercase mb-3">Dashboard</p>
        <h1 class="text-4xl font-light tracking-tight text-white/90">
          Good to see you, <span class="text-white">{session.user.name}</span>
        </h1>
        <p class="text-sm text-white/30 mt-2">{session.user.email}</p>
      </div>

      <!-- Stats grid -->
      <div class="grid grid-cols-3 gap-px bg-white/4 border border-white/6 rounded-lg overflow-hidden mb-8">
        <div class="bg-[#0a0a0a] p-6">
          <p class="text-xs text-white/20 uppercase tracking-widest mb-2">Status</p>
          <div class="flex items-center gap-2">
            <div class="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
            <span class="text-sm text-white/70">Active</span>
          </div>
        </div>
        <div class="bg-[#0a0a0a] p-6 border-l border-white/4">
          <p class="text-xs text-white/20 uppercase tracking-widest mb-2">Username</p>
          <p class="text-sm text-white/70">{session.user.username ?? '—'}</p>
        </div>
        <div class="bg-[#0a0a0a] p-6 border-l border-white/4">
          <p class="text-xs text-white/20 uppercase tracking-widest mb-2">Member since</p>
          <p class="text-sm text-white/70">
            {new Date(session.user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </p>
        </div>
      </div>

      <!-- Nav links -->
      <div class="flex gap-2">
        <a
          href="/profile"
          class="px-4 py-2 text-xs tracking-wider uppercase border border-white/10 text-white/40 hover:border-white/20 hover:text-white/70 transition-all rounded-md"
        >
          Profile
        </a>
        <button
          onclick={handlelogout}
          class="px-4 py-2 text-xs tracking-wider uppercase border border-red-500/20 text-red-400/50 hover:border-red-500/40 hover:text-red-400 transition-all rounded-md"
        >
          Sign out
        </button>
      </div>

    {:else}
      <!-- Loading state -->
      <div class="flex items-center gap-3 text-white/20">
        <div class="w-4 h-4 border border-white/10 border-t-white/40 rounded-full animate-spin"></div>
        <span class="text-sm tracking-wider">Loading session...</span>
      </div>
    {/if}
  </main>

</div>