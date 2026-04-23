import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Layout from './+layout.svelte';

describe('Layout', () => {
	it('renders without crashing', () => {
		const { container } = render(Layout);
		expect(container).toBeTruthy();
	});
});
