"use client";

import api from "@/lib/api";
import { auth } from "@/lib/firebaseConfig";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useVerifyUser = () => {
  const router = useRouter();
  useEffect(() => {
    const verifyUser = async () => {
      try {
        await api.get("/user/verify");
      } catch (error) {
        if (isAxiosError(error)) {
          const status = error.response?.status;
          switch (status) {
            case 401:
              await auth.signOut();
              router.replace("/forbidden");
              break;
            case 403:
              await auth.signOut();
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
};
