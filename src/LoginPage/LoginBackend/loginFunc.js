import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User has been signed in.");
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      console.log("An error took place during login: " + error);
      const errorCode = error.code;
      const errorMessage = error.message;
    });
