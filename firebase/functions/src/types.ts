import type { FieldValue } from "firebase-admin/firestore";
import { type UserInfo } from "firebase-admin/auth";

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

export type SegmentDoc = {
  ownerUid: UserInfo["uid"];
  langtag: string;
  segment: string;
  createdAt: FieldValue;
}

export type Post = SegmentDoc & {
  id: string
}

export declare interface UniqueUsername {
  owner: UserInfo["uid"];
  createdAt: FieldValue;
}
