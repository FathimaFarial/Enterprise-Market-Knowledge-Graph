Enterprise Market Knowledge Graph Terminal

A full-stack AI-driven application that transforms chaotic, unstructured financial news into an interactive, physics-driven relational network. This project moves beyond static data analysis by automating the entire intelligence pipeline—from raw CSV ingestion to automated executive-level structural insights—using a responsive, zero-reload architecture.
🚀 Overview
Financial news data is often voluminous and fragmented. This terminal was designed to solve the "data firehose" problem by parsing raw text, isolating key market entities, and visualizing their interconnectedness. Unlike standard visualizers, this system actively interprets the network's topology, providing real-time analytical summaries alongside the interactive graph.
🛠️ The Intelligence Pipeline
The core application relies on a four-stage asynchronous pipeline:
 * Ingestion Engine (FastAPI): An asynchronous backend that dynamically resolves headers, handles character encoding fallbacks, and standardizes disparate data formats.
 * Entity Intelligence (spaCy): Utilizes Named Entity Recognition (NER) to isolate PERSON, ORG, and GPE entities, mapping co-occurrence matrices from unstructured headline corpora.
 * Network Physics (Vis.js): Pipes graph theory metrics (Degree Centrality, Network Density) into a Barnes-Hut force-directed simulation, allowing thematic market clusters to organize organically.
 * Automated Structural Briefings: The system dynamically computes graph metrics to generate an executive intelligence report, which is injected into the frontend side-panel as a pre-compiled HTML payload, ensuring a zero-page-reload user experience.

⚙️ Tech Stack
 * Backend: Python, FastAPI, uvicorn
 * NLP: spaCy (en_core_web_sm)
 * Frontend: HTML5, CSS, Vanilla JavaScript (Fetch API)
 * Visualization: Vis.js Network (Barnes-Hut Physics)
 * Data Processing: CSV I/O, Pandas
   
## License & Copyright

Copyright (c) 2026 Fathima Farial. All rights reserved. 

This repository and its contents are for demonstration and portfolio presentation purposes only. No part of this project (frontend or backend) may be cloned, reproduced, redistributed, or executed without the explicit written permission of the author.
