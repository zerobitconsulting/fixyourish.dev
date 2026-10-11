<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Attachment } from 'svelte/attachments';

	type Severity = 'crit' | 'high' | 'med' | 'low';

	interface Finding {
		title: string;
		area: string;
		severity: Severity;
	}

	const EARLY_ACCESS_HREF = 'https://github.com/zerobitconsulting/fixyourish.dev';

	const findings: Finding[] = [
		{ title: 'Open redirect on /login?next=', area: 'security', severity: 'crit' },
		{ title: 'No Content-Security-Policy header', area: 'security', severity: 'high' },
		{ title: 'TLS 1.0 still negotiated', area: 'security', severity: 'high' },
		{ title: 'hero.png ships at 4.2 MB', area: 'perf', severity: 'med' },
		{ title: '12 images missing alt text', area: 'a11y', severity: 'med' },
		{ title: 'No meta description on 9 pages', area: 'seo', severity: 'low' }
	];

	const tickerItems = [
		'missing CSP',
		'mixed content',
		'cookie without HttpOnly',
		'4.2 MB hero image',
		'exposed /.git',
		'render-blocking JS',
		'contrast 2.1:1',
		'jQuery 1.12',
		'open redirect',
		'no HSTS',
		'broken links ×31',
		'unlabeled form field'
	];

	const steps = [
		{
			n: '01',
			title: 'Point it at a URL',
			body: 'Drop in a domain. We crawl it the way a curious attacker and an impatient user would, at the same time.'
		},
		{
			n: '02',
			title: 'Get a punch list',
			body: 'Not a 90-page PDF. A ranked list of what is actually wrong, why it matters, and how bad it really is.'
		},
		{
			n: '03',
			title: 'Fix it. Check it off.',
			body: 'Every finding ships with a concrete fix (header, config, or code) and a re-scan to prove it is gone.'
		}
	];

	const checks = [
		{
			title: 'Security',
			items: [
				'Security headers & CSP',
				'TLS & cookie flags',
				'Exposed files & secrets',
				'Outdated libraries'
			]
		},
		{
			title: 'Performance',
			items: ['Oversized assets', 'Render-blocking resources', 'Cache headers', 'Core Web Vitals']
		},
		{
			title: 'Accessibility',
			items: ['Alt text & labels', 'Color contrast', 'Focus order', 'Landmarks & headings']
		},
		{
			title: 'Hygiene',
			items: ['Broken links', 'Meta & social tags', 'Mixed content', 'Sitemap & robots']
		}
	];

	const severityStyles: Record<Severity, string> = {
		crit: 'bg-pen text-paper',
		high: 'border border-pen text-pen',
		med: 'border border-ink/40 text-ink-soft',
		low: 'border border-ink/20 text-ink-soft/80'
	};

	const STRIKE_START = 1.4;
	const STRIKE_GAP = 0.6;
	const doneAt = STRIKE_START + findings.length * STRIKE_GAP;

	const year = new Date().getFullYear();

	/** Fade sections up as they scroll into view; content stays visible without JS. */
	const reveal: Attachment<HTMLElement> = (node) => {
		if (typeof IntersectionObserver === 'undefined') return;
		if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

		node.style.opacity = '0';
		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				node.style.opacity = '';
				node.classList.add('animate-rise');
				observer.disconnect();
			},
			{ rootMargin: '0px 0px -10% 0px' }
		);
		observer.observe(node);
		return () => observer.disconnect();
	};
</script>

<svelte:head>
	<title>FixYour-ish · Your site works. -ish.</title>
	<meta
		name="description"
		content="FixYour-ish scans your site for security, performance, and accessibility issues and hands you a ranked punch list of fixes."
	/>
</svelte:head>

