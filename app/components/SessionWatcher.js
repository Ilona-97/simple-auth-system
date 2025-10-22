"use client";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

export default function SessionWatcher() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.expires) return;

    const expiresAt = new Date(session.expires).getTime();
    const timeout = expiresAt - Date.now();

    if (timeout > 0) {
      const timer = setTimeout(() => {
        signOut(); 
      }, timeout);

      return () => clearTimeout(timer); 
    }
  }, [session]);

  return null;
}
