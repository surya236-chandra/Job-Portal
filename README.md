# Job Portal

A React and Vite job portal application with Clerk authentication and Supabase data storage.

## Setup

Install dependencies:

```bash
npm install
```

Create a local environment file from the example:

```bash
cp .env.example .env
```

Fill in the required values in `.env`:

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_CLERK_PUBLISHABLE_KEY=
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```
