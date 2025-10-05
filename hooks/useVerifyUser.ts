"use client";

import api from "@/lib/api";
import { auth } from "@/lib/firebaseConfig";
import { onAuthStateChanged } from "@firebase/auth";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useVerifyUser = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const verifyUser = async () => {
      try {
        await api.get("/user/verify");
      } catch (error) {
        if (isAxiosError(error)) {
          const status = error.response?.status;
          switch (status) {
            case 401:
            case 403:
              await auth.signOut();
              localStorage.removeItem("token");
              router.replace("/forbidden");
              break;
            case 404:
              router.replace("/global-not-found");
              break;
            case 500:
              router.replace("/global-error");
              break;
            default:
              router.replace("/");
          }
        }
      }
    };
    verifyUser();
  }, [router]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoading(false);
      }
    });

    return () => unsubscribe(); // cleanup listener on unmount
  }, [router]);

  return { isLoading };
};
