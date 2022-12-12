export interface TranslationResult {
  id: string;
  language: string;
  lexicalEntries: LexicalEntry[];
  type: string;
  word: string;
}

export interface LexicalEntry {
  entries: Entry[];
  language: string;
  lexicalCategory: {
    id: string;
    text: string;
  };
  text: string;
}

interface Entry {
  grammaticalFeatures?: GrammaticalFeature[];
  pronunciations: Pronunciation[];
  homographNumber?: string;
  senses: Sense[];
  inflections?: Inflection[];
}
interface Inflection {
  inflectedForm: string;
  grammaticalFeatures?: GrammaticalFeature[];
}

interface GrammaticalFeature {
  id: string;
  text: string;
  type: string;
}

interface Pronunciation {
  audioFile: string;
  dialects: ("American English" | "British English")[];
  phoneticNotation: string;
  phoneticSpelling: string;
}

interface Sense {
  examples?: Example[];
  datasetCrossLinks?: DatasetCrossLink[];
  translations?: Translation[];
  id: string;
  registers?: Register[];
  notes?: Note[];
  crossReferenceMarkers?: string[];
  crossReferences?: GrammaticalFeature[];
}
interface Register {
  id: string;
  text: string;
}

interface Translation {
  grammaticalFeatures?: GrammaticalFeature[];
  notes?: Note[];
  language: string;
  text: string;
  domains?: Domain[];
}
interface DatasetCrossLink {
  sense_id: string;
  language: string;
  entry_id: string;
}
interface Example {
  translations: Translation[];
  text: string;
  domains?: Domain[];
  notes?: Note[];
}
interface Domain {
  id: string;
  text: string;
}
interface Note {
  text: string;
  type: string;
}
