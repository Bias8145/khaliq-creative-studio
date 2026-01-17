# Khaliq Creative Studio

**Khaliq Creative Studio** is a comprehensive digital platform designed to serve as a professional portfolio, academic archive, and commercial service interface for Bias Fajar Khaliq. The application functions as a centralized digital catalog, bridging the gap between architectural pointillism artistry, academic research, and premium web design services.

## Project Overview

This application is built as a single-page application (SPA) using modern web technologies to ensure high performance, responsiveness, and search engine visibility. It features a custom content management system (CMS) allowing for real-time updates to the project gallery without requiring code deployments.

## System Capabilities

### Core Functionality
-   **Bilingual Interface**: Integrated internationalization system supporting English (EN) and Indonesian (ID) with instant state-preserving toggling.
-   **Dynamic Content Management**: Secure admin dashboard for adding, editing, and removing project entries.
-   **Multi-Format Media Support**: Advanced file handling capable of processing and displaying multiple image formats (JPG, PNG), PDF documents, and video files (MP4, WebM) within a unified gallery interface.
-   **Service Integration**: Dedicated commercial section for Web Design and Sketch commissions with direct API integrations for WhatsApp and Email communication.

### Technical Features
-   **Search Engine Optimization (SEO)**: Fully configured meta-tags, Open Graph protocols, and structured data targeting specific keywords (e.g., "Bias Fajar Khaliq", "Web Design Services").
-   **Performance**: Optimized assets and code-splitting via Vite, deployed on Cloudflare's edge network for low-latency global access.
-   **User Experience**: Implements glassmorphism design principles, fluid transitions using Framer Motion, and responsive layouts for mobile and desktop devices.

## Technical Architecture

The project utilizes a robust stack focused on type safety and performance:

-   **Frontend Framework**: React 19
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **State & Animation**: Framer Motion
-   **Backend Services**: Supabase (PostgreSQL Database & Object Storage)
-   **Build Tool**: Vite
-   **Deployment**: Cloudflare Pages

## Deployment Instructions

This project is configured for deployment on Cloudflare Pages.

1.  **Source Control**: Ensure the repository is up-to-date.
2.  **Cloudflare Configuration**:
    -   Connect the repository in the Cloudflare Dashboard.
    -   **Build Command**: `npm run build`
    -   **Output Directory**: `dist`
3.  **Environment Variables**:
    The following variables must be configured in the production environment:
    -   `VITE_SUPABASE_URL`: [Your Supabase Project URL]
    -   `VITE_SUPABASE_ANON_KEY`: [Your Supabase Anonymous Key]

## Administrative Access

The platform includes a hidden administrative layer for content management.

-   **Access Point**: Located in the site footer (lock icon).
-   **Authentication**: Requires a secure passcode.
-   **Default Configuration**: Passcode `8145`.

## License and Copyright

&copy; 2025 Bias Fajar Khaliq. All rights reserved.
