# Khaliq Creative Studio

**Khaliq Creative Studio** is a professional digital catalog and design service platform built for **Bias Fajar Khaliq**. It serves as a comprehensive archive for academic works, a gallery for pointillism artistry, and a portal for premium web design commissions.

## ✨ Features

-   **Bilingual System (ID/EN)**: Seamless language toggling for international accessibility.
-   **Dynamic Catalog**: Manage projects via a secure Admin Dashboard.
-   **Multi-Format Gallery**: Support for uploading multiple Images, PDFs, and Videos per project.
-   **Expressive UI**: "Living" background animations, glassmorphism, and smooth Framer Motion transitions.
-   **SEO Optimized**: Fully configured for Google Search indexing with specific keyword targeting.
-   **Service Commission**: Dedicated section for Web Design and Sketch services with direct WhatsApp/Email integration.

## 🛠️ Tech Stack

-   **Frontend**: React 19, TypeScript, Tailwind CSS
-   **Animations**: Framer Motion
-   **Backend/Storage**: Supabase (PostgreSQL & Storage Buckets)
-   **Icons**: Lucide React
-   **Deployment**: Cloudflare Pages / Vite

## 🚀 Deployment Guide (Cloudflare Pages)

1.  **Push to Git**: Ensure this repository is pushed to your GitHub account.
2.  **Cloudflare Dashboard**:
    -   Go to **Workers & Pages** > **Create Application** > **Pages** > **Connect to Git**.
    -   Select this repository.
3.  **Build Settings**:
    -   **Framework Preset**: Vite
    -   **Build Command**: `npm run build`
    -   **Output Directory**: `dist`
4.  **Environment Variables**:
    -   Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the Cloudflare settings.
5.  **Deploy**: Click "Save and Deploy".

## 🔐 Admin Access

-   **Login**: Click the lock icon in the footer.
-   **Default Passcode**: `8145`
-   **Capabilities**: Add, Edit, Delete projects; Upload media.

---

&copy; 2025 Bias Fajar Khaliq. All rights reserved.
