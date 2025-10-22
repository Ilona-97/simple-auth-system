"use client";
import { SessionProvider } from 'next-auth/react';
import SessionWatcher from './components/SessionWatcher';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionProvider>
        <SessionWatcher/>
        <body>{children}</body>
      </SessionProvider>
    </html>
  )
}
