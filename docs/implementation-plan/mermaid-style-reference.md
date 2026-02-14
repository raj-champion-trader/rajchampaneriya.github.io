# Phase 10: Styles & Layouts Reference — Exact File Contents

> **Purpose**: This document contains the complete, verbatim contents of every custom CSS file, layout partial, and workflow from the main `rajc.work` site. When setting up the garage repo, create each file at the specified path with exactly this content. This enables Copilot to scaffold the garage site by copying these files directly.
>
> **Source**: From [original Phase 7 — Styles & Layouts Reference](../implementation-plan/07-styles-and-layouts-reference.md).

## Table of Contents

1. [CSS Files (10)](#css-files)
2. [Layout Partials (6)](#layout-partials)
3. [Layout Pages (1)](#layout-pages)
4. [GitHub Actions Workflow (1)](#github-actions-workflow)

---

## CSS Files

All CSS files go in `hugo-site/assets/css/extended/`.

### File: `enterprise.css`

> **Purpose**: Core design system — CSS custom properties, typography, blog post typography, footer, and table of contents styling. This is the foundation file.

```css
:root{
  --theme: #F8FAFC;        /* page background */
  --entry: #FFFFFF;        /* card background */
  --primary: #0F172A;      /* main text */
  --secondary: #475569;    /* muted text */
  --tertiary: #E2E8F0;     /* borders */
  --content: #0F172A;      /* post content */
  --hljs-bg: #0B1220;      /* code bg (dark, enterprise) */
  --link: #1D4ED8;         /* enterprise blue */
  --link-hover: #1E40AF;
  --blue-bg: rgba(29, 78, 216, 0.05);      /* subtle blue tint for badges/pills */
  --blue-border: rgba(29, 78, 216, 0.12);  /* blue border for badges/pills */
}

:root[data-theme="dark"]{
  --theme: #0F172A;        /* dark page background */
  --entry: #1E293B;        /* dark card background */
  --primary: #F1F5F9;      /* light text for dark bg */
  --secondary: #94A3B8;    /* muted light text */
  --tertiary: #334155;     /* dark borders */
  --content: #E2E8F0;      /* light post content text */
  --hljs-bg: #0B1220;      /* code bg stays dark */
  --link: #60A5FA;         /* lighter blue for dark theme */
  --link-hover: #93C5FD;   /* even lighter on hover */
  --blue-bg: rgba(96, 165, 250, 0.08);     /* subtle blue tint for badges/pills */
  --blue-border: rgba(96, 165, 250, 0.15); /* blue border for badges/pills */
}

/* Prevent horizontal scroll globally */
html, body {
  overflow-x: hidden;
  max-width: 100%;
}

body{
  font-family: "Inter", "IBM Plex Sans", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
}

/* Align navigation and main content widths */
:root {
  --nav-width: 1200px;
  --main-width: 1200px;
}

code, pre, kbd, samp{
  font-family: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
}

/* Make the profile hero feel more "consulting-grade" */
.profile .profile_inner h1{
  letter-spacing: -0.02em;
}

/* Professional profile image styling */
.profile img{
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
  border: 3px solid rgba(255, 255, 255, 0.9);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

[data-theme="dark"] .profile img{
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3);
  border: 3px solid rgba(255, 255, 255, 0.1);
}

.profile img:hover{
  transform: scale(1.02);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 6px rgba(0, 0, 0, 0.1);
}

a{
  color: var(--link);
}
a:hover{
  color: var(--link-hover);
}

/* Slightly more "enterprise" buttons */
.profile .buttons a{
  border-radius: 12px;
  font-weight: 600;
}

/* ===================================
   Blog Post Enhancements
   =================================== */

/* Smooth page entrance animation */
.post-content {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Blog post title styling */
.post-header h1 {
  font-size: 2.5rem;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
  font-weight: 700;
  animation: fadeInDown 0.5s ease-out;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Post meta (date, author) styling */
.post-meta {
  color: var(--secondary);
  font-size: 0.95rem;
  margin-bottom: 2rem;
  animation: fadeIn 0.7s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Content paragraphs with better spacing and readability */
.post-content p {
  line-height: 1.75;
  margin-bottom: 1.5rem;
  color: var(--content);
  font-size: 1.05rem;
}

/* Emphasized text in posts */
.post-content strong {
  font-weight: 600;
  color: var(--primary);
}

/* Headings in blog posts */
.post-content h2 {
  font-size: 1.75rem;
  font-weight: 700;
  margin-top: 1.75rem;
  margin-bottom: 1rem;
  letter-spacing: -0.015em;
  color: var(--primary);
  border-bottom: 2px solid var(--tertiary);
  padding-bottom: 0.5rem;
  transition: border-color 0.3s ease;
}

.post-content h3 {
  font-size: 1.35rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: var(--primary);
}

/* Horizontal rule styling */
.post-content hr {
  margin: 1.5rem 0;
  border: none;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--tertiary), transparent);
  opacity: 0.6;
}

/* List styling in posts */
.post-content ul,
.post-content ol {
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
}

.post-content li {
  margin-bottom: 0.5rem;
  line-height: 1.7;
}

/* Blockquote styling for emphasis */
.post-content blockquote {
  border-left: 4px solid var(--link);
  padding-left: 1.5rem;
  margin: 2rem 0;
  font-style: italic;
  color: var(--secondary);
  background: var(--entry);
  padding: 1.25rem 1.5rem;
  border-radius: 8px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.post-content blockquote:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* Link styling in post content */
.post-content a {
  color: var(--link);
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: 3px;
  transition: text-decoration-color 0.2s ease, color 0.2s ease;
}

.post-content a:hover {
  color: var(--link-hover);
  text-decoration-color: var(--link-hover);
}

/* Post footer navigation */
.post-footer {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--tertiary);
  animation: fadeIn 0.8s ease-out;
}

/* Subtle hover effect on the entire post card */
.post-single {
  transition: transform 0.2s ease;
}

/* Reading time and word count badges */
.post-meta .meta-item {
  display: inline-block;
  margin-right: 1rem;
  padding: 0.25rem 0.75rem;
  background: var(--entry);
  border-radius: 6px;
  font-size: 0.875rem;
  transition: background 0.2s ease;
}

.post-meta .meta-item:hover {
  background: var(--tertiary);
}

/* Tags styling */
.post-tags {
  margin-top: 2rem;
  animation: fadeIn 0.9s ease-out;
}

.post-tags a {
  display: inline-block;
  padding: 0.4rem 0.9rem;
  margin: 0.25rem 0.25rem 0.25rem 0;
  background: var(--entry);
  border: 1px solid var(--tertiary);
  border-radius: 8px;
  font-size: 0.875rem;
  color: var(--secondary);
  transition: all 0.2s ease;
  text-decoration: none;
}

.post-tags a:hover {
  background: var(--link);
  color: white;
  border-color: var(--link);
}

/* Table of contents styling */
.toc {
  background: var(--entry);
  border: 1px solid var(--tertiary);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  animation: fadeIn 0.6s ease-out;
}

.toc ul {
  list-style: none;
  padding-left: 0;
}

.toc li {
  margin-bottom: 0.5rem;
}

.toc a {
  color: var(--secondary);
  transition: color 0.2s ease, padding-left 0.2s ease;
  display: inline-block;
}

.toc a:hover {
  color: var(--link);
  padding-left: 0.5rem;
}

/* Dark mode adjustments */
[data-theme="dark"] .post-content h2 {
  border-bottom-color: var(--tertiary);
}

/* ===================================
   Footer
   =================================== */

.footer-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem 2rem;
  margin-bottom: 0.5rem;
}

.footer-link {
  color: var(--secondary);
  text-decoration: none;
  font-size: 0.85rem;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: var(--primary);
}
```

---

### File: `animations.css`

> **Purpose**: Subtle hover/transition animations for profile, navigation, buttons, post entries, and accessibility (reduced-motion).

```css
/* ==============================================
   Animations — subtle, content-supportive, 
   consistent in light and dark modes
   ============================================== */

/* Profile Image — gentle scale only */
.profile-image {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.profile-image:hover {
    transform: scale(1.03);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.12);
}

[data-theme="dark"] .profile-image:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

/* Navigation Menu — color transition only */
#menu li a {
    transition: color 0.2s ease;
}

#menu li a:hover {
    color: var(--primary);
}

/* Social Icons — subtle lift */
.social-icons a {
    transition: transform 0.2s ease, color 0.2s ease;
    display: inline-flex;
}

.social-icons a:hover {
    transform: translateY(-2px);
    color: var(--primary);
}

.social-icons a svg {
    transition: stroke 0.2s ease;
}

/* Buttons — subtle lift, no decorative sweep */
.button {
    position: relative;
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.button:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.button-inner {
    transition: all 0.2s ease;
}

/* Recent Posts — subtle border highlight instead of shifting content */
.post-entry-horizontal {
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.post-entry-horizontal:hover {
    border-color: var(--tertiary);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

[data-theme="dark"] .post-entry-horizontal:hover {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

/* Post title underline — kept, this aids content navigation */
.post-title a {
    position: relative;
    transition: color 0.2s ease;
}

.post-title a::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--link);
    transition: width 0.3s ease;
}

.post-title a:hover::after {
    width: 100%;
}

/* Theme Toggle — gentle rotation */
#theme-toggle {
    transition: transform 0.2s ease;
}

#theme-toggle:hover {
    transform: rotate(15deg);
}

#theme-toggle svg {
    transition: opacity 0.3s ease;
}

/* Scroll to Top — subtle lift */
.top-link {
    transition: transform 0.2s ease, opacity 0.3s ease, visibility 0.3s ease;
}

.top-link:hover {
    transform: translateY(-2px);
}

/* Page Load Animations — fast, single fade-in for the page */
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.profile-horizontal {
    animation: fadeIn 0.4s ease-out;
}

.profile-left {
    animation: fadeInUp 0.4s ease-out 0.05s both;
}

.profile-right {
    animation: fadeInUp 0.4s ease-out 0.1s both;
}

.recent-posts-section h2 {
    animation: fadeInUp 0.4s ease-out 0.15s both;
}

/* All post entries use the same short delay — no staggered cascade */
.post-entry-horizontal {
    animation: fadeIn 0.4s ease-out 0.2s both;
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

---

### File: `blog-filter.css`

> **Purpose**: Category filter bar shown on the posts listing page.

```css
/* ============================================
   BLOG CATEGORY FILTER BAR
   ============================================ */

.category-filter-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 1.5rem 0 1.75rem;
    padding-bottom: 1.25rem;
    border-bottom: 1px solid var(--border);
}

.category-filter-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.4rem 0.9rem;
    border: 1px solid var(--border);
    border-radius: 20px;
    background: transparent;
    color: var(--secondary);
    font-size: 0.82rem;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
}

.category-filter-btn:hover {
    border-color: var(--primary);
    color: var(--primary);
    background: var(--code-bg);
}

.category-filter-btn.active {
    background: var(--primary);
    color: var(--theme);
    border-color: var(--primary);
}

.category-filter-btn.active .category-count {
    background: rgba(255, 255, 255, 0.25);
    color: var(--theme);
}

.category-count {
    font-size: 0.72rem;
    font-weight: 600;
    background: var(--code-bg);
    color: var(--secondary);
    padding: 0.1rem 0.45rem;
    border-radius: 10px;
    line-height: 1.3;
    transition: all 0.2s ease;
}

/* Dark mode adjustments */
[data-theme="dark"] .category-filter-bar {
    border-bottom-color: rgba(255, 255, 255, 0.1);
}

[data-theme="dark"] .category-filter-btn {
    border-color: rgba(255, 255, 255, 0.15);
}

[data-theme="dark"] .category-filter-btn:hover {
    border-color: var(--primary);
    background: rgba(255, 255, 255, 0.05);
}

[data-theme="dark"] .category-filter-btn.active {
    background: var(--primary);
    border-color: var(--primary);
}

/* Responsive */
@media screen and (max-width: 768px) {
    .category-filter-bar {
        gap: 0.4rem;
        margin: 1rem 0 1.25rem;
    }

    .category-filter-btn {
        padding: 0.35rem 0.7rem;
        font-size: 0.78rem;
    }
}
```

---

### File: `diagrams.css`

> **Purpose**: Architecture diagram containers with mobile scroll support.

```css
/* Architecture Diagram Styling */
.architecture-diagram {
    margin: 2rem 0;
    padding: 1rem;
    background: var(--entry);
    border-radius: 8px;
    border: 1px solid var(--tertiary);
}

.architecture-diagram svg {
    max-width: 100%;
    height: auto;
    display: block;
}

/* Mobile-specific diagram handling */
@media screen and (max-width: 768px) {
    .architecture-diagram {
        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        padding: 1rem 0.5rem;
        margin: 1.5rem -1rem;
        position: relative;
    }
    
    .architecture-diagram svg {
        min-width: 600px;
        max-width: none;
    }
    
    .architecture-diagram::after {
        content: '← Scroll to view diagram →';
        display: block;
        text-align: center;
        font-size: 0.85rem;
        color: var(--secondary);
        padding: 0.5rem 0 0.25rem;
        font-style: italic;
        opacity: 0.8;
    }
    
    .architecture-diagram::-webkit-scrollbar {
        height: 8px;
    }
    
    .architecture-diagram::-webkit-scrollbar-track {
        background: var(--tertiary);
        border-radius: 4px;
    }
    
    .architecture-diagram::-webkit-scrollbar-thumb {
        background: var(--secondary);
        border-radius: 4px;
    }
    
    .architecture-diagram::-webkit-scrollbar-thumb:hover {
        background: var(--primary);
    }
}

@media screen and (max-width: 480px) {
    .architecture-diagram {
        margin: 1.5rem -0.75rem;
        padding: 0.75rem 0.5rem;
    }
    
    .architecture-diagram svg {
        min-width: 500px;
    }
    
    .architecture-diagram::after {
        font-size: 0.8rem;
    }
}

.post-content img[src*="diagram"],
.post-content img[src*="architecture"] {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    border: 1px solid var(--tertiary);
}

@media screen and (max-width: 768px) {
    .post-content img[src*="diagram"],
    .post-content img[src*="architecture"] {
        cursor: pointer;
        transition: transform 0.2s ease;
    }
    
    .post-content img[src*="diagram"]:active,
    .post-content img[src*="architecture"]:active {
        transform: scale(0.98);
    }
}
```

---

### File: `menu-separator.css`

> **Purpose**: Pipe separators between navigation menu items.

```css
/* Menu Separators */
.menu-separator {
    color: var(--secondary);
    opacity: 0.5;
    padding: 0 0.5rem;
    user-select: none;
}

/* Mobile Menu Responsiveness */
@media screen and (max-width: 768px) {
    .menu-separator {
        display: none;
    }
    
    #menu {
        overflow-x: hidden;
        white-space: normal;
        flex-wrap: wrap;
        justify-content: center;
        padding: 0;
        margin: 8px var(--gap);
    }
    
    #menu li {
        margin: 4px 8px !important;
    }
    
    #menu li + li {
        margin-inline-start: 8px !important;
    }
    
    .nav {
        max-width: 100%;
        overflow-x: hidden;
    }
    
    #menu a {
        font-size: 14px;
    }
    
    .logo {
        margin: auto;
        justify-content: center;
    }
}

