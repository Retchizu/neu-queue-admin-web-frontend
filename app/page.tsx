"use client";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { auth } from "@/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import api from "@/lib/api";
import { isAxiosError } from "axios";
import { FirebaseError } from "firebase/app";
import Image from "next/image";
import neuLogo from "@/public/neu-logo.png";

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
    <div className="flex items-center justify-center min-h-screen flex-col">
      <Image src={neuLogo} alt="neu-logo" className="h-50 w-50 mb-10" />
      <h1 className="text-4xl font-semibold text-center">Welcome to NEUQueue</h1>
      <p className="text-center">
        NEUQUEUE brings smart queuing to New Era University Say goodbye to long
        lines.{" "}
      </p>
      <Button
        onClick={async () => await handleLogin()}
        variant="outline"
        className="w-full max-w-xs flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 mt-10"
      >
        <FaGoogle color="red" />
        <span className="text-sm font-medium text-gray-700">
          Continue with Google
        </span>
      </Button>
    </div>
  );
}
