
// interactive-image-protocol/src/App.tsx

/**
 * @author aezi zhu (github.com/aezizhu)
 * @copyright Copyright (c) 2025, aezi zhu
 */

import React, { useState } from 'react';
import { AuraViewer } from './components/AuraViewer/AuraViewer';
import sampleAuraData from './assets/sample-aura-data.json';
import baseMapImage from './assets/sample-map.png';
import { AuraData } from './lib/aura-parser/types';
import { createAuraPng } from './lib/aura-creator/creator';
import { parseAura } from './lib/aura-parser/parser';

function App() {
  const [interactiveData, setInteractiveData] = useState<AuraData | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleGenerateClick = async () => {
    try {
      // Fetch the base image as a buffer
      const response = await fetch(baseMapImage);
      const imageBuffer = await response.arrayBuffer();

      // Create the AIIP file buffer
      const newPngBuffer = createAuraPng(new Uint8Array(imageBuffer), sampleAuraData as AuraData);

      // Create a blob and trigger download
      const blob = new Blob([newPngBuffer], { type: 'image/png' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'interactive-map.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Failed to generate AIIP file:', error);
      alert('Error generating file. See console for details.');
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const fileBuffer = await file.arrayBuffer();
      const parsedData = parseAura(new Uint8Array(fileBuffer));

      if (parsedData) {
        setInteractiveData(parsedData);
        // Create a URL for the uploaded image to display it
        const imageUrl = URL.createObjectURL(file);
        setImageUrl(imageUrl);
      } else {
        alert('This does not appear to be a valid Aura Interactive Image.');
      }
    } catch (error) {
      console.error('Failed to process file:', error);
      alert('Error processing file. See console for details.');
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Aura Interactive Image Protocol - Demo</h1>
        <p>Authored by: aezi zhu (github.com/aezizhu)</p>
      </header>

      <section className="demo-section">
        <h2>1. Creator Demo</h2>
        <p>Click the button to generate an AIIP file from our sample data and download it.</p>
        <button onClick={handleGenerateClick}>Generate & Download Interactive PNG</button>
      </section>

      <hr />

      <section className="demo-section">
        <h2>2. Viewer Demo</h2>
        <p>Upload the `interactive-map.png` file you just downloaded to see it in action.</p>
        <input type="file" accept=".png" onChange={handleFileChange} />
        {imageUrl && interactiveData && (
          <div className="viewer-wrapper">
            <AuraViewer imageUrl={imageUrl} auraData={interactiveData} />
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
