"use client";

import api from "@/lib/api";
import { auth } from "@/lib/firebaseConfig";
import { onAuthStateChanged } from "@firebase/auth";
import { isAxiosError, AxiosError } from "axios";
import { toast } from "sonner";
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
          const axiosErr = error as AxiosError;
          const status = axiosErr.response?.status;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const respData: any = axiosErr.response?.data;
          const message =
            respData?.message ?? String(axiosErr.message ?? axiosErr);
          toast.error(message);
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
