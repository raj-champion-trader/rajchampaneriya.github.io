# GitHub Deployment Guide

This guide will walk you through deploying your Hugo site to GitHub Pages with automatic deployments.

---

## Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** icon in the top right → **New repository**
3. Configure your repository:
   - **Repository name**: `username.github.io` (replace `username` with your GitHub username)
     - Example: `rajchampaneriyar.github.io`
     - This enables GitHub Pages on the root domain
   - **Description**: "Architecture & Engineering Journal - Professional knowledge system"
   - **Visibility**: ✅ Public
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click **Create repository**

---

## Step 2: Connect Local Repository to GitHub

Copy the commands from GitHub (they'll be shown after creating the repo), or use these:

```bash
cd /Users/champion.trader/Code/public_repo

# Add the remote (replace with your actual repo URL)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push to GitHub
git push -u origin main
```

**Example with actual username:**
```bash
git remote add origin https://github.com/rajchampaneriyar/rajchampaneriyar.github.io.git
git push -u origin main
```

You'll be prompted for your GitHub credentials. Use a Personal Access Token if prompted.

---

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right menu)
3. Click **Pages** (left sidebar under "Code and automation")
4. Under "Build and deployment":
   - **Source**: Select **GitHub Actions** (not Deploy from a branch)
5. You should see: "Your site is ready to be published at `https://username.github.io`"

---

## Step 4: Wait for Deployment

1. Go to the **Actions** tab in your repository
2. You should see a workflow running: "Deploy Hugo site to Pages"
3. Wait for it to complete (usually 1-2 minutes)
4. Status indicators:
   - 🟡 Yellow dot = Running
   - ✅ Green checkmark = Success
   - ❌ Red X = Failed (check logs)

---

## Step 5: Verify Your Site

Once the workflow completes successfully:

1. Visit: `https://YOUR-USERNAME.github.io`
2. You should see your Hugo site live!

Check that:
- [ ] Homepage displays with profile
- [ ] Navigation menu works (Blog, Projects, Talks, About)
- [ ] All pages load correctly
- [ ] Theme is applied properly

---

## Step 6: Update Site Configuration (Important!)

Now that you know your actual GitHub username, update the site configuration:

### Edit `hugo-site/hugo.toml`

Replace placeholder values with your actual information:

```toml
baseURL = 'https://YOUR-ACTUAL-USERNAME.github.io/'

[params]
  author = "Your Actual Name"

# Update social links
[[params.socialIcons]]
  name = "github"
  url = "https://github.com/YOUR-ACTUAL-USERNAME"

[[params.socialIcons]]
  name = "linkedin"
  url = "https://linkedin.com/in/YOUR-LINKEDIN-HANDLE"

[[params.socialIcons]]
  name = "email"
  url = "mailto:your-actual-email@example.com"
```

### Edit `hugo-site/content/about.md`

Update with your real professional background and contact info.

### Commit and Push Changes

```bash
cd /Users/champion.trader/Code/public_repo
git add .
git commit -m "Update site configuration with actual URLs and contact info"
git push
```

The site will automatically rebuild and deploy!

---

## How Automatic Deployment Works

The GitHub Actions workflow (`.github/workflows/hugo.yml`) will:

1. **Trigger** on every push to the `main` branch
2. **Build** your Hugo site with the latest content
3. **Deploy** to GitHub Pages automatically
4. **Complete** in 1-2 minutes

**You don't need to do anything manually!** Just push changes and they'll be live.

---

## Making Future Updates

### Typical Workflow

```bash
# 1. Make changes (create blog post, update content, etc.)

# 2. Test locally
cd /Users/champion.trader/Code/public_repo/hugo-site
hugo server -D
# View at http://localhost:1313

# 3. Commit and push
cd /Users/champion.trader/Code/public_repo
git add .
git commit -m "Add new blog post about X"
git push

# 4. Wait 1-2 minutes for automatic deployment
# 5. Check your live site!
```

### Creating New Content

```bash
# New blog post
cd /Users/champion.trader/Code/public_repo/hugo-site
hugo new blog/2026-01-20-my-first-post.md

# Edit the file, then commit and push
```

---

## Troubleshooting

### Workflow Fails to Run

**Check:**
1. Go to Settings → Actions → General
2. Ensure "Allow all actions and reusable workflows" is selected
3. Under "Workflow permissions", ensure "Read and write permissions" is enabled

### Build Fails

**Common issues:**
1. **Submodule not initialized**: The theme submodule might not be cloned
   - The workflow handles this automatically with `submodules: recursive`
2. **Invalid config**: Check `hugo.toml` for syntax errors
3. **Missing content**: Ensure content files have proper front matter

**View logs:**
1. Go to Actions tab
2. Click the failed workflow
3. Click the job name to see detailed logs

### Site Shows 404

**Possible reasons:**
1. Deployment hasn't completed yet (wait 2-3 minutes)
2. GitHub Pages not enabled correctly (check Settings → Pages)
3. Repository name must be `username.github.io` for root domain

### Theme Not Loading

**Fix:**
```bash
cd /Users/champion.trader/Code/public_repo
git submodule update --init --recursive
git add .
git commit -m "Update theme submodule"
git push
```

---

## Custom Domain (Optional)

If you want to use your own domain (e.g., `yourname.com`):

1. Buy a domain from a registrar
2. In your domain's DNS settings, add:
   - Type: `A` 
   - Name: `@`
   - Value: GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
3. Add `CNAME` record:
   - Name: `www`
   - Value: `username.github.io`
4. In GitHub repo Settings → Pages:
   - Add your custom domain
   - Enable "Enforce HTTPS"
5. Update `baseURL` in `hugo.toml` to your domain

---

## Security Notes

### What's Safe to Commit

✅ **Safe:**
- Blog posts and content
- Images and diagrams (reasonable sizes)
- Configuration files
- Templates and documentation

❌ **Never commit:**
- API keys or secrets
- Private client information
- Large video files (use external hosting)
- Personal credentials

The `.gitignore` file is configured to protect you from common mistakes.

---

## Next Steps

Once your site is live:

1. **Share it**: Add the URL to your LinkedIn, resume, email signature
2. **Create content**: Start with your first blog post
3. **Iterate**: The infrastructure is done - now focus on content
4. **Monitor**: Star your repo to get notifications on deployment issues

---

## Quick Reference

| Task | Command |
|------|---------|
| Create new blog post | `hugo new blog/YYYY-MM-DD-title.md` |
| Test locally | `hugo server -D` |
| Commit changes | `git add . && git commit -m "message"` |
| Deploy to live | `git push` |
| Check deployment | Actions tab on GitHub |
| View live site | `https://username.github.io` |

---

## Support

If you run into issues:

1. Check the [Hugo documentation](https://gohugo.io/documentation/)
2. Check the [GitHub Pages documentation](https://docs.github.com/en/pages)
3. Review the workflow logs in the Actions tab
4. Check the [PaperMod theme docs](https://github.com/adityatelange/hugo-PaperMod/wiki)

---

**You're all set!** 🚀

Your professional knowledge system is now live and automatically deploying on every change.

*Guide created: January 19, 2026*
