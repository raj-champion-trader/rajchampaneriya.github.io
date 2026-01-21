# Video Publishing Checklist

Complete checklist for video production from script to YouTube.

---

## Pre-Production

- [ ] **Topic selected** from content pipeline
- [ ] **Video type determined** (Quick Explainer / Architecture Walkthrough / Thought Leadership)
- [ ] **Target length set** (60-90 sec / 3-5 min / 2-3 min)
- [ ] **Template copied** from `/07-automation/templates/video-script-template.md`

---

## Script Writing

- [ ] **Hook written** (5-10 seconds, attention-grabbing)
- [ ] **Context provided** (10-20 seconds, why it matters)
- [ ] **Main explanation** clear and structured
- [ ] **Key insight identified** (unique angle)
- [ ] **Closing line** crafted (memorable wrap-up)
- [ ] **Read aloud**: Script sounds natural when spoken
- [ ] **Timing estimated**: Fits target length (150-160 words per minute)
- [ ] **Visual cues noted**: When to show diagrams

---

## Diagram Creation (If Needed)

- [ ] **Excalidraw file created** in `/04-videos/diagrams/`
- [ ] **File named**: `diagram-[topic-name].excalidraw`
- [ ] **Design principles followed**:
  - Simple and clean
  - Limited color palette (3-4 colors max)
  - Clear labels
  - Professional appearance
- [ ] **Exported as SVG** for video editing
- [ ] **Exported as PNG** (high-res backup)
- [ ] **All exports saved** to diagrams folder

---

## Audio Recording

### Setup
- [ ] **Quiet environment** confirmed
- [ ] **Microphone tested** (or headphones)
- [ ] **Audacity open** and ready
- [ ] **Recording level checked** (not too loud, not too quiet)

### Recording
- [ ] **Script visible** for reference
- [ ] **Warm-up done** (read script twice before recording)
- [ ] **Recording started**
- [ ] **Script read** conversationally (not robotic)
- [ ] **Multiple takes** if needed
- [ ] **Best take selected**

### Post-Processing
- [ ] **Silence trimmed** from beginning and end
- [ ] **Volume normalized** (if needed)
- [ ] **Noise reduction applied** (if needed, minimal)
- [ ] **Pops/clicks removed**
- [ ] **Exported as WAV** (high quality)
- [ ] **File saved**: `/04-videos/audio/audio-[topic-name].wav`

---

## Video Editing (CapCut)

### Import
- [ ] **CapCut opened**
- [ ] **New project created**
- [ ] **Audio imported**
- [ ] **Diagrams/images imported**

### Assembly
- [ ] **Audio placed** on timeline
- [ ] **Diagrams synced** with visual cues from script
- [ ] **Transitions added** (subtle, professional)
- [ ] **Text overlays** for key points (optional)
- [ ] **Intro added** (if using standard intro)
- [ ] **Outro added** (call to action, subscribe)

### Polish
- [ ] **Pacing reviewed**: Not too fast, not too slow
- [ ] **Visual consistency**: Clean and professional
- [ ] **Audio levels balanced**: Music (if any) not overpowering voice
- [ ] **Captions/subtitles added** (for accessibility)

### Export
- [ ] **Quality set**: 1080p (1920x1080) minimum
- [ ] **Format**: MP4
- [ ] **Frame rate**: 30fps or 60fps
- [ ] **File size**: Under 500MB if possible
- [ ] **Preview watched**: Full video reviewed before export
- [ ] **Exported successfully**
- [ ] **File saved**: `/04-videos/published/[YYYY-MM-DD]-[topic-name].mp4`

---

## YouTube Upload

### Basic Information
- [ ] **YouTube Studio opened**
- [ ] **Video uploaded**
- [ ] **Title written** (compelling, keyword-rich, <70 characters)
- [ ] **Description written**:
  ```
  [Brief description of video content]
  
  Key Topics:
  - Topic 1
  - Topic 2
  - Topic 3
  
  Resources:
  - Blog post: [link]
  - Diagram: [link if shared separately]
  - More content: [your website]
  
  #architecture #systemdesign #cloud #[relevant hashtags]
  ```
