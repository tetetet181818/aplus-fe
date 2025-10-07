"use client";
import React from "react";
import Navbar from "../molecules/navbar/Navbar";
import Footer from "../molecules/footer/Footer";
import { Toaster } from "../ui/sonner";
import useNotifications from "@/hooks/useNotifications";
import useAuth from "@/hooks/useAuth";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  useNotifications(user?._id);
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Toaster richColors position="top-right" />
      <Footer />
    </>
  );
}
