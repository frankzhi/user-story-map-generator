# 🚀 Deployment Guide

This guide will help you deploy your User Story Map Generator to the web.

## 📋 Prerequisites

1. **GitHub Account**: You'll need a GitHub account to host your code
2. **Vercel Account**: Free hosting platform (recommended)
3. **API Keys**: DeepSeek and/or Gemini API keys

## 🔑 Getting API Keys

### DeepSeek API
1. Visit [DeepSeek Console](https://platform.deepseek.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the API key

### Gemini API
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key

## 🚀 Deploy to Vercel (Recommended)

### Step 1: Push to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create GitHub Repository**:
   - Go to [GitHub](https://github.com)
   - Click "New repository"
   - Name it `user-story-map-generator`
   - Make it public
   - Don't initialize with README (we already have one)

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/user-story-map-generator.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Go to Vercel**:
   - Visit [Vercel](https://vercel.com)
   - Sign up with your GitHub account

2. **Import Project**:
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect it's a Vite project

3. **Configure Environment Variables**:
   - In the project settings, go to "Environment Variables"
   - Add the following variables:
     ```
     VITE_DEEPSEEK_API_KEY=your_deepseek_api_key_here
     VITE_DEEPSEEK_API_URL=https://api.deepseek.com/v1/chat/completions
     VITE_GEMINI_API_KEY=your_gemini_api_key_here
     VITE_GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
     ```

4. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy your application
   - You'll get a URL like: `https://your-project.vercel.app`

## 🌐 Deploy to Netlify

### Step 1: Build Locally
```bash
npm run build
```

### Step 2: Deploy
1. Go to [Netlify](https://netlify.com)
2. Sign up with your GitHub account
3. Drag and drop the `dist` folder to deploy
4. Or connect your GitHub repository for automatic deployments

### Step 3: Configure Environment Variables
1. Go to Site Settings > Environment Variables
2. Add the same environment variables as above

## 🔧 Environment Variables

Your application needs these environment variables to work with real AI APIs:

```env
# DeepSeek API Configuration
VITE_DEEPSEEK_API_KEY=your_deepseek_api_key_here
VITE_DEEPSEEK_API_URL=https://api.deepseek.com/v1/chat/completions

# Gemini API Configuration
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
```

## 🎯 Features After Deployment

✅ **AI Provider Selection**: Choose between DeepSeek, Gemini, or Mock data
✅ **Real AI Generation**: Get actual AI-generated user story maps
✅ **Visual Story Mapping**: Interactive visualization of epics, features, and tasks
✅ **Story Details**: Click on any story to view detailed information
✅ **YAML Export**: Download story maps in YAML format
✅ **Responsive Design**: Works on desktop and mobile devices
✅ **Modern UI**: Beautiful, intuitive interface with Tailwind CSS

## 🔍 Testing Your Deployment

1. **Visit your deployed URL**
2. **Enter a product description** (try the example buttons)
3. **Choose an AI provider** (Mock data works without API keys)
4. **Generate a story map**
5. **Explore the stories** by clicking on them
6. **Download the YAML** file

## 🛠️ Troubleshooting

### Build Errors
- Make sure all dependencies are installed: `npm install`
- Check TypeScript errors: `npm run build`
- Verify environment variables are set correctly

### API Errors
- Verify API keys are correct
- Check API quotas and limits
- Ensure environment variables are properly set in deployment platform

### Deployment Issues
- Check build logs in your deployment platform
- Verify all files are committed to GitHub
- Ensure `vercel.json` is present for Vercel deployment

## 📈 Next Steps

1. **Custom Domain**: Add a custom domain to your deployment
2. **Analytics**: Add Google Analytics or similar
3. **Rate Limiting**: Implement rate limiting for API calls
4. **Caching**: Add caching for better performance
5. **User Authentication**: Add user accounts and saved story maps

## 🆘 Support

If you encounter issues:
1. Check the browser console for errors
2. Verify API keys are working
3. Test with mock data first
4. Check deployment platform logs

Your User Story Map Generator is now ready for production use! 🎉 