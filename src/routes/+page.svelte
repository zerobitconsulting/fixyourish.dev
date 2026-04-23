<script lang="ts">
	interface BugBounty {
		id: string;
		title: string;
		project: string;
		severity: 'low' | 'medium' | 'high' | 'critical';
		reward: string;
		status: 'open' | 'claimed' | 'fixed';
	}

	const mockBugBounties: BugBounty[] = [
		{
			id: '1',
			title: 'XSS vulnerability in user profile page',
			project: 'OpenSourceCMS',
			severity: 'high',
			reward: '$500',
			status: 'open'
		},
		{
			id: '2',
			title: 'SQL injection in search endpoint',
			project: 'ReactDashboard',
			severity: 'critical',
			reward: '$1000',
			status: 'open'
		},
		{
			id: '3',
			title: 'CSRF token validation bypass',
			project: 'VueCommerce',
			severity: 'medium',
			reward: '$300',
			status: 'open'
		},
		{
			id: '4',
			title: 'Broken authentication in API',
			project: 'NodeAPI',
			severity: 'high',
			reward: '$750',
			status: 'claimed'
		},
		{
			id: '5',
			title: 'Directory traversal vulnerability',
			project: 'FileManager',
			severity: 'critical',
			reward: '$1200',
			status: 'open'
		}
	];

	let searchQuery = $state('');
	let visible = $state(false);

	const filteredBounties = $derived(
		searchQuery.trim() === ''
			? mockBugBounties
			: mockBugBounties.filter(
					(b) =>
						b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
						b.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
						b.severity.toLowerCase().includes(searchQuery.toLowerCase())
				)
	);

	$effect(() => {
		visible = true;
	});

	function getSeverityColor(severity: string): string {
		switch (severity) {
			case 'critical':
				return 'from-red-500 to-red-700 border-red-400';
			case 'high':
				return 'from-orange-500 to-orange-700 border-orange-400';
			case 'medium':
				return 'from-yellow-500 to-yellow-700 border-yellow-400';
			case 'low':
				return 'from-green-500 to-green-700 border-green-400';
			default:
				return 'from-gray-500 to-gray-700 border-gray-400';
		}
	}

	function getStatusColor(status: string): string {
		switch (status) {
			case 'open':
				return 'bg-gradient-to-r from-blue-500 to-cyan-500';
			case 'claimed':
				return 'bg-gradient-to-r from-purple-500 to-pink-500';
			case 'fixed':
				return 'bg-gradient-to-r from-green-500 to-emerald-500';
			default:
				return 'bg-gradient-to-r from-gray-500 to-gray-600';
		}
	}
</script>

<svelte:head>
	<title>FixYour-ish - Find & Fix Issues in Your Site</title>
	<meta
		name="description"
		content="Discover issues that need fixing on your site and find open source bug bounty opportunities"
	/>
</svelte:head>

