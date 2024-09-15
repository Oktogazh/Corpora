import type { FieldValue } from "firebase-admin/firestore";

export type SegmentBasis = {
  segment: string;
  languageTag: string;
}

export type SegmentRefDoc = {
  ref: string;
  langtag: string;
  createdAt: FieldValue,
}

export type LanguageDoc = {
  lastActivity: FieldValue,
  postsCount: FieldValue,
}
