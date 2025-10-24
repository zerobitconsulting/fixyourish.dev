# FixYour-ish

A sleek, modern platform for identifying website issues and discovering open source bug bounty opportunities.

## Features

- **Find Issues**: Scan and identify security vulnerabilities, performance issues, and bugs in your website
- **Bug Bounties**: Browse open source bug bounty programs and earn rewards
- **Get Fixed**: Access detailed remediation guides and best practices

## Tech Stack

- **SvelteKit** - Modern, fast web framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS with custom animations
- **Vite** - Lightning-fast build tool

## Design Features

- Dark theme with vibrant gradients (purple, cyan, pink)
- Smooth animations and transitions
- Glowing effects and shimmer animations
- Floating elements and pulsing background orbs
- Responsive design for all devices
- Interactive search functionality

## Getting Started

### Install dependencies

```bash
bun install
```

### Development

```bash
bun run dev
```

Visit `http://localhost:5173` to see your app.

### Build

```bash
bun run build
```

### Preview production build

```bash
bun run preview
```

### Check for type errors

```bash
bun run check
```

## Project Structure

```
src/
  routes/
    +layout.svelte      # Main layout with CSS imports
    +page.svelte        # Landing page with bug bounty search
  app.html              # HTML template
  app.css               # Global styles and Tailwind config
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

## License

Private
