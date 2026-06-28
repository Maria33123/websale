# PriceAI

PriceAI is a lightweight AI subscription price comparison and buyer-risk guide.

The MVP is a pure content and data-navigation experience. It does not process
payments, fulfill subscriptions, or store customer orders. The first phase
focuses on credible tracked data, source methodology, and anti-scam buyer
guides. Transparent affiliate links, tool recommendations, and cost calculators
belong to later phases after the site has search traffic and trust.

## Local Development

```bash
npm run dev
```

Open http://localhost:3000.

## Common Commands

```bash
npm run lint
npm run build
```

## Current Structure

- `app/page.tsx` - Home page entry.
- `app/components/site-shell.tsx` - Page shell.
- `app/components/navbar.tsx` - Sticky top navigation.
- `app/components/directory-explorer.tsx` - SEO-first homepage with hero, comparison table, methodology, source notes, internal links, and FAQ.
- `app/components/localized-home.tsx` - Locale-aware homepage wrapper with JSON-LD.
- `app/data/directory.ts` - Static MVP data for tools, platforms, offers, country pages, and blog ideas.
- `app/data/i18n.ts` - English and Chinese homepage copy for `/` and `/zh`.
- `app/globals.css` - Apple-inspired light glass theme.

## Product Direction

Current SEO-first architecture:

```txt
PriceAI
|-- /
|-- /zh
|-- /tools
|-- /tools/[tool]
|-- /tools/[tool]/price/[country]
|-- /tools/[tool]/compare/[comparison]
|-- /platforms
|-- /platforms/[platform]
|-- /blog
`-- /blog/[slug]
```

Homepage order:

```txt
1. Keyword-rich H1
2. Search and data quality note
3. Main AI subscription price comparison table
4. Sticky tool navigation
5. Tool-level offer details
6. Methodology
7. Source review cards
8. Internal SEO links
9. FAQ with JSON-LD
```

Future data flow:

```txt
Python collectors -> GitHub Actions cron -> Supabase -> Next.js pages
```