@media screen and (max-width: 480px) {
    #menu a {
        font-size: 13px;
    }
    
    #menu li {
        margin: 3px 6px !important;
    }
}
```

---

### File: `post-meta.css`

> **Purpose**: Social icon links in post metadata area.

```css
/* Custom styles for social icons in post meta */
.post-meta-social {
    display: inline-flex;
    gap: 8px;
    align-items: center;
    margin-left: 4px;
}

.post-meta-social a {
    display: inline-flex;
    align-items: center;
    color: var(--secondary);
    opacity: 0.7;
    transition: opacity 0.3s ease;
}

.post-meta-social a:hover {
    opacity: 1;
}

.post-meta-social svg {
    vertical-align: middle;
}
```

---

### File: `mermaid.css`

> **Purpose**: Mermaid C4-model node styling, semantic class overrides (6 classes × light/dark), sequence diagram overrides, `prefers-color-scheme` fallback, and error styling.

```css
/* ==============================================
   Mermaid Diagram Styling — C4 Model Appearance
   ============================================== */

.mermaid {
    text-align: center;
    margin: 1.5rem 0;
    padding: 1rem;
    background: var(--code-bg);
    border-radius: 8px;
    overflow-x: auto;
    overflow-y: hidden;
}

.mermaid svg {
    max-width: none !important;
    height: auto !important;
    display: block;
    margin: 0 auto;
}

/* --- C4-style typography --- */
.mermaid .nodeLabel,
.mermaid .label {
    font-size: 13px !important;
    font-family: "IBM Plex Sans", system-ui, sans-serif !important;
    line-height: 1.4 !important;
}

.mermaid .edgeLabel {
    font-size: 11px !important;
    font-family: "IBM Plex Sans", system-ui, sans-serif !important;
    background: var(--code-bg) !important;
    padding: 2px 6px !important;
    border-radius: 3px !important;
}

.mermaid text {
    font-size: 13px !important;
    font-family: "IBM Plex Sans", system-ui, sans-serif !important;
}

/* --- C4-style node shapes --- */
.mermaid .node rect {
    rx: 6px !important;
    ry: 6px !important;
    stroke-width: 1px !important;
    stroke: rgba(0, 0, 0, 0.15) !important;
}

.mermaid .node circle,
.mermaid .node ellipse,
.mermaid .node polygon,
.mermaid .node path {
    stroke-width: 1px !important;
}

/* C4 color palette: nodes get blue tones */
.mermaid .node rect {
    fill: #438DD5 !important;
}

.mermaid .node .nodeLabel {
    color: #fff !important;
    fill: #fff !important;
}

/* Person nodes (circles) — darker blue like C4 Person */
.mermaid .node circle {
    fill: #08427B !important;
    stroke: rgba(0, 0, 0, 0.2) !important;
}

/* Stadium / pill shapes */
.mermaid .node .label-container {
    rx: 6px !important;
    ry: 6px !important;
}

/* Database / cylinder shapes — gray tone for infrastructure */
.mermaid .node polygon {
    fill: #438DD5 !important;
    stroke: rgba(0, 0, 0, 0.15) !important;
}

/* --- C4-style subgraphs (system boundaries) --- */
.mermaid .cluster rect {
    rx: 8px !important;
    ry: 8px !important;
    fill: rgba(0, 0, 0, 0.04) !important;
    stroke: #94A3B8 !important;
    stroke-width: 1.5px !important;
    stroke-dasharray: 8 4 !important;
}

.mermaid .cluster-label .nodeLabel {
    color: #334155 !important;
    fill: #334155 !important;
    font-size: 13px !important;
    font-weight: 600 !important;
    letter-spacing: 0.02em !important;
}

/* --- C4-style edges --- */
.mermaid .flowchart-link {
    stroke: #64748B !important;
    stroke-width: 1.5px !important;
}

.mermaid .marker {
    fill: #64748B !important;
    stroke: #64748B !important;
}

/* Edge labels — subtle styling */
.mermaid .edgeLabel rect {
    fill: var(--code-bg) !important;
    stroke: none !important;
    opacity: 0.9 !important;
}

.mermaid .edgeLabel,
.mermaid .edgeLabel span,
.mermaid .edgeLabel p,
.mermaid .edgeLabel .label {
    color: #475569 !important;
    fill: #475569 !important;
    font-size: 11px !important;
}

/* --- Dark mode C4 adjustments --- */
[data-theme="dark"] .mermaid {
    background: var(--code-bg);
}

[data-theme="dark"] .mermaid .node rect {
    fill: #1168BD !important;
    stroke: rgba(255, 255, 255, 0.2) !important;
}

[data-theme="dark"] .mermaid .node circle {
    fill: #08427B !important;
    stroke: rgba(255, 255, 255, 0.15) !important;
}

[data-theme="dark"] .mermaid .node polygon {
    fill: #1168BD !important;
    stroke: rgba(255, 255, 255, 0.2) !important;
}

[data-theme="dark"] .mermaid .node .nodeLabel,
[data-theme="dark"] .mermaid .label {
    color: #fff !important;
    fill: #fff !important;
}

[data-theme="dark"] .mermaid .cluster rect {
    fill: rgba(255, 255, 255, 0.04) !important;
    stroke: #667 !important;
}

[data-theme="dark"] .mermaid .cluster-label .nodeLabel {
    color: #94A3B8 !important;
    fill: #94A3B8 !important;
}

[data-theme="dark"] .mermaid .flowchart-link {
    stroke: #94A3B8 !important;
}

[data-theme="dark"] .mermaid .marker {
    fill: #94A3B8 !important;
    stroke: #94A3B8 !important;
}

[data-theme="dark"] .mermaid .edgeLabel rect {
    fill: var(--code-bg) !important;
}

[data-theme="dark"] .mermaid .edgeLabel,
[data-theme="dark"] .mermaid .edgeLabel span,
[data-theme="dark"] .mermaid .edgeLabel p,
[data-theme="dark"] .mermaid .edgeLabel .label {
    color: #94A3B8 !important;
    fill: #94A3B8 !important;
}

/* ==============================================
   Semantic Node Classes — Theme-Responsive
   
   Usage in mermaid diagrams (classDef as fallback):
     classDef primary fill:#dbeafe,stroke:#2563eb,color:#1e40af
     A["Label"]:::primary

   Available: primary, secondary, accent,
              highlight, danger, neutral
   ============================================== */

/* --- Light mode semantic classes --- */
:is(.mermaid, .mermaid-fullscreen-content-inner) .node.primary :is(rect, polygon, circle, path) {
    fill: #dbeafe !important;
    stroke: #2563eb !important;
    stroke-width: 1.5px !important;
}
:is(.mermaid, .mermaid-fullscreen-content-inner) .node.primary .nodeLabel {
    color: #1e40af !important;
    fill: #1e40af !important;
}

:is(.mermaid, .mermaid-fullscreen-content-inner) .node.secondary :is(rect, polygon, circle, path) {
    fill: #dcfce7 !important;
    stroke: #16a34a !important;
    stroke-width: 1.5px !important;
}
:is(.mermaid, .mermaid-fullscreen-content-inner) .node.secondary .nodeLabel {
    color: #166534 !important;
    fill: #166534 !important;
}

:is(.mermaid, .mermaid-fullscreen-content-inner) .node.accent :is(rect, polygon, circle, path) {
    fill: #ffedd5 !important;
    stroke: #ea580c !important;
    stroke-width: 1.5px !important;
}
:is(.mermaid, .mermaid-fullscreen-content-inner) .node.accent .nodeLabel {
    color: #9a3412 !important;
    fill: #9a3412 !important;
}

:is(.mermaid, .mermaid-fullscreen-content-inner) .node.highlight :is(rect, polygon, circle, path) {
    fill: #f3e8ff !important;
    stroke: #9333ea !important;
    stroke-width: 1.5px !important;
}
:is(.mermaid, .mermaid-fullscreen-content-inner) .node.highlight .nodeLabel {
    color: #6b21a8 !important;
    fill: #6b21a8 !important;
}

:is(.mermaid, .mermaid-fullscreen-content-inner) .node.danger :is(rect, polygon, circle, path) {
    fill: #fee2e2 !important;
    stroke: #dc2626 !important;
    stroke-width: 1.5px !important;
}
:is(.mermaid, .mermaid-fullscreen-content-inner) .node.danger .nodeLabel {
    color: #991b1b !important;
    fill: #991b1b !important;
}

:is(.mermaid, .mermaid-fullscreen-content-inner) .node.neutral :is(rect, polygon, circle, path) {
    fill: #f1f5f9 !important;
    stroke: #64748b !important;
    stroke-width: 1.5px !important;
}
:is(.mermaid, .mermaid-fullscreen-content-inner) .node.neutral .nodeLabel {
    color: #334155 !important;
    fill: #334155 !important;
}

/* --- Dark mode semantic classes --- */
[data-theme="dark"] :is(.mermaid, .mermaid-fullscreen-content-inner) .node.primary :is(rect, polygon, circle, path) {
    fill: #1e3a5f !important;
    stroke: #60a5fa !important;
    stroke-width: 2px !important;
}
[data-theme="dark"] :is(.mermaid, .mermaid-fullscreen-content-inner) .node.primary .nodeLabel {
    color: #dbeafe !important;
    fill: #dbeafe !important;
}

[data-theme="dark"] :is(.mermaid, .mermaid-fullscreen-content-inner) .node.secondary :is(rect, polygon, circle, path) {
    fill: #14532d !important;
    stroke: #4ade80 !important;
    stroke-width: 2px !important;
}
[data-theme="dark"] :is(.mermaid, .mermaid-fullscreen-content-inner) .node.secondary .nodeLabel {
    color: #dcfce7 !important;
    fill: #dcfce7 !important;
}

[data-theme="dark"] :is(.mermaid, .mermaid-fullscreen-content-inner) .node.accent :is(rect, polygon, circle, path) {
    fill: #7c2d12 !important;
    stroke: #fb923c !important;
    stroke-width: 2px !important;
}
[data-theme="dark"] :is(.mermaid, .mermaid-fullscreen-content-inner) .node.accent .nodeLabel {
    color: #ffedd5 !important;
    fill: #ffedd5 !important;
}

[data-theme="dark"] :is(.mermaid, .mermaid-fullscreen-content-inner) .node.highlight :is(rect, polygon, circle, path) {
    fill: #581c87 !important;
    stroke: #c084fc !important;
    stroke-width: 2px !important;
}
[data-theme="dark"] :is(.mermaid, .mermaid-fullscreen-content-inner) .node.highlight .nodeLabel {
    color: #f3e8ff !important;
    fill: #f3e8ff !important;
}

[data-theme="dark"] :is(.mermaid, .mermaid-fullscreen-content-inner) .node.danger :is(rect, polygon, circle, path) {
    fill: #7f1d1d !important;
    stroke: #f87171 !important;
    stroke-width: 2px !important;
}
[data-theme="dark"] :is(.mermaid, .mermaid-fullscreen-content-inner) .node.danger .nodeLabel {
    color: #fee2e2 !important;
    fill: #fee2e2 !important;
}

[data-theme="dark"] :is(.mermaid, .mermaid-fullscreen-content-inner) .node.neutral :is(rect, polygon, circle, path) {
    fill: #1e293b !important;
    stroke: #94a3b8 !important;
    stroke-width: 2px !important;
}
[data-theme="dark"] :is(.mermaid, .mermaid-fullscreen-content-inner) .node.neutral .nodeLabel {
    color: #e2e8f0 !important;
    fill: #e2e8f0 !important;
}

