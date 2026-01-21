# Architecture & Engineering Journal

Professional knowledge system for thought leadership, architecture maturity, and sustainable content creation.

## 🎯 Purpose

This repository serves as a comprehensive content creation and knowledge management system, designed for:
- **Thought leadership** in enterprise architecture
- **Architecture maturity** (TOGAF)
- **Sustainable content creation** (blog, video, talks)
- **Professional credibility** building

## 🏗️ Repository Structure

```
├── 00-about/               # Identity layer and personal manifesto
├── 01-blog/                # Core content (technical, POV, experience, book reviews)
├── 02-architecture-katas/  # System design exercises
├── 03-thought-exercises/   # Mental models and first principles
├── 04-videos/             # Video production hub (scripts, audio, diagrams)
├── 05-events/             # Speaking engagements and workshops
├── 06-whitepapers/        # Technical paper summaries and analysis
├── 07-automation/         # Templates, checklists, and scripts
├── 08-backlog/            # Ideas and content pipeline
├── 09-assets/             # Images, diagrams, and visual assets
├── docs/                  # Documentation (deployment guides, planning docs)
├── hugo-site/             # Hugo static site generator
├── scripts/               # Deployment and automation scripts
└── tasks/                 # Technical documentation and backlog
```

## 📝 Content Pillars

1. **Architecture Patterns on Azure** - Reference architectures, trade-offs, decision frameworks
2. **Delivery Wisdom** - Project patterns, what works and what breaks
3. **Continuous Learning** - Book reviews, whitepaper summaries, technical insights

## 🔄 Content Rotation Schedule

6-week rotation:
- **Week 1**: Quick Explainer (60-90s video)
- **Week 2**: Architecture Kata (system design exercise)
- **Week 3**: POV / Experience Learning
- **Week 4**: Whitepaper Summary
- **Week 5**: Experience Reflection
- **Week 6**: Thought Exercise

**Target**: 1.5-2 hours per week, sustainable long-term

## 🛠️ Tech Stack

- **Blog Hosting**: Hugo + GitHub Pages
- **Writing**: VS Code + GitHub Copilot
- **Diagrams**: Excalidraw
- **Audio**: Audacity
- **Video Editing**: CapCut
- **Version Control**: Git + GitHub

## 🚀 Quick Start

### Setup Hugo Site Locally

```bash
# Install Hugo (macOS)
brew install hugo

# Navigate to hugo-site directory
cd hugo-site

# Start local server
hugo server -D

# View at http://localhost:1313
```

### Create New Content

```bash
# New blog post
hugo new blog/YYYY-MM-DD-post-title.md

# New project
hugo new projects/project-name.md

# New talk
hugo new talks/YYYY-MM-DD-event-name.md
```

## 📊 Alignment

| Expectation | Evidence |
|----------------|----------|
| Thought leadership | Blogs + POV articles |
| Architecture maturity | Architecture katas |
| Influence | Events documentation |
| Communication | Videos + clear writing |
| Technical depth | Whitepaper summaries |
| Consistency | GitHub history |
| Ownership | End-to-end content |

## 📖 Documentation

- **Quick Start**: See [docs/QUICKSTART.md](docs/QUICKSTART.md) for fast deployment guide
- **Deployment**: See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for comprehensive deployment instructions
- **Planning**: See [tasks/plan-summary.md](tasks/plan-summary.md) for comprehensive implementation plan
- **Templates**: See [07-automation/templates/](07-automation/templates/) for content templates
- **Guidelines**: See [00-about/content-philosophy.md](00-about/content-philosophy.md) for content principles

## 🚀 Deployment

Use the deployment script to quickly publish your site to GitHub Pages:

```bash
./scripts/deploy.sh
```

## 🔗 Links

- **Website**: [rajchampaneriya.github.io](https://rajchampaneriya.github.io)
- **GitHub**: [github.com/rajchampaneriya](https://github.com/rajchampaneriya)
- **LinkedIn**: [linkedin.com/in/rajchampaneriya](https://linkedin.com/in/rajchampaneriya)

> **Note**: Use GitHub username `rajchampaneriya` when creating your repository for a professional brand aligned with enterprise architecture and consulting.

## 📜 License

Content is © Raj Champaneriya. All opinions expressed are my own.

## 🎯 Goals

- Build visible track record of architectural thinking
- Create sustainable knowledge system
- Demonstrate L3 (Distinguished Engineer) level thinking
- Own content and personal brand independent of employer

---

*Last updated: January 19, 2026*