- [ ] **Tags added** (10-15 relevant tags)
- [ ] **Thumbnail uploaded** (1280x720, eye-catching, branded)
- [ ] **Playlist selected** (if applicable)

### Settings
- [ ] **Visibility set**: Public (or Scheduled)
- [ ] **Audience**: Not made for kids (if applicable)
- [ ] **Category**: Science & Technology (or Education)
- [ ] **Comments enabled**
- [ ] **Captions**: Auto-generated or uploaded
- [ ] **End screen added**: Subscribe + related video
- [ ] **Cards added** (if linking to other content)

### Advanced
- [ ] **Monetization settings** (if eligible)
- [ ] **License**: Standard YouTube License
- [ ] **Allow embedding**: Yes
- [ ] **Publish to subscriptions feed**: Yes
- [ ] **Featured**: Consider adding to channel featured video

---

## Post-Publishing

- [ ] **YouTube link copied**
- [ ] **Video appears** on your channel
- [ ] **Video plays correctly** on YouTube
- [ ] **Thumbnail displays** properly
- [ ] **Description formatted** correctly
- [ ] **End screen/cards working**

---

## Documentation

- [ ] **Metadata file created**: `/04-videos/published/YYYY-MM-DD-[topic-name].md`
  ```markdown
  # [Video Title]
  
  **Published**: YYYY-MM-DD  
  **YouTube Link**: [URL]  
  **Duration**: [MM:SS]  
  **Views**: [Track over time]
  
  ## Description
  [Brief description]
  
  ## Key Topics
  - Topic 1
  - Topic 2
  - Topic 3
  
  ## Production Notes
  - Script time: [Hours]
  - Recording time: [Hours]
  - Editing time: [Hours]
  - Total: [Hours]
  
  ## Performance (Update Monthly)
  - Views: [Number]
  - Likes: [Number]
  - Comments: [Number]
  - Shares: [Number]
  
  ## Feedback / Lessons
  - [What worked]
  - [What to improve]
  ```

---

## Distribution

### Blog
- [ ] **Blog post created** with embedded video
- [ ] **Transcript added** (optional but valuable for SEO)
- [ ] **Published** on Hugo site

### LinkedIn
- [ ] **Post created** announcing video
- [ ] **Key takeaway** shared (1-2 sentences)
- [ ] **YouTube link** included
- [ ] **Relevant hashtags** added
- [ ] **Published**

### Twitter/X (Optional)
- [ ] **Tweet created** with video preview
- [ ] **YouTube link** in thread
- [ ] **Hashtags** added

### Newsletter (If Applicable)
- [ ] **Video included** in next newsletter
- [ ] **Brief description** written

---

## Backlog Update

- [ ] **Content pipeline updated**: Mark video as completed
- [ ] **New ideas captured**: From production process
- [ ] **Next video topic**: Selected from pipeline

---

## Analytics & Engagement (First Week)

### Monitor
- [ ] **Views tracked** (Day 1, Day 3, Day 7)
- [ ] **Watch time reviewed**: Are people watching to the end?
- [ ] **Comments read**: Respond within 24 hours
- [ ] **Feedback noted**: What resonated, what didn't
- [ ] **Share stats**: Where is traffic coming from?

### Optimization (If Needed)
- [ ] **Thumbnail A/B test**: Try different thumbnail if low CTR
- [ ] **Title adjustment**: Refine if not getting impressions
- [ ] **Description update**: Add keywords if needed

---

## Time Tracking

**Total time spent**: [Hours]
- Script writing: [Hours]
- Diagram creation: [Hours]
- Audio recording: [Hours]
- Video editing: [Hours]
- Publishing: [Minutes]

*(Track to optimize your workflow)*

---

## Retrospective

### What went well?
- 
- 

### What was challenging?
- 
- 

### What to improve next time?
- 
- 

### Technical issues encountered?
- 
- 

---

*Videos extend your reach and demonstrate communication skills. This checklist ensures professional quality.*
