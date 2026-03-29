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
- `UPSTASH_REDIS_REST_URL` & `UPSTASH_REDIS_REST_TOKEN`: Upstash Redis for data storage
- `BLOB_READ_WRITE_TOKEN`: Vercel Blob for image uploads

**Note**: If using Vercel Marketplace Upstash Redis integration, it sets `KV_REST_API_URL` and `KV_REST_API_TOKEN` instead. The code automatically detects which variables are available.

## Deployment to Vercel

### Option 1: Using Vercel Marketplace (Recommended)

1. Connect your GitHub repository to Vercel
2. Deploy the project
3. Add "Upstash Redis" from the Marketplace (sets `KV_REST_API_URL` and `KV_REST_API_TOKEN`)
4. Add "Vercel Blob" integration
5. Set admin credentials
6. Redeploy

### Option 2: Direct Upstash Setup

1. **Create Upstash Account**: Go to [upstash.com](https://upstash.com) and create a Redis database
2. **Get Connection Details**: Copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
3. **Connect to Vercel Project**:
   ```bash
   vercel link
   ```
4. **Pull Environment Variables**:
   ```bash
   vercel env pull .env.development.local
   ```
5. **Set Environment Variables in Vercel**:
   - `UPSTASH_REDIS_REST_URL`: Your Redis REST URL
   - `UPSTASH_REDIS_REST_TOKEN`: Your Redis REST Token
   - `ADMIN_USERNAME`: Your admin username
   - `ADMIN_PASSWORD`: Your admin password
6. **Deploy**: Vercel will automatically deploy with the new variables

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