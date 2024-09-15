import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
const db = admin.firestore();
import type { SegmentBasis } from "./types";
import {
  parseLanguageTag,
  normalizeLanguageTagCasing,
  getPreferredLanguageTag,
} from "@sozialhelden/ietf-language-tags";


// This function does the following:
//    - normalize the language tag
//    - publish the segment in the personal corpus
//    - add a ref to the segment in global normalized tag ref corpus
//    - publish ref to segment in language subtag ref corpus if exists
//        with its attribute 'isCopy' true (orginal not from the same langtag)
//    - update the lastActivity timestamp in those two global language docs
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

        // referrence it in the global normalized langtag corpus
        await db.doc(`languages/${normalizedTag}/segments/${segmentId}`)
          .set({
            isCopy: false,
            created: admin.firestore.FieldValue.serverTimestamp(),
          });
        await db.doc(`languages/${normalizedTag}`)
          .set({
            lastActivity: admin.firestore.FieldValue.serverTimestamp(),
          }, { merge: true });

        // copy reference in the language subtag corpus if different for langtag
        if (preferredLangSubTag !== normalizedTag) {
          await db.doc(`languages/${preferredLangSubTag}/segments/${segmentId}`)
            .set({
              isCopy: true,
              created: admin.firestore.FieldValue.serverTimestamp(),
            });
          await db.doc(`languages/${preferredLangSubTag}`)
            .set({
              lastActivity: admin.firestore.FieldValue.serverTimestamp(),
            }, { merge: true });
        }
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
      const { segmentId, corpusTag } = data;
      // delete the segment from the personal corpus
      // delete the post references from the global corpora
      try {
        await db.doc(`users/${uid}/corpora/${corpusTag}/${segmentId}`).delete();
        const { language: langSubTag } = parseLanguageTag(
          corpusTag,
          false
        );
        if (langSubTag !== corpusTag) {
          await db.doc(`languages/${langSubTag}/segments/${segmentId}`)
            .delete();
        }
      } catch (err) {
        throw new functions.https.HttpsError(
          "unknown",
          err
        );
      }
      return {
        segment: `users/${uid}/corpora/${corpusTag}/${segmentId}`,
        deleted: true,
      };
    });

export {
  postSegmentInPersonalCorpus,
  deleteSegmentInPersonalCorpus,
};
