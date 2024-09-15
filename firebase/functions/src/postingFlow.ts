import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
const db = admin.firestore();
import type { SegmentBasis, SegmentRefDoc, LanguageDoc } from "./types";
import {
  parseLanguageTag,
  normalizeLanguageTagCasing,
  getPreferredLanguageTag,
} from "@sozialhelden/ietf-language-tags";


// This function does the following:
//    - normalize the language tag
//    - publish the segment in the personal corpus
//    - add a ref to the segment in global segments_refs collection
//    - update the lastActivity and postsCount in the language doc
const postSegmentInPersonalCorpus = functions
  .https
  .onCall({ region: "europe-west1" },
    async ({ data, auth: { uid } }) => {
      const { languageTag: originalTag, segment } = data as SegmentBasis;
      // normalization happens here
      // if the langtab is valid, set its preferred language value and
      //    normalize it;
      //    eg. zH-yUe-Latn-a-extend1-x-foo-bar -> yue-Latn-a-extend1
      //    keep -x -o -d extensions that don't exist in IANA registry:
      //      x for private use
      //      o for orthogarphic variants
      //      d for dialects
      let normalizedTag = "";
      let preferredLangSubTag = "";
      try {
        const { language } = parseLanguageTag(
          originalTag,
          false
        );
        preferredLangSubTag = getPreferredLanguageTag(language) ||
          language;
        normalizedTag = normalizeLanguageTagCasing(originalTag)
          .replace(language, preferredLangSubTag)
          .replace(/-x-.+$/, "")
          .replace(/-o-.+$/, "")
          .replace(/-d-.+$/, "");
      } catch (err) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          err
        );
      }

      // publish the segment
      let segmentId = "";
      try {
        // in the personal corpus
        segmentId = (await db
          .collection(`users/${uid}/corpora/${normalizedTag}/segments`)
          .add({
            segment,
            created: admin.firestore.FieldValue.serverTimestamp(),
          })).id;

        // reference the post globally
        const segmentRefDoc: SegmentRefDoc = {
          ref: `users/${uid}/corpora/${normalizedTag}/segments/${segmentId}`,
          langtag: normalizedTag,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        };
        await db.doc(`segments_refs/${uid}${segmentId}`)
          .set(segmentRefDoc);

        // update it in the global normalized langtag corpus
        const languageDoc: LanguageDoc = {
          lastActivity: admin.firestore.FieldValue.serverTimestamp(),
          postsCount: admin.firestore.FieldValue.increment(1),
        };
        await db.doc(`languages/${normalizedTag}`)
          .set(languageDoc, { merge: true });
      } catch (err) {
        throw new functions.https.HttpsError(
          "unknown",
          err
        );
      }
      return {
        normalizedTag,
      };
    });

const deleteSegmentInPersonalCorpus = functions
  .https
  .onCall({ region: "europe-west1" },
    async ({ data, auth: { uid } }) => {
      const { segmentId, normalizedTag } = data;
      // delete the segment from the personal corpus
      // delete the post references from the global corpora
      try {
        await db
          .doc(`users/${uid}/corpora/${normalizedTag}/${segmentId}`).delete();
        await db
          .doc(`segments_refs/${uid}${segmentId}`).delete();
        await db.doc(`languages/${normalizedTag}`)
          .update({
            lastActivity: admin.firestore.FieldValue.serverTimestamp(),
            postsCount: admin.firestore.FieldValue.increment(-1),
          });
      } catch (err) {
        throw new functions.https.HttpsError(
          "unknown",
          err
        );
      }
      return {
        segment: `users/${uid}/corpora/${normalizedTag}/${segmentId}`,
        deleted: true,
      };
    });

export {
  postSegmentInPersonalCorpus,
  deleteSegmentInPersonalCorpus,
};