/* --- @media fallback for auto-theme dark mode (before JS sets data-theme) --- */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) :is(.mermaid, .mermaid-fullscreen-content-inner) .node.primary :is(rect, polygon, circle, path) {
      fill: #1e3a5f !important; stroke: #60a5fa !important; stroke-width: 2.5px !important;
  }
  :root:not([data-theme="light"]) :is(.mermaid, .mermaid-fullscreen-content-inner) .node.primary .nodeLabel {
      color: #dbeafe !important; fill: #dbeafe !important;
  }
  :root:not([data-theme="light"]) :is(.mermaid, .mermaid-fullscreen-content-inner) .node.secondary :is(rect, polygon, circle, path) {
      fill: #14532d !important; stroke: #4ade80 !important; stroke-width: 2.5px !important;
  }
  :root:not([data-theme="light"]) :is(.mermaid, .mermaid-fullscreen-content-inner) .node.secondary .nodeLabel {
      color: #dcfce7 !important; fill: #dcfce7 !important;
  }
  :root:not([data-theme="light"]) :is(.mermaid, .mermaid-fullscreen-content-inner) .node.accent :is(rect, polygon, circle, path) {
      fill: #7c2d12 !important; stroke: #fb923c !important; stroke-width: 2.5px !important;
  }
  :root:not([data-theme="light"]) :is(.mermaid, .mermaid-fullscreen-content-inner) .node.accent .nodeLabel {
      color: #ffedd5 !important; fill: #ffedd5 !important;
  }
  :root:not([data-theme="light"]) :is(.mermaid, .mermaid-fullscreen-content-inner) .node.highlight :is(rect, polygon, circle, path) {
      fill: #581c87 !important; stroke: #c084fc !important; stroke-width: 2.5px !important;
  }
  :root:not([data-theme="light"]) :is(.mermaid, .mermaid-fullscreen-content-inner) .node.highlight .nodeLabel {
      color: #f3e8ff !important; fill: #f3e8ff !important;
  }
  :root:not([data-theme="light"]) :is(.mermaid, .mermaid-fullscreen-content-inner) .node.danger :is(rect, polygon, circle, path) {
      fill: #7f1d1d !important; stroke: #f87171 !important; stroke-width: 2.5px !important;
  }
  :root:not([data-theme="light"]) :is(.mermaid, .mermaid-fullscreen-content-inner) .node.danger .nodeLabel {
      color: #fee2e2 !important; fill: #fee2e2 !important;
  }
  :root:not([data-theme="light"]) :is(.mermaid, .mermaid-fullscreen-content-inner) .node.neutral :is(rect, polygon, circle, path) {
      fill: #1e293b !important; stroke: #94a3b8 !important; stroke-width: 2.5px !important;
  }
  :root:not([data-theme="light"]) :is(.mermaid, .mermaid-fullscreen-content-inner) .node.neutral .nodeLabel {
      color: #e2e8f0 !important; fill: #e2e8f0 !important;
  }
}

/* --- Sequence diagram C4-like overrides --- */
.mermaid .actor {
    fill: #438DD5 !important;
    stroke: rgba(0, 0, 0, 0.15) !important;
    stroke-width: 1px !important;
    rx: 6px !important;
    ry: 6px !important;
}

.mermaid text.actor {
    fill: #fff !important;
}

.mermaid .messageLine0,
.mermaid .messageLine1 {
    stroke: #666 !important;
}

.mermaid .messageText {
    fill: var(--secondary) !important;
    font-size: 12px !important;
}

.mermaid .activation0,
.mermaid .activation1,
.mermaid .activation2 {
    fill: #85BBF0 !important;
    stroke: #438DD5 !important;
}

.mermaid .note {
    fill: #FFF8DC !important;
    stroke: #D4C68A !important;
}

.mermaid .noteText {
    fill: #333 !important;
    font-size: 11px !important;
}

[data-theme="dark"] .mermaid .actor {
    fill: #1168BD !important;
    stroke: rgba(255, 255, 255, 0.1) !important;
}

[data-theme="dark"] .mermaid .messageLine0,
[data-theme="dark"] .mermaid .messageLine1 {
    stroke: #94A3B8 !important;
}

[data-theme="dark"] .mermaid .messageText {
    fill: #94A3B8 !important;
}

[data-theme="dark"] .mermaid .activation0,
[data-theme="dark"] .mermaid .activation1,
[data-theme="dark"] .mermaid .activation2 {
    fill: #1E3A5F !important;
    stroke: #1168BD !important;
}

[data-theme="dark"] .mermaid .note {
    fill: #2D2A1E !important;
    stroke: #5C5630 !important;
}

[data-theme="dark"] .mermaid .noteText {
    fill: #E2E8F0 !important;
}

/* --- Error styling --- */
.mermaid-error {
    color: #ff6b6b;
    padding: 1rem;
    border: 1px solid #ff6b6b;
    border-radius: 4px;
    background: rgba(255, 107, 107, 0.1);
}

/* --- Responsive --- */
@media (max-width: 768px) {
    .mermaid {
        padding: 0.5rem;
    }
    
    .mermaid svg {
        min-width: 600px;
    }
}
```

---

### File: `profile-layout.css`

> **Purpose**: Profile hero with blueprint background, avatar, name/role/tagline, cert badges, action buttons, trusted-by strip, and recent posts section.
> 
> **Garage note**: Copy as-is. The HTML template controls what's shown — use the garage-adapted `index_profile.html` (below) to omit cert badges and trusted-by strip.

```css
/* ============================================
   PREMIUM PROFILE HERO
   ============================================ */

.profile-hero {
    padding: 1rem 0 0;
    position: relative;
}

/* Subtle geometric blueprint background */
.profile-hero::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 40%;
    height: 100%;
    background-image:
        linear-gradient(rgba(29, 78, 216, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(29, 78, 216, 0.03) 1px, transparent 1px);
    background-size: 24px 24px;
    mask-image: linear-gradient(to left, rgba(0,0,0,0.12), transparent);
    -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,0.12), transparent);
    pointer-events: none;
    z-index: 0;
}

[data-theme="dark"] .profile-hero::before {
    background-image:
        linear-gradient(rgba(96, 165, 250, 0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(96, 165, 250, 0.04) 1px, transparent 1px);
}

.profile-card {
    display: flex;
    gap: 1.75rem;
    align-items: center;
}

/* Avatar */
.profile-avatar {
    flex-shrink: 0;
}

.profile-image {
    border-radius: 50%;
    width: 130px;
    height: 130px;
    object-fit: cover;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    border: 3px solid rgba(0, 0, 0, 0.04);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.profile-image:hover {
    transform: scale(1.03);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] .profile-image {
    border-color: rgba(255, 255, 255, 0.08);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.35);
}

[data-theme="dark"] .profile-image:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.45);
}

/* Info */
.profile-info {
    flex: 1;
    min-width: 0;
}

.profile-name {
    font-size: 1.65rem;
    margin: 0;
    line-height: 1.15;
    letter-spacing: -0.025em;
    font-weight: 800;
    color: var(--primary);
}

/* Role + cert badges on same row */
.profile-role-row {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    flex-wrap: wrap;
    margin-top: 0.2rem;
}

.profile-role {
    font-size: 0.78rem;
    margin: 0;
    font-weight: 600;
    color: var(--link);
    letter-spacing: 0.02em;
    text-transform: uppercase;
    white-space: nowrap;
}

.profile-tagline {
    font-size: 0.92rem;
    margin: 0.4rem 0 0;
    line-height: 1.5;
    color: var(--secondary);
    max-width: 52ch;
}

/* Certification badges — inline with role */
.profile-certs {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
}

.cert-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.2rem;
    font-size: 0.62rem;
    font-weight: 600;
    color: var(--link);
    background: var(--blue-bg);
    border: 1px solid var(--blue-border);
    padding: 0.15rem 0.5rem;
    border-radius: 4px;
    letter-spacing: 0.01em;
    text-transform: uppercase;
}

.cert-badge svg {
    color: var(--link);
    flex-shrink: 0;
}

[data-theme="dark"] .cert-badge {
    background: var(--blue-bg);
    border-color: var(--blue-border);
    color: var(--link);
}


/* Actions row: buttons first, then social */
.profile-actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-top: 0.65rem;
    flex-wrap: wrap;
}

.profile-actions .social-icons {
    margin: 0;
    display: flex;
    gap: 0.4rem;
}

.profile-actions .social-icons a {
    display: inline-flex;
}

.profile-actions .buttons {
    display: flex;
    gap: 0.4rem;
    margin: 0;
}

.profile-actions .buttons .button {
    border-radius: 6px;
    font-weight: 600;
    font-size: 0.78rem;
    padding: 0.35rem 0.85rem;
    border: 1.5px solid var(--link);
    transition: all 0.2s ease;
    text-decoration: none;
}

.profile-actions .buttons .button:first-child {
    background: var(--link);
    color: #fff;
}

.profile-actions .buttons .button:first-child:hover {
    background: var(--link-hover);
    border-color: var(--link-hover);
    transform: translateY(-1px);
    box-shadow: 0 3px 10px rgba(29, 78, 216, 0.25);
}

.profile-actions .buttons .button:not(:first-child) {
    background: transparent;
    color: var(--link);
}

.profile-actions .buttons .button:not(:first-child):hover {
    background: var(--link);
    color: #fff;
    transform: translateY(-1px);
    box-shadow: 0 3px 10px rgba(29, 78, 216, 0.15);
}

[data-theme="dark"] .profile-actions .buttons .button:first-child:hover {
    box-shadow: 0 3px 10px rgba(96, 165, 250, 0.2);
}

[data-theme="dark"] .profile-actions .buttons .button:not(:first-child):hover {
    box-shadow: 0 3px 10px rgba(96, 165, 250, 0.15);
}


/* ============================================
   TRUSTED-BY SOCIAL PROOF STRIP
   ============================================ */

.trusted-by-strip {
    margin: 1rem 0 0;
    padding: 0.75rem 0;
    border-top: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
}

[data-theme="dark"] .trusted-by-strip {
    border-color: rgba(255, 255, 255, 0.08);
}

.trusted-label {
    font-size: 0.62rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--secondary);
    opacity: 0.6;
    white-space: nowrap;
}

.trusted-logos {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
    align-items: center;
}

.domain-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.7rem;
    font-weight: 500;
    color: var(--secondary);
    background: var(--entry);
    border: 1px solid var(--border);
    padding: 0.15rem 0.5rem;
    border-radius: 4px;
    transition: all 0.2s ease;
}

.domain-badge svg {
    opacity: 0.45;
    flex-shrink: 0;
}

.domain-badge:hover {
    border-color: var(--link);
    color: var(--link);
}

.domain-badge:hover svg {
    opacity: 0.8;
}

.fortune-badge {
    font-weight: 600;
    color: var(--link);
    border-color: var(--blue-border);
    background: var(--blue-bg);
}

.fortune-badge svg {
    opacity: 0.7;
    color: var(--link);
}

[data-theme="dark"] .domain-badge {
    border-color: rgba(255, 255, 255, 0.08);
}

[data-theme="dark"] .fortune-badge {
    border-color: var(--blue-border);
    background: var(--blue-bg);
}


/* ============================================
   RECENT POSTS
   ============================================ */

.recent-posts-section {
    margin: 1rem 0 1.5rem;
    padding-top: 0.75rem;
    border-top: 1px solid var(--border);
}

[data-theme="dark"] .recent-posts-section {
    border-top-color: rgba(255, 255, 255, 0.1);
}

.recent-posts-section h2 {
    font-size: 0.8rem;
    margin: 0 0 0.75rem 0;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--secondary);
}

.post-entry-horizontal {
    padding: 0.5rem 0.75rem;
    border-radius: 6px;
    border: 1px solid transparent;
    transition: all 0.15s ease;
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
}

.post-entry-horizontal:hover {
    background: var(--entry);
    border-color: var(--border);
}

[data-theme="dark"] .post-entry-horizontal:hover {
    background: rgba(255, 255, 255, 0.03);
}

.post-entry-horizontal:not(:last-child) {
    margin-bottom: 0.15rem;
}

.post-meta-small {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    white-space: nowrap;
}

.post-meta-small time {
    font-size: 0.78rem;
    color: var(--secondary);
    opacity: 0.7;
    font-variant-numeric: tabular-nums;
    min-width: 6.5em;
}

.post-category {
    font-size: 0.7rem;
    color: var(--link);
    background: var(--blue-bg);
    padding: 0.15rem 0.5rem;
    border-radius: 4px;
    font-weight: 500;
}

[data-theme="dark"] .post-category {
    background: var(--blue-bg);
}

.post-title {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.4;
    font-weight: 550;
}

.post-title a {
    color: var(--primary);
    text-decoration: none;
    transition: color 0.15s ease;
}

.post-title a:hover {
    color: var(--link);
}


/* ============================================
   RESPONSIVE
   ============================================ */

@media screen and (max-width: 768px) {
    .profile-card {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }

    .profile-image {
        width: 110px;
        height: 110px;
    }

    .profile-name {
        font-size: 1.4rem;
    }

    .profile-role-row {
        justify-content: center;
    }

    .profile-tagline {
        max-width: none;
    }

    .profile-certs {
        justify-content: center;
    }

    .profile-actions {
        justify-content: center;
    }

    .profile-actions .social-icons {
        justify-content: center;
    }

    .profile-actions .buttons {
        justify-content: center;
    }

    .trusted-by-strip {
        justify-content: center;
        text-align: center;
    }

    .trusted-logos {
        justify-content: center;
    }

    .post-entry-horizontal {
        flex-direction: column;
        gap: 0.15rem;
    }

    .profile-hero::before {
        display: none;
    }
}

