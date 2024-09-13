import * as functions from "firebase-functions";
/* import * as admin from "firebase-admin";
const db = admin.firestore(); */
import type { SegmentBasis } from "./types";
import {
  parseLanguageTag,
  type ILanguageSubtag,
} from "@sozialhelden/ietf-language-tags";


const postSegmentInPersonalCorpus = functions
  .https
  .onCall({ region: "europe-west1" },
    async ({ data, auth }) => {
      const { segment, languageTag: originalTag } = data as SegmentBasis;
      let tag: ILanguageSubtag | undefined;
      try {
        tag = parseLanguageTag(
          originalTag,
          false
        );
      } catch (err: any) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          err
        );
      }
      return { segment, uid: auth?.uid, tag };
    });

export {
  postSegmentInPersonalCorpus,
};
