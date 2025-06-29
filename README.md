# Project Structure

Refer to this article for the project structure: [Feature Driven Architecture](https://dev.to/rufatalv/feature-driven-architecture-with-nextjs-a-better-way-to-structure-your-application-1lph)

```
src/
├── app/ # Next.js App Router pages and layouts
├── components/ # Truly shared UI components
├── features/ # Feature modules
│ ├── auth/
│ │ ├── components/
│ │ ├── hooks/
│ │ ├── services/
│ │ └── types/
│ ├── posts/
│ │ ├── components/
│ │ ├── hooks/
│ │ ├── services/
│ │ └── types/
│ └── shared/ # Cross-feature shared code
├── lib/ # Core utilities
└── types/ # Global types
```

## .env.local example

```
AUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```
