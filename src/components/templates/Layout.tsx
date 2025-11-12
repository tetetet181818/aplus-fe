"use client";
import React from "react";
import Navbar from "../molecules/navbar/Navbar";
import Footer from "../molecules/footer/Footer";
import { Toaster } from "../ui/sonner";
import useNotifications from "@/hooks/useNotifications";
import { User } from "@/types";

export default function Layout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User;
}) {
  useNotifications();
  return (
    <>
      <Navbar user={user} />
      <main className="min-h-screen">{children}</main>
      <Toaster richColors position="top-right" />
      <Footer />
    </>
  );
}
