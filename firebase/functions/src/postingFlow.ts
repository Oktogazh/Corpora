import * as functions from "firebase-functions";
/* import * as admin from "firebase-admin";
const db = admin.firestore(); */
import type { SegmentBasis } from "./types";
import {
  parseLanguageTag,
  type ILanguageSubtag,
} from "@sozialhelden/ietf-language-tags";


const postSegmentInPersonalCorpus = functions
  .region("europe-west1")
  .https
  .onCall(async (segmentBasis: SegmentBasis, context) => {
    const { segment, languageTag: originalTag } = segmentBasis;
    let tag: ILanguageSubtag | undefined;
    try {
      tag = parseLanguageTag(
        originalTag,
        false
      );
    } catch (err: any) {
      throw new functions.https.HttpsError(
        err.code,
        err.message
      );
    }
    return { segment, uid: context.auth?.uid, tag };
  });

export {
  postSegmentInPersonalCorpus,
};
