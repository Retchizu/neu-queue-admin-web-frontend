"use client";
import { auth } from "@/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function Home() {
  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <button onClick={async () => await handleLogin()}>
        Sign in with Google
      </button>
    </div>
  );
}
