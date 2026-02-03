export interface CharacterProfile {
  name: string;
  age: number;
  role: string;
  fakeRole: string;
  appearance: string[];
  personality: {
    outer: string[];
    inner: string[];
  };
  likes: string[];
  dislikes: string[];
  dialogueExamples: {
    category: string;
    lines: string[];
  }[];
}

export interface NPC {
  name: string;
  relation: string;
  description: string;
  imagePlaceholder: string;
}

export type AppType = 'search' | 'message' | 'memo' | 'bank';

export interface PhoneContent {
  type: AppType;
  items: string[];
}