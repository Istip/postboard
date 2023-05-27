import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase"; // Assuming you have initialized the Firebase app

export default async function signUp() {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);

    // Access user information from the result
    const { user } = result;
    const { uid, displayName, email, photoURL } = user;

    // Create or replace the user document in Firestore
    await setDoc(doc(db, "users", uid), {
      displayName: displayName || "",
      email: email || "",
      photoURL: photoURL || "",
    });
  } catch (error) {
    console.log(error);
  }
}