<div class="min-h-screen overflow-x-clip paper-texture">
	<!-- Nav -->
	<header class="border-b border-rule">
		<nav class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
			<a href={resolve('/')} class="font-display text-2xl tracking-tight">
				fixyour<span class="text-pen italic">-ish</span>
			</a>
			<div class="flex items-center gap-6 text-xs tracking-widest uppercase">
				<a href="#how" class="hidden hover:text-pen sm:inline">How it works</a>
				<a href="#checks" class="hidden hover:text-pen sm:inline">What we check</a>
				<a
					href="#early-access"
					class="border border-ink px-3 py-2 transition-colors hover:bg-ink hover:text-paper"
				>
					Early access
				</a>
			</div>
		</nav>
	</header>

	<main>
		<!-- Hero -->
		<section
			class="mx-auto grid max-w-6xl items-center gap-14 px-5 pt-16 pb-20 md:px-8 lg:grid-cols-[1.15fr_1fr] lg:pt-24 lg:pb-28"
		>
			<div>
				<p class="animate-rise text-xs tracking-[0.25em] text-ink-soft uppercase">
					// a punch list for your website
				</p>

				<h1
					class="mt-6 animate-rise font-display text-[clamp(3.4rem,9vw,7.25rem)] leading-[0.92] tracking-tight"
					style="animation-delay: 120ms"
				>
					Your site works.
					<span class="relative inline-block text-pen italic">
						-ish.
						<svg
							class="absolute -bottom-3 left-0 w-full overflow-visible"
							viewBox="0 0 200 24"
							fill="none"
							aria-hidden="true"
						>
							<path
								class="animate-draw"
								style="stroke-dasharray: 1; animation-delay: 900ms"
								pathLength="1"
								d="M4 15 C 40 6, 90 20, 130 11 S 185 8, 196 14"
								stroke="currentColor"
								stroke-width="5"
								stroke-linecap="round"
							/>
						</svg>
					</span>
				</h1>

				<p
					class="mt-10 max-w-xl animate-rise text-[15px] leading-relaxed text-ink-soft"
					style="animation-delay: 260ms"
				>
					FixYour-ish finds the <span class="marker text-ink"
						>security, performance, and accessibility</span
					>
					issues hiding in your site, then hands you the fix. No 90-page PDF. No dashboard you'll never
					open again.
				</p>

				<div
					class="mt-10 flex animate-rise flex-wrap items-center gap-4"
					style="animation-delay: 380ms"
				>
					<a
						href="#early-access"
						class="group inline-flex items-center gap-3 bg-ink px-6 py-4 text-sm font-medium tracking-wide text-paper shadow-[5px_5px_0_var(--color-pen)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0_var(--color-pen)]"
					>
						Get early access
						<span aria-hidden="true" class="transition-transform group-hover:translate-x-1">→</span>
					</a>
					<a
						href="#how"
						class="text-sm underline decoration-rule decoration-2 underline-offset-[6px] hover:decoration-pen"
					>
						See how it works
					</a>
				</div>
			</div>

			<!-- Sample report card -->
			<div class="relative animate-rise" style="animation-delay: 450ms">
				<div
					class="relative rotate-[1.2deg] border border-ink/80 bg-[#fbf9f4] shadow-[10px_10px_0_var(--color-ink)]"
				>
					<div
						class="flex items-center justify-between border-b border-dashed border-ink/40 px-5 py-3 text-[11px] tracking-widest text-ink-soft uppercase"
					>
						<span>Sample report</span>
						<span>example.com</span>
					</div>

					<ul class="divide-y divide-rule/70 px-5">
						{#each findings as finding, i (finding.title)}
							{@const delay = STRIKE_START + i * STRIKE_GAP}
							<li class="flex items-center gap-3 py-3.5">
								<span
									class="relative grid h-4 w-4 shrink-0 place-items-center border border-ink/70"
									aria-hidden="true"
								>
									<svg
										class="h-3.5 w-3.5 animate-tick text-fixed"
										style="animation-delay: {delay + 0.35}s"
										viewBox="0 0 16 16"
										fill="none"
									>
										<path
											d="M3 8.5 6.5 12 13 4"
											stroke="currentColor"
											stroke-width="2.4"
											stroke-linecap="round"
										/>
									</svg>
								</span>
								<span class="relative min-w-0 flex-1 truncate text-[13px]">
									{finding.title}
									<span
										class="absolute top-1/2 left-0 h-[2px] w-full origin-left animate-strike bg-pen"
										style="animation-delay: {delay}s"
										aria-hidden="true"
									></span>
								</span>
								<span class="hidden text-[10px] tracking-widest text-ink-soft uppercase sm:inline">
									{finding.area}
								</span>
								<span
									class="w-11 shrink-0 py-0.5 text-center text-[10px] font-semibold tracking-widest uppercase {severityStyles[
										finding.severity
									]}"
								>
									{finding.severity}
								</span>
							</li>
						{/each}
					</ul>

					<div
						class="flex items-end justify-between border-t border-dashed border-ink/40 px-5 py-4"
					>
						<div class="text-[11px] tracking-widest text-ink-soft uppercase">Site score</div>
						<div class="flex items-baseline gap-3 font-display">
							<span class="relative text-3xl text-ink-soft">
								41
								<span
									class="absolute top-1/2 left-[-4px] h-[2px] w-[calc(100%+8px)] origin-left -rotate-12 animate-strike bg-pen"
									style="animation-delay: {doneAt}s"
									aria-hidden="true"
								></span>
							</span>
							<span
								class="animate-rise text-5xl text-pen italic"
								style="animation-delay: {doneAt + 0.3}s"
							>
								98
							</span>
						</div>
					</div>

					<!-- Stamp -->
					<div
						class="pointer-events-none absolute -top-6 -right-4 animate-stamp border-[3px] border-fixed px-3 py-1 font-display text-3xl tracking-wide text-fixed uppercase mix-blend-multiply md:-right-8"
						style="animation-delay: {doneAt + 0.6}s"
						aria-hidden="true"
					>
						Fixed
					</div>
				</div>
			</div>
		</section>

		<!-- Ticker -->
		<div
			class="-rotate-1 border-y-2 border-ink bg-ink py-3 text-paper select-none"
			aria-label="Common issues we find"
		>
			<div class="flex w-max animate-marquee gap-10 text-sm whitespace-nowrap">
				{#each [0, 1] as copy (copy)}
					<div class="flex gap-10" aria-hidden={copy === 1}>
						{#each tickerItems as item (item)}
							<span class="flex items-center gap-10">
								<span class="line-through decoration-pen decoration-2">{item}</span>
								<span class="text-pen">✕</span>
							</span>
						{/each}
					</div>
				{/each}
			</div>
		</div>

		<!-- How it works -->
		<section id="how" class="mx-auto max-w-6xl scroll-mt-8 px-5 py-24 md:px-8 lg:py-32">
			<div class="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
				<div {@attach reveal}>
					<p class="text-xs tracking-[0.25em] text-pen uppercase">How it works</p>
					<h2 class="mt-4 font-display text-5xl leading-none md:text-6xl">
						Three steps.<br /><span class="italic">Zero</span> hand-wringing.
					</h2>
				</div>

				<ol class="border-t border-ink">
					{#each steps as step (step.n)}
						<li
							{@attach reveal}
							class="group grid grid-cols-[auto_1fr] gap-6 border-b border-ink py-8 md:gap-10"
						>
							<span
								class="font-display text-5xl text-rule transition-colors group-hover:text-pen md:text-6xl"
							>
								{step.n}
							</span>
							<div>
								<h3 class="text-lg font-semibold">{step.title}</h3>
								<p class="mt-2 max-w-md text-sm leading-relaxed text-ink-soft">{step.body}</p>
							</div>
						</li>
					{/each}
				</ol>
			</div>
		</section>

		<!-- What we check -->
		<section id="checks" class="scroll-mt-8 border-y border-rule bg-paper-deep/60">
			<div class="mx-auto max-w-6xl px-5 py-24 md:px-8 lg:py-28">
				<div {@attach reveal} class="flex flex-wrap items-end justify-between gap-6">
					<h2 class="font-display text-5xl leading-none md:text-6xl">
						What we <span class="text-pen italic">poke at.</span>
					</h2>
					<p class="max-w-sm text-sm leading-relaxed text-ink-soft">
						The boring, important stuff that slips through code review and quietly costs you users,
						rankings, or a breach disclosure.
					</p>
				</div>

				<div class="mt-14 grid gap-px border border-ink bg-ink sm:grid-cols-2 lg:grid-cols-4">
					{#each checks as check, i (check.title)}
						<div
							{@attach reveal}
							class="bg-paper p-7 transition-colors hover:bg-[#fbf9f4]"
							style="animation-delay: {i * 90}ms"
						>
							<div class="flex items-baseline justify-between">
								<h3 class="font-display text-3xl">{check.title}</h3>
								<span class="text-xs text-ink-soft">0{i + 1}</span>
							</div>
							<ul class="mt-6 space-y-2.5 text-[13px] text-ink-soft">
								{#each check.items as item (item)}
									<li class="flex gap-2.5">
										<span class="text-pen" aria-hidden="true">→</span>{item}
									</li>
								{/each}
							</ul>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- Roadmap: bounties -->
		<section class="mx-auto max-w-6xl px-5 py-24 md:px-8 lg:py-32">
			<div
				{@attach reveal}
				class="relative grid gap-10 border-2 border-dashed border-ink/50 p-8 md:grid-cols-[auto_1fr] md:p-12"
			>
				<span
					class="absolute -top-3.5 left-8 bg-paper px-3 text-xs tracking-[0.25em] text-pen uppercase"
				>
					On the roadmap
				</span>
				<div class="font-display text-7xl leading-none text-pen italic md:text-8xl">$</div>
				<div>
					<h2 class="font-display text-4xl leading-tight md:text-5xl">
						Open source, paid to be less <span class="italic">-ish</span>.
					</h2>
					<p class="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft">
						Next up: a bounty board where open source maintainers post real issues with rewards
						attached, and researchers get paid to find and fix them, with the same punch-list
						workflow from report to merged patch.
					</p>
				</div>
			</div>
		</section>

		<!-- CTA -->
		<section id="early-access" class="scroll-mt-8 bg-ink text-paper">
			<div
				class="mx-auto flex max-w-6xl flex-col items-start gap-10 px-5 py-24 md:px-8 lg:flex-row lg:items-end lg:justify-between lg:py-32"
			>
				<div {@attach reveal}>
					<p class="text-xs tracking-[0.25em] text-highlight uppercase">Early access</p>
					<h2 class="mt-4 font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.92]">
						Stop shipping<br /><span class="text-pen italic">-ish.</span>
					</h2>
					<p class="mt-6 max-w-md text-sm leading-relaxed text-paper/70">
						We're onboarding a small batch of sites first. Follow along to be first in line when
						scans open up.
					</p>
				</div>
				<a
					{@attach reveal}
					href={EARLY_ACCESS_HREF}
					target="_blank"
					rel="noopener noreferrer"
					class="group inline-flex shrink-0 items-center gap-3 bg-paper px-7 py-5 text-sm font-medium tracking-wide text-ink shadow-[6px_6px_0_var(--color-pen)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_var(--color-pen)]"
				>
					Follow on GitHub
					<span aria-hidden="true" class="transition-transform group-hover:translate-x-1">→</span>
				</a>
			</div>
		</section>
	</main>

	<footer class="border-t border-rule">
		<div
			class="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between md:px-8"
		>
			<span>
				&copy; {year}
				<span class="font-display text-base text-ink"
					>fixyour<span class="text-pen italic">-ish</span></span
				>
			</span>
			<span>Making the web a little less -ish, one fix at a time.</span>
		</div>
	</footer>
</div>
