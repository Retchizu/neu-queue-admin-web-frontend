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

    return () => unsubscribe(); 
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
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <Image
        src={neuLogo}
        alt="neu-logo"
        className="h-40 w-40 mb-8 select-none"
        priority
      />

      <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Welcome to NEUQueue
      </h1>

      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
        NEUQUEUE brings smart queuing to New Era University. Say goodbye to long
        lines and improve how your campus manages queues.
      </p>

      {!isFetchingUser && (
        <Button
          className="px-6 py-2 rounded-xl bg-primary text-white hover:opacity-90"
          onClick={async () => await handleLogin()}
          variant={"default"}
          size={"lg"}
        >
          <FaGoogle />
          Sign in with Google
        </Button>
      )}

      <p className="text-xs text-gray-400 mt-10">
        © {new Date().getFullYear()} NEUQueue
      </p>
    </div>
  );
}
