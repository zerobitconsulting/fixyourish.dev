import { describe, it, expect, vi } from 'vitest';
import { handle } from './hooks.server';

describe('Security Headers', () => {
	it('sets OWASP security headers', async () => {
		const mockEvent = {
			request: new Request('http://localhost:5173'),
			route: { id: null },
			params: {},
			locals: {},
			url: new URL('http://localhost:5173')
		} as any;

		const mockResolve = vi.fn(async () => new Response('test'));

		const response = await handle({ event: mockEvent, resolve: mockResolve });

		// A1: Broken Access Control
		expect(response.headers.get('X-Frame-Options')).toBe('DENY');
		expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff');

		// A2: Cryptographic Failures - HSTS
		expect(response.headers.get('Strict-Transport-Security')).toBe(
			'max-age=31536000; includeSubDomains; preload'
		);

		// A3: Injection - XSS Protection
		expect(response.headers.get('X-XSS-Protection')).toBe('1; mode=block');

		// Content Security Policy
		const csp = response.headers.get('Content-Security-Policy');
		expect(csp).toBeTruthy();
		expect(csp).toContain("default-src 'self'");
		expect(csp).toContain("frame-ancestors 'none'");
		expect(csp).toContain('upgrade-insecure-requests');

		// Referrer Policy
		expect(response.headers.get('Referrer-Policy')).toBe('strict-origin-when-cross-origin');

		// Permissions Policy
		expect(response.headers.get('Permissions-Policy')).toContain('geolocation=()');
		expect(response.headers.get('Permissions-Policy')).toContain('microphone=()');
		expect(response.headers.get('Permissions-Policy')).toContain('camera=()');
	});

	it('calls the resolve function', async () => {
		const mockEvent = {
			request: new Request('http://localhost:5173'),
			route: { id: null },
			params: {},
			locals: {},
			url: new URL('http://localhost:5173')
		} as any;

		const mockResolve = vi.fn(async () => new Response('test'));

		await handle({ event: mockEvent, resolve: mockResolve });

		expect(mockResolve).toHaveBeenCalledWith(mockEvent);
	});

	it('preserves the response body', async () => {
		const mockEvent = {
			request: new Request('http://localhost:5173'),
			route: { id: null },
			params: {},
			locals: {},
			url: new URL('http://localhost:5173')
		} as any;

		const testBody = 'test response body';
		const mockResolve = vi.fn(async () => new Response(testBody));

		const response = await handle({ event: mockEvent, resolve: mockResolve });
		const body = await response.text();

		expect(body).toBe(testBody);
	});
});
