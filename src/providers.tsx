import { type ReactNode } from "react";
import { MidenProvider } from "@miden-sdk/react";
import { MidenFiSignerProvider } from "@miden-sdk/miden-wallet-adapter-react";
import { WalletAdapterNetwork } from "@miden-sdk/miden-wallet-adapter-base";
import { APP_NAME, MIDEN_RPC_URL, MIDEN_PROVER } from "@/config";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <MidenFiSignerProvider
      appName={APP_NAME}
      network={WalletAdapterNetwork.Testnet}
      autoConnect={true}
    >
      <MidenProvider
        config={{ rpcUrl: MIDEN_RPC_URL, prover: MIDEN_PROVER }}
        loadingComponent={
          <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mx-auto">
                <span className="text-white font-bold">S</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">ShadowPay</p>
                <p className="text-zinc-500 text-xs mt-1">Loading Miden client...</p>
              </div>
              <div className="flex items-center justify-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </div>
          </div>
        }
      >
        {children}
      </MidenProvider>
    </MidenFiSignerProvider>
  );
}