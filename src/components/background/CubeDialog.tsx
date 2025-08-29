"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import DecryptedText from "@/components/DecryptedText";

type Props = {
    open: boolean;
    title: string;
    body: string;
    onClose: () => void;
    screenPos: { x: number; y: number } | null;
};

export default function CubeDialog({
    open,
    title,
    body,
    onClose,
    screenPos,
}: Props) {
    return (
        <AnimatePresence>
            {open && screenPos && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[45]"
                        onClick={onClose}
                    />
                    {/* Dialog */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 5 }}
                        transition={{
                            type: "spring",
                            damping: 20,
                            stiffness: 300,
                            duration: 0.4,
                        }}
                        style={{
                            position: "fixed",
                            left: Math.max(
                                200,
                                Math.min(
                                    screenPos.x,
                                    typeof window !== "undefined"
                                        ? window.innerWidth - 200
                                        : screenPos.x
                                )
                            ),
                            top: Math.max(
                                100,
                                Math.min(
                                    screenPos.y,
                                    typeof window !== "undefined"
                                        ? window.innerHeight - 150
                                        : screenPos.y
                                )
                            ),
                        }}
                        className="z-[46] -translate-x-1/2 -translate-y-1/2"
                    >
                        <div className="relative border border-[#3182ce]/60 bg-[#0f1419]/90 backdrop-blur-md p-8 w-[380px] shadow-2xl rounded-xl">
                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Close dialog"
                                className="absolute top-3 right-3 inline-flex items-center justify-center p-2 rounded-md text-white/70 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            >
                                <X className="h-4 w-4" />
                            </button>
                            {title && (
                                <div className="text-lg font-medium text-white/90 mb-4">
                                    {title}
                                </div>
                            )}
                            {body && (
                                <div className="text-base text-white/80 leading-relaxed overflow-hidden">
                                    <DecryptedText
                                        text={body}
                                        speed={Math.max(
                                            20,
                                            Math.min(100, 1200 / body.length)
                                        )}
                                        sequential={true}
                                        revealDirection="start"
                                        useOriginalCharsOnly={true}
                                        animateOn="view"
                                        className="inline-block max-w-full break-words"
                                    />
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
