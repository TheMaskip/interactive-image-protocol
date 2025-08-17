# Aura Interactive Image Protocol (AIIP) - Prototype

**Author:** aezi zhu (github.com/aezizhu)

This repository contains the reference implementation and prototype for the Aura Interactive Image Protocol (AIIP). It includes a functional demonstration of the core protocol, allowing for the creation and viewing of self-contained, interactive PNG image files.

For the complete technical specification of the protocol, please see the [Aura Image Protocol Specification repository](https://github.com/aezizhu/Aura-Image-Protocol-Specification).

---

## ✨ Core Concepts

AIIP is a protocol designed to embed rich, interactive experiences within a standard PNG file. It works by adding a custom `aura` data chunk that contains a secure, declarative JSON object defining interactive regions, events, and content.

-   **Self-Contained:** All interactivity is packed into a single `.png` file.
-   **Backward Compatible:** Images gracefully degrade to standard static PNGs in non-compatible viewers.
-   **Secure by Design:** The protocol uses a declarative JSON structure, not executable code, to prevent security risks.

## 🚀 Running the Prototype

This project was built with Vite, React, and TypeScript.

### 1. Prerequisites

-   [Node.js](https://nodejs.org/) (version 18.x or higher)
-   [npm](https://www.npmjs.com/)

### 2. Installation

Clone the repository and install the dependencies:

```bash
npm install
```

### 3. Running the Development Server

To run the demo application locally:

```bash
npm run dev
```

This will start a development server, typically at `http://localhost:5173`.

## 🔬 How the Demo Works

The application demonstrates the full, end-to-end workflow of the protocol:

1.  **Creator Demo:** Click the **"Generate & Download"** button. This uses the `aura-creator` logic to take a sample image and a sample JSON object, compress the JSON, and inject it into a new PNG file (`interactive-map.png`) that is downloaded to your computer.

2.  **Viewer Demo:** Click the **"Choose File"** button and select the `interactive-map.png` you just downloaded. The application uses the `aura-parser` to extract the `aura` chunk, decompress the data, and render the interactive regions on the image using the `AuraViewer` React component.

## 📂 Project Structure

-   `src/components/AuraViewer/`: Contains the React component responsible for rendering the interactive experience.
-   `src/lib/aura-parser/`: Contains the logic for parsing the `aura` chunk from a PNG file.
-   `src/lib/aura-creator/`: Contains the logic for creating an AIIP file by injecting the `aura` chunk.
-   `src/assets/`: Contains the sample data used for the demonstration.

## 📜 License

This project is authored by **aezi zhu** and is available for personal, non-commercial use. Please refer to the license details in the specification repository.