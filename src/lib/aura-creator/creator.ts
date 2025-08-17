
// interactive-image-protocol/src/lib/aura-creator/creator.ts

/**
 * @author aezi zhu (github.com/aezizhu)
 * @copyright Copyright (c) 2025, aezi zhu
 */

import extract from 'png-chunks-extract';
import encode from 'png-chunks-encode';
import pako from 'pako';
import { AuraData } from '../aura-parser/types';

/**
 * Creates an Aura Interactive Image PNG file buffer.
 * @param {Uint8Array} basePngBuffer - The raw binary data of the original PNG file.
 * @param {AuraData} auraData - The AuraData object to embed.
 * @returns {Uint8Array} The new PNG file buffer with the embedded aura chunk.
 */
export function createAuraPng(basePngBuffer: Uint8Array, auraData: AuraData): Uint8Array {
  // 1. Convert JSON data to a compressed buffer
  const jsonString = JSON.stringify(auraData);
  const compressedJsonData = pako.deflate(jsonString);

  // 2. Create the data payload for the chunk (1 byte for compression method + compressed data)
  const payload = new Uint8Array(1 + compressedJsonData.length);
  payload[0] = 0x01; // 0x01 for DEFLATE
  payload.set(compressedJsonData, 1);

  // 3. Create the `aura` chunk
  const auraChunk = {
    name: 'aura',
    data: payload
  };

  // 4. Read the chunks from the original PNG
  const originalChunks = extract(basePngBuffer);

  // 5. Find the insertion point (after IHDR, before first IDAT)
  const ihdrIndex = originalChunks.findIndex(chunk => chunk.name === 'IHDR');
  if (ihdrIndex === -1) {
    throw new Error('Invalid PNG: IHDR chunk not found.');
  }

  // 6. Insert the new aura chunk
  originalChunks.splice(ihdrIndex + 1, 0, auraChunk);

  // 7. Encode the new set of chunks back into a PNG file buffer
  const newPngBuffer = encode(originalChunks);

  return newPngBuffer;
}
