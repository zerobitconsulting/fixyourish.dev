<script lang="ts">
	import { onMount } from 'svelte';

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

	let searchQuery = '';
	let filteredBounties = mockBugBounties;
	let visible = false;

	$: {
		if (searchQuery.trim() === '') {
			filteredBounties = mockBugBounties;
		} else {
			filteredBounties = mockBugBounties.filter(
				(bounty) =>
					bounty.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
					bounty.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
					bounty.severity.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}
	}

	onMount(() => {
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

<main class="min-h-screen bg-slate-900 overflow-hidden">
	<!-- Animated Background -->
	<div class="fixed inset-0 overflow-hidden pointer-events-none">
		<div
			class="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow"
		></div>
		<div
			class="absolute top-1/2 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow"
			style="animation-delay: 2s;"
		></div>
		<div
			class="absolute bottom-20 right-1/3 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow"
			style="animation-delay: 4s;"
		></div>
	</div>

	<!-- Hero Section -->
	<div class="relative">
		<div
			class="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-pink-600/20 to-cyan-600/30 backdrop-blur-sm"
		></div>
		<div class="container mx-auto px-4 py-24 md:py-32 relative">
			<div
				class="max-w-5xl mx-auto text-center transition-all duration-1000 transform"
				class:opacity-0={!visible}
				class:translate-y-10={!visible}
				class:opacity-100={visible}
				class:translate-y-0={visible}
			>
				<h1
					class="text-6xl md:text-8xl font-black mb-6 text-gradient glow animate-float"
					style="font-family: system-ui, -apple-system, sans-serif;"
				>
					Fix Your<span class="text-yellow-400">-ish</span>
				</h1>
				<p class="text-2xl md:text-3xl mb-6 text-cyan-300 font-bold tracking-wide">
					Identify issues that need fixing on your site
				</p>
				<p class="text-lg md:text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
					Discover vulnerabilities, earn bug bounties, and contribute to open source security with
					style
				</p>

				<!-- Glowing Button -->
				<button
					class="mt-8 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xl font-bold hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-110 card-glow shadow-2xl"
				>
					Get Started Now
				</button>
			</div>
		</div>
	</div>

	<!-- Features Section -->
	<div class="container mx-auto px-4 py-16 relative">
		<div class="grid md:grid-cols-3 gap-8 mb-20">
			{#each [
				{ icon: '🔍', title: 'Find Issues', desc: 'Scan and identify security vulnerabilities, performance issues, and bugs with advanced detection algorithms.' },
				{ icon: '💰', title: 'Bug Bounties', desc: 'Browse open source bug bounty programs and earn rewards by finding and reporting security issues.' },
				{ icon: '🛠️', title: 'Get Fixed', desc: 'Access detailed remediation guides and best practices to fix identified issues quickly and securely.' }
			] as feature, i}
				<div
					class="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/30 hover:border-cyan-400/60 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
					style="animation-delay: {i * 200}ms;"
				>
					<!-- Shimmer Effect -->
					<div
						class="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500"
					>
						<div
							class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"
						></div>
					</div>

					<div class="relative">
						<div class="text-6xl mb-6 animate-float" style="animation-delay: {i * 300}ms;">
							{feature.icon}
						</div>
						<h3 class="text-2xl font-bold mb-4 text-cyan-300">{feature.title}</h3>
						<p class="text-gray-300 leading-relaxed">{feature.desc}</p>
					</div>
				</div>
			{/each}
		</div>

		<!-- Bug Bounty Search Section -->
		<div class="max-w-7xl mx-auto">
			<div
				class="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-3xl p-10 border border-purple-500/40 shadow-2xl"
			>
				<h2 class="text-4xl md:text-5xl font-bold mb-6 text-gradient">
					Open Source Bug Bounty Programs
				</h2>
				<p class="text-gray-300 mb-8 text-lg leading-relaxed">
					Search through available bug bounty opportunities in open source projects. Find
					vulnerabilities, help secure the ecosystem, and earn rewards.
				</p>

				<!-- Search Bar -->
				<div class="mb-10">
					<div class="relative group">
						<input
							type="text"
							placeholder="Search by project, title, or severity..."
							bind:value={searchQuery}
							class="w-full px-8 py-6 text-lg bg-slate-800/80 border-2 border-purple-500/50 rounded-2xl focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/30 transition-all text-white placeholder-gray-400 group-hover:border-purple-400"
						/>
						<div
							class="absolute right-6 top-1/2 transform -translate-y-1/2 text-purple-400 group-focus-within:text-cyan-400 transition-colors"
						>
							<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width={2}
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</div>
					</div>
				</div>

				<!-- Results -->
				<div class="space-y-6">
					{#if filteredBounties.length === 0}
						<div class="text-center py-20">
							<p class="text-2xl text-purple-300 font-bold">No bug bounties found</p>
							<p class="text-gray-400 mt-3">Try adjusting your search criteria</p>
						</div>
					{:else}
						{#each filteredBounties as bounty, i}
							<div
								class="group bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-8 hover:border-cyan-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/30 transform hover:scale-[1.02]"
								style="animation: fadeInUp 0.5s ease-out {i * 100}ms both;"
							>
								<div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
									<div class="flex-1">
										<h3 class="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
											{bounty.title}
										</h3>
										<p class="text-gray-300 mb-4 text-lg">
											Project: <span class="font-semibold text-purple-300">{bounty.project}</span>
										</p>
										<div class="flex flex-wrap gap-3">
											<span
												class="px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r {getSeverityColor(
													bounty.severity
												)} border-2 shadow-lg"
											>
												{bounty.severity.toUpperCase()}
											</span>
											<span class="px-4 py-2 rounded-full text-sm font-bold {getStatusColor(bounty.status)} shadow-lg">
												{bounty.status.charAt(0).toUpperCase() + bounty.status.slice(1)}
											</span>
										</div>
									</div>
									<div class="flex flex-col items-end gap-4">
										<div class="text-4xl font-black text-gradient glow">
											{bounty.reward}
										</div>
										<button
											class="px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-110 shadow-xl {bounty.status ===
											'open'
												? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white card-glow'
												: 'bg-gray-700 text-gray-400 cursor-not-allowed'}"
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
				<div class="mt-12 pt-8 border-t border-purple-500/30">
					<div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
						{#each [
							{ value: mockBugBounties.length, label: 'Total Bounties', color: 'text-purple-400' },
							{
								value: mockBugBounties.filter((b) => b.status === 'open').length,
								label: 'Open',
								color: 'text-green-400'
							},
							{
								value: mockBugBounties.filter((b) => b.severity === 'high' || b.severity === 'critical')
									.length,
								label: 'High Priority',
								color: 'text-orange-400'
							},
							{ value: '$3,750', label: 'Total Rewards', color: 'text-cyan-400' }
						] as stat}
							<div
								class="text-center p-6 bg-slate-800/50 rounded-2xl border border-purple-500/20 hover:border-cyan-400/40 transition-all duration-300 hover:scale-105"
							>
								<div class="text-4xl font-black {stat.color} mb-2 glow">{stat.value}</div>
								<div class="text-sm text-gray-400 uppercase tracking-wider font-semibold">
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
				class="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-3xl shadow-2xl p-16 card-glow"
			>
				<!-- Animated Background Orbs -->
				<div class="absolute inset-0 overflow-hidden">
					<div
						class="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse-slow"
					></div>
					<div
						class="absolute bottom-0 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse-slow"
						style="animation-delay: 2s;"
					></div>
				</div>

				<div class="relative">
					<h2 class="text-4xl md:text-5xl font-black text-white mb-6 glow">
						Ready to secure your site?
					</h2>
					<p class="text-white/90 text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
						Start identifying issues, contribute to open source security, and make the web a safer
						place with cutting-edge tools.
					</p>
					<button
						class="bg-white text-purple-600 px-10 py-5 rounded-full font-black text-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl transform hover:scale-110"
					>
						Get Started Free
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Footer -->
	<footer class="relative bg-slate-950/80 backdrop-blur-lg border-t border-purple-500/30 py-12 mt-24">
		<div class="container mx-auto px-4 text-center">
			<p class="mb-3 text-gray-300 text-lg">
				&copy; 2024 FixYour-ish. Making the web more secure, one fix at a time.
			</p>
			<p class="text-purple-400 font-semibold">
				Open source bug bounties • Security research • Community driven
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
