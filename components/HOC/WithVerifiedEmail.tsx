"use client";

import { useResendVerificationEmailCode } from "@/hooks/useResendVerificationEmailCode";
import { RootState } from "@/redux/store";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export function WithVerifiedEmail(Component: any) {
  return function WithVerifiedEmail(props: any) {
    const { user } = useSelector((state: RootState) => state.authUser);

    useEffect(() => {
      if (!user.email_verified_at) redirect("/auth/confirm-email");
    }, []);
    
    if (!user.email_verified_at) null;

    return <Component {...props} />;
  };
}
