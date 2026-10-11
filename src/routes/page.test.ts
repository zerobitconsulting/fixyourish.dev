import { render, screen, within } from '@testing-library/svelte';
import { describe, it, expect, vi, afterEach } from 'vitest';
import Page from './+page.svelte';

describe('Landing Page', () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('renders the hero headline', () => {
		render(Page);
		const heading = screen.getByRole('heading', { level: 1 });
		expect(heading).toHaveTextContent(/Your site works\./);
		expect(heading).toHaveTextContent(/-ish\./);
	});

	it('renders the sample report findings', () => {
		render(Page);
		expect(screen.getByText('Sample report')).toBeInTheDocument();
		expect(screen.getByText('Open redirect on /login?next=')).toBeInTheDocument();
		expect(screen.getByText('No Content-Security-Policy header')).toBeInTheDocument();
		expect(screen.getByText('12 images missing alt text')).toBeInTheDocument();
	});

	it('renders the three how-it-works steps', () => {
		render(Page);
		const section = document.getElementById('how')!;
		expect(within(section).getAllByRole('listitem')).toHaveLength(3);
		expect(within(section).getByText('Point it at a URL')).toBeInTheDocument();
		expect(within(section).getByText('Get a punch list')).toBeInTheDocument();
		expect(within(section).getByText('Fix it. Check it off.')).toBeInTheDocument();
	});

	it('renders every check category', () => {
		render(Page);
		const section = document.getElementById('checks')!;
		for (const title of ['Security', 'Performance', 'Accessibility', 'Hygiene']) {
			expect(within(section).getByRole('heading', { name: title })).toBeInTheDocument();
		}
	});

	it('links the hero CTA to the early access section', () => {
		render(Page);
		const cta = screen.getByRole('link', { name: /Get early access/i });
		expect(cta).toHaveAttribute('href', '#early-access');
		expect(document.getElementById('early-access')).toBeInTheDocument();
	});

	it('opens the external CTA safely in a new tab', () => {
		render(Page);
		const link = screen.getByRole('link', { name: /Follow on GitHub/i });
		expect(link).toHaveAttribute('target', '_blank');
		expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
	});

	it('hides the duplicated ticker copy from assistive tech', () => {
		render(Page);
		const ticker = screen.getByLabelText('Common issues we find');
		expect(ticker.querySelectorAll('[aria-hidden="true"] > span').length).toBeGreaterThan(0);
	});

	it('renders the footer with the current year', () => {
		render(Page);
		expect(screen.getByRole('contentinfo')).toHaveTextContent(String(new Date().getFullYear()));
	});

	it('reveals sections when they scroll into view', () => {
		const observers: { cb: IntersectionObserverCallback; disconnect: () => void }[] = [];
		vi.stubGlobal(
			'IntersectionObserver',
			class {
				disconnect = vi.fn();
				observe = vi.fn();
				constructor(cb: IntersectionObserverCallback) {
					observers.push({ cb, disconnect: this.disconnect });
				}
			}
		);

		render(Page);
		const heading = screen.getByRole('heading', { name: /Three steps/i }).parentElement!;
		expect(heading.style.opacity).toBe('0');

		const index = observers.length - 1;
		for (const { cb } of observers) {
			cb([{ isIntersecting: false } as IntersectionObserverEntry], {} as IntersectionObserver);
		}
		expect(heading.style.opacity).toBe('0');

		for (const { cb } of observers) {
			cb([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
		}
		expect(heading.style.opacity).toBe('');
		expect(heading).toHaveClass('animate-rise');
		expect(observers[index].disconnect).toHaveBeenCalled();
	});

	it('skips reveal animations when reduced motion is preferred', () => {
		vi.stubGlobal(
			'IntersectionObserver',
			class {
				observe() {}
				disconnect() {}
			}
		);
		vi.stubGlobal('matchMedia', () => ({ matches: true }));

		render(Page);
		const heading = screen.getByRole('heading', { name: /Three steps/i }).parentElement!;
		expect(heading.style.opacity).toBe('');
	});
});