@media screen and (max-width: 480px) {
    .profile-image {
        width: 90px;
        height: 90px;
    }

    .profile-name {
        font-size: 1.25rem;
    }

    .profile-role {
        font-size: 0.7rem;
    }

    .profile-role-row {
        flex-direction: column;
        gap: 0.3rem;
    }
}
```

---

### File: `about-page.css`

> **Purpose**: About page layout — intro with photo, process flow (4-step), impact grid (4-column metrics), tech category grid with pills, and capability tree (4-branch org chart). All with light/dark mode support.
> 
> **Garage note**: This is main-site-specific styling. Include it for completeness but the garage doesn't need an about page initially. Can be skipped in Phase 1.

```css
/* About page — intro layout with photo */
.about-intro {
  display: flex;
  gap: 2.5rem;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.about-intro-text {
  flex: 1;
  min-width: 0;
}

.about-intro-text blockquote {
  margin-top: 1.2rem;
  border-left: 3px solid var(--link);
  padding-left: 1rem;
  font-style: italic;
  color: var(--secondary);
}

.about-intro-photo {
  flex-shrink: 0;
  width: 200px;
}

.about-intro-photo img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.06);
  border: 3px solid rgba(29, 78, 216, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

[data-theme="dark"] .about-intro-photo img {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3);
  border-color: rgba(96, 165, 250, 0.2);
}

.about-intro-photo img:hover {
  transform: scale(1.03);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18), 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Responsive: stack vertically on small screens */
@media (max-width: 640px) {
  .about-intro {
    flex-direction: column-reverse;
    align-items: center;
    gap: 1.5rem;
  }

  .about-intro-photo {
    width: 150px;
  }

  .about-intro-photo img {
    width: 150px;
    height: 150px;
  }
}

/* ============================================
   How I Work — Process Flow
   ============================================ */

.process-flow {
  display: flex;
  align-items: center;
  gap: 0;
  margin: 1.5rem 0 2rem;
  overflow-x: auto;
  padding: 0.5rem 0;
}

.process-step {
  flex: 1;
  min-width: 150px;
  padding: 1.25rem 1rem;
  border-radius: 10px;
  text-align: center;
  border: 1.5px solid;
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.process-step:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.process-step__number {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
  color: #fff;
}

.process-step__title {
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 0.35rem;
  line-height: 1.3;
}

.process-step__desc {
  font-size: 0.78rem;
  opacity: 0.75;
  line-height: 1.4;
}

.process-step--blue {
  background: #eff6ff;
  border-color: #bfdbfe;
  color: #1e40af;
}
.process-step--blue .process-step__number { background: #2563eb; }

.process-step--orange {
  background: #fff7ed;
  border-color: #fed7aa;
  color: #9a3412;
}
.process-step--orange .process-step__number { background: #ea580c; }

.process-step--purple {
  background: #faf5ff;
  border-color: #e9d5ff;
  color: #6b21a8;
}
.process-step--purple .process-step__number { background: #9333ea; }

.process-step--green {
  background: #f0fdf4;
  border-color: #bbf7d0;
  color: #166534;
}
.process-step--green .process-step__number { background: #16a34a; }

/* Dark mode process steps */
[data-theme="dark"] .process-step--blue {
  background: rgba(37, 99, 235, 0.1);
  border-color: rgba(37, 99, 235, 0.3);
  color: #93c5fd;
}
[data-theme="dark"] .process-step--orange {
  background: rgba(234, 88, 12, 0.1);
  border-color: rgba(234, 88, 12, 0.3);
  color: #fdba74;
}
[data-theme="dark"] .process-step--purple {
  background: rgba(147, 51, 234, 0.1);
  border-color: rgba(147, 51, 234, 0.3);
  color: #d8b4fe;
}
[data-theme="dark"] .process-step--green {
  background: rgba(22, 163, 74, 0.1);
  border-color: rgba(22, 163, 74, 0.3);
  color: #86efac;
}

.process-arrow {
  font-size: 1.5rem;
  color: var(--secondary);
  padding: 0 0.5rem;
  flex-shrink: 0;
  user-select: none;
}

@media (max-width: 700px) {
  .process-flow {
    flex-direction: column;
    gap: 0;
  }
  .process-step {
    min-width: unset;
    width: 100%;
  }
  .process-arrow {
    transform: rotate(90deg);
    padding: 0.3rem 0;
  }
}

/* ============================================
   Impact at Scale — Metric Cards Grid
   ============================================ */

.impact-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin: 1.5rem 0 2rem;
}

.impact-card {
  padding: 1.25rem 1rem;
  border-radius: 10px;
  text-align: center;
  border: 1.5px solid;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.impact-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.impact-card__number {
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin-bottom: 0.25rem;
}

.impact-card__label {
  font-size: 0.8rem;
  font-weight: 500;
  opacity: 0.8;
  line-height: 1.3;
}

.impact-card--blue {
  background: #eff6ff;
  border-color: #bfdbfe;
  color: #1e40af;
}
.impact-card--green {
  background: #f0fdf4;
  border-color: #bbf7d0;
  color: #166534;
}
.impact-card--purple {
  background: #faf5ff;
  border-color: #e9d5ff;
  color: #6b21a8;
}
.impact-card--orange {
  background: #fff7ed;
  border-color: #fed7aa;
  color: #9a3412;
}

/* Dark mode impact cards */
[data-theme="dark"] .impact-card--blue {
  background: rgba(37, 99, 235, 0.1);
  border-color: rgba(37, 99, 235, 0.3);
  color: #93c5fd;
}
[data-theme="dark"] .impact-card--green {
  background: rgba(22, 163, 74, 0.1);
  border-color: rgba(22, 163, 74, 0.3);
  color: #86efac;
}
[data-theme="dark"] .impact-card--purple {
  background: rgba(147, 51, 234, 0.1);
  border-color: rgba(147, 51, 234, 0.3);
  color: #d8b4fe;
}
[data-theme="dark"] .impact-card--orange {
  background: rgba(234, 88, 12, 0.1);
  border-color: rgba(234, 88, 12, 0.3);
  color: #fdba74;
}

@media (max-width: 700px) {
  .impact-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 400px) {
  .impact-grid {
    grid-template-columns: 1fr;
  }
}

/* ============================================
   Technical Depth — Category Cards with Pills
   ============================================ */

.tech-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 1.5rem 0 2rem;
}

.tech-grid > :last-child:nth-child(odd) {
  grid-column: 1 / -1;
}

.tech-category {
  padding: 1.25rem;
  border-radius: 10px;
  border: 1.5px solid;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.tech-category:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.tech-category__title {
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 0.75rem;
}

.tech-category__pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tech-pill {
  display: inline-block;
  padding: 0.3rem 0.65rem;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.tech-category--blue {
  background: #eff6ff;
  border-color: #bfdbfe;
  color: #1e40af;
}
.tech-category--blue .tech-pill {
  background: rgba(219, 234, 254, 0.7);
  border-color: #bfdbfe;
}

.tech-category--orange {
  background: #fff7ed;
  border-color: #fed7aa;
  color: #9a3412;
}
.tech-category--orange .tech-pill {
  background: rgba(255, 237, 213, 0.7);
  border-color: #fed7aa;
}

.tech-category--purple {
  background: #faf5ff;
  border-color: #e9d5ff;
  color: #6b21a8;
}
.tech-category--purple .tech-pill {
  background: rgba(243, 232, 255, 0.7);
  border-color: #e9d5ff;
}

.tech-category--green {
  background: #f0fdf4;
  border-color: #bbf7d0;
  color: #166534;
}
.tech-category--green .tech-pill {
  background: rgba(220, 252, 231, 0.7);
  border-color: #bbf7d0;
}

.tech-category--gray {
  background: #f8fafc;
  border-color: #e2e8f0;
  color: #334155;
}
.tech-category--gray .tech-pill {
  background: rgba(241, 245, 249, 0.7);
  border-color: #e2e8f0;
}

/* Dark mode tech categories */
[data-theme="dark"] .tech-category--blue {
  background: rgba(37, 99, 235, 0.08);
  border-color: rgba(37, 99, 235, 0.25);
  color: #93c5fd;
}
[data-theme="dark"] .tech-category--blue .tech-pill {
  background: rgba(37, 99, 235, 0.15);
  border-color: rgba(37, 99, 235, 0.3);
  color: #bfdbfe;
}

[data-theme="dark"] .tech-category--orange {
  background: rgba(234, 88, 12, 0.08);
  border-color: rgba(234, 88, 12, 0.25);
  color: #fdba74;
}
[data-theme="dark"] .tech-category--orange .tech-pill {
  background: rgba(234, 88, 12, 0.15);
  border-color: rgba(234, 88, 12, 0.3);
  color: #fed7aa;
}

[data-theme="dark"] .tech-category--purple {
  background: rgba(147, 51, 234, 0.08);
  border-color: rgba(147, 51, 234, 0.25);
  color: #d8b4fe;
}
[data-theme="dark"] .tech-category--purple .tech-pill {
  background: rgba(147, 51, 234, 0.15);
  border-color: rgba(147, 51, 234, 0.3);
  color: #e9d5ff;
}

[data-theme="dark"] .tech-category--green {
  background: rgba(22, 163, 74, 0.08);
  border-color: rgba(22, 163, 74, 0.25);
  color: #86efac;
}
[data-theme="dark"] .tech-category--green .tech-pill {
  background: rgba(22, 163, 74, 0.15);
  border-color: rgba(22, 163, 74, 0.3);
  color: #bbf7d0;
}

[data-theme="dark"] .tech-category--gray {
  background: rgba(100, 116, 139, 0.08);
  border-color: rgba(100, 116, 139, 0.25);
  color: #cbd5e1;
}
[data-theme="dark"] .tech-category--gray .tech-pill {
  background: rgba(100, 116, 139, 0.15);
  border-color: rgba(100, 116, 139, 0.3);
  color: #e2e8f0;
}

@media (max-width: 600px) {
  .tech-grid {
    grid-template-columns: 1fr;
  }
}

/* ============================================
   Capability Tree — What I Help Organizations Do
   ============================================ */

.capability-tree {
  margin: 1.5rem 0 2rem;
}

.capability-root {
  text-align: center;
  font-size: 1.1rem;
  font-weight: 700;
  padding: 0.9rem 1.5rem;
  border-radius: 10px;
  border: 1.5px solid;
  margin-bottom: 1.25rem;
  position: relative;
}

/* Vertical connector from root */
.capability-root::after {
  content: '';
  position: absolute;
  bottom: -1.25rem;
  left: 50%;
  width: 2px;
  height: 1.25rem;
  background: var(--border);
}

.capability-branches {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  position: relative;
}

/* Horizontal connector line across branches */
.capability-branches::before {
  content: '';
  position: absolute;
  top: 0;
  left: calc(12.5% + 0.5rem);
  right: calc(12.5% + 0.5rem);
  height: 2px;
  background: var(--border);
}

.capability-branch {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-top: 1.25rem;
}

/* Vertical connector from horizontal line to node */
.capability-branch::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 2px;
  height: 1.25rem;
  background: var(--border);
}

.capability-node {
  width: 100%;
  text-align: center;
  font-size: 0.88rem;
  font-weight: 600;
  padding: 0.75rem 0.5rem;
  border-radius: 8px;
  border: 1.5px solid;
  margin-bottom: 0.6rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.capability-node:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.capability-leaves {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  width: 100%;
}

.capability-leaf {
  display: block;
  text-align: center;
  font-size: 0.76rem;
  font-weight: 500;
  padding: 0.4rem 0.5rem;
  border-radius: 6px;
  border: 1px solid;
  line-height: 1.3;
}

/* Color variants — light mode */
.capability-root--blue {
  background: #dbeafe;
  border-color: #93c5fd;
  color: #1e40af;
}

.capability-node--orange {
  background: #fff7ed;
  border-color: #fed7aa;
  color: #9a3412;
}
.capability-leaf--orange {
  background: #fff7ed;
  border-color: #fed7aa;
  color: #9a3412;
}

.capability-node--green {
  background: #f0fdf4;
  border-color: #bbf7d0;
  color: #166534;
}
.capability-leaf--green {
  background: #f0fdf4;
  border-color: #bbf7d0;
  color: #166534;
}

.capability-node--purple {
  background: #faf5ff;
  border-color: #e9d5ff;
  color: #6b21a8;
}
.capability-leaf--purple {
  background: #faf5ff;
  border-color: #e9d5ff;
  color: #6b21a8;
}

.capability-node--blue {
  background: #eff6ff;
  border-color: #bfdbfe;
  color: #1e40af;
}
.capability-leaf--blue {
  background: #eff6ff;
  border-color: #bfdbfe;
  color: #1e40af;
}

/* Dark mode */
[data-theme="dark"] .capability-root--blue {
  background: rgba(37, 99, 235, 0.15);
  border-color: rgba(37, 99, 235, 0.35);
  color: #93c5fd;
}

[data-theme="dark"] .capability-node--orange,
[data-theme="dark"] .capability-leaf--orange {
  background: rgba(234, 88, 12, 0.1);
  border-color: rgba(234, 88, 12, 0.3);
  color: #fdba74;
}

[data-theme="dark"] .capability-node--green,
[data-theme="dark"] .capability-leaf--green {
  background: rgba(22, 163, 74, 0.1);
  border-color: rgba(22, 163, 74, 0.3);
  color: #86efac;
}

[data-theme="dark"] .capability-node--purple,
[data-theme="dark"] .capability-leaf--purple {
  background: rgba(147, 51, 234, 0.1);
  border-color: rgba(147, 51, 234, 0.3);
  color: #d8b4fe;
}

[data-theme="dark"] .capability-node--blue,
[data-theme="dark"] .capability-leaf--blue {
  background: rgba(37, 99, 235, 0.1);
  border-color: rgba(37, 99, 235, 0.3);
  color: #93c5fd;
}

/* Tablet: 2×2 grid */
@media (max-width: 800px) {
  .capability-branches {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem 1.25rem;
  }

  /* Hide the top horizontal connector on smaller grids */
  .capability-branches::before {
    display: none;
  }

  .capability-branch::before {
    display: none;
  }

  .capability-branch {
    padding-top: 0;
  }
}

/* Mobile: single column stack */
@media (max-width: 480px) {
  .capability-branches {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .capability-root {
    font-size: 1rem;
    padding: 0.75rem 1rem;
    margin-bottom: 0.75rem;
  }

  .capability-root::after {
    display: none;
  }

  .capability-node {
    font-size: 0.85rem;
  }

  .capability-leaf {
    font-size: 0.75rem;
  }
}
```

---

### File: `featured-project.css`

> **Purpose**: Featured project card with image, hover lift, and tag pills.

```css
/* ==============================================
   Featured Project Card — smooth premium styling
   ============================================== */

.featured-project-card {
  display: block;
  text-decoration: none;
  color: inherit;
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  margin: 1.5rem 0;
  background: var(--entry);
  transition:
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.35s ease;
  will-change: transform;
}

.featured-project-card:hover {
  transform: translateY(-4px);
  border-color: var(--link);
  box-shadow:
    0 12px 32px rgba(0, 0, 0, 0.08),
    0 4px 12px rgba(0, 0, 0, 0.04);
}

[data-theme="dark"] .featured-project-card:hover {
  box-shadow:
    0 12px 32px rgba(0, 0, 0, 0.3),
    0 4px 12px rgba(0, 0, 0, 0.2);
}

.featured-project-card:active {
  transform: translateY(-2px);
  transition-duration: 0.1s;
}

/* Image */
.featured-project-img {
  width: 100%;
  height: 260px;
  object-fit: cover;
  display: block;
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.featured-project-card:hover .featured-project-img {
  transform: scale(1.02);
}

/* Body */
.featured-project-body {
  padding: 1.25rem 1.5rem 1.5rem;
}

/* Title */
.featured-project-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--primary);
  transition: color 0.25s ease;
}

.featured-project-card:hover .featured-project-title {
  color: var(--link);
}

/* Description */
.featured-project-desc {
  margin: 0 0 0.75rem 0;
  color: var(--secondary);
  font-size: 0.95rem;
  line-height: 1.6;
}

/* Tag pills */
.featured-project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.featured-project-tags span {
  padding: 0.2rem 0.65rem;
  background: var(--code-bg);
  border-radius: 4px;
  font-size: 0.75rem;
  color: var(--secondary);
  letter-spacing: 0.01em;
  transition: background 0.25s ease, color 0.25s ease;
}

.featured-project-card:hover .featured-project-tags span {
  background: var(--tertiary);
}

/* Responsive */
@media (max-width: 768px) {
  .featured-project-img {
    height: 180px;
  }

  .featured-project-body {
    padding: 1rem 1.25rem 1.25rem;
  }

  .featured-project-title {
    font-size: 1.2rem;
  }
}
```

---

## Layout Partials

All layout files go in `hugo-site/layouts/partials/`.

### File: `extend_head.html`

> **Purpose**: Google Fonts (Inter), Open Graph, Twitter Cards, JSON-LD structured data, AIO meta tags.

```html
{{- /* Enhanced SEO + AIO (AI Optimization) head tags */ -}}

{{- /* Inter font — geometric sans-serif for enterprise precision */ -}}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">

{{- /* Open Graph enhanced metadata */ -}}
<meta property="og:site_name" content="{{ site.Title }}">
<meta property="og:locale" content="{{ site.LanguageCode | default "en_US" }}">
{{- if .IsPage }}
<meta property="og:type" content="article">
<meta property="article:author" content="{{ site.Params.author }}">
<meta property="article:published_time" content="{{ .Date.Format "2006-01-02T15:04:05Z07:00" }}">
<meta property="article:modified_time" content="{{ .Lastmod.Format "2006-01-02T15:04:05Z07:00" }}">
{{- range .Params.tags }}
<meta property="article:tag" content="{{ . }}">
{{- end }}
{{- range .Params.categories }}
<meta property="article:section" content="{{ . }}">
{{- end }}
{{- end }}

{{- /* Twitter Card metadata */ -}}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{{ .Title }}">
<meta name="twitter:description" content="{{ with .Description }}{{ . }}{{ else }}{{ .Summary | truncate 160 }}{{ end }}">

{{- /* AI Optimization (AIO) — help LLMs understand page context */ -}}
{{- if .IsPage }}
<meta name="citation_title" content="{{ .Title }}">
<meta name="citation_author" content="{{ site.Params.author }}">
<meta name="citation_date" content="{{ .Date.Format "2006/01/02" }}">
{{- end }}

{{- /* Structured Data (JSON-LD) — WebSite schema for homepage */ -}}
{{- if .IsHome }}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "{{ site.Title }}",
  "url": "{{ site.BaseURL }}",
  "description": "{{ site.Params.description }}",
  "author": {
    "@type": "Person",
    "name": "{{ site.Params.author }}",
    "url": "{{ site.BaseURL }}about/",
    "jobTitle": "Enterprise Architect & Strategic Technology Leader",
    "sameAs": [
      {{- range $i, $social := site.Params.socialIcons }}
      {{- if $i }},{{ end }}
      "{{ $social.url }}"
      {{- end }}
    ]
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "{{ site.BaseURL }}search/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>
{{- end }}

{{- /* Structured Data (JSON-LD) — Article/TechArticle schema for pages */ -}}
{{- if .IsPage }}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "{{ if in (.Params.categories | default slice) "Architecture Work" }}TechArticle{{ else }}Article{{ end }}",
  "headline": "{{ .Title }}",
  "description": "{{ with .Description }}{{ . }}{{ else }}{{ .Summary | plainify | truncate 300 }}{{ end }}",
  "url": "{{ .Permalink }}",
  "datePublished": "{{ .Date.Format "2006-01-02T15:04:05Z07:00" }}",
  "dateModified": "{{ .Lastmod.Format "2006-01-02T15:04:05Z07:00" }}",
  "author": {
    "@type": "Person",
    "name": "{{ site.Params.author }}",
    "url": "{{ site.BaseURL }}about/"
  },
  "publisher": {
    "@type": "Person",
    "name": "{{ site.Params.author }}"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "{{ .Permalink }}"
  }
  {{- with .Params.tags }},
  "keywords": "{{ delimit . ", " }}"
  {{- end }}
  {{- with .Params.cover }}{{ if .image }},
  "image": "{{ .image | absURL }}"
  {{- end }}{{ end }}
}
</script>
{{- end }}

{{- /* BreadcrumbList structured data */ -}}
{{- if not .IsHome }}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "{{ site.BaseURL }}"
    }
    {{- if .Parent }}
    ,{
      "@type": "ListItem",
      "position": 2,
      "name": "{{ .Parent.Title }}",
      "item": "{{ .Parent.Permalink }}"
    }
    ,{
      "@type": "ListItem",
      "position": 3,
      "name": "{{ .Title }}",
      "item": "{{ .Permalink }}"
    }
    {{- else }}
    ,{
      "@type": "ListItem",
      "position": 2,
      "name": "{{ .Title }}",
      "item": "{{ .Permalink }}"
    }
    {{- end }}
  ]
}
</script>
{{- end }}

{{- /* AI-friendly metadata for LLM crawlers */ -}}
<meta name="generator" content="Hugo {{ hugo.Version }}">
{{- if .IsPage }}
<meta name="article:content_tier" content="free">
{{- with .ReadingTime }}
<meta name="reading-time" content="{{ . }} minutes">
{{- end }}
{{- end }}
```

---

### File: `extend_footer.html`

> **Purpose**: Mermaid v11 rendering engine — inline CSS for wrapper/fullscreen viewer, JS module for init, fullscreen zoom/pan/pinch, semantic class dark-mode overrides. This is the largest layout file (800 lines). Copy as-is.

```html
{{- /* Footer custom content area start */ -}}

{{- /* Mermaid diagram support with fullscreen viewer */ -}}
<style>
/* Mermaid container wrapper */
.mermaid-wrapper {
  position: relative;
  margin: 2rem 0;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1rem;
  background: var(--code-bg);
  overflow: hidden;
}

.mermaid {
  max-height: 500px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.mermaid svg {
  max-width: 100%;
  max-height: 500px;
  height: auto;
  width: auto;
  object-fit: contain;
}

/* Fullscreen button */
.mermaid-fullscreen-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: var(--entry);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--content);
  font-size: 14px;
  font-family: inherit;
  transition: all 0.2s ease;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.mermaid-fullscreen-btn:hover {
  background: var(--tertiary);
  box-shadow: 0 2px 6px rgba(0,0,0,0.12);
}

.mermaid-fullscreen-btn svg {
  width: 16px;
  height: 16px;
}

/* Fullscreen dialog */
.mermaid-fullscreen-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  z-index: 10000;
  padding: 20px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1), visibility 0.3s;
}

.mermaid-fullscreen-dialog.active {
  display: flex;
  flex-direction: column;
  opacity: 1;
  visibility: visible;
}

.mermaid-fullscreen-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: var(--entry);
  border-radius: 8px 8px 0 0;
  margin-bottom: 10px;
}

