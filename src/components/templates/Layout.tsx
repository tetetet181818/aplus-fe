import React from "react";
import Navbar from "../molecules/navbar/Navbar";
import Footer from "../molecules/footer/Footer";
import { Toaster } from "../ui/sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Toaster richColors position="top-right" />
      <Footer />
    </>
  );
}
