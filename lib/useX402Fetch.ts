"use client";

import { useMemo } from "react";
import { wrapFetchWithPayment } from "x402-fetch";
import { useWallet } from "./wallet";

export function useX402Fetch() {
    const { walletClient, isConnected } = useWallet();

    const fetchWithPayment = useMemo(() => {
        if (!walletClient || !isConnected) {
            return null;
        }

        // Wrap fetch with x402 payment signatures
        return wrapFetchWithPayment(fetch, walletClient as Parameters<typeof wrapFetchWithPayment>[1]);
    }, [walletClient, isConnected]);

    return { fetchWithPayment, isReady: !!fetchWithPayment };
}
