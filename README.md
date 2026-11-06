# 📁 Portfolio

<div align="center">

# Muhammad Noukhez — Senior Python Developer & AI / ML Systems Specialist
### Enterprise Software Architect | Generative AI & LLMs (Azure OpenAI) | Computer Vision (YOLO) | Full-Stack Web

[![Website Status](https://img.shields.io/website?url=https%3A%2F%2Fcodex404solutions.com%2F&label=CodeX404%20Solutions&logo=rocket&color=06b6d4&style=for-the-badge)](https://codex404solutions.com/)
[![GitHub Profile](https://img.shields.io/badge/GitHub-mnoukhej-181717?style=for-the-badge&logo=github)](https://github.com/mnoukhej)
[![LinkedIn Connect](https://img.shields.io/badge/LinkedIn-Muhammad_Noukhez-0077b5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/mnoukhej)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![Mobile & Desktop Responsive](https://img.shields.io/badge/Responsive-100%25%20Auto--Fit-10b981?style=for-the-badge&logo=w3c)](http://localhost:5500/)

[Explore Live Demo](https://codex404solutions.com/) • [View Featured Projects](#-featured-projects) • [Architecture](#-architecture--tech-stack) • [Quick Start](#-quick-start--local-development)

---

</div>

## 📘 Executive Overview

This repository houses the official interactive personal portfolio and engineering showcase for **Muhammad Noukhez**, a Senior Software Engineer with **7+ years of deep enterprise experience** at **Tata Consultancy Services (TCS)** across the prestigious **Research & Innovation (RnI)** and **Research & Development (RnD)** teams, and Founder & Tech Lead at [**CodeX404 Solutions**](https://codex404solutions.com/).

Designed with modern web principles, rich visual depth, and responsive fluid geometry, the portfolio demonstrates proficiency across high-throughput **Python & FastAPI backends**, production **Generative AI & LLMs (Azure OpenAI, LangChain, RAG)**, deep learning **Computer Vision (YOLOv8)**, and modern **Full-Stack Web Development (React & Node.js)**.

---

## ✨ Key Interactive & Architectural Features

### 🌌 1. Reactive Neural Constellation Canvas
- Autonomous mathematical particle network rendered with HTML5 Canvas 2D.
- Physics-based mouse proximity reactivity: particles accelerate and warp smoothly away from cursor coordinates with dynamic vector spring physics.
- Theme-aware chromatic adaptation between dark cyber mode and high-contrast light mode.

### ⚡ 2. Interactive Engineering Highlights Showcase Slider
- **Category Navigation Tabs**: Instant tab switching across key engineering domains:
  - `⚡ FastAPI Async` — sub-15ms asynchronous microservices & OpenAPI specs.
  - `🤖 Azure GenAI & RAG` — enterprise LLMs, FAISS vector indexing & prompt pipelines.
  - `⚛️ React & Node Web` — responsive component architectures & RESTful engines.
  - `🔬 Computer Vision YOLO` — medical diagnostic models (CBC cell detection, malaria, oncology).
  - `🚀 CodeX404 Solutions` — bespoke digital engineering agency.
- **Micro-Animations**: Real-time progress bar fill indicator, active dot transitions, 3D card elevation, keyboard arrow navigation, and touch-swipe gesture support for iOS and Android.

### 🔄 3. Dual-Row Bidirectional Infinite Marquee Scroller
- Continuous hardware-accelerated ticker ribbons moving in opposite directions (`marqueeScrollLeft` and `marqueeScrollRight`).
- Dual-edge alpha gradient masks providing a smooth edge fade.
- Hover-to-pause interaction for inspection of tech pills.

### 🎨 4. Holographic Animated Gradient Typography
- Custom CSS keyframe text gradient engine (`@keyframes holographicGradient`) transitioning continuously between cyan, azure, violet, and pink.
- Neon glow text styling across major headings and statistics with accessibility-tested contrast ratios.

### 🌐 5. CodeX404 Solutions Cyber Circuit SVG Banner
- Bespoke animated vector circuit board featuring traveling data signals (`stroke-dasharray` / `stroke-dashoffset` keyframe loops), pulsing nodes, and interactive link routing.

### 📱 6. Bulletproof Responsive Mobile-First Auto-Fit
- Fluid layout built to eliminate horizontal overflow (`overflow-x: hidden !important`) and element collision on screens ranging from **320px mobile viewports to 4K ultrawide monitors**.
- Dynamic visual badge docking ensuring zero overlap with portrait frames across all breakpoints.

### 🌗 7. System & Manual Theme State Management
- Seamless Dark / Light mode switching with persistent `localStorage` retention and fallback to `prefers-color-scheme`.

---

## 🛠️ Architecture & Tech Stack

| Domain | Technologies & Frameworks | Highlights |
| :--- | :--- | :--- |
| **Frontend Core** | HTML5, Vanilla Modern CSS3, JavaScript (ES6+) | Zero external framework overhead, ultra-fast load time |
| **Styling Architecture** | CSS Custom Properties (Variables), Glassmorphism, BEM Methodology | Fluid typography with `clamp()`, modular design tokens |
| **Animation Engine** | CSS3 3D Transforms, Web Animations, Canvas 2D Vector Physics | Hardware-accelerated transitions, 60fps steady rendering |
| **Backend & AI Focus** | Python 3.12, FastAPI, Azure OpenAI, LangChain, PyTorch, YOLOv8 | High-throughput APIs, RAG semantic search, Computer Vision |
| **DevOps & Automation** | GitHub Actions, Python Automation Scripts, Batch Utilities | Automated tree generation, GitOps CI/CD workflows |

---

## 🗂️ Folder Structure

<!-- TREE_START -->
```
├── README.md
├── assets
│   ├── Noukhej_Resume.pdf
│   ├── profile.jpg
│   ├── project_cancer.jpg
│   ├── project_cbc.jpg
│   ├── project_genai.jpg
│   └── project_malaria.jpg
├── index.html
├── script.js
├── setup.bat
├── styles.css
└── update_tree.py
```
<!-- TREE_END -->

### Module Descriptions
- [`index.html`](index.html): Semantic HTML5 structure, SEO meta tags, OpenGraph social headers, multi-page ready navbar, bento grid layout, interactive slider, dual-row marquee, and modal dialogs.
- [`styles.css`](styles.css): Core design system, responsive breakpoints, color tokens, animations (`holographicGradient`, `pulseGlow`, `marqueeScroll`), and dark/light theme definitions.
- [`script.js`](script.js): High-performance client runtime managing canvas physics, showcase slider logic, typewriter animations, project modal injection, theme toggle, and clipboard actions.
- [`update_tree.py`](update_tree.py): Python automation utility that introspects repository structure and regenerates the directory tree in `README.md`.
- [`setup.bat`](setup.bat): Automated Windows setup script configuring the local virtual environment, upgrading `pip`, and installing requirements.
- [`assets/`](assets/): Production assets including verified resume PDF, project showcase imagery, and profile photography.

---

## 🚀 Quick Start & Local Development

### Prerequisites
- Any modern web browser (Google Chrome, Firefox, Safari, Microsoft Edge).
- (Optional) Python 3.8+ to run a lightweight local HTTP server.

### 1. Clone the Repository
```bash
git clone https://github.com/mnoukhej/portfolio.git
cd portfolio
```

### 2. Launch Local Dev Server

#### Using Python (Recommended)
```bash
# Python 3
python -m http.server 5500
```
Open your browser and navigate to:
```
http://localhost:5500
```

#### Using Node.js (npx)
```bash
npx serve -l 5500
```

#### Using Windows Setup Script
Run the automated initialization batch file:
```cmd
setup.bat
```

---

## 🔬 Featured Projects

### 1. Automated Complete Blood Count (CBC) AI Detection
* **Tech Stack**: Python, YOLOv8, PyTorch, OpenCV, Flask
* **Architecture**: Deep convolutional neural network for automated detection, segmentation, and quantification of erythrocytes (RBCs), leukocytes (WBCs), and platelets in high-resolution blood smears with 98.4% diagnostic accuracy.

### 2. Deep Learning Malaria Parasite Detection
* **Tech Stack**: Python, TensorFlow, Keras, Scikit-image
* **Architecture**: Clinical decision support model classifying Plasmodium falciparum-infected cells in microscopic thin blood smears with 96.5% clinical sensitivity.

### 3. Mammogram Breast Cancer Lesion Analysis
* **Tech Stack**: Python, PyTorch, ResNet, DICOM, NumPy
* **Architecture**: Computer vision pipeline detecting microcalcifications and mass lesions in DICOM breast screening scans with diagnostic heatmaps for radiologists.

### 4. Enterprise Azure OpenAI Knowledge & Workflow Engine
* **Tech Stack**: Python, Azure OpenAI Service, LangChain, Vector Embeddings, Redis
* **Architecture**: High-throughput RAG engine integrating vector embeddings, semantic retrieval, and contextual workflow automation.

---

## 💼 Professional Experience Summary

### **Tata Consultancy Services (TCS)**
* **Role**: Python Developer | ML & GenAI Specialist
* **Teams**: Research & Innovation (RnI) & Research & Development (RnD)
* **Tenure**: Over 7+ Years of Continuous Enterprise Service
* **Key Milestones**:
  * Engineered and shipped production-grade Azure OpenAI generative solutions.
  * Architected microservices with FastAPI, Starlette, and asynchronous Redis pipelines.
  * Formulated predictive ML and computer vision diagnostics.
  * Built automation pipelines eliminating manual data operations.

### **CodeX404 Solutions**
* **Role**: Founder & Lead Architect
* **Website**: [codex404solutions.com](https://codex404solutions.com/)
* **Mission**: Delivering bespoke enterprise software engineering, AI automation pipelines, and scalable digital platforms for businesses globally.

---

## 👤 Author & Connect

**Muhammad Noukhez**  
*Senior Python Developer | GenAI & ML Systems Engineer | Founder at CodeX404 Solutions*

* 📍 **Location**: Kolkata, West Bengal, India *(Open to Hybrid, Remote & Relocation)*
* 📧 **Email**: [mnoukhej@gmail.com](mailto:mnoukhej@gmail.com)
* 📱 **Phone / WhatsApp**: [+91 77177 47620](tel:+917717747620)
* 💼 **LinkedIn**: [linkedin.com/in/mnoukhej](https://www.linkedin.com/in/mnoukhej/)
* 🐙 **GitHub**: [github.com/mnoukhej](https://github.com/mnoukhej)
* 🌐 **Agency**: [codex404solutions.com](https://codex404solutions.com/)
* 🐦 **X / Twitter**: [@mnoukhej](https://x.com/mnoukhej)

---

<div align="center">
<sub>Designed and engineered by **Muhammad Noukhez** • Company: **CodeX404 Solutions** • Website: [codex404solutions.com](https://codex404solutions.com/). Licensed under the <a href="LICENSE">MIT License</a>.</sub>
</div>