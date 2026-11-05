# Production Templates and Technical Specifications

This reference document contains guidelines, parameters, and design system specifications for video production.

---

## 1. Scriptwriting Guidelines for AI Tools

When generating video scripts from an engineering case study or architectural topic:

* **Role:** Senior Systems Engineer and Technical Storyteller.
* **Goal:** Write a 3-act narrative video script explaining a complex infrastructure topic through a case study.

### Structure
1. **Act 1 (0:00 - 1:30):** The System Alert. Start at the moment system metrics change (latency, error rates).
2. **Act 2 (1:30 - 10:00):** The Deep Dive. Trace the request path step-by-step through the architecture.
3. **Act 3 (10:00 - End):** Resolution & Engineering Rule. Show the configuration adjustment and state the core architectural takeaway.

---

## 2. Voiceover & Audio Settings

### Voice Synthesis Parameters
* Stability: 0.38 (Lower stability creates natural pitch inflections).
* Clarity / Similarity: 0.80 (Maintains voice consistency).
* Style Exaggeration: 0.15 (Prevents flat delivery).

### Audio Processing Chain
1. Noise Gate: Threshold -45 dB (removes floor noise).
2. Parametric EQ:
   - Low Cut / High Pass at 80 Hz.
   - Boost at 250 Hz (+1.5 dB for warmth).
   - Presence boost at 4 kHz (+2.0 dB for vocal clarity).
3. Speech Compressor: Ratio 3:1, Threshold -18 dB.
4. Loudness Normalization: Target -14 LUFS for YouTube standards.

---

## 3. Dark Mode Diagram Palette (Excalidraw)

* **Canvas Background:** `#121212` (Ultra-dark gray)
* **Primary Text & Nodes:** `#E0E0E0` (Clean off-white)
* **Traffic / Request Flow:** `#00E5FF` (Vibrant Cyan)
* **Healthy State / Success:** `#69F0AE` (Mint Green)
* **High Latency / Bottleneck:** `#FF5252` (Coral Red)
* **Database / Storage Nodes:** `#FFD700` (Amber Gold)
* **Secondary Annotations:** `#9E9E9E` (Muted Gray)

---

## 4. Video Editing & Motion Rules

### Resolution & Framerate
* Long-Form: 3840 x 2160 (4K) at 60 FPS
* Shorts / Vertical: 2160 x 3840 (9:16) at 60 FPS

### Motion Standards
* Apply Transform motion effect with 180° shutter angle for smooth pans.
* Never leave a static diagram frame on screen longer than 4 seconds without camera zoom or highlighted node text.
* Add subtle UI click audio when drawing new nodes and soft whooshes during data packet movement.

---

## 5. Video Metadata Formatting

* **Title Template:** `[Topic Name]: How [Mechanism] Impacted [System Name]`
* **Timestamps Layout:**
  - `0:00` - System Overview
  - `1:30` - Request Architecture
  - `5:45` - Deep Dive Analysis
  - `11:20` - Fix & Engineering Rule
* **Repository Linking:** Include link to episode `demo-lab` folder in YouTube description.
