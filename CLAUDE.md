# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Middle School Tutor is a Next.js web application that helps Magic: The Gathering players check card legality and validate deck lists for the Middle School format. The app provides bilingual support (English/Japanese) and integrates with external MTG card databases.

## Development Commands

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run start  # Start production server
npm run lint   # Run ESLint
```

## Architecture

### Core Technologies

- **Next.js 15.3.3** with React 19.1.0 and TypeScript
- **Chakra UI v3.21.0** for component library and theming
- **next-translate** for internationalization (English/Japanese)
- **next-themes** for dark/light mode support

### Key Directories

- `components/` - React components organized by feature
- `hooks/` - Custom React hooks for business logic
- `pages/` - Next.js pages and API routes
- `locales/` - Translation files for English and Japanese
- `utils/` - Type definitions and utility functions

### Critical Components

- **Provider** (`components/ui/provider.tsx`) - Chakra UI theme provider with color mode
- **Search** (`components/Search/`) - Individual card search with real-time validation
- **DeckCheck** (`components/DeckCheck/`) - Full deck list validation with autocomplete

### Core Hooks

- **useIsLegal** (`hooks/useIsLegal.ts`) - Main card legality validation logic
- **useSuggestCards** (`hooks/useSuggestCards.ts`) - Card name autocomplete functionality

## Data Architecture

The application fetches Middle School legal card data from:

- Production: `https://alecrem-middleschool.hf.space/app/static/middleschool.json`
- Development: `http://127.0.0.1:8000/static/middleschool.json`

Card data structure includes:

- `name` - English card name
- `name_ja` - Japanese card name
- `oracle_id` - Unique card identifier

## Configuration

### TypeScript Setup

- Strict mode enabled
- Path aliases: `@/components/*`, `@/hooks/*`, `@/utils/*`
- Target ES2015+ with DOM libraries

### Internationalization

- Default locale: English (`en`)
- Supported locales: English, Japanese (`ja`)
- Translation files in `locales/[locale]/`

## Development Notes

### Bilingual Support

All card validation logic must handle both English and Japanese card names. The `useIsLegal` hook processes both languages simultaneously.

### Static Generation

Both main pages (`/` and `/deckcheck`) use `getStaticProps` to fetch card data at build time. The app depends on external API availability during build.

### Component Patterns

- Uses functional components with hooks
- Chakra UI components with custom theme provider
- TypeScript interfaces defined in `utils/types.ts`

### External Dependencies

- Card legality data from external API
- Scryfall integration for detailed card information
- No testing framework currently configured

### Card Legality Data

- `middleschool.json` fields and example content:
  - `oracle_id`: 8adbba6e-03ef-4278-aec5-8a4496b377a8
  - `name`: Abandon Hope
  - `name_ja`: 断念 (or empty! field is not required)
  - `banned`: FALSE
