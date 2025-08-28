"use client";

import { useEffect, useState } from "react";

const LETTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function useDecrypt(text: string, msPerChar: number = 18) {
    const [out, setOut] = useState("");
    useEffect(() => {
        let frame = 0;
        let raf = 0 as number;
        const len = text.length;
        const totalFrames = Math.max(1, Math.ceil((len * msPerChar) / 16));
        const tick = () => {
            frame++;
            const progress = Math.min(1, frame / totalFrames);
            const shown = Math.floor(progress * len);
            const scrambled = Array.from(text)
                .map((c, i) => {
                    if (i < shown) return c;
                    // Only scramble letters, keep spaces and punctuation
                    if (/[a-zA-Z]/.test(c)) {
                        return LETTERS[(Math.random() * LETTERS.length) | 0];
                    }
                    return c;
                })
                .join("");
            setOut(scrambled);
            if (progress < 1) raf = requestAnimationFrame(tick);
        };
        setOut("");
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [text, msPerChar]);
    return out;
}
