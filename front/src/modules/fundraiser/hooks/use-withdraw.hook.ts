import { useCallback, useEffect } from "react";
import { Address } from "viem";
import { useReadContract, useWriteContract } from "wagmi";
import { FundraiserAbi } from "../../../common/abi";

type Return = {
  withdraw: () => void;
  canWithdraw: boolean;
};

export const useWithdraw = (address: Address | undefined): Return => {
  const { writeContractAsync } = useWriteContract();
  const { data: canWithdraw, refetch: refetchCanWithdraw } = useReadContract({
    abi: FundraiserAbi,
    address,
    functionName: "canWithdraw",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetchCanWithdraw();
    }, 10000);

    return () => clearInterval(interval);
  }, [refetchCanWithdraw]);

  const withdraw = useCallback(async () => {
    if (!address) return;
    await writeContractAsync({
      abi: FundraiserAbi,
      address,
      functionName: "withdrawFunds",
    });
  }, [address, writeContractAsync]);

  return {
    canWithdraw: canWithdraw as boolean,
    withdraw,
  };
};
