"use client";

import { useState, useEffect } from "react";

export function useLoadingScreen() {
    const [showLoading, setShowLoading] = useState(true);
    const [isLoadingComplete, setIsLoadingComplete] = useState(false);

    const handleLoadingComplete = () => {
        setShowLoading(false);
        setIsLoadingComplete(true);
    };

    return {
        showLoading,
        isLoadingComplete,
        handleLoadingComplete,
    };
}
