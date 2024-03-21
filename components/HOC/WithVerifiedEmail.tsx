"use client";

import { useRedirect } from "@/hooks/useRedirect";
import { useResendVerificationEmailCode } from "@/hooks/useResendVerificationEmailCode";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export function WithVerifiedEmail(Component: any) {
  return function WithVerifiedEmail(props: any) {
    const { user } = useSelector((state: RootState) => state.authUser);
    const _redirect = useRedirect()

    useEffect(() => {
      if (!user.email_verified_at) _redirect("/auth/confirm-email");
    }, []);
    
    if (!user.email_verified_at) null;

    return <Component {...props} />;
  };
}
