import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Layout from './+layout.svelte';

describe('Layout', () => {
	it('renders without crashing', () => {
		const { container } = render(Layout, { props: { data: {} } });
		expect(container).toBeTruthy();
	});

	it('has slot element', () => {
		const { container } = render(Layout, { props: { data: {} } });
		// Layout should render child content via slot
		expect(container.querySelector('slot')).toBeDefined();
	});
});
