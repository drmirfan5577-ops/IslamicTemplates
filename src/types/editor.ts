export type LayerType = 'background' | 'border' | 'text' | 'image' | 'effect' | 'shape';

export interface Layer {
  id: string;
  type: LayerType;
  name: string;
  visible: boolean;
  locked: boolean;
  opacity: number;
  zIndex: number;
  data: Record<string, unknown>;
}

export interface TextLayer extends Layer {
  type: 'text';
  data: {
    content: string;
    font: string;
    fontSize: number;
    color: string;
    textEffect: string;
    animation: string;
    direction: 'rtl' | 'ltr';
    align: 'left' | 'center' | 'right';
    bold: boolean;
    italic: boolean;
    x: number;
    y: number;
    width: number;
    bgColor?: string;
    textShadow?: string;
    strokeColor?: string;
    strokeWidth?: number;
  };
}

export interface BackgroundLayer extends Layer {
  type: 'background';
  data: {
    themeId: string;
    gradient?: string;
    pattern?: string;
    animation: string;
  };
}

export interface BorderLayer extends Layer {
  type: 'border';
  data: {
    borderId: string;
    color: string;
    size: number;
    position: 'all' | 'top' | 'bottom' | 'left' | 'right';
  };
}

export interface Draft {
  id: string;
  name: string;
  thumbnail?: string;
  layers: Layer[];
  createdAt: number;
  updatedAt: number;
  cloudUrl?: string;
}

export interface FavoriteTemplate {
  id: number;
  addedAt: number;
}

export interface ExportOptions {
  format: 'png' | 'jpg' | 'webp' | 'svg' | 'pdf';
  quality: number;
  width: number;
  height: number;
  scale: number;
}
