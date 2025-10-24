# FixYour-ish

A sleek, modern platform for identifying website issues and discovering open source bug bounty opportunities.

[![CI - Test, Lint & Build](https://github.com/zerobitconsulting/fixyourish.dev/actions/workflows/ci.yml/badge.svg)](https://github.com/zerobitconsulting/fixyourish.dev/actions/workflows/ci.yml)
[![CodeQL Security Scan](https://github.com/zerobitconsulting/fixyourish.dev/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/zerobitconsulting/fixyourish.dev/actions/workflows/codeql-analysis.yml)
[![Security Scan & OWASP](https://github.com/zerobitconsulting/fixyourish.dev/actions/workflows/security-scan.yml/badge.svg)](https://github.com/zerobitconsulting/fixyourish.dev/actions/workflows/security-scan.yml)

## Features

- **Find Issues**: Scan and identify security vulnerabilities, performance issues, and bugs in your website
- **Bug Bounties**: Browse open source bug bounty programs and earn rewards
- **Get Fixed**: Access detailed remediation guides and best practices

## Tech Stack

- **SvelteKit** - Modern, fast web framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS with custom animations
- **Vite** - Lightning-fast build tool
- **Vitest** - Unit testing with 70%+ coverage requirement

## Design Features

- Dark theme with vibrant gradients (purple, cyan, pink)
- Smooth animations and transitions
- Glowing effects and shimmer animations
- Floating elements and pulsing background orbs
- Responsive design for all devices
- Interactive search functionality

## Security

This project implements **OWASP Top 10** security best practices:

### Security Headers
All responses include comprehensive security headers:
- `Content-Security-Policy` - XSS and injection protection
- `Strict-Transport-Security` - Force HTTPS
- `X-Frame-Options: DENY` - Clickjacking protection
- `X-Content-Type-Options: nosniff` - MIME sniffing protection
- `X-XSS-Protection` - Legacy XSS protection
- `Referrer-Policy` - Privacy protection
- `Permissions-Policy` - Feature restriction

### Automated Security Scanning

#### CodeQL Analysis
- Runs on every push and pull request
- Security-and-quality query suite
- Automated vulnerability detection
- Weekly scheduled scans

#### OWASP Dependency Check
- Daily vulnerability scans
- CVSS threshold: 7+ (build fails)
- Comprehensive dependency analysis
- Automated reports

#### Secret Scanning
- TruffleHog integration
- Pre-commit detection
- Historical commit scanning

#### Super Linter
- Multi-language linting
- Security-focused ESLint rules
- Code quality enforcement
- Automatic PR reviews

### Code Coverage Requirements

**Minimum 70% coverage enforced** - Build fails if thresholds not met:
- Lines: 70%
- Functions: 70%
- Branches: 70%
- Statements: 70%

Current coverage: **99.53% statements, 100% functions**

## Getting Started

### Install dependencies

```bash
npm install
# or
bun install
```

### Development

```bash
npm run dev
# or
bun run dev
```

Visit `http://localhost:5173` to see your app.

### Testing

```bash
# Run tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# Interactive UI
npm run test:ui
```

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Type Checking

```bash
npm run check
```

### Security Scanning

```bash
# Run npm audit
npm run security:audit

# Full security scan
npm run security:scan
```

## CI/CD Pipeline

### GitHub Actions Workflows

1. **CI - Test, Lint & Build** (`.github/workflows/ci.yml`)
   - Super Linter validation
   - Unit tests with coverage
   - Build verification
   - Fails on coverage < 70%
   - Runs on every push/PR

2. **CodeQL Security Scan** (`.github/workflows/codeql-analysis.yml`)
   - Static code analysis
   - Vulnerability detection
   - Security-and-quality queries
   - Weekly scheduled scans

3. **Security Scan & OWASP** (`.github/workflows/security-scan.yml`)
   - OWASP Dependency Check
   - Secret scanning (TruffleHog)
   - npm audit enforcement
   - Daily scans

### Build Requirements

All builds must pass:
- ✅ All unit tests passing
- ✅ 70%+ code coverage
- ✅ No linting errors
- ✅ No security vulnerabilities (CVSS 7+)
- ✅ Type checking passes
- ✅ Build completes successfully

## Project Structure

```
src/
  routes/
    +layout.svelte         # Main layout with CSS imports
    +page.svelte           # Landing page with bug bounty search
    layout.test.ts         # Layout component tests
    page.test.ts           # Page component tests
  test/
    setup.ts               # Test configuration
  hooks.server.ts          # Security headers middleware
  hooks.server.test.ts     # Security headers tests
  app.html                 # HTML template
  app.css                  # Global styles and Tailwind config
.github/
  workflows/
    ci.yml                 # CI/CD pipeline
    codeql-analysis.yml    # CodeQL security scanning
    security-scan.yml      # OWASP and secret scanning
```

## Customization

### Tailwind Theme

Custom animations are defined in `tailwind.config.ts`:
- `gradient` - Animated gradient backgrounds
- `float` - Floating animation for elements
- `pulse-slow` - Slow pulsing effect
- `shimmer` - Shimmer effect on hover

### Colors

Primary color scheme:
- Purple (`#8B5CF6`) - Main brand color
- Cyan (`#06B6D4`) - Accent color
- Pink (`#EC4899`) - Highlight color
- Slate (`#1E293B`, `#0F172A`) - Dark backgrounds

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repository in Vercel
3. Deploy automatically

Or use the Vercel CLI:

```bash
vercel --prod
```

### Environment Variables

No environment variables required for basic deployment.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Write tests (maintain 70%+ coverage)
4. Ensure all CI checks pass
5. Submit a pull request

**All PRs must:**
- Pass all GitHub Actions workflows
- Maintain or improve code coverage
- Have no security vulnerabilities
- Pass linting and type checking

## Security

See [SECURITY.md](SECURITY.md) for:
- Vulnerability reporting
- Security policies
- OWASP Top 10 compliance
- Best practices

## License

Private

## Development Tools

- **ESLint** - Code linting with security rules
- **Prettier** - Code formatting
- **TypeScript** - Type safety
- **Vitest** - Fast unit testing
- **Testing Library** - Component testing
- **Super Linter** - Multi-language validation
- **CodeQL** - Security analysis
- **OWASP Dependency Check** - Vulnerability scanning

## Performance

- Lighthouse score: 100/100
- First Contentful Paint: < 1s
- Time to Interactive: < 2s
- Bundle size: Optimized with Vite
