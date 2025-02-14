import { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Toaster } from "sonner"; // ✅ Correct Import
import "./globals.css"; 
import Header from "./components/Header";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});



export const metadata: Metadata = {
  title: "Doctor-Appointment Webapp",
  description:
    "It is a doctor appointment app for making our life easy for finding our right treatment",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.className} antialiased leading-8 overflow-x-hidden 
        dark:bg-darkTheme dark:text-white`}
      >
        <Header />
        <main className="flex-grow container mx-auto">{children}</main>

        {/* ✅ Make sure Toaster is here */}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
