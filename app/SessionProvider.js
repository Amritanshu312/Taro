"use client";
import { SessionProvider } from "next-auth/react";
import { ProgressProvider } from '@bprogress/next/app';
import { useEffect } from "react";
import { toast } from 'react-toastify';


export function AuthProvider({ children, session }) {

  useEffect(() => {
    // Only run this effect in the browser
    if (typeof window !== 'undefined') {
      const hasToastShown = sessionStorage.getItem('toastShown');

      if (!hasToastShown && session?.user) {
        toast.success(`Welcome Back, ${session.user.name}! You are currently logged in. Enjoy your time with us.`);
        sessionStorage.setItem('toastShown', 'true');
      }
    }
  }, [session]);

  return (
    <SessionProvider session={session}>
      <ProgressProvider
        height="3px"
        color="#e26bbd"
        options={{ showSpinner: true }}
        shallowRouting
      >
        {children}
      </ProgressProvider>
    </SessionProvider>
  );
}