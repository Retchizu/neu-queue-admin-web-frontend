"use client";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { auth } from "@/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import api from "@/lib/api";
import { isAxiosError } from "axios";
import { FirebaseError } from "firebase/app";

export default function Home() {
  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      const verifyResponse = await api.get("/user/verify");
      console.log(verifyResponse.data.user);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        if (error.response.status === 403) {
          await auth.signOut();
        }
        alert(`${error.response.status}, ${error.response.data.message}`);
      } else if ((error as FirebaseError).code === "auth/user-disabled") {
        alert("Your account is disabled. Contact the admin for more info.");
      } else {
        alert((error as Error).message);
      }
    }
  };
  return (
    <div>
      <Button
        onClick={async () => await handleLogin()}
        variant="outline"
        className="w-full flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-100"
      >
        <FaGoogle color="red" />
        <span className="text-sm font-medium text-gray-700">
          Continue with Google
        </span>
      </Button>
    </div>
  );
}
