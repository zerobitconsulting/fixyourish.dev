import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import Page from './+page.svelte';

describe('Landing Page', () => {
	it('renders the page title', () => {
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
		expect(
			screen.getByPlaceholderText(/Search by project, title, or severity/i)
		).toBeInTheDocument();
	});

	it('displays all bug bounties by default', () => {
		render(Page);
		expect(screen.getByText('XSS vulnerability in user profile page')).toBeInTheDocument();
		expect(screen.getByText('SQL injection in search endpoint')).toBeInTheDocument();
		expect(screen.getByText('CSRF token validation bypass')).toBeInTheDocument();
	});

	it('filters bug bounties on search input', async () => {
		const user = userEvent.setup();
		render(Page);
		const input = screen.getByPlaceholderText(/Search by project, title, or severity/i);

		await user.type(input, 'XSS');

		expect(screen.getByText('XSS vulnerability in user profile page')).toBeInTheDocument();
		expect(screen.queryByText('SQL injection in search endpoint')).not.toBeInTheDocument();
	});

	it('shows empty state when search has no matches', async () => {
		const user = userEvent.setup();
		render(Page);
		const input = screen.getByPlaceholderText(/Search by project, title, or severity/i);

		await user.type(input, 'nonexistent_xyz');

		expect(screen.getByText('No bug bounties found')).toBeInTheDocument();
	});

	it('filters by severity level', async () => {
		const user = userEvent.setup();
		render(Page);
		const input = screen.getByPlaceholderText(/Search by project, title, or severity/i);

		await user.type(input, 'critical');

		expect(screen.getByText('SQL injection in search endpoint')).toBeInTheDocument();
		expect(screen.getByText('Directory traversal vulnerability')).toBeInTheDocument();
		expect(screen.queryByText('XSS vulnerability in user profile page')).not.toBeInTheDocument();
	});

	it('filters by project name', async () => {
		const user = userEvent.setup();
		render(Page);
		const input = screen.getByPlaceholderText(/Search by project, title, or severity/i);

		await user.type(input, 'ReactDashboard');

		expect(screen.getByText('SQL injection in search endpoint')).toBeInTheDocument();
		expect(screen.queryByText('XSS vulnerability in user profile page')).not.toBeInTheDocument();
	});

	it('displays stats dashboard', () => {
		render(Page);
		expect(screen.getByText('Total Bounties')).toBeInTheDocument();
		expect(screen.getByText('High Priority')).toBeInTheDocument();
		expect(screen.getByText('Total Rewards')).toBeInTheDocument();
	});

	it('renders Get Started buttons', () => {
		render(Page);
		expect(screen.getAllByText(/Get Started/i).length).toBeGreaterThan(0);
	});

	it('renders footer', () => {
		render(Page);
		expect(screen.getByText(/FixYour-ish/i)).toBeInTheDocument();
	});
});
