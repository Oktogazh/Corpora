import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
const db = admin.firestore();
import type { SegmentBasis } from "./types";
import {
  parseLanguageTag,
  getTag,
  normalizeLanguageTagCasing,
  getPreferredLanguageTag,
} from "@sozialhelden/ietf-language-tags";


// This function does the following
// normalize the language tag
// publish the segment in the personal corpus
// add a reference to the segment in global normalized tag ref corpus
// if language subtag is not equal to normalizedTag,
//   publish ref to segment in global language subtag ref corpus
//   with attribute 'isCopy' true
const postSegmentInPersonalCorpus = functions
  .https
  .onCall({ region: "europe-west1" },
    async ({ data, auth: { uid } }) => {
      const { languageTag: originalTag, segment } = data as SegmentBasis;
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
      const semanticTag = getTag(normalizedTag);
      let segmentId = "";
      try {
        segmentId = (await db
          .collection(`users/${uid}/corpora/${normalizedTag}/segments`)
          .add({
            segment,
            created: admin.firestore.FieldValue.serverTimestamp(),
          })).id;
        await db.doc(`languages/${normalizedTag}/segments/${segmentId}`)
          .set({
            isCopy: false,
            created: admin.firestore.FieldValue.serverTimestamp(),
          });
        if (preferredLangSubTag !== normalizedTag) {
          functions.logger.log("preferredLangSubTag", preferredLangSubTag);
          await db.doc(`languages/${preferredLangSubTag}/segments/${segmentId}`)
            .set({
              isCopy: true,
              created: admin.firestore.FieldValue.serverTimestamp(),
            });
        }
      } catch (err) {
        throw new functions.https.HttpsError(
          "unknown",
          err
        );
      }
      return {
        normalizedTag,
        semanticTag,
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
