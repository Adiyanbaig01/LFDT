"use client";

import { motion, AnimatePresence } from "framer-motion";
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
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9999]"
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
                        className="z-[10000] -translate-x-1/2 -translate-y-1/2"
                    >
                        <div className="relative border border-[#3182ce]/60 bg-[#0f1419]/90 backdrop-blur-md p-8 w-[380px] shadow-2xl rounded-xl">
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
