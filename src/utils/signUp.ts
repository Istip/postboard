import { auth } from "./firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default async function signUp() {
  const provider = new GoogleAuthProvider();

  await signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
    })
    .catch((error: Error) => {
      console.log(error.message);
    });
}
