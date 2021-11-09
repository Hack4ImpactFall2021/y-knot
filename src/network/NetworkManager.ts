import { AuthError, User } from "@firebase/auth";
import { getAuth } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import app from "../config/firebase";

export enum Endpoints{
    AuthenticateUser, 
}

class NetworkManger {
    
    // singleton instance of network manager
    private static instance: NetworkManger;

    // returns singleton instance of network manager
    public static getInstance(): NetworkManger {
        if (!NetworkManger.instance) {
            NetworkManger.instance = new NetworkManger();
        }
        return NetworkManger.instance;
    }

    public async makeRequest (endpoint: Endpoints, params?: any) {
        switch (endpoint){
          case Endpoints.AuthenticateUser:
            return this.authenticateUser(params.email, params.password)
        }

    }

    // signs in user using email and password
    // email: email address
    // password: password
    private authenticateUser(email: string, password: string): Promise<User> {
      return new Promise((resolve, reject) => {
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          resolve(userCredential.user)
        })
        .catch((error: AuthError) => {    
          reject(error);
        });
      })
  
    }

}

export default NetworkManger.getInstance();

/*
// create user func
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    console.log("User has been created in Firebase.");
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("An error took place during the user creation: " + errorMessage);

  });


  //sign in func

  import { signInWithEmailAndPassword } from "firebase/auth";



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

  //reset password func
import { sendPasswordResetEmail } from "firebase/auth";

sendPasswordResetEmail(auth, email)
  .then(() => {
    console.log("The reset password email was sent. Please check your email.");
    // Password reset email sent!
    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("There was an error during the password reset: " + errorMessage);
  });


  */