.mermaid-fullscreen-title {
  color: var(--primary);
  font-size: 16px;
  font-weight: 600;
  flex: 1;
}

.mermaid-fullscreen-controls {
  display: flex;
  gap: 10px;
  align-items: center;
}

.mermaid-zoom-controls {
  display: flex;
  gap: 5px;
  align-items: center;
  background: var(--theme);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 4px;
}

.mermaid-zoom-btn {
  background: transparent;
  border: none;
  border-radius: 4px;
  padding: 6px 10px;
  cursor: pointer;
  color: var(--content);
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s ease;
  font-weight: 600;
}

.mermaid-zoom-btn:hover {
  background: var(--entry);
}

.mermaid-zoom-btn svg {
  width: 14px;
  height: 14px;
}

.mermaid-zoom-level {
  padding: 0 8px;
  color: var(--secondary);
  font-size: 13px;
  min-width: 50px;
  text-align: center;
}

.mermaid-fullscreen-close {
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
  color: var(--content);
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.mermaid-fullscreen-close:hover {
  background: var(--tertiary);
}

.mermaid-fullscreen-close svg {
  width: 16px;
  height: 16px;
}

.mermaid-fullscreen-content {
  flex: 1;
  background: var(--theme);
  border-radius: 8px;
  overflow: auto;
  padding: 40px;
  display: block;
  -webkit-overflow-scrolling: touch;
  position: relative;
  cursor: grab;
}

.mermaid-fullscreen-content.is-dragging {
  cursor: grabbing;
  user-select: none;
  -webkit-user-select: none;
}

.mermaid-fullscreen-content-inner {
  transform-origin: top left;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  display: inline-block;
  min-width: min-content;
  width: max-content;
  margin: 0 auto;
  pointer-events: none;
}

.mermaid-fullscreen-content svg {
  max-width: none !important;
  height: auto !important;
  display: block;
}

/* --- Fullscreen Light Theme Readability Fixes --- */
.mermaid-fullscreen-content-inner .cluster-label .nodeLabel {
  color: #334155 !important;
  fill: #334155 !important;
  font-size: 13px !important;
  font-weight: 600 !important;
}

.mermaid-fullscreen-content-inner .edgeLabel,
.mermaid-fullscreen-content-inner .edgeLabel span,
.mermaid-fullscreen-content-inner .edgeLabel p,
.mermaid-fullscreen-content-inner .edgeLabel .label {
  color: #475569 !important;
  fill: #475569 !important;
}

.mermaid-fullscreen-content-inner .edgeLabel rect {
  fill: #F8FAFC !important;
  stroke: none !important;
}

.mermaid-fullscreen-content-inner .flowchart-link {
  stroke: #64748B !important;
}

.mermaid-fullscreen-content-inner .marker {
  fill: #64748B !important;
  stroke: #64748B !important;
}

.mermaid-fullscreen-content-inner text {
  font-family: "IBM Plex Sans", system-ui, sans-serif !important;
}

.mermaid-fullscreen-content-inner .cluster rect {
  fill: rgba(0, 0, 0, 0.03) !important;
  stroke: #94A3B8 !important;
  stroke-width: 1.5px !important;
  stroke-dasharray: 8 4 !important;
  rx: 8px !important;
  ry: 8px !important;
}

.mermaid-fullscreen-content-inner .node .nodeLabel {
  color: #fff !important;
  fill: #fff !important;
}

.mermaid-fullscreen-content-inner .messageText {
  fill: #475569 !important;
}

.mermaid-fullscreen-content-inner .messageLine0,
.mermaid-fullscreen-content-inner .messageLine1 {
  stroke: #64748B !important;
}

/* --- Dark Theme overrides for fullscreen --- */
[data-theme="dark"] .mermaid-fullscreen-content-inner .cluster-label .nodeLabel {
  color: #94A3B8 !important;
  fill: #94A3B8 !important;
}

[data-theme="dark"] .mermaid-fullscreen-content-inner .edgeLabel,
[data-theme="dark"] .mermaid-fullscreen-content-inner .edgeLabel span,
[data-theme="dark"] .mermaid-fullscreen-content-inner .edgeLabel p,
[data-theme="dark"] .mermaid-fullscreen-content-inner .edgeLabel .label {
  color: #94A3B8 !important;
  fill: #94A3B8 !important;
}

[data-theme="dark"] .mermaid-fullscreen-content-inner .edgeLabel rect {
  fill: #0F172A !important;
}

[data-theme="dark"] .mermaid-fullscreen-content-inner .flowchart-link {
  stroke: #94A3B8 !important;
}

[data-theme="dark"] .mermaid-fullscreen-content-inner .marker {
  fill: #94A3B8 !important;
  stroke: #94A3B8 !important;
}

[data-theme="dark"] .mermaid-fullscreen-content-inner .cluster rect {
  fill: rgba(255, 255, 255, 0.04) !important;
  stroke: #667 !important;
}

[data-theme="dark"] .mermaid-fullscreen-content-inner .messageText {
  fill: #94A3B8 !important;
}

[data-theme="dark"] .mermaid-fullscreen-content-inner .messageLine0,
[data-theme="dark"] .mermaid-fullscreen-content-inner .messageLine1 {
  stroke: #94A3B8 !important;
}

/* Mobile Responsive Styles */
@media (max-width: 768px) {
  .mermaid-fullscreen-dialog {
    padding: 10px;
  }
  
  .mermaid-fullscreen-header {
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    align-items: stretch;
  }
  
  .mermaid-fullscreen-title {
    font-size: 14px;
    text-align: center;
    word-break: break-word;
    line-height: 1.3;
  }
  
  .mermaid-fullscreen-controls {
    flex-direction: column;
    gap: 8px;
  }
  
  .mermaid-zoom-controls {
    justify-content: center;
    width: 100%;
  }
  
  .mermaid-zoom-btn {
    padding: 8px 12px;
  }
  
  .mermaid-fullscreen-close {
    width: 100%;
    justify-content: center;
    padding: 10px;
  }
  
  .mermaid-fullscreen-content {
    padding: 20px 10px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    cursor: grab;
  }

  .mermaid-fullscreen-content.is-dragging {
    cursor: grabbing;
  }
  
  .mermaid-fullscreen-content-inner {
    min-width: min-content;
    width: max-content;
  }
}
</style>

<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
  
  // Function to initialize Mermaid with the correct theme
  function initMermaid() {
    const isDark = document.documentElement.dataset.theme === 'dark' || 
                   (!document.documentElement.dataset.theme && 
                    window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      themeVariables: isDark ? {
        primaryColor: '#1168BD',
        primaryTextColor: '#ffffff',
        primaryBorderColor: 'rgba(255,255,255,0.1)',
        lineColor: '#94A3B8',
        secondaryColor: '#1E3A5F',
        tertiaryColor: 'rgba(255,255,255,0.04)',
        noteBkgColor: '#2D2A1E',
        noteTextColor: '#E2E8F0',
        noteBorderColor: '#5C5630',
        actorBkg: '#1168BD',
        actorTextColor: '#ffffff',
        actorBorder: 'rgba(255,255,255,0.1)',
        signalColor: '#94A3B8',
        signalTextColor: '#94A3B8',
        background: '#0F172A',
        mainBkg: '#1168BD',
        nodeBorder: 'rgba(255,255,255,0.1)',
        clusterBkg: 'rgba(255,255,255,0.04)',
        clusterBorder: '#667',
        titleColor: '#94A3B8',
        edgeLabelBackground: '#0B1220'
      } : {
        primaryColor: '#438DD5',
        primaryTextColor: '#ffffff',
        primaryBorderColor: 'rgba(0,0,0,0.15)',
        lineColor: '#475569',
        secondaryColor: '#85BBF0',
        secondaryTextColor: '#334155',
        tertiaryColor: 'rgba(0,0,0,0.03)',
        tertiaryTextColor: '#334155',
        noteBkgColor: '#FFF8DC',
        noteTextColor: '#333333',
        noteBorderColor: '#D4C68A',
        actorBkg: '#438DD5',
        actorTextColor: '#ffffff',
        actorBorder: 'rgba(0,0,0,0.15)',
        signalColor: '#475569',
        signalTextColor: '#475569',
        background: '#F8FAFC',
        mainBkg: '#438DD5',
        nodeBorder: 'rgba(0,0,0,0.15)',
        clusterBkg: 'rgba(0,0,0,0.04)',
        clusterBorder: '#94A3B8',
        titleColor: '#334155',
        edgeLabelBackground: '#F8FAFC',
        textColor: '#334155'
      },
      securityLevel: 'loose',
      fontFamily: '"IBM Plex Sans", system-ui, sans-serif',
      fontSize: 13,
      flowchart: {
        useMaxWidth: false,
        htmlLabels: true,
        curve: 'basis',
        padding: 15,
        nodeSpacing: 50,
        rankSpacing: 50,
        wrappingWidth: 200
      },
      sequence: {
        useMaxWidth: false,
        diagramMarginX: 50,
        diagramMarginY: 10,
        actorMargin: 80,
        width: 180,
        height: 65,
        boxMargin: 10,
        boxTextMargin: 5,
        noteMargin: 10,
        messageMargin: 40,
        mirrorActors: true,
        bottomMarginAdj: 1,
        showSequenceNumbers: false,
        wrap: true,
        wrapPadding: 10
      }
    });
    
    // Create fullscreen dialog (shared for all diagrams)
    let fullscreenDialog = document.querySelector('.mermaid-fullscreen-dialog');
    let currentZoom = 1;
    
    if (!fullscreenDialog) {
      fullscreenDialog = document.createElement('div');
      fullscreenDialog.className = 'mermaid-fullscreen-dialog';
      fullscreenDialog.innerHTML = `
        <div class="mermaid-fullscreen-header">
          <div class="mermaid-fullscreen-title">Diagram Viewer</div>
          <div class="mermaid-fullscreen-controls">
            <div class="mermaid-zoom-controls">
              <button class="mermaid-zoom-btn mermaid-zoom-out" title="Zoom Out">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
              <span class="mermaid-zoom-level">100%</span>
              <button class="mermaid-zoom-btn mermaid-zoom-in" title="Zoom In">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
              <button class="mermaid-zoom-btn mermaid-zoom-reset" title="Reset Zoom">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 4v6h6"></path>
                  <path d="M23 20v-6h-6"></path>
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                </svg>
              </button>
            </div>
            <button class="mermaid-fullscreen-close">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              Close
            </button>
          </div>
        </div>
        <div class="mermaid-fullscreen-content">
          <div class="mermaid-fullscreen-content-inner"></div>
        </div>
      `;
      document.body.appendChild(fullscreenDialog);
      
      const contentInner = fullscreenDialog.querySelector('.mermaid-fullscreen-content-inner');
      const zoomLevel = fullscreenDialog.querySelector('.mermaid-zoom-level');
      
      // Zoom functions
      function updateZoom(zoom) {
        currentZoom = Math.max(0.25, Math.min(3, zoom));
        contentInner.style.transform = `scale(${currentZoom})`;
        zoomLevel.textContent = `${Math.round(currentZoom * 100)}%`;
      }
      
      // Zoom in button
      fullscreenDialog.querySelector('.mermaid-zoom-in').addEventListener('click', () => {
        updateZoom(currentZoom + 0.25);
      });
      
      // Zoom out button
      fullscreenDialog.querySelector('.mermaid-zoom-out').addEventListener('click', () => {
        updateZoom(currentZoom - 0.25);
      });
      
      // Reset zoom button
      fullscreenDialog.querySelector('.mermaid-zoom-reset').addEventListener('click', () => {
        updateZoom(1);
      });
      
      // Keyboard shortcuts for zoom
      document.addEventListener('keydown', (e) => {
        if (fullscreenDialog.classList.contains('active')) {
          if (e.key === '+' || e.key === '=') {
            e.preventDefault();
            updateZoom(currentZoom + 0.25);
          } else if (e.key === '-' || e.key === '_') {
            e.preventDefault();
            updateZoom(currentZoom - 0.25);
          } else if (e.key === '0') {
            e.preventDefault();
            updateZoom(1);
          }
        }
      });
      
      // Close button handler
      fullscreenDialog.querySelector('.mermaid-fullscreen-close').addEventListener('click', () => {
        fullscreenDialog.classList.remove('active');
        document.body.style.overflow = '';
        updateZoom(1);
      });
      
      // Close on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && fullscreenDialog.classList.contains('active')) {
          fullscreenDialog.classList.remove('active');
          document.body.style.overflow = '';
          updateZoom(1);
        }
      });
      
      // Close on background click
      fullscreenDialog.addEventListener('click', (e) => {
        if (e.target === fullscreenDialog) {
          fullscreenDialog.classList.remove('active');
          document.body.style.overflow = '';
          updateZoom(1);
        }
      });

      // --- Drag-to-pan in all directions ---
      const fullscreenContent = fullscreenDialog.querySelector('.mermaid-fullscreen-content');
      let isDragging = false;
      let dragStartX = 0;
      let dragStartY = 0;
      let scrollStartX = 0;
      let scrollStartY = 0;

      function onDragStart(e) {
        if (e.target.closest('button')) return;
        isDragging = true;
        fullscreenContent.classList.add('is-dragging');
        const point = e.touches ? e.touches[0] : e;
        dragStartX = point.clientX;
        dragStartY = point.clientY;
        scrollStartX = fullscreenContent.scrollLeft;
        scrollStartY = fullscreenContent.scrollTop;
        e.preventDefault();
      }

      function onDragMove(e) {
        if (!isDragging) return;
        const point = e.touches ? e.touches[0] : e;
        const dx = point.clientX - dragStartX;
        const dy = point.clientY - dragStartY;
        fullscreenContent.scrollLeft = scrollStartX - dx;
        fullscreenContent.scrollTop = scrollStartY - dy;
        e.preventDefault();
      }

      function onDragEnd() {
        if (!isDragging) return;
        isDragging = false;
        fullscreenContent.classList.remove('is-dragging');
      }

      fullscreenContent.addEventListener('mousedown', onDragStart);
      document.addEventListener('mousemove', onDragMove);
      document.addEventListener('mouseup', onDragEnd);

      // --- Pinch-to-zoom gesture support ---
      let pinchStartDist = 0;
      let pinchStartZoom = 1;

      function getTouchDistance(touches) {
        const dx = touches[0].clientX - touches[1].clientX;
        const dy = touches[0].clientY - touches[1].clientY;
        return Math.hypot(dx, dy);
      }

      fullscreenContent.addEventListener('touchstart', (e) => {
        if (e.touches.length === 2) {
          e.preventDefault();
          isDragging = false;
          fullscreenContent.classList.remove('is-dragging');
          pinchStartDist = getTouchDistance(e.touches);
          pinchStartZoom = currentZoom;
        } else if (e.touches.length === 1) {
          onDragStart(e);
        }
      }, { passive: false });

      document.addEventListener('touchmove', (e) => {
        if (e.touches.length === 2 && fullscreenDialog.classList.contains('active')) {
          e.preventDefault();
          const dist = getTouchDistance(e.touches);
          const scale = dist / pinchStartDist;
          updateZoom(pinchStartZoom * scale);
        } else if (e.touches.length === 1 && isDragging) {
          onDragMove(e);
        }
      }, { passive: false });

      document.addEventListener('touchend', (e) => {
        if (e.touches.length < 2) {
          pinchStartDist = 0;
        }
        if (e.touches.length === 0) {
          onDragEnd();
        }
      });
    }
    
    // Semantic class color definitions for light and dark mode
    const semanticColors = {
      dark: {
        primary:   { fill: '#1e3a5f', stroke: '#60a5fa', strokeWidth: '2.5px', color: '#dbeafe' },
        secondary: { fill: '#14532d', stroke: '#4ade80', strokeWidth: '2.5px', color: '#dcfce7' },
        accent:    { fill: '#7c2d12', stroke: '#fb923c', strokeWidth: '2.5px', color: '#ffedd5' },
        highlight: { fill: '#581c87', stroke: '#c084fc', strokeWidth: '2.5px', color: '#f3e8ff' },
        danger:    { fill: '#7f1d1d', stroke: '#f87171', strokeWidth: '2.5px', color: '#fee2e2' },
        neutral:   { fill: '#1e293b', stroke: '#94a3b8', strokeWidth: '2.5px', color: '#e2e8f0' }
      },
      light: {
        primary:   { fill: '#dbeafe', stroke: '#2563eb', strokeWidth: '1.5px', color: '#1e40af' },
        secondary: { fill: '#dcfce7', stroke: '#16a34a', strokeWidth: '1.5px', color: '#166534' },
        accent:    { fill: '#ffedd5', stroke: '#ea580c', strokeWidth: '1.5px', color: '#9a3412' },
        highlight: { fill: '#f3e8ff', stroke: '#9333ea', strokeWidth: '1.5px', color: '#6b21a8' },
        danger:    { fill: '#fee2e2', stroke: '#dc2626', strokeWidth: '1.5px', color: '#991b1b' },
        neutral:   { fill: '#f1f5f9', stroke: '#64748b', strokeWidth: '1.5px', color: '#334155' }
      }
    };

    // Apply semantic class overrides directly on SVG elements
    function applySemanticClassOverrides(container) {
      const theme = document.documentElement.dataset.theme;
      const isDark = theme === 'dark' ||
                     (theme !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      const palette = isDark ? semanticColors.dark : semanticColors.light;

      for (const [cls, colors] of Object.entries(palette)) {
        container.querySelectorAll(`.node.${cls}`).forEach(node => {
          node.querySelectorAll('rect, polygon, circle, path').forEach(shape => {
            shape.style.setProperty('fill', colors.fill, 'important');
            shape.style.setProperty('stroke', colors.stroke, 'important');
            shape.style.setProperty('stroke-width', colors.strokeWidth, 'important');
          });
          node.querySelectorAll('.nodeLabel').forEach(label => {
            label.style.setProperty('color', colors.color, 'important');
            label.style.setProperty('fill', colors.color, 'important');
          });
        });
      }
    }

    // Find all code blocks with class 'language-mermaid' and render them
    document.querySelectorAll('pre > code.language-mermaid').forEach(async (codeBlock, index) => {
      const pre = codeBlock.parentNode;
      const wrapper = document.createElement('div');
      wrapper.className = 'mermaid-wrapper';
      
      const container = document.createElement('div');
      container.className = 'mermaid';
      
      const fullscreenBtn = document.createElement('button');
      fullscreenBtn.className = 'mermaid-fullscreen-btn';
      fullscreenBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
        </svg>
        Fullscreen
      `;
      
      try {
        const { svg } = await mermaid.render(`mermaid-diagram-${index}`, codeBlock.textContent);
        container.innerHTML = svg;
        applySemanticClassOverrides(container);
        
        let diagramTitle = 'Diagram Viewer';
        let prevElement = pre.previousElementSibling;
        while (prevElement) {
          if (prevElement.tagName && prevElement.tagName.match(/^H[1-6]$/)) {
            diagramTitle = prevElement.textContent.replace(/\s*#\s*$/, '').trim();
            break;
          }
          prevElement = prevElement.previousElementSibling;
        }
        
        fullscreenBtn.addEventListener('click', () => {
          const fullscreenContentInner = fullscreenDialog.querySelector('.mermaid-fullscreen-content-inner');
          const fullscreenTitle = fullscreenDialog.querySelector('.mermaid-fullscreen-title');
          const fullscreenContentArea = fullscreenDialog.querySelector('.mermaid-fullscreen-content');
          fullscreenContentInner.innerHTML = svg;
          applySemanticClassOverrides(fullscreenContentInner);
          fullscreenTitle.textContent = diagramTitle;
          fullscreenDialog.classList.add('active');
          document.body.style.overflow = 'hidden';
          
          currentZoom = 1;
          fullscreenContentInner.style.transform = 'scale(1)';
          fullscreenDialog.querySelector('.mermaid-zoom-level').textContent = '100%';

          if (fullscreenContentArea) {
            fullscreenContentArea.scrollLeft = 0;
            fullscreenContentArea.scrollTop = 0;
          }
        });
        
        wrapper.appendChild(fullscreenBtn);
        wrapper.appendChild(container);
        pre.parentNode.replaceChild(wrapper, pre);
      } catch (error) {
        console.error('Mermaid rendering error:', error);
        container.innerHTML = `<pre class="mermaid-error">Error rendering diagram: ${error.message}</pre>`;
        wrapper.appendChild(container);
        pre.parentNode.replaceChild(wrapper, pre);
      }
    });
  }
  
  // Initialize Mermaid when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMermaid);
  } else {
    initMermaid();
  }
  
  // Re-initialize Mermaid when theme changes
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      setTimeout(() => {
        location.reload();
      }, 100);
    });
  }
</script>

{{- /* Footer custom content area end */ -}}
```

---

### File: `header.html`

> **Purpose**: Navigation bar with logo, theme toggle (moon/sun SVGs), language toggle, and menu items with pipe separators.

```html
<header class="header">
    <nav class="nav">
        <div class="logo">
            {{- $label_text := (site.Params.label.text | default site.Title) }}
            {{- if site.Title }}
            <a href="{{ "" | absLangURL }}" accesskey="h" title="{{ $label_text }} (Alt + H)">
                {{- if site.Params.label.icon }}
                {{- $img := resources.Get site.Params.label.icon }}
                {{- if $img }}
                    {{- $processableFormats := (slice "jpg" "jpeg" "png" "tif" "bmp" "gif") -}}
                    {{- if hugo.IsExtended -}}
                        {{- $processableFormats = $processableFormats | append "webp" -}}
                    {{- end -}}
                    {{- $prod := (hugo.IsProduction | or (eq site.Params.env "production")) }}
                    {{- if and (in $processableFormats $img.MediaType.SubType) (eq $prod true)}}
                        {{- if site.Params.label.iconHeight }}
                            {{- $img = $img.Resize (printf "x%d" site.Params.label.iconHeight) }}
                        {{ else }}
                            {{- $img = $img.Resize "x30" }}
                        {{- end }}
                    {{- end }}
                    <img src="{{ $img.Permalink }}" alt="" aria-label="logo"
                        height="{{- site.Params.label.iconHeight | default "30" -}}">
                {{- else }}
                <img src="{{- site.Params.label.icon | absURL -}}" alt="" aria-label="logo"
                    height="{{- site.Params.label.iconHeight | default "30" -}}">
                {{- end -}}
                {{- else if hasPrefix site.Params.label.iconSVG "<svg" }}
                    {{ site.Params.label.iconSVG | safeHTML }}
                {{- end -}}
                {{- $label_text -}}
            </a>
            {{- end }}
            <div class="logo-switches">
                {{- if (not site.Params.disableThemeToggle) }}
                <button id="theme-toggle" accesskey="t" title="(Alt + T)" aria-label="Toggle theme">
                    <svg id="moon" xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                    <svg id="sun" xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                </button>
                {{- end }}
                
                {{- if (not site.Params.disableLangToggle) }}
                    {{- $lang := .Lang}}
                    {{- $separator := or $label_text (not site.Params.disableThemeToggle)}}
                    {{- with site.Home.Translations }}
                    <ul class="lang-switch">
                        {{- if $separator }}<li>|</li>{{ end }}
                        {{- range . -}}
                        {{- if ne $lang .Lang }}
                        <li>
                            <a href="{{- .Permalink -}}" title="{{ .Language.Params.languageAltTitle | default (.Language.LanguageName | emojify) | default (.Lang | title) }}"
                                aria-label="{{ .Language.LanguageName | default (.Lang | title) }}">
                                {{- if (and site.Params.displayFullLangName (.Language.LanguageName)) }}
                                {{- .Language.LanguageName | emojify -}}
                                {{- else }}
                                {{- .Lang | title -}}
                                {{- end -}}
                            </a>
                        </li>
                        {{- end -}}
                        {{- end}}
                    </ul>
                    {{- end }}
                {{- end }}
            </div>
        </div>
        {{- $currentPage := . }}
        <ul id="menu">
            {{- range $index, $element := site.Menus.main }}
            {{- $menu_item_url := (cond (strings.HasSuffix .URL "/") .URL (printf "%s/" .URL) ) | absLangURL }}
            {{- $page_url:= $currentPage.Permalink | absLangURL }}
            {{- $is_search := eq (site.GetPage .KeyName).Layout `search` }}
            {{- if gt $index 0 }}
            <li class="menu-separator">|</li>
            {{- end }}
            <li>
                <a href="{{ .URL | absLangURL }}" title="{{ .Title | default .Name }} {{- cond $is_search (" (Alt + /)" | safeHTMLAttr) ("" | safeHTMLAttr ) }}"
                {{- cond $is_search (" accesskey=/" | safeHTMLAttr) ("" | safeHTMLAttr ) }}>
                    <span {{- if eq $menu_item_url $page_url }} class="active" {{- end }}>
                        {{- .Pre }}
                        {{- .Name -}}
                        {{ .Post -}}
                    </span>
                    {{- if (findRE "://" .URL) }}&nbsp;
                    <svg fill="none" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round"
                        stroke-linejoin="round" stroke-width="2.5" viewBox="0 0 24 24" height="12" width="12">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                        <path d="M15 3h6v6"></path>
                        <path d="M10 14L21 3"></path>
                    </svg>
                    {{- end }}
                </a>
            </li>
            {{- end }}
        </ul>
    </nav>
</header>
```

---

### File: `footer.html`

> **Purpose**: Footer with social links (email, LinkedIn, GitHub SVG icons), scroll-to-top, theme toggle script, code copy buttons.

```html
{{- if not (.Param "hideFooter") }}
<footer class="footer">
    <div class="footer-links">
        {{- range site.Params.socialIcons }}
        {{- if eq .name "email" }}
        <a href="{{ .url }}" class="footer-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            {{ replace .url "mailto:" "" }}
        </a>
        {{- else if eq .name "linkedin" }}
        <a href="{{ .url }}" target="_blank" rel="noopener noreferrer" class="footer-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
        </a>
        {{- else if eq .name "github" }}
        <a href="{{ .url }}" target="_blank" rel="noopener noreferrer" class="footer-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
        </a>
        {{- end }}
        {{- end }}
    </div>
    <span>
        Built with <a href="https://gohugo.io/" rel="noopener noreferrer" target="_blank">Hugo</a> · Designed for clarity · Maintained with care
    </span>
</footer>
{{- end }}

{{- if (not site.Params.disableScrollToTop) }}
<a href="#top" aria-label="go to top" title="Go to Top (Alt + G)" class="top-link" id="top-link" accesskey="g">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 6" fill="currentColor">
        <path d="M12 6H0l6-6z" />
    </svg>
</a>
{{- end }}

{{- partial "extend_footer.html" . }}

<script>
    let menu = document.getElementById('menu')
    if (menu) {
        menu.scrollLeft = localStorage.getItem("menu-scroll-position");
        menu.onscroll = function () {
            localStorage.setItem("menu-scroll-position", menu.scrollLeft);
        }
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            var id = this.getAttribute("href").substr(1);
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                document.querySelector(`[id='${decodeURIComponent(id)}']`).scrollIntoView({
                    behavior: "smooth"
                });
            } else {
                document.querySelector(`[id='${decodeURIComponent(id)}']`).scrollIntoView();
            }
            if (id === "top") {
                history.replaceState(null, null, " ");
            } else {
                history.pushState(null, null, `#${id}`);
            }
        });
    });

