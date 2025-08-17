
// interactive-image-protocol/src/components/AuraViewer/AuraViewer.tsx

/**
 * @author aezi zhu (github.com/aezizhu)
 * @copyright Copyright (c) 2025, aezi zhu
 */

import React, { useState } from 'react';
import { AuraData, AuraRegion } from '../../lib/aura-parser/types';
import './AuraViewer.css';

interface AuraViewerProps {
  imageUrl: string;
  auraData: AuraData;
}

export const AuraViewer: React.FC<AuraViewerProps> = ({ imageUrl, auraData }) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const handleRegionMouseEnter = (region: AuraRegion) => {
    if (region.events.onHover?.action === 'showTooltip') {
      // For now, just log to console. We will build the tooltip UI next.
      console.log(`Hovering over region: ${region.id}. Content: ${region.events.onHover.content}`);
      setActiveTooltip(region.id);
    }
  };

  const handleRegionMouseLeave = () => {
    setActiveTooltip(null);
  };

  const handleRegionClick = (region: AuraRegion) => {
    if (region.events.onClick?.action === 'showPanel') {
      // For now, just alert. We will build the panel UI next.
      alert(`Clicked region: ${region.id}. Content: ${region.events.onClick.content}`);
    }
  };

  const getRegionStyle = (region: AuraRegion): React.CSSProperties => {
    const { type, coords } = region.shape;
    switch (type) {
      case 'rect':
        return { left: `${coords[0]}px`, top: `${coords[1]}px`, width: `${coords[2]}px`, height: `${coords[3]}px` };
      // Polygon and Circle would require more complex SVG rendering, which we will implement later.
      default:
        return {};
    }
  };

  return (
    <div className="aura-viewer-container">
      <img src={imageUrl} alt={auraData.metadata.description || 'Aura Image'} className="aura-base-image" />
      <div className="aura-overlay">
        {auraData.regions.map((region) => (
          <div
            key={region.id}
            className="aura-region"
            style={getRegionStyle(region)}
            onMouseEnter={() => handleRegionMouseEnter(region)}
            onMouseLeave={handleRegionMouseLeave}
            onClick={() => handleRegionClick(region)}
            aria-label={region.ariaLabel}
          />
        ))}
      </div>
      {/* Tooltip and Panel display logic will be added here */}
    </div>
  );
};
