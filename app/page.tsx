"use client";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { auth } from "@/lib/firebaseConfig";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import api from "@/lib/api";
import { isAxiosError } from "axios";
import { FirebaseError } from "firebase/app";
import Image from "next/image";
import neuLogo from "@/public/neu-logo.png";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isFetchingUser, setIsFetchingUser] = useState(true);

  console.log(isFetchingUser);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User signed in:", user);
        router.push("/employees");
      } else {
        setIsFetchingUser(false);
      }
    });

    return () => unsubscribe(); // cleanup listener on unmount
  }, [router]);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const credentials = await signInWithPopup(auth, provider);
      const user = credentials.user;
      const token = await user.getIdToken();
      const verifyResponse = await api.get("/user/verify");
      console.log(verifyResponse.data.user);

      localStorage.setItem("token", token);
      router.replace("/employees");
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        if (error.response.status === 403) {
          await auth.signOut();
          localStorage.removeItem("token");
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
      <h1 className="text-4xl font-semibold text-center">
        Welcome to NEUQueue
      </h1>
      <p className="text-center">
        NEUQUEUE brings smart queuing to New Era University Say goodbye to long
        lines.{" "}
      </p>
      {!isFetchingUser && (
        <Button
          onClick={async () => await handleLogin()}
          variant="outline"
          className="w-full max-w-xs flex items-center justify-center gap-2 border border-gray-300 bg-white hover:bg-gray-100 mt-10"
        >
          <span className="text-sm font-medium text-gray-700">
            Continue with Google
          </span>
          <FaGoogle />
        </Button>
      )}
    </div>
  );
}
