"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { createWalletClient, http, publicActions } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { polygonAmoy } from "viem/chains";

interface WalletContextType {
    address: `0x${string}` | null;
    isConnected: boolean;
    connect: (privateKey: string) => void;
    disconnect: () => void;
    walletClient: ReturnType<typeof createWalletClient> | null;
}

const WalletContext = createContext<WalletContextType | null>(null);

export function WalletProvider({ children }: { children: ReactNode }) {
    const [address, setAddress] = useState<`0x${string}` | null>(null);
    const [walletClient, setWalletClient] = useState<ReturnType<typeof createWalletClient> | null>(null);

    const connect = useCallback((privateKey: string) => {
        try {
            // Ensure private key has 0x prefix
            const formattedKey = privateKey.startsWith("0x") ? privateKey : `0x${privateKey}`;
            const account = privateKeyToAccount(formattedKey as `0x${string}`);

            const client = createWalletClient({
                account,
                chain: polygonAmoy,
                transport: http(),
            }).extend(publicActions);

            setAddress(account.address);
            setWalletClient(client as ReturnType<typeof createWalletClient>);

            // Store in localStorage for persistence
            if (typeof window !== "undefined") {
                localStorage.setItem("wallet_connected", "true");
                localStorage.setItem("wallet_address", account.address);
            }
        } catch (error) {
            console.error("Failed to connect wallet:", error);
            throw error;
        }
    }, []);

    const disconnect = useCallback(() => {
        setAddress(null);
        setWalletClient(null);
        if (typeof window !== "undefined") {
            localStorage.removeItem("wallet_connected");
            localStorage.removeItem("wallet_address");
        }
    }, []);

    return (
        <WalletContext.Provider value={{ address, isConnected: !!address, connect, disconnect, walletClient }}>
            {children}
        </WalletContext.Provider>
    );
}

export function useWallet() {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error("useWallet must be used within a WalletProvider");
    }
    return context;
}
