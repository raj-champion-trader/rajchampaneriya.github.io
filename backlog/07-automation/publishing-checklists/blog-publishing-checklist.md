# Blog Publishing Checklist

Use this checklist every time you publish a blog post to ensure consistency and quality.

---

## Pre-Writing

- [ ] **Topic selected** from content pipeline
- [ ] **Category identified** (technical-concepts / POV / experience / open-letter / book-review)
- [ ] **Template copied** from `/07-automation/templates/blog-post-template.md`
- [ ] **Target length determined** (600-1500 words)

---

## Writing

- [ ] **Problem stated clearly** in opening section
- [ ] **Personal experience included** (not just theory)
- [ ] **Practical examples provided** (anonymized if needed)
- [ ] **Honest assessment** of what worked and what didn't
- [ ] **Actionable takeaways** listed (3-5 items)
- [ ] **Tone check**: Professional, approachable, calm confidence
- [ ] **Jargon check**: Complex ideas, simple words

---

## Technical Review

- [ ] **Code examples tested** (if applicable)
- [ ] **Links verified** - all URLs work
- [ ] **Diagrams created** (if needed) in Excalidraw
- [ ] **Images optimized** (<2MB, proper format)
- [ ] **Alt text added** to all images for accessibility

---

## Content Quality

- [ ] **Spell check passed**
- [ ] **Grammar reviewed** (Grammarly or similar)
- [ ] **Read aloud** - does it flow naturally?
- [ ] **Unique value confirmed** - adds new insight, not just aggregation
- [ ] **Self-reference test**: Would I reference this in 6 months?

---

## Hugo Formatting

- [ ] **Frontmatter complete**:
  ```yaml
  ---
  title: "[Post Title]"
  date: YYYY-MM-DD
  draft: false
  tags: ["tag1", "tag2", "tag3"]
  categories: ["category"]
  author: "Raj Champaneriya"
  description: "[Brief description for SEO]"
  ---
  ```
- [ ] **File named correctly**: `YYYY-MM-DD-title-slug.md`
- [ ] **File placed** in correct category folder in `hugo-site/content/blog/`
- [ ] **Images referenced** with correct relative paths
- [ ] **Markdown formatting** renders correctly

---

## Local Preview

- [ ] **Hugo server started**: `hugo server -D`
- [ ] **Post visible** in local preview (http://localhost:1313)
- [ ] **Layout renders correctly** (no broken formatting)
- [ ] **Images display properly**
- [ ] **Links work** in preview
- [ ] **Mobile view checked** (resize browser)
- [ ] **No console errors** (check browser dev tools)

---

## SEO & Metadata

- [ ] **Title compelling** (50-60 characters)
- [ ] **Description written** (150-160 characters)
- [ ] **Tags relevant** (3-5 tags)
- [ ] **Category appropriate**
- [ ] **URL slug readable** and keyword-rich

---

## Publishing

- [ ] **Draft flag removed** (`draft: false` in frontmatter)
- [ ] **Final read-through** completed
- [ ] **Changes committed** to Git
  ```bash
  git add .
  git commit -m "Add blog post: [title]"
  ```
- [ ] **Pushed to GitHub**
  ```bash
  git push origin main
  ```
- [ ] **GitHub Actions triggered** (check Actions tab)
- [ ] **Deployment successful** (wait 2-3 minutes)

---

## Post-Publishing Verification

- [ ] **Live site checked**: Visit https://[your-domain]/blog/[post-slug]
- [ ] **Post appears** in blog index
- [ ] **All links work** on live site
- [ ] **Images load** properly
- [ ] **Formatting correct** on live site
- [ ] **Social share preview** looks good (share on LinkedIn/Twitter to test)

---

## Distribution

### LinkedIn
- [ ] **Post shared** with key insights (3-5 bullet points)
- [ ] **Link to full post** included
- [ ] **Relevant hashtags** added (3-5)
- [ ] **Image/diagram included** if applicable

### Twitter/X (Optional)
- [ ] **Thread created** with main points
- [ ] **Link to full post** in final tweet
- [ ] **Relevant hashtags** used

### Internal Sharing (IBM)
- [ ] **Shared in relevant Slack channels** (if appropriate)
- [ ] **Added to personal wiki/portfolio**

---

## Backlog Update

- [ ] **Content pipeline updated** - mark as completed
- [ ] **New ideas captured** from writing process
- [ ] **Next week's topic selected**

---

## Analytics & Follow-up (Optional)

- [ ] **Baseline analytics captured** (if using analytics)
- [ ] **Comments monitored** (first 48 hours)
- [ ] **Questions answered** promptly
- [ ] **Feedback noted** for future improvements

---

## Time Tracking

**Total time spent**: [Hours]
- Writing: [Hours]
- Editing: [Hours]
- Formatting: [Minutes]
- Publishing: [Minutes]

*(Use this to optimize your process)*

---

## Retrospective (Post-Publishing)

### What went well?
- 
- 

### What could be improved?
- 
- 

### What to do differently next time?
- 
- 

---

*Consistency builds trust. Quality builds credibility. This checklist ensures both.*
