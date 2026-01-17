# Lumina Links

A futuristic, soft-pastel styled link aggregator built with React, Tailwind CSS, and Supabase.

## Features

- **Auto-Fetch Metadata**: Automatically grabs title, description, and preview image from URLs.
- **Categorisation**: Organise links by Project, Resume, Portfolio, etc.
- **Futuristic UI**: Glassmorphism, animated backgrounds, and smooth interactions.
- **Real-time**: Powered by Supabase.

## Deployment

### Cloudflare Pages

1.  Push this repository to GitHub/GitLab.
2.  Log in to the Cloudflare Dashboard and go to **Workers & Pages**.
3.  Click **Create Application** > **Pages** > **Connect to Git**.
4.  Select your repository.
5.  Configure the build settings:
    -   **Framework Preset**: Vite
    -   **Build Command**: \`npm run build\` (or \`yarn build\`)
    -   **Build Output Directory**: \`dist\`
6.  **Environment Variables**:
    -   Add \`VITE_SUPABASE_URL\` and \`VITE_SUPABASE_ANON_KEY\` in the Cloudflare dashboard settings for your project.
7.  Deploy!

### Netlify / Vercel

Similar to Cloudflare, connect your Git repo and use the default Vite settings (Build: \`npm run build\`, Output: \`dist\`). Don't forget to add the environment variables.

## Tech Stack

-   **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
-   **Backend**: Supabase (PostgreSQL)
-   **Icons**: Lucide React
-   **Utilities**: Sonner (Toast), Microlink (Metadata)
