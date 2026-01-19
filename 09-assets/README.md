# Assets - Shared Resources

Central repository for images, diagrams, and visual assets used across content.

## Structure

### images/
General images, photos, screenshots.

Naming convention: `YYYY-MM-DD-descriptive-name.{png|jpg}`

### thumbnails/
Video thumbnails and featured images for blog posts.

Naming convention: `thumbnail-topic-name.png`

Recommended size: 1280x720 (16:9) or 1200x630 (social media)

### diagrams/
Reusable diagrams in multiple formats.

Store both:
- `.excalidraw` (source files - editable)
- `.svg` (exported - for web/blog)
- `.png` (high-res backup)

Naming convention: `diagram-descriptive-name.{excalidraw|svg|png}`

## Usage Guidelines

### File Organization
- Keep filenames descriptive and searchable
- Include dates for time-sensitive assets
- Group related assets in subfolders if needed

### Diagram Best Practices
- Always keep .excalidraw source file
- Export as SVG for web use (crisp at any size)
- Use consistent color palette
- Keep designs simple and professional

### Image Optimization
- Compress images before adding to repo
- Use appropriate format (PNG for diagrams, JPG for photos)
- Don't commit massive files (>2MB warning, >5MB avoid)

## Reusable Elements

Consider creating:
- Standard color palette documentation
- Common icon set
- Template diagrams for architecture patterns
- Brand guidelines (when needed)

---

**Backup**: Commit to Git for version control  
**Access**: Reference in blog posts via relative paths  
**Maintenance**: Periodic cleanup of unused assets
