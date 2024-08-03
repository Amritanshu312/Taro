"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { toast } from 'react-toastify';


export function AuthProvider({ children, session }) {

  React.useEffect(() => {
    // Only run this effect in the browser
    if (typeof window !== 'undefined') {
      // Check if the toast has already been shown
      const hasToastShown = sessionStorage.getItem('toastShown');

      if (!hasToastShown && session?.user) {
        // Display the toast
        toast.success(`Welcome Back, ${session.user.name}! You are currently logged in. Enjoy your time with us.`);
        // Set the flag in sessionStorage
        sessionStorage.setItem('toastShown', 'true');
      }
    }
  }, [session]);

  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}