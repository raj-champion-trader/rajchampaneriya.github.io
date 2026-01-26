// --- Timeline Data (Professional Experience) ---
const timelineData = [
    {
        id: "neudesic-ai-accel",
        date: "May 2025 - Present",
        type: "role",
        title: "Solution Architect - AI Accelerator",
        company: "Neudesic, an IBM Company",
        short_description: "Architecting AI-powered discovery platforms to accelerate legacy modernization proposals.",
        details: [
            "Reduced modernization proposal cycle time by 37.5% (8 to 5 days).",
            "Enabled $15M+ annual pipeline growth for legacy transformation.",
            "Automated governance using AI-augmented ADR and HLD documentation."
        ],
        technologies: ["LangGraph", "Python", ".NET", "Knowledge Graphs", "Neo4j", "Azure OpenAI"],
        outcomes: ["Competitive win rate up by 25%", "Eliminated 60+ manual hours per engagement"],
        learnings: "AI in pre-sales isn't just speed; it's about establishing evidence-based decision frameworks early."
    },
    {
        id: "media-ai-bi",
        date: "Nov 2024 - Apr 2025",
        type: "project",
        title: "Conversational AI BI Platform",
        company: "Media & Entertainment Leader",
        short_description: "Enterprise-grade RAG platform enabling C-suite real-time business intelligence access.",
        details: [
            "Processed 10,000+ monthly natural language queries.",
            "Reduced reporting turnaround from 48 hours to real-time.",
            "Unified 15+ disparate reports into a single AI interface."
        ],
        technologies: ["Semantic Kernel", "Azure Data Factory", "Databricks", "Azure OpenAI", "RAG"],
        outcomes: ["94% response accuracy", "Freed 200+ executive hours monthly"],
        learnings: "Data normalization is the bottleneck in GenAI; spend 80% of effort there."
    },
    {
        id: "healthcare-staffing",
        date: "Jul 2022 - Oct 2024",
        type: "role",
        title: "Platform Architect",
        company: "Major Healthcare Provider",
        short_description: "Led $8M+ modernization initiative migrating legacy VB6 to cloud-native .NET.",
        details: [
            "Migrated 150K+ lines of VB6 code using Strangler-fig pattern.",
            "Reduced monthly Azure spending by 40% ($90K annually).",
            "Achieved 99.95% uptime SLA for 500+ daily clinical users."
        ],
        technologies: ["C#/.NET Core", "AKS", "Clean Architecture", "CQRS", "Service Bus", "Docker"],
        outcomes: ["Zero-downtime cutover", "API response time reduced by 87%"],
        learnings: "Kubernetes cost optimization requires granular autoscaling policies, not just lift-and-shift."
    },
    {
        id: "microsoft-ai-support",
        date: "Sep 2021 - Jun 2022",
        type: "project",
        title: "AI-Infused Product Support",
        company: "Microsoft",
        short_description: "Automated multilingual support ticket summarization and translation.",
        details: [
            "Developed T5 transformer model pipeline for 15 languages.",
            "Reduced manual processing time by 75%.",
            "Improved customer satisfaction scores by 28%."
        ],
        technologies: ["Python", "Azure Cognitive Services", "T5 Models", "Azure Functions", ".NET"],
        outcomes: ["First-response time 8hr -> 2hr", "30% staff reduction needed"],
        learnings: "Translation accuracy correlates directly with customer retention in global support."
    },
    {
        id: "logistics-platform",
        date: "Dec 2020 - Aug 2021",
        type: "project",
        title: "Unified Logistics Platform",
        company: "Major Logistics Provider",
        short_description: "Consolidated 12 legacy apps into single tracking interface.",
        details: [
            "Achieved real-time tracking (was 24+ hour delays).",
            "Improved API response time by 65% via query optimization.",
            "Reduced customer inquiry volume by 45%."
        ],
        technologies: ["Vue.js", "Java Spring Boot", "PostgreSQL", "MongoDB", "Redis", "AWS"],
        outcomes: ["Supported 10x traffic scale", "Database load reduced 40%"],
        learnings: "Micro-frontends accelerate delivery when backend monoliths are slow to evolve."
    },
    {
        id: "smart-scheduling",
        date: "Jul 2019 - Nov 2020",
        type: "role",
        title: "Technical Architect",
        company: "Major Healthcare Provider",
        short_description: "Architected micro-frontend platform using React and Module Federation.",
        details: [
            "Reduced deployment cycle from 6 weeks to 3 days.",
            "Enabled 4 autonomous teams to work in parallel.",
            "Achieved 99.98% uptime SLA with blue-green deployments."
        ],
        technologies: ["React", "Module Federation", "AWS Elastic Beanstalk", "CloudFront"],
        outcomes: ["Developer productivity +60%", "Zero rollback incidents"],
        learnings: "Module Federation breaks the monolith frontend dependency chain effectively."
    },
    {
        id: "lpi-insurance",
        date: "Apr 2015 - Jun 2019",
        type: "role",
        title: "Senior Full Stack Engineer",
        company: "Major Property Insurance Provider",
        short_description: "Led COBOL-to-C# microservices migration using Hexagonal Architecture.",
        details: [
            "Reduced maintenance costs by 35% ($400K+).",
            "Improved system recovery time from 4 hours to 15 minutes.",
            "Increased transaction throughput by 250%."
        ],
        technologies: [".NET Framework", "C#", "AngularJS", "SQL Server", "Redis"],
        outcomes: ["Production defects -60%", "Feature deployment 12wks -> 4wks"],
        learnings: "Domain-Driven Design is critical when decomposing 30-year-old mainframes."
    },
    {
        id: "azure-cert",
        date: "2018",
        type: "learning",
        title: "AWS Certified Solutions Architect",
        company: "Certification",
        short_description: "Validated expertise in designing distributed systems on AWS.",
        details: ["Mastered hybrid network architectures", "Serverless event-driven patterns"],
        technologies: ["AWS", "Networking", "Serverless"],
        outcomes: ["Enabled multi-cloud strategy for organization"],
        learnings: "Cloud patterns are cloud-agnostic; only implementations differ."
    },
    {
        id: "mdm-platform",
        date: "Jun 2013 - Mar 2015",
        type: "role",
        title: "Software Engineer",
        company: "Major Clothing Retailer",
        short_description: "Enterprise Master Data Management platform development.",
        details: [
            "Delivered core export functionality (Excel, XML, CSV) for 500K+ records.",
            "Reduced deployment failures from 18% to 2% via BVT framework."
        ],
        technologies: ["ASP.NET", "C#", "jQuery", "SQL Server", "WCF"],
        outcomes: ["Export performance +60%", "Release cycle 4wks -> 10days"],
        learnings: "Quality gates early in the pipeline prevent late-stage failures."
    },
    {
        id: "ms-csharp-cert",
        date: "2015",
        type: "learning",
        title: "Microsoft Specialist – Programming in C#",
        company: "Certification",
        short_description: "Deep dive into C# language features and .NET Framework.",
        technologies: ["C#", ".NET Framework"],
        outcomes: ["Foundation for career in Microsoft ecosystem"],
        learnings: "Understanding the IL (Intermediate Language) changes how you write managed code."
    },
    {
        id: "education-ms",
        date: "2013",
        type: "learning",
        title: "Master of Science - IT",
        company: "Veer Narmad South Gujarat University",
        short_description: "Graduate studies in Information Technology.",
        technologies: ["Academic Research", "Systems Design"],
        outcomes: ["MSc Degree"],
        learnings: "Academic rigor supports structured problem solving."
    }
];

