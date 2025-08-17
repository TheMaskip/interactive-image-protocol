
// interactive-image-protocol/src/lib/aura-parser/parser.ts

/**
 * @author aezi zhu (github.com/aezizhu)
 * @copyright Copyright (c) 2025, aezi zhu
 */

import extract from 'png-chunks-extract';
import pako from 'pako';
import { AuraData } from './types';

/**
 * Parses an Aura Interactive Image PNG file and extracts the AuraData.
 * @param {Uint8Array} pngBuffer - The raw binary data of the PNG file.
 * @returns {AuraData | null} The parsed AuraData object, or null if not found or invalid.
 */
export function parseAura(pngBuffer: Uint8Array): AuraData | null {
  try {
    const chunks = extract(pngBuffer);
    const auraChunk = chunks.find(chunk => chunk.name === 'aura');

    if (!auraChunk) {
      console.log('No aura chunk found in this PNG.');
      return null;
    }

    const chunkData = auraChunk.data;
    const compressionMethod = chunkData[0];
    const jsonDataBuffer = chunkData.slice(1);

    let jsonString: string;

    if (compressionMethod === 0x01) { // DEFLATE
      jsonString = pako.inflate(jsonDataBuffer, { to: 'string' });
    } else if (compressionMethod === 0x00) { // None
      const decoder = new TextDecoder('utf-8');
      jsonString = decoder.decode(jsonDataBuffer);
    } else {
      console.error(`Unsupported compression method: ${compressionMethod}`);
      return null;
    }

    const auraData: AuraData = JSON.parse(jsonString);

    // Basic validation
    if (auraData && auraData.version && auraData.regions) {
      return auraData;
    }

    console.error('Parsed JSON is not valid AuraData.');
    return null;

  } catch (error) {
    console.error('Failed to parse Aura PNG:', error);
    return null;
  }
}
