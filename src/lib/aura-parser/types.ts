
// interactive-image-protocol/src/lib/aura-parser/types.ts

/**
 * @author aezi zhu (github.com/aezizhu)
 * @copyright Copyright (c) 2025, aezi zhu
 */

// As defined in 02-json-schema.md

/**
 * Represents a CSS-like style object.
 */
export interface AuraStyle {
  [key: string]: string | number;
}

/**
 * Defines the geometry of an interactive region.
 */
export interface AuraShape {
  type: 'rect' | 'circle' | 'polygon';
  coords: number[];
}

/**
 * Defines an action to be performed on an event.
 */
export interface AuraAction {
  action: 'showTooltip' | 'showPanel' | 'highlight';
  content?: string; // HTML content for tooltips/panels
  styleId?: string; // Key from the root styles object
  highlightStyle?: AuraStyle;
  panelPosition?: 'center' | 'bottom' | 'left' | 'right';
  panelTitle?: string;
}

/**
 * Defines the events (onHover, onClick) for a region.
 */
export interface AuraEvents {
  onHover?: AuraAction;
  onClick?: AuraAction;
}

/**
 * Represents a single interactive hotspot on the image.
 */
export interface AuraRegion {
  id: string;
  shape: AuraShape;
  events: AuraEvents;
  ariaLabel?: string;
}

/**
 * The root object of the JSON data stored in the `aura` chunk.
 */
export interface AuraData {
  version: string;
  metadata: {
    author?: string;
    description?: string;
    createdAt?: string;
  };
  styles: Record<string, AuraStyle>;
  regions: AuraRegion[];
}
