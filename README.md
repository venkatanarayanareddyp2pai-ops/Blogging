# Blogging Platform

A modern, responsive blog built with Next.js 16, featuring an admin panel for content management.

## Features

- **Admin Panel**: Create, edit, and delete blog posts
- **Markdown Support**: Write posts in Markdown with syntax highlighting
- **Image Uploads**: Support for cover images with Vercel Blob storage
- **Responsive Design**: Mobile-first design with dark theme
- **SEO Optimized**: Meta tags and structured data
- **Fast**: Built with Next.js for optimal performance

## Getting Started

### Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Fill in your environment variables in `.env.local`
5. Run the development server:
   ```bash
   npm run dev
   ```

### Environment Variables

Required for full functionality:

- `ADMIN_USERNAME` & `ADMIN_PASSWORD`: Admin login credentials
- `KV_REST_API_URL` & `KV_REST_API_TOKEN`: Vercel KV for data storage
- `BLOB_READ_WRITE_TOKEN`: Vercel Blob for image uploads

## Deployment to Vercel

### 1. Set up Vercel Project

1. Connect your GitHub repository to Vercel
2. Deploy the project

### 2. Add Vercel KV (Required for data persistence)

1. In your Vercel dashboard, go to your project
2. Go to "Integrations" tab
3. Search for "KV" and add it to your project
4. This will automatically set `KV_REST_API_URL` and `KV_REST_API_TOKEN` environment variables

### 3. Add Vercel Blob (Required for image uploads)

1. In the "Integrations" tab, search for "Blob" and add it
2. This will set the `BLOB_READ_WRITE_TOKEN` environment variable

### 4. Set Admin Credentials

In your Vercel project settings, add these environment variables:
- `ADMIN_USERNAME`: Your admin username
- `ADMIN_PASSWORD`: A strong password for admin access

### 5. Redeploy

After adding the integrations, Vercel will automatically redeploy with the new environment variables.

## Admin Panel Usage

1. Visit `/admin/login`
2. Log in with your admin credentials
3. Access the dashboard to manage posts

## Project Structure

```
app/
├── admin/                 # Admin panel pages
├── blog/                  # Public blog pages
├── components/            # Reusable components
├── lib/                   # Database and utilities
└── data/                  # Local data (fallback)
```

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS
- **Database**: Vercel KV (production) / JSON file (development)
- **Storage**: Vercel Blob (production) / Local files (development)
- **Authentication**: Cookie-based sessions
- **Icons**: Lucide React
- **Animations**: Framer Motion