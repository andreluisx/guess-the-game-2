"use client"
import { ThemeContext } from "../context/themeContext";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative">
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[url('/images/kratos.jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-black/80" />
        </div>

        <QueryClientProvider client={queryClient}>
          <ThemeContext>{children}</ThemeContext>
        </QueryClientProvider>
      </body>
    </html>
  );
}