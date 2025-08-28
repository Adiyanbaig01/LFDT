import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const rubik = Rubik({
    variable: "--font-rubik",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "PCCoE LFDT Club - Linux Foundation Decentralized Trust",
    description:
        "Official student chapter of the Linux Foundation Decentralized Trust at Pimpri Chinchwad College of Engineering. Exploring blockchain, digital identity, and decentralized systems.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${rubik.variable} antialiased font-rubik`}>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