<main class="min-h-screen overflow-hidden bg-slate-900">
	<!-- Animated Background -->
	<div class="pointer-events-none fixed inset-0 overflow-hidden">
		<div
			class="absolute -right-40 -top-40 h-80 w-80 animate-pulse-slow rounded-full bg-purple-500/20 blur-3xl"
		></div>
		<div
			class="absolute left-1/2 top-1/2 h-80 w-80 animate-pulse-slow rounded-full bg-cyan-500/20 blur-3xl"
			style="animation-delay: 2s;"
		></div>
		<div
			class="absolute bottom-20 right-1/3 h-80 w-80 animate-pulse-slow rounded-full bg-pink-500/20 blur-3xl"
			style="animation-delay: 4s;"
		></div>
	</div>

	<!-- Hero Section -->
	<div class="relative">
		<div
			class="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-pink-600/20 to-cyan-600/30 backdrop-blur-sm"
		></div>
		<div class="container relative mx-auto px-4 py-24 md:py-32">
			<div
				class="mx-auto max-w-5xl transform text-center transition-all duration-1000"
				class:opacity-0={!visible}
				class:translate-y-10={!visible}
				class:opacity-100={visible}
				class:translate-y-0={visible}
			>
				<h1
					class="animate-float glow text-gradient mb-6 font-black"
					style="font-size: clamp(3rem, 10vw, 6rem); font-family: system-ui, -apple-system, sans-serif;"
				>
					Fix Your<span class="text-yellow-400">-ish</span>
				</h1>
				<p class="mb-6 text-2xl font-bold tracking-wide text-cyan-300 md:text-3xl">
					Identify issues that need fixing on your site
				</p>
				<p class="mx-auto max-w-3xl text-lg leading-relaxed text-purple-200 md:text-xl">
					Discover vulnerabilities, earn bug bounties, and contribute to open source security with
					style
				</p>
				<button
					class="card-glow mt-8 transform rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-xl font-bold shadow-2xl transition-all duration-300 hover:scale-110 hover:from-purple-500 hover:to-pink-500"
				>
					Get Started Now
				</button>
			</div>
		</div>
	</div>

	<!-- Features Section -->
	<div class="container relative mx-auto px-4 py-16">
		<div class="mb-20 grid gap-8 md:grid-cols-3">
			{#each [
				{ icon: '🔍', title: 'Find Issues', desc: 'Scan and identify security vulnerabilities, performance issues, and bugs with advanced detection algorithms.' },
				{ icon: '💰', title: 'Bug Bounties', desc: 'Browse open source bug bounty programs and earn rewards by finding and reporting security issues.' },
				{ icon: '🛠️', title: 'Get Fixed', desc: 'Access detailed remediation guides and best practices to fix identified issues quickly and securely.' }
			] as feature, i}
				<div
					class="group relative transform rounded-2xl border border-purple-500/30 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-8 backdrop-blur-lg transition-all duration-500 hover:scale-105 hover:border-cyan-400/60 hover:shadow-2xl hover:shadow-purple-500/50"
					style="animation-delay: {i * 200}ms;"
				>
					<div
						class="absolute inset-0 overflow-hidden rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
					>
						<div
							class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shimmer"
						></div>
					</div>
					<div class="relative">
						<div class="animate-float mb-6 text-6xl" style="animation-delay: {i * 300}ms;">
							{feature.icon}
						</div>
						<h3 class="mb-4 text-2xl font-bold text-cyan-300">{feature.title}</h3>
						<p class="leading-relaxed text-gray-300">{feature.desc}</p>
					</div>
				</div>
			{/each}
		</div>

		<!-- Bug Bounty Search Section -->
		<div class="mx-auto max-w-7xl">
			<div
				class="rounded-3xl border border-purple-500/40 bg-gradient-to-br from-slate-800/60 to-slate-900/60 p-10 shadow-2xl backdrop-blur-xl"
			>
				<h2 class="text-gradient mb-6 text-4xl font-bold md:text-5xl">
					Open Source Bug Bounty Programs
				</h2>
				<p class="mb-8 text-lg leading-relaxed text-gray-300">
					Search through available bug bounty opportunities in open source projects. Find
					vulnerabilities, help secure the ecosystem, and earn rewards.
				</p>

				<!-- Search Bar -->
				<div class="group relative mb-10">
					<input
						type="text"
						placeholder="Search by project, title, or severity..."
						bind:value={searchQuery}
						class="w-full rounded-2xl border-2 border-purple-500/50 bg-slate-800/80 px-8 py-6 text-lg text-white placeholder-gray-400 transition-all focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-400/30 group-hover:border-purple-400"
					/>
					<div
						class="absolute right-6 top-1/2 -translate-y-1/2 text-purple-400 transition-colors group-focus-within:text-cyan-400"
					>
						<svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width={2}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</div>
				</div>

				<!-- Results -->
				<div class="space-y-6">
					{#if filteredBounties.length === 0}
						<div class="py-20 text-center">
							<p class="text-2xl font-bold text-purple-300">No bug bounties found</p>
							<p class="mt-3 text-gray-400">Try adjusting your search criteria</p>
						</div>
					{:else}
						{#each filteredBounties as bounty, i}
							<div
								class="group transform rounded-2xl border border-purple-500/30 bg-gradient-to-br from-slate-800/60 to-slate-900/60 p-8 backdrop-blur-lg transition-all duration-500 hover:scale-[1.02] hover:border-cyan-400/60 hover:shadow-2xl hover:shadow-cyan-500/30"
								style="animation: fadeInUp 0.5s ease-out {i * 100}ms both;"
							>
								<div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
									<div class="flex-1">
										<h3
											class="mb-3 text-2xl font-bold text-white transition-colors group-hover:text-cyan-300"
										>
											{bounty.title}
										</h3>
										<p class="mb-4 text-lg text-gray-300">
											Project: <span class="font-semibold text-purple-300">{bounty.project}</span>
										</p>
										<div class="flex flex-wrap gap-3">
											<span
												class="rounded-full border-2 bg-gradient-to-r px-4 py-2 text-sm font-bold shadow-lg {getSeverityColor(bounty.severity)}"
											>
												{bounty.severity.toUpperCase()}
											</span>
											<span
												class="rounded-full px-4 py-2 text-sm font-bold shadow-lg {getStatusColor(bounty.status)}"
											>
												{bounty.status.charAt(0).toUpperCase() + bounty.status.slice(1)}
											</span>
										</div>
									</div>
									<div class="flex flex-col items-end gap-4">
										<div class="text-gradient glow text-4xl font-black">
											{bounty.reward}
										</div>
										<button
											class="transform rounded-xl px-8 py-3 text-lg font-bold shadow-xl transition-all duration-300 hover:scale-110 {bounty.status ===
											'open'
												? 'card-glow bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500'
												: 'cursor-not-allowed bg-gray-700 text-gray-400'}"
											disabled={bounty.status !== 'open'}
										>
											{bounty.status === 'open' ? 'View Details' : 'Not Available'}
										</button>
									</div>
								</div>
							</div>
						{/each}
					{/if}
				</div>

				<!-- Stats -->
				<div class="mt-12 border-t border-purple-500/30 pt-8">
					<div class="grid grid-cols-2 gap-6 lg:grid-cols-4">
						{#each [
							{ value: mockBugBounties.length, label: 'Total Bounties', color: 'text-purple-400' },
							{ value: mockBugBounties.filter((b) => b.status === 'open').length, label: 'Open', color: 'text-green-400' },
							{ value: mockBugBounties.filter((b) => b.severity === 'high' || b.severity === 'critical').length, label: 'High Priority', color: 'text-orange-400' },
							{ value: '$3,750', label: 'Total Rewards', color: 'text-cyan-400' }
						] as stat}
							<div
								class="rounded-2xl border border-purple-500/20 bg-slate-800/50 p-6 text-center transition-all duration-300 hover:scale-105 hover:border-cyan-400/40"
							>
								<div class="glow mb-2 text-4xl font-black {stat.color}">{stat.value}</div>
								<div class="text-sm font-semibold uppercase tracking-wider text-gray-400">
									{stat.label}
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<!-- CTA Section -->
		<div class="mt-20 text-center">
			<div
				class="card-glow relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 p-16 shadow-2xl"
			>
				<div class="absolute inset-0 overflow-hidden">
					<div
						class="absolute left-1/4 top-0 h-64 w-64 animate-pulse-slow rounded-full bg-white/10 blur-3xl"
					></div>
					<div
						class="absolute bottom-0 right-1/4 h-64 w-64 animate-pulse-slow rounded-full bg-white/10 blur-3xl"
						style="animation-delay: 2s;"
					></div>
				</div>
				<div class="relative">
					<h2 class="glow mb-6 text-4xl font-black text-white md:text-5xl">
						Ready to secure your site?
					</h2>
					<p class="mx-auto mb-10 max-w-3xl text-xl leading-relaxed text-white/90">
						Start identifying issues, contribute to open source security, and make the web a safer
						place with cutting-edge tools.
					</p>
					<button
						class="transform rounded-full bg-white px-10 py-5 text-xl font-black text-purple-600 shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-gray-100"
					>
						Get Started Free
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Footer -->
	<footer
		class="relative mt-24 border-t border-purple-500/30 bg-slate-950/80 py-12 backdrop-blur-lg"
	>
		<div class="container mx-auto px-4 text-center">
			<p class="mb-3 text-lg text-gray-300">
				&copy; 2024 FixYour-ish. Making the web more secure, one fix at a time.
			</p>
			<p class="font-semibold text-purple-400">
				Open source bug bounties &bull; Security research &bull; Community driven
			</p>
		</div>
	</footer>
</main>

<style>
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
