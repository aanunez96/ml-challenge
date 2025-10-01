# ML Challenge - Project Recap

## Overview

A modern Next.js e-commerce Product Detail Page (PDP) implementation showcasing production-ready patterns, comprehensive testing, and accessibility-first design.

## Key Features & Architecture

### Core Stack & Decisions

- **Next.js 15 App Router** with React 19, TypeScript, and Tailwind CSS 4 for modern web development
- **React Server Components (RSC)** with selective client hydration for optimal performance and SEO
- **Zod Schema Validation** ensuring runtime type safety across all API boundaries and data contracts

### API & Data Layer

- **RESTful API Routes** - GET `/api/products` (list with pagination/search) and `/api/products/[id]` (detail)
- **Structured Error Handling** - Consistent error envelope pattern with proper HTTP status codes
- **Input/Output Validation** - All API requests and responses validated against Zod schemas

### Testing & Quality Assurance

- **≥80% Code Coverage** enforced across unit, integration, and E2E test suites
- **Vitest** for fast unit testing with jsdom environment and coverage reporting
- **Playwright E2E Tests** covering complete user workflows, error states, and responsive design

### Accessibility & Performance

- **WCAG Compliance** - Semantic HTML, proper ARIA attributes, keyboard navigation support
- **Screen Reader Optimization** - Comprehensive alt text, landmarks, and focus management
- **Performance Optimized** - Next.js Image component, lazy loading, efficient bundle splitting
- **Responsive Design** - Mobile-first approach with desktop enhancements

### Development Experience

- **TypeScript** with strict configuration and auto-generated API types
- **ESLint + Prettier** for consistent code formatting and quality
- **pnpm** package management for efficient dependency handling
- **Comprehensive Documentation** - API contracts, decisions rationale, and runbook
