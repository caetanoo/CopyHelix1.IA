# 🚀 CopyHelix.ai - Deployment Guide

## 📋 Pre-Deployment Checklist

### ✅ Repository Setup Complete
- [x] Git repository initialized
- [x] .gitignore configured
- [x] Initial commit created with 206 files
- [x] Environment variables excluded from repo

## 🌐 Deploy to Vercel

### Step 1: Create GitHub Repository
1. Go to [GitHub.com](https://github.com) and create new repository
2. Repository name: `copyhelix-ai`
3. Set as **Public** (or Private if preferred)
4. **DO NOT** initialize with README (we already have files)

### Step 2: Push to GitHub
```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/copyhelix-ai.git

# Push code to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub account
3. Click "New Project"
4. Import your `copyhelix-ai` repository
5. Configure build settings:

**Build Settings:**
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 4: Environment Variables
Add these environment variables in Vercel dashboard:

**Required for Supabase:**
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Optional for Analytics:**
```env
VITE_GA_TRACKING_ID=your_google_analytics_id
VITE_FB_PIXEL_ID=your_facebook_pixel_id
```

## 🗄️ Backend Deployment Options

### Option 1: Serverless Functions (Recommended)
Your API routes are ready for Vercel serverless functions:
- Move `/server/server-supabase.cjs` content to `/api/` directory
- Vercel will automatically handle serverless deployment

### Option 2: Separate Backend Deployment
Deploy backend separately on:
- Railway.app
- Render.com
- Heroku
- DigitalOcean App Platform

## 🗃️ Database Setup (Supabase)

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Note down Project URL and Anon Key

### 2. Set up Database Schema
Run the SQL from `supabase-schema.sql` in Supabase SQL Editor:
```sql
-- Creates contacts and meetings tables
-- Includes proper indexes and constraints
-- Sets up LGPD-compliant data structure
```

### 3. Configure Row Level Security (RLS)
Enable RLS policies for data protection and LGPD compliance.

## 🎯 Domain Configuration

### Custom Domain Setup
1. In Vercel dashboard, go to project settings
2. Add custom domain: `copyhelix.ai`
3. Configure DNS records as instructed
4. SSL certificate will be auto-generated

### Recommended Domain Structure
- **Main Site**: `copyhelix.ai`
- **Admin Dashboard**: `admin.copyhelix.ai` (optional)
- **API**: `api.copyhelix.ai` (if using separate backend)

## 📊 Analytics Setup

### Google Analytics 4
1. Create GA4 property for `copyhelix.ai`
2. Get Measurement ID
3. Add to Vercel environment variables

### Facebook Pixel
1. Create Facebook Business account
2. Set up Pixel for CopyHelix.ai
3. Add Pixel ID to environment variables

## ⚡ Performance Optimizations

### Vercel Configuration
Create `vercel.json` for optimal settings:
```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## 🔒 Security Checklist

### Environment Security
- [x] All sensitive data in environment variables
- [x] .env files excluded from repository
- [x] API keys never committed to code

### Application Security
- [x] CORS properly configured
- [x] Input validation on all forms
- [x] Rate limiting implemented
- [x] LGPD compliance built-in

## 🚨 Post-Deployment Tasks

### 1. Test All Functionality
- [ ] Homepage loads correctly
- [ ] All forms submit and save to database
- [ ] Exit intent popup appears and functions
- [ ] Mobile responsiveness working
- [ ] All routes accessible

### 2. SEO Setup
- [ ] Submit sitemap to Google Search Console
- [ ] Verify meta tags are rendering
- [ ] Check structured data markup
- [ ] Set up Google My Business (if applicable)

### 3. Monitoring Setup
- [ ] Set up Vercel Analytics
- [ ] Configure error tracking (Sentry)
- [ ] Monitor Core Web Vitals
- [ ] Set up uptime monitoring

## 📞 Support & Maintenance

### Regular Tasks
- Monitor lead capture forms
- Review analytics data
- Update content as needed
- Monitor performance metrics

### Contact for Support
- Technical issues: Check GitHub repository
- Business questions: Via dashboard contact forms

---

## 🎉 Deployment Summary

Your CopyHelix.ai platform is ready for deployment with:

- ✅ **206 files** committed to repository
- ✅ **Complete React application** with TypeScript
- ✅ **Lead capture system** with Supabase integration
- ✅ **Exit intent popup** for lead generation
- ✅ **Admin dashboard** for lead management
- ✅ **Brazilian Portuguese** content optimized
- ✅ **Mobile-first responsive** design
- ✅ **SEO optimized** with meta tags
- ✅ **Analytics ready** for tracking

**Next Step**: Create GitHub repository and deploy to Vercel! 🚀