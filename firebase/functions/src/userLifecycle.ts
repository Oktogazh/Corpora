import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
const db = admin.firestore();


const handleUserDeletion = functions.auth.user().onDelete((user) => {
  const { displayName } = user;
  if (typeof displayName === "string" && displayName.length > 0) {
    db.collection("unique_usernames").doc(displayName).delete();
  }
});

export {
  handleUserDeletion,
};