</script>

{{- if (not site.Params.disableScrollToTop) }}
<script>
    var mybutton = document.getElementById("top-link");
    window.onscroll = function () {
        if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
            mybutton.style.visibility = "visible";
            mybutton.style.opacity = "1";
        } else {
            mybutton.style.visibility = "hidden";
            mybutton.style.opacity = "0";
        }
    };

</script>
{{- end }}

{{- if (not site.Params.disableThemeToggle) }}
<script>
    document.getElementById("theme-toggle").addEventListener("click", () => {
        const html = document.querySelector("html");
        if (html.dataset.theme === "dark") {
            html.dataset.theme = 'light';
            localStorage.setItem("pref-theme", 'light');
        } else {
            html.dataset.theme = 'dark';
            localStorage.setItem("pref-theme", 'dark');
        }
    })

</script>
{{- end }}

{{- if (and (eq .Kind "page") (ne .Layout "archives") (ne .Layout "search") (.Param "ShowCodeCopyButtons")) }}
<script>
    document.querySelectorAll('pre > code').forEach((codeblock) => {
        const container = codeblock.parentNode.parentNode;

        const copybutton = document.createElement('button');
        copybutton.classList.add('copy-code');
        copybutton.innerHTML = '{{- i18n "code_copy" | default "copy" }}';

        function copyingDone() {
            copybutton.innerHTML = '{{- i18n "code_copied" | default "copied!" }}';
            setTimeout(() => {
                copybutton.innerHTML = '{{- i18n "code_copy" | default "copy" }}';
            }, 2000);
        }

        copybutton.addEventListener('click', (cb) => {
            if ('clipboard' in navigator) {
                navigator.clipboard.writeText(codeblock.textContent);
                copyingDone();
                return;
            }

            const range = document.createRange();
            range.selectNodeContents(codeblock);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            try {
                document.execCommand('copy');
                copyingDone();
            } catch (e) { };
            selection.removeRange(range);
        });

        if (container.classList.contains("highlight")) {
            container.appendChild(copybutton);
        } else if (container.parentNode.firstChild == container) {
            // td containing LineNos
        } else if (codeblock.parentNode.parentNode.parentNode.parentNode.parentNode.nodeName == "TABLE") {
            // table containing LineNos and code
            codeblock.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild(copybutton);
        } else {
            // code blocks not having highlight as parent class
            codeblock.parentNode.appendChild(copybutton);
        }
    });
