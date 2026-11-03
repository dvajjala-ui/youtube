# SRE & Systems Animation Channel — Master Git Repository Architecture

This document provides the complete structure and file hierarchy for setting up your YouTube content production repository. Use this layout to maintain a modular, reproducible workflow for every video project.

---

## 1. Repository Directory Hierarchy

```
tech-animation-studio/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── 01_video_idea.md          # Template for logging new outage/architecture ideas
│   │   └── 02_script_review.md       # Quality gate checklist before audio generation
│   └── workflows/
│       └── validate-assets.yml       # Linter for audio format and diagram resolutions
├── docs/
│   ├── DIFFERENTIATION_STRATEGY.md   # Moat, positioning, and competitive analysis
│   ├── PRODUCTION_PIPELINE.md        # Step-by-step editorial & rendering SOP
│   └── STYLE_GUIDE.md                # Colors, fonts, sound rules, and voice params
├── templates/
│   ├── LLM_SCRIPT_PROMPT.md          # Master prompt for Claude / ChatGPT / Grok
│   ├── LOG_GENERATOR_PROMPT.md       # Prompt to synthesize authentic terminal logs
│   ├── EXCALIDRAW_THEME.json         # Dark mode color palette and custom shapes
│   └── SHORT_SCRIPT_PROMPT.md        # 60-second vertical video script prompt
├── episodes/
│   └── YYYY-MM-topic-slug/           # Dedicated directory per video episode
│       ├── README.md                 # Episode overview, metadata, and status tracking
│       ├── script.md                 # Full 3-act narrative script with visual cues
│       ├── audio/
│       │   ├── narration_raw.wav     # Raw export from ElevenLabs
│       │   └── narration_master.wav  # Processed audio with EQ/Compression
│       ├── diagrams/
│       │   ├── architecture.excalidraw
│       │   └── renders/              # Dark mode PNG exports (3840x2160)
│       ├── demo-lab/                 # Reproducible viewer lab (Docker/Kubernetes)
│       │   ├── docker-compose.yml    # Runnable local environment replicating outage
│       │   └── README.md             # Instructions for viewers to test live
│       └── release/
│           ├── metadata.json         # Title ideas, YouTube description, tags, timestamps
│           └── thumbnail.png         # High-CTR thumbnail file
└── README.md                         # Master index and quickstart guide for maintainers
```

---

## 2. Key Workflow Phases within the Repository

### Phase 1: Idea Sourcing & Triage (`.github/ISSUE_TEMPLATE/01_video_idea.md`)
* Log real-world post-mortems (Cloudflare, AWS, Datadog, GitHub, Kubernetes issues).
* Evaluate technical depth vs. story arc potential.

### Phase 2: Scripting & Visual Planning (`episodes/YYYY-MM-topic-slug/script.md`)
* Draft using `LLM_SCRIPT_PROMPT.md`.
* Ensure every 15 seconds of narration has a explicit `[VISUAL]` diagram instruction.

### Phase 3: Interactive Demo Creation (`episodes/YYYY-MM-topic-slug/demo-lab/`)
* Build a minimal Docker Compose setup reproducing the issue (e.g., connection pool exhaustion, memory leak, split-brain DB).
* This `demo-lab` acts as your channel's key differentiator on GitHub.

### Phase 4: Audio & Diagram Assets (`episodes/YYYY-MM-topic-slug/audio/` & `diagrams/`)
* Generate voiceover with ElevenLabs using calibrated settings.
* Export Excalidraw diagrams as dark-mode PNGs.

### Phase 5: Assembly & Publishing (`episodes/YYYY-MM-topic-slug/release/`)
* Assemble in Premiere Pro / Filmora.
* Push YouTube description linking directly to the episode's GitHub `demo-lab` folder.
