import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
const db = admin.firestore();
import type { SegmentBasis } from "./types.ts";
import { parseLanguageTag } from "@sozialhelden/ietf-language-tags";


const postSegmentInCorpus = functions
  .region("europe-west1")
  .https
  .onCall(async (segmentBasis: SegmentBasis, context) => {
    const { segment, languageTag: originalTag } = segmentBasis;
    try {
      const tag = parseLanguageTag(
        originalTag,
        false
      );
    } catch (err: any) {
      throw new functions.https.HttpsError(
        err.code,
        err.message
      );
    }
  });

export {
  postSegmentInCorpus,
};
