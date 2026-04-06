export interface ChampionFormData {
  // Lamb questions
  name: string;
  origin: string;
  tragedy: string;
  purpose: string;
  // Wolf questions
  target: string;
  hunter: string;
  fear: string;
  survival: string;
  // Extra
  region: string;
  power: string;
  weapon: string;
  alignment: string;
  quote: string;
}

export interface GeneratedChampion {
  title: string;
  epithet: string;
  biography: string;
  physicalDescription: string;
  personality: string;
  relationships: string;
  signatureQuote: string;
  abilities: string;
  riotDescription: string;
  imageUrl?: string;
  isPremium?: boolean;
}

export interface OracleMessage {
  role: "user" | "oracle";
  content: string;
  timestamp: Date;
}

export type ForgeStep = 
  | "invocation"
  | "lamb-questions"
  | "wolf-questions"
  | "extra-questions"
  | "generating"
  | "result"
  | "image-reveal"
  | "premium";
