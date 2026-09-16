export type ScreenId = 'landing' | 'hub' | 'positions' | 'candidates' | 'celebrate' | 'processing' | 'wasted' | 'easter';
export type Theme = 'boy' | 'girl' | 'other' | null;

export interface Society {
  id: string;
  name: string;
  available: boolean;
}

export interface Position {
  id: string;
  name: string;
  available: boolean;
}