</script>
{{- end }}
```

---

### File: `post_meta.html`

> **Purpose**: Post metadata display — date, author, reading time, word count, and social icon links (GitHub, LinkedIn).

```html
{{- $scratch := newScratch }}

{{- if not .Date.IsZero -}}
{{- $scratch.Add "meta" (slice (printf "<span title='%s'>%s</span>" (.Date) (.Date | time.Format (default ":date_long" site.Params.DateFormat)))) }}
{{- end }}

{{- if not (.Param "hideAuthor") -}}
{{- with (partial "author.html" .) }}
{{- $scratch.Add "meta" (slice (printf "<span>%s</span>" .)) }}
{{- end }}
{{- end }}

{{- $scratch.Add "meta" (slice (printf "<span>%d min read (%d words)</span>" .ReadingTime .WordCount)) }}

{{- with ($scratch.Get "meta") }}
{{- delimit . "&nbsp;·&nbsp;" | safeHTML -}}
{{- end -}}

{{- /* Add social icons after meta */ -}}
{{- if site.Params.socialIcons }}
<span class="post-meta-social">
  &nbsp;
  {{- range site.Params.socialIcons }}
  {{- if or (eq .name "github") (eq .name "linkedin") }}
  <a href="{{ .url }}" target="_blank" rel="noopener noreferrer" aria-label="{{ .name }}" title="{{ .name }}">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      {{- if eq .name "github" }}
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      {{- else if eq .name "linkedin" }}
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
      {{- end }}
    </svg>
  </a>
  {{- end }}
  {{- end }}
