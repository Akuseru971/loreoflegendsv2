export const RUNETERRA_REGIONS = [
  "Demacia",
  "Noxus", 
  "Freljord",
  "Ionia",
  "Piltover",
  "Zaun",
  "Bilgewater",
  "Shadow Isles",
  "Shurima",
  "Targon",
  "Void",
  "Ixtal",
  "Bandle City",
  "Camavor",
];

export const POWER_TYPES = [
  "Ancient Rune Magic",
  "Raw Physical Strength",
  "Necromancy and Death",
  "Piltover / Hextech Technology",
  "Void and Entropy",
  "Divine Celestial Light",
  "Shadow and Assassination",
  "Elemental Magic",
  "Alchemy and Chemtech",
  "Targonian Runic Magic",
];

export const MORAL_ALIGNMENTS = [
  "Hero — Protector of the innocent",
  "Anti-hero — Good through dark means",
  "Neutral — Driven by duty or fate",
  "Morally ambiguous — Neither good nor evil",
  "Anti-villain — Evil for righteous reasons",
  "Villain — Embracing destruction",
];

export const ORACLE_SUGGESTIONS = [
  "Who is the oldest champion in Runeterra?",
  "Which region holds the most dangerous magic?",
  "What is the full story of Kindred?",
  "Who could truly defeat Aurelion Sol?",
  "What is the connection between the Void and the Ruination?",
  "What is the true nature of the Eye of the Herald?",
  "Why did Viego corrupt the Shadow Isles?",
  "What secrets lie within the Eternal Sun City?",
];

export const KINDRED_LAMB_QUESTIONS = [
  { id: "name", text: "What is your name, wanderer?", speaker: "lamb", description: "The name your champion will carry through the chronicles of Runeterra." },
  { id: "origin", text: "From what land were you born?", speaker: "lamb", description: "The region of Runeterra that shaped who you are." },
  { id: "tragedy", text: "What tragedy broke you… then rebuilt you?", speaker: "lamb", description: "The defining event that made you who you have become." },
  { id: "purpose", text: "What is your ultimate purpose in this world?", speaker: "lamb", description: "The quest that guides your every step." },
];

export const KINDRED_WOLF_QUESTIONS = [
  { id: "target", text: "Who is your prey? Who do you hunt?", speaker: "wolf", description: "Your sworn enemy, the reason for your hunt." },
  { id: "hunter", text: "Who stalks you from the shadows?", speaker: "wolf", description: "The one or thing that follows you, seeking your end." },
  { id: "fear", text: "What do you dread most in the darkness?", speaker: "wolf", description: "Your secret weakness, the thing that paralyses you." },
  { id: "survival", text: "What would you do to survive?", speaker: "wolf", description: "Your moral limit, the line you might be willing to cross." },
];

export const EXTRA_QUESTIONS = [
  { id: "region", text: "In which region did you forge your legend?", type: "select", options: RUNETERRA_REGIONS },
  { id: "power", text: "What is the source of your power?", type: "select", options: POWER_TYPES },
  { id: "weapon", text: "What is your weapon or primary ability?", type: "text", placeholder: "e.g. Ancient lightning blade, prophetic ice magic..." },
  { id: "alignment", text: "Where do you stand in the duality of the world?", type: "select", options: MORAL_ALIGNMENTS },
  { id: "quote", text: "What is your iconic quote?", type: "text", placeholder: "The phrase that defines you in a single line..." },
];