// --- DOM Elements ---
const timelineContainer = document.getElementById('timelineContainer');
const filterButtons = document.querySelectorAll('.btn-filter');
const searchInput = document.getElementById('searchInput');

// --- Render Timeline Items ---
function renderTimeline(items) {
    timelineContainer.innerHTML = '';

    if (items.length === 0) {
        timelineContainer.innerHTML = '<div class="no-results">No milestones found matching your criteria.</div>';
        return;
    }

    items.forEach((item, index) => {
        const el = document.createElement('div');
        const sideClass = index % 2 === 0 ? 'left' : 'right';
        el.className = `timeline-item ${sideClass}`;
        el.setAttribute('data-type', item.type);

        const techTags = item.technologies
            ? `<div class="tag-cloud">${item.technologies.map(t => `<span class="tag">${t}</span>`).join('')}</div>`
            : '';

        const detailsList = item.details
            ? `<ul class="impact-list">
                ${item.details.map(d => `<li>${d}</li>`).join('')}
               </ul>`
            : '';

        el.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="content-card" onclick="toggleCard(this)">
                <div class="card-header">
                    <span class="timeline-date">${item.date}</span>
                    <h3 class="card-title">${item.title}</h3>
                    <div class="card-subtitle">${item.company}</div>
                </div>
                <p class="card-desc">${item.short_description}</p>
                
                <div class="card-details">
                    <div class="details-grid">
                        <div class="detail-col" style="grid-column: span ${item.learnings ? '1' : '2'}">
                            <h4>Key Details</h4>
                            ${detailsList}
                        </div>
                        ${item.learnings ? `
                        <div class="detail-col">
                            <h4>Insight</h4>
                            <p style="font-style:italic; color:var(--secondary); font-size: 0.85rem;">"${item.learnings}"</p>
                        </div>` : ''}
                    </div>
                    <div class="detail-col" style="grid-column: span 2; margin-top:0.5rem">
                        <h4>Technologies</h4>
                        ${techTags}
                    </div>
                </div>
                <div class="expand-hint">Click for details</div>
            </div>
        `;
        timelineContainer.appendChild(el);
    });

    setupObserver();
}

// --- Toggle Card Expansion ---
window.toggleCard = function(card) {
    card.classList.toggle('expanded');
};

// --- Filter Button Logic ---
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterType = btn.getAttribute('data-filter');
        const searchTerm = searchInput.value.toLowerCase();
        filterData(filterType, searchTerm);
    });
});

// --- Search Input Logic ---
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const activeFilter = document.querySelector('.btn-filter.active').getAttribute('data-filter');
    filterData(activeFilter, searchTerm);
});

// --- Filter Data Function ---
function filterData(type, search) {
    let filtered = timelineData;
    if (type !== 'all') {
        filtered = filtered.filter(item => item.type === type);
    }

    if (search) {
        filtered = filtered.filter(item => {
            const contentStr = `${item.title} ${item.company} ${item.short_description} ${item.technologies.join(' ')}`.toLowerCase();
            return contentStr.includes(search);
        });
    }
    renderTimeline(filtered);
}

// --- Scroll Animation Observer ---
function setupObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.timeline-item').forEach(item => observer.observe(item));
}

// --- Initial Render ---
renderTimeline(timelineData);