</span>
{{- end -}}
```

---

### File: `index_profile.html` (Main site version)

> **Purpose**: Homepage profile hero — avatar, name, role with cert badges, tagline, action buttons, social icons, trusted-by strip with domain badges, and recent posts list.
> 
> **Garage note**: Use the **simplified garage version** provided earlier in this document instead. The main site version below is included only for reference.

```html
<div class="profile-hero">
    {{- with site.Params.profileMode }}
    <div class="profile-card">
        <div class="profile-avatar">
            {{- if .imageUrl -}}
            {{- $img := "" }}
            {{- if not (urls.Parse .imageUrl).IsAbs }}
                {{- $img = resources.Get .imageUrl }}
            {{- end }}
            {{- if $img }}
                {{- $processableFormats := (slice "jpg" "jpeg" "png" "tif" "bmp" "gif") -}}
                {{- if hugo.IsExtended -}}
                    {{- $processableFormats = $processableFormats | append "webp" -}}
                {{- end -}}
                {{- $prod := (hugo.IsProduction | or (eq site.Params.env "production")) }}
                {{- if and (in $processableFormats $img.MediaType.SubType) (eq $prod true)}}
                    {{- if (not (and (not .imageHeight) (not .imageWidth))) }}
                        {{- $img = $img.Resize (printf "%dx%d" .imageWidth .imageHeight) }}
                    {{- else if .imageHeight }}
                        {{- $img = $img.Resize (printf "x%d" .imageHeight) }}
                    {{ else if .imageWidth }}
                        {{- $img = $img.Resize (printf "%dx" .imageWidth) }}
                    {{ else }}
                        {{- $img = $img.Resize "250x250" }}
                    {{- end }}
                {{- end }}
                <img class="profile-image" draggable="false" src="{{ $img.Permalink }}" alt="{{ .imageTitle | default "profile image" }}" title="{{ .imageTitle }}" />
            {{- else }}
            <img class="profile-image" draggable="false" src="{{ .imageUrl | absURL }}" alt="{{ .imageTitle | default "profile image" }}" title="{{ .imageTitle }}" />
            {{- end }}
            {{- end }}
        </div>
        
        <div class="profile-info">
            <h1 class="profile-name">{{ .title | default site.Title | markdownify }}</h1>
            
            <div class="profile-role-row">
                <p class="profile-role">Enterprise Architect &amp; Strategic Technology Leader</p>
                <div class="profile-certs">
                    <span class="cert-badge" title="Microsoft Azure AI Engineer Associate">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        Azure AI Engineer
                    </span>
                    <span class="cert-badge" title="AWS Certified Solutions Architect">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        AWS Solutions Architect
                    </span>
                </div>
            </div>

            <p class="profile-tagline">{{ .subtitle | markdownify }}</p>

            <div class="profile-actions">
                {{- with .buttons }}
                <div class="buttons">
                    {{- range . }}
                    <a class="button" href="{{ trim .url " " }}" rel="noopener" title="{{ .name }}">
                        <span class="button-inner">
                            {{ .name }}
                            {{- if (findRE "://" .url) }}&nbsp;
                            <svg fill="none" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round"
                                stroke-linejoin="round" stroke-width="2.5" viewBox="0 0 24 24" height="14" width="14">
                                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                                <path d="M15 3h6v6"></path>
                                <path d="M10 14L21 3"></path>
                            </svg>
                            {{- end }}
                        </span>
                    </a>
                    {{- end }}
                </div>
                {{- end }}

                {{- partial "social_icons.html" -}}
            </div>
        </div>
    </div>
    {{- end}}
</div>

<!-- Trusted-by social proof strip -->
<div class="trusted-by-strip">
    <span class="trusted-label">Domains Served</span>
    <div class="trusted-logos">
        <span class="domain-badge">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            Healthcare
        </span>
        <span class="domain-badge">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Property Insurance
        </span>
        <span class="domain-badge">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>
            Media &amp; Entertainment
        </span>
        <span class="domain-badge">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            Logistics
        </span>
        <span class="domain-badge fortune-badge">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            Fortune 500 Clients
        </span>
    </div>
</div>

{{- $pages := where site.RegularPages "Type" "in" site.Params.mainSections }}
{{- $pages = where $pages "Params.hiddenInHomeList" "!=" "true" }}
{{- $recentPosts := first 10 $pages }}

{{- if $recentPosts }}
<div class="recent-posts-section">
    <h2><span class="section-label">Latest Insights</span></h2>
    
    {{- range $recentPosts }}
    <article class="post-entry-horizontal">
        <div class="post-meta-small">
            {{- if not .Date.IsZero -}}
            <time>{{ .Date | time.Format "Jan 2, 2006" }}</time>
            {{- end }}
            {{- with .Params.categories }}
            {{- if gt (len .) 0 }}
            <span class="post-category">{{ index . 0 }}</span>
            {{- end }}
            {{- end }}
        </div>
        <h3 class="post-title">
            <a href="{{ .Permalink }}">{{ .Title }}</a>
        </h3>
    </article>
    {{- end }}
</div>
{{- end }}
```

---

## Garage-Specific `index_profile.html`

Create `hugo-site/layouts/partials/index_profile.html` with this garage-adapted version:

```html
<div class="profile-hero">
    {{- with site.Params.profileMode }}
    <div class="profile-card">
        <div class="profile-avatar">
            {{- if .imageUrl -}}
            {{- $img := "" }}
            {{- if not (urls.Parse .imageUrl).IsAbs }}
                {{- $img = resources.Get .imageUrl }}
            {{- end }}
            {{- if $img }}
                {{- $processableFormats := (slice "jpg" "jpeg" "png" "tif" "bmp" "gif") -}}
                {{- if hugo.IsExtended -}}
                    {{- $processableFormats = $processableFormats | append "webp" -}}
                {{- end -}}
                {{- $prod := (hugo.IsProduction | or (eq site.Params.env "production")) }}
                {{- if and (in $processableFormats $img.MediaType.SubType) (eq $prod true)}}
                    {{- if (not (and (not .imageHeight) (not .imageWidth))) }}
                        {{- $img = $img.Resize (printf "%dx%d" .imageWidth .imageHeight) }}
                    {{- else if .imageHeight }}
                        {{- $img = $img.Resize (printf "x%d" .imageHeight) }}
                    {{ else if .imageWidth }}
                        {{- $img = $img.Resize (printf "%dx" .imageWidth) }}
                    {{ else }}
                        {{- $img = $img.Resize "250x250" }}
                    {{- end }}
                {{- end }}
                <img class="profile-image" draggable="false" src="{{ $img.Permalink }}" alt="{{ .imageTitle | default "profile image" }}" title="{{ .imageTitle }}" />
            {{- else }}
            <img class="profile-image" draggable="false" src="{{ .imageUrl | absURL }}" alt="{{ .imageTitle | default "profile image" }}" title="{{ .imageTitle }}" />
            {{- end }}
            {{- end }}
        </div>
        
        <div class="profile-info">
            <h1 class="profile-name">{{ .title | default site.Title | markdownify }}</h1>
            <p class="profile-tagline">{{ .subtitle | markdownify }}</p>

            <div class="profile-actions">
                {{- with .buttons }}
                <div class="buttons">
                    {{- range . }}
                    <a class="button" href="{{ trim .url " " }}" rel="noopener" title="{{ .name }}">
                        <span class="button-inner">
                            {{ .name }}
                            {{- if (findRE "://" .url) }}&nbsp;
                            <svg fill="none" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round"
                                stroke-linejoin="round" stroke-width="2.5" viewBox="0 0 24 24" height="14" width="14">
                                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                                <path d="M15 3h6v6"></path>
                                <path d="M10 14L21 3"></path>
                            </svg>
                            {{- end }}
                        </span>
                    </a>
                    {{- end }}
                </div>
                {{- end }}

                {{- partial "social_icons.html" -}}
            </div>
        </div>
    </div>
    {{- end}}
</div>

{{- $pages := where site.RegularPages "Type" "in" site.Params.mainSections }}
{{- $pages = where $pages "Params.hiddenInHomeList" "!=" "true" }}
{{- $recentPosts := first 10 $pages }}

{{- if $recentPosts }}
<div class="recent-posts-section">
    <h2><span class="section-label">Latest Ideas</span></h2>
    
    {{- range $recentPosts }}
    <article class="post-entry-horizontal">
        <div class="post-meta-small">
            {{- if not .Date.IsZero -}}
            <time>{{ .Date | time.Format "Jan 2, 2006" }}</time>
            {{- end }}
            {{- with .Params.categories }}
            {{- if gt (len .) 0 }}
            <span class="post-category">{{ index . 0 }}</span>
            {{- end }}
            {{- end }}
        </div>
        <h3 class="post-title">
            <a href="{{ .Permalink }}">{{ .Title }}</a>
        </h3>
    </article>
    {{- end }}
</div>
{{- end }}
```

**Differences from main site**:
- Removed cert badges section
- Removed "Enterprise Architect" role line
- Removed trusted-by social proof strip
- Changed "Latest Insights" to "Latest Ideas"
- Kept all the core profile layout structure

---

## Layout Pages

### File: `layouts/posts/list.html` (Posts listing with filter)

> **Note**: In the garage, the section is `posts` not `blog`. Create this at `hugo-site/layouts/posts/list.html`.

```html
{{- define "main" }}

<header class="page-header">
  <h1>{{ .Title }}</h1>
  {{- if .Description }}
  <div class="post-description">
    {{ .Description }}
  </div>
  {{- end }}
</header>

{{/* Collect unique categories from blog posts */}}
{{- $categories := slice }}
{{- range .Pages }}
  {{- range .Params.categories }}
    {{- $categories = $categories | append . }}
  {{- end }}
{{- end }}
{{- $categories = $categories | uniq | sort }}

{{/* Category filter bar */}}
{{- if $categories }}
<div class="category-filter-bar">
  <button class="filter-btn active" data-category="all">All</button>
  {{- range $categories }}
  <button class="filter-btn" data-category="{{ . | urlize }}">{{ . }}</button>
  {{- end }}
</div>
{{- end }}

{{- if .Content }}
<div class="post-content">
  {{ .Content }}
</div>
{{- end }}

{{- $pages := .Pages }}
{{- if .IsHome }}
  {{- $pages = where site.RegularPages "Type" "in" site.Params.mainSections }}
{{- end }}

{{- $paginator := .Paginate $pages }}

{{- range $index, $page := $paginator.Pages }}

{{- $class := "post-entry" }}

<article class="{{ $class }}" data-categories="{{ range .Params.categories }}{{ . | urlize }} {{ end }}">
  {{- $isHidden := (site.Params.cover.hiddenInList | default site.Params.cover.hidden | default false) }}
  {{- partial "cover.html" (dict "cxt" . "IsHome" true "isHidden" $isHidden) }}
  <header class="entry-header">
    <h2 class="entry-hint-parent">
      {{- .Title }}
      {{- if .Draft }}<sup><span class="entry-hint" title="Draft">[draft]</span></sup>{{- end }}
    </h2>
  </header>
  {{- if (ne (.Param "hideSummary") true) }}
  <div class="entry-content">
    <p>{{ .Summary | plainify | htmlUnescape }}{{ if .Truncated }}...{{ end }}</p>
  </div>
  {{- end }}
  <footer class="entry-footer">
    {{- partial "post_meta.html" . -}}
  </footer>
  <a class="entry-link" aria-label="post link to {{ .Title | plainify }}" href="{{ .Permalink }}"></a>
</article>
{{- end }}

{{- if gt $paginator.TotalPages 1 }}
<footer class="page-footer">
  <nav class="pagination">
    {{- if $paginator.HasPrev }}
    <a class="prev" href="{{ $paginator.Prev.URL | absURL }}">
      «&nbsp;{{ i18n "prev_page" }}&nbsp;
      {{- if (.Param "ShowPageNums") }}
      {{- sub $paginator.PageNumber 1 }}/{{ $paginator.TotalPages }}
      {{- end }}
    </a>
    {{- end }}
    {{- if $paginator.HasNext }}
    <a class="next" href="{{ $paginator.Next.URL | absURL }}">
      {{- i18n "next_page" }}&nbsp;
      {{- if (.Param "ShowPageNums") }}
      {{- add 1 $paginator.PageNumber }}/{{ $paginator.TotalPages }}
      {{- end }}&nbsp;»
    </a>
    {{- end }}
  </nav>
</footer>
{{- end }}

{{- /* Category filter JavaScript */ -}}
<script>
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const postEntries = document.querySelectorAll('.post-entry');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      const selectedCategory = this.dataset.category;
      
      postEntries.forEach(entry => {
        if (selectedCategory === 'all') {
          entry.style.display = '';
        } else {
          const categories = entry.dataset.categories || '';
          if (categories.includes(selectedCategory)) {
            entry.style.display = '';
          } else {
            entry.style.display = 'none';
          }
        }
      });
    });
  });
});
</script>

{{- end }}{{/* end main */}}
```

---

## GitHub Actions Workflow

### File: `.github/workflows/hugo.yml`

> **Purpose**: Build and deploy Hugo site to GitHub Pages. Identical to main site.

```yaml
name: Deploy Hugo site to Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

defaults:
  run:
    shell: bash

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      HUGO_VERSION: 0.154.5
    steps:
      - name: Install Hugo CLI
        run: |
          wget -O ${{ runner.temp }}/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb \
          && sudo dpkg -i ${{ runner.temp }}/hugo.deb          
      - name: Install Dart Sass
        run: sudo snap install dart-sass
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: recursive
          fetch-depth: 0
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v5
      - name: Install Node.js dependencies
        run: "[[ -f package-lock.json || -f npm-shrinkwrap.json ]] && npm ci || true"
        working-directory: hugo-site
      - name: Build with Hugo
        env:
          HUGO_CACHEDIR: ${{ runner.temp }}/hugo_cache
          HUGO_ENVIRONMENT: production
          TZ: America/Los_Angeles
        run: |
          cd hugo-site && \
          hugo \
            --gc \
            --minify \
            --baseURL "${{ steps.pages.outputs.base_url }}/"          
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./hugo-site/public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

**Previous**: [← Phase 9 — Copilot & Claude Instructions](09-copilot-instructions.md)

**Back to overview**: [← Overview](00-overview.md)
