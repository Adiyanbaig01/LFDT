"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
    onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => {
            const currentTime = video.currentTime;
            const duration = video.duration;

            // Start fade out 300ms (0.3s) before video ends
            if (duration && currentTime >= duration - 0.5 && !isFadingOut) {
                setIsFadingOut(true);

                // Complete the loading after fade animation (500ms)
                fadeTimeoutRef.current = setTimeout(() => {
                    setIsVisible(false);
                    onComplete();
                }, 500);
            }
        };

        const handleVideoEnd = () => {
            // Fallback in case timeupdate doesn't trigger the fade
            if (!isFadingOut) {
                setIsFadingOut(true);
                fadeTimeoutRef.current = setTimeout(() => {
                    setIsVisible(false);
                    onComplete();
                }, 500);
            }
        };

        const handleCanPlay = () => {
            // Ensure video starts playing
            video.play().catch(console.error);
        };

        video.addEventListener("timeupdate", handleTimeUpdate);
        video.addEventListener("ended", handleVideoEnd);
        video.addEventListener("canplay", handleCanPlay);

        return () => {
            video.removeEventListener("timeupdate", handleTimeUpdate);
            video.removeEventListener("ended", handleVideoEnd);
            video.removeEventListener("canplay", handleCanPlay);
            if (fadeTimeoutRef.current) {
                clearTimeout(fadeTimeoutRef.current);
            }
        };
    }, [onComplete, isFadingOut]);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                key="loading-screen"
                initial={{ opacity: 1 }}
                animate={{ opacity: isFadingOut ? 0 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
                style={{
                    width: "100vw",
                    height: "100vh",
                    overflow: "hidden",
                }}
            >
                <video
                    ref={videoRef}
                    className="w-full h-auto max-h-full object-cover"
                    autoPlay
                    muted
                    playsInline
                    preload="auto"
                    style={{
                        maxWidth: "100%",
                        height: "auto",
                        minWidth: "100%",
                    }}
                >
                    <source src="/loading.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </motion.div>
        </AnimatePresence>
    );
}
