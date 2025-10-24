import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Page from './+page.svelte';

describe('Landing Page', () => {
	it('renders the page title with "Fix Your"', () => {
		render(Page);
		expect(screen.getByText('Fix Your', { exact: false })).toBeInTheDocument();
	});

	it('renders the hero description', () => {
		render(Page);
		expect(screen.getByText(/Identify issues that need fixing on your site/i)).toBeInTheDocument();
	});

	it('renders all three feature cards', () => {
		render(Page);
		expect(screen.getByText('Find Issues')).toBeInTheDocument();
		expect(screen.getByText('Bug Bounties')).toBeInTheDocument();
		expect(screen.getByText('Get Fixed')).toBeInTheDocument();
	});

	it('renders the search input', () => {
		render(Page);
		const searchInput = screen.getByPlaceholderText(/Search by project, title, or severity/i);
		expect(searchInput).toBeInTheDocument();
	});

	it('displays all bug bounties by default', () => {
		render(Page);
		expect(screen.getByText('XSS vulnerability in user profile page')).toBeInTheDocument();
		expect(screen.getByText('SQL injection in search endpoint')).toBeInTheDocument();
		expect(screen.getByText('CSRF token validation bypass')).toBeInTheDocument();
	});

	it('filters bug bounties based on search query', async () => {
		render(Page);
		const searchInput = screen.getByPlaceholderText(/Search by project, title, or severity/i);

		await fireEvent.input(searchInput, { target: { value: 'XSS' } });

		expect(screen.getByText('XSS vulnerability in user profile page')).toBeInTheDocument();
		expect(screen.queryByText('SQL injection in search endpoint')).not.toBeInTheDocument();
	});

	it('shows no results message when search has no matches', async () => {
		render(Page);
		const searchInput = screen.getByPlaceholderText(/Search by project, title, or severity/i);

		await fireEvent.input(searchInput, { target: { value: 'nonexistent' } });

		expect(screen.getByText('No bug bounties found')).toBeInTheDocument();
	});

	it('filters by severity level', async () => {
		render(Page);
		const searchInput = screen.getByPlaceholderText(/Search by project, title, or severity/i);

		await fireEvent.input(searchInput, { target: { value: 'critical' } });

		expect(screen.getByText('SQL injection in search endpoint')).toBeInTheDocument();
		expect(screen.getByText('Directory traversal vulnerability')).toBeInTheDocument();
	});

	it('filters by project name', async () => {
		render(Page);
		const searchInput = screen.getByPlaceholderText(/Search by project, title, or severity/i);

		await fireEvent.input(searchInput, { target: { value: 'ReactDashboard' } });

		expect(screen.getByText('SQL injection in search endpoint')).toBeInTheDocument();
		expect(screen.queryByText('XSS vulnerability in user profile page')).not.toBeInTheDocument();
	});

	it('displays stats dashboard', () => {
		render(Page);
		expect(screen.getByText('Total Bounties')).toBeInTheDocument();
		expect(screen.getByText('High Priority')).toBeInTheDocument();
		expect(screen.getByText('Total Rewards')).toBeInTheDocument();
	});

	it('has Get Started CTA button', () => {
		render(Page);
		const buttons = screen.getAllByText(/Get Started/i);
		expect(buttons.length).toBeGreaterThan(0);
	});

	it('renders footer with copyright', () => {
		render(Page);
		expect(screen.getByText(/FixYour-ish/i)).toBeInTheDocument();
	});
});
