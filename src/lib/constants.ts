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
  "Magie des runes anciens",
  "Force brutale et physique",
  "Nécromancie et mort",
  "Technologie Piltover/Hextech",
  "Void et entropie",
  "Lumière divine céleste",
  "Ombre et assassinat",
  "Magie élémentaire",
  "Alchimie et chimscience",
  "Magie runique targonienne",
];

export const MORAL_ALIGNMENTS = [
  "Héros — Protecteur des innocents",
  "Antihéros — Bien par des moyens sombres",
  "Neutre — Guidé par le devoir ou le destin",
  "Moralement ambigu — Ni bien ni mal",
  "Antivillain — Mal pour de bonnes raisons",
  "Villain — Destruction assumée",
];

export const ORACLE_SUGGESTIONS = [
  "Qui est le champion le plus ancien de Runeterra ?",
  "Quelle région possède la magie la plus dangereuse ?",
  "Quelle est l'histoire complète de Kindred ?",
  "Qui pourrait véritablement vaincre Aurelion Sol ?",
  "Quel est le lien entre le Void et la Démise ?",
  "Quelle est la véritable nature de l'Œil de Heraut ?",
  "Pourquoi Viego a-t-il corrompu les Shadow Isles ?",
  "Quel est le secret de la Cité de l'Éternel Soleil ?",
];

export const KINDRED_LAMB_QUESTIONS = [
  { id: "name", text: "Quel est ton nom, voyageur ?", speaker: "lamb", description: "Le nom que ton champion portera dans les chroniques de Runeterra." },
  { id: "origin", text: "De quelle terre es-tu né ?", speaker: "lamb", description: "La région de Runeterra qui t'a façonné." },
  { id: "tragedy", text: "Quelle tragédie t'a brisé... puis reconstruit ?", speaker: "lamb", description: "L'événement fondateur qui définit qui tu es devenu." },
  { id: "purpose", text: "Quel est ton but ultime dans ce monde ?", speaker: "lamb", description: "La quête qui guide chacun de tes pas." },
];

export const KINDRED_WOLF_QUESTIONS = [
  { id: "target", text: "Qui est ta proie ? Qui pourchasses-tu ?", speaker: "wolf", description: "Ton ennemi juré, la raison de ta chasse." },
  { id: "hunter", text: "Qui te traque dans l'ombre ?", speaker: "wolf", description: "Celui ou ce qui te suit, cherchant ta fin." },
  { id: "fear", text: "Que crains-tu le plus dans l'obscurité ?", speaker: "wolf", description: "Ta faiblesse secrète, ce qui te paralise." },
  { id: "survival", text: "Que ferais-tu pour survivre ?", speaker: "wolf", description: "Ta limite morale, la ligne que tu pourrais franchir." },
];

export const EXTRA_QUESTIONS = [
  { id: "region", text: "Dans quelle région as-tu forgé ta légende ?", type: "select", options: RUNETERRA_REGIONS },
  { id: "power", text: "Quelle est la source de ton pouvoir ?", type: "select", options: POWER_TYPES },
  { id: "weapon", text: "Quelle est ton arme ou capacité principale ?", type: "text", placeholder: "Ex: Lame de foudre ancienne, sorts de glace prophétique..." },
  { id: "alignment", text: "Où te situes-tu dans la dualité du monde ?", type: "select", options: MORAL_ALIGNMENTS },
  { id: "quote", text: "Quelle est ta citation iconique ?", type: "text", placeholder: "La phrase qui te définit en une seule ligne..." },
];
