import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
const db = admin.firestore();


/* const handleUserCreation = functions
  .region("europe-west1")
  .auth
  .user()
  .onCreate(async (user) => {
  }); */

const handleUserDeletion = functions
  .region("europe-west1")
  .auth
  .user()
  .onDelete(async (user) => {
    const { displayName } = user;
    if (typeof displayName === "string" && displayName.length > 0) {
      await db.collection("unique_usernames").doc(displayName).delete();
    }
  });

export {
  handleUserDeletion,
};
