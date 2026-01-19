# Phase 1 Implementation - Setup Guide

This document provides step-by-step instructions to complete the Phase 1 setup.

---

## ✅ What's Been Completed

### 1.1 Repository Structure ✓
- Created complete folder structure (00-about through 09-assets)
- Added README files in each directory explaining purpose
- Created starter templates in 07-automation/templates/
- Set up backlog tracking files

### 1.2 Hugo Site Setup ✓
- Installed Hugo v0.154.5
- Created Hugo site in `hugo-site/` directory
- Added PaperMod theme (clean, professional)
- Configured sections: /blog, /projects, /talks, /about
- Created initial content pages

### 1.3 GitHub Actions Deployment ✓
- Created `.github/workflows/hugo.yml` for automated deployment
- Configured to deploy to GitHub Pages on push to main branch

---

## 🔧 Manual Steps Required

### Step 1: Initialize Git Repository

If not already done:

```bash
cd /Users/champion.trader/Code/public_repo
git init
git add .
git commit -m "Initial commit: Phase 1 complete - repository structure and Hugo site"
```

### Step 2: Create GitHub Repository

1. Go to [github.com](https://github.com) and create a new repository
2. Name it: `rajchampaneriyar.github.io` (or your desired name)
3. Don't initialize with README (we already have one)

### Step 3: Connect Local to GitHub

```bash
cd /Users/champion.trader/Code/public_repo
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Build and deployment":
   - Source: **GitHub Actions**
4. Wait for the Actions workflow to complete

### Step 5: Update Configuration

Edit `hugo-site/hugo.toml` and update:

```toml
baseURL = 'https://YOUR-USERNAME.github.io/'  # Your actual GitHub Pages URL

[params]
  author = "Your Name"

# Update social links
[[params.socialIcons]]
  name = "github"
  url = "https://github.com/YOUR-USERNAME"

[[params.socialIcons]]
  name = "linkedin"
  url = "https://linkedin.com/in/YOUR-LINKEDIN"

[[params.socialIcons]]
  name = "email"
  url = "mailto:your-actual-email@example.com"
```

Edit `hugo-site/content/about.md` and:
- Replace placeholder text with your actual background
- Update contact information

### Step 6: Test Locally

```bash
cd /Users/champion.trader/Code/public_repo/hugo-site
hugo server -D
```

Open browser to: `http://localhost:1313`

Verify:
- [ ] Homepage loads with profile
- [ ] Navigation menu works (Blog, Projects, Talks, About)
- [ ] About page displays correctly
- [ ] Theme looks professional

### Step 7: Customize Identity Files

Edit and personalize:

1. `00-about/about-me.md` - Your professional positioning
2. `00-about/vision.md` - Your goals and motivation
3. `00-about/content-philosophy.md` - Your approach (already has good defaults)

---

## 🎨 Optional: Customize Theme

### Add Profile Image

1. Add your photo to: `hugo-site/static/images/profile.jpg`
2. Update `hugo.toml`:

```toml
[params.profileMode]
  imageUrl = "/images/profile.jpg"
  imageWidth = 120
  imageHeight = 120
```

### Adjust Colors (if desired)

Create `hugo-site/assets/css/extended/custom.css`:

```css
:root {
    --primary: #2563eb;  /* Adjust primary color */
    --theme: #f8fafc;
    --entry: #ffffff;
}
```

---

## 📝 Next Steps After Phase 1

### Immediate (Week 1)
- [ ] Fill in your actual profile information
- [ ] Commit and push to GitHub
- [ ] Verify GitHub Pages deployment works
- [ ] Share site URL with someone for feedback

### Week 2 (Phase 2)
- [ ] Write first blog post using template
- [ ] Create first architecture kata
- [ ] Add one project to projects section

### Ongoing
- [ ] Follow 6-week content rotation
- [ ] Update backlog with content ideas
- [ ] Document any events or talks in 05-events/

---

## 🐛 Troubleshooting

### Hugo Server Won't Start

```bash
# Make sure you're in the right directory
cd /Users/champion.trader/Code/public_repo/hugo-site

# Check Hugo is installed
hugo version

# Try with verbose output
hugo server -D --verbose
```

### GitHub Actions Failing

1. Check Actions tab in GitHub repo
2. Verify GitHub Pages is enabled
3. Ensure `hugo.yml` workflow file is in `.github/workflows/`
4. Check that submodules are properly initialized

### Theme Not Loading

```bash
cd /Users/champion.trader/Code/public_repo/hugo-site
git submodule update --init --recursive
```

### Navigation Links Not Working

Verify these files exist:
- `content/about.md`
- `content/blog/_index.md`
- `content/projects/_index.md`
- `content/talks/_index.md`

---

## 📚 Resources

- [Hugo Documentation](https://gohugo.io/documentation/)
- [PaperMod Theme Docs](https://github.com/adityatelange/hugo-PaperMod/wiki)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Markdown Guide](https://www.markdownguide.org/)

---

## ✨ What You've Built

You now have:

✅ **Professional repository structure** - Organized for long-term content creation  
✅ **Hugo static site** - Fast, secure, and free hosting  
✅ **Automated deployment** - Push to GitHub, auto-deploy to web  
✅ **Content templates** - Consistent quality across all content types  
✅ **Clear workflow** - System for sustainable content creation  

**Phase 1 Complete!** 🎉

---

*Setup completed: January 19, 2026*
