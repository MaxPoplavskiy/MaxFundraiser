import { useCallback } from "react";
import { RpcError } from "viem";
import { hardhat, sepolia } from "viem/chains";
import { useAccount } from "wagmi";

const { VITE_MODE } = import.meta.env;

type Return = {
  switchToDefaultChain: () => void;
};
export const useSwitchToDefaultChain = (): Return => {
  const { chain } = useAccount();

  const switchToDefaultChain = useCallback(async () => {
    const useChain = VITE_MODE === 'DEV' ? {
      id: hardhat.id,
      chainId: "0x7A69",
      chainName: sepolia.name
    } : {
      id: sepolia.id,
      chainId: "0xAA36A7",
      chainName: sepolia.name
    }
    if (chain?.id === useChain.id) return;
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: useChain.chainId,
          },
        ],
      });
    } catch (error: unknown) {
      if (error instanceof RpcError && error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: useChain.chainId,
                chainName: sepolia.name,
                nativeCurrency: {
                  name: "ETH",
                  symbol: "ETH",
                  decimals: 18,
                },
                rpcUrls: ["https://rpc.sepolia.org"],
              },
            ],
          });
        } catch (addError) {
          console.error(addError);
        }
      }
    }
  }, [chain]);

  return {
    switchToDefaultChain,
  };
};
