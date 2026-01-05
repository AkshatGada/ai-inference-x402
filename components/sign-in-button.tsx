"use client";

import { useState } from "react";
import { useWallet } from "../lib/wallet";

export function SignInButton() {
  const { address, isConnected, connect, disconnect } = useWallet();
  const [showModal, setShowModal] = useState(false);
  const [privateKey, setPrivateKey] = useState("");
  const [error, setError] = useState("");

  const handleConnect = () => {
    try {
      setError("");
      connect(privateKey);
      setShowModal(false);
      setPrivateKey("");
    } catch {
      setError("Invalid private key");
    }
  };

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-zinc-600 dark:text-zinc-400">
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
        <button
          onClick={disconnect}
          className="px-3 py-1.5 text-sm rounded-lg bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 text-sm font-medium rounded-lg bg-purple-600 text-white hover:bg-purple-700"
      >
        Connect Wallet
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-lg font-semibold mb-4">Connect Wallet</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              Enter your private key to connect. This is stored locally and never sent to any server.
            </p>
            <input
              type="password"
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
              placeholder="Enter private key (with or without 0x)"
              className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent mb-2"
            />
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  setPrivateKey("");
                  setError("");
                }}
                className="flex-1 px-4 py-2 rounded-lg bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700"
              >
                Cancel
              </button>
              <button
                onClick={handleConnect}
                className="flex-1 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
