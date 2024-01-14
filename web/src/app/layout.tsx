"use client";
import * as React from "react";
import ThemeRegistry from "src/components/ThemeRegistry/ThemeRegistry";
import { AuthProvider } from "src/providers/auth-provider";
import ReactQueryProvider from "src/providers/react-query-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <ReactQueryProvider>
            <AuthProvider>{children}</AuthProvider>
          </ReactQueryProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
