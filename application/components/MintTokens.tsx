import {
  ConnectWallet,
  Web3Button,
  useAddress,
  useContract,
  useTokenBalance,
} from "@thirdweb-dev/react";
import React from "react";
import { cardonaPointsContract } from "../const/contracts";
import { useToast } from "@/components/ui/use-toast";
import { formatError } from "@/lib/errorFormatter";
import { Button } from "./ui/button";
import { useRouter } from "next/router";
import Link from "next/link";

type Props = {};

export default function MintTokens({}: Props) {
  const router = useRouter();
  const { toast } = useToast();

  const address = useAddress();
  const { contract } = useContract(cardonaPointsContract, "token");
  const { data: balance, isLoading: loadingBalance } = useTokenBalance(
    contract,
    address
  );

  // Connect wallet
  if (!address) {
    return (
      <div className="flex flex-col gap-2 animate-fade-in">
        <h2 className="text-[1.5rem] font-medium leading-none">
          Connect Wallet
        </h2>
        <p className="font-lg text-[#adabb2] mt-1">
          Connect your wallet to mint tokens.
        </p>

        <ConnectWallet />
      </div>
    );
  }

  // Loading balance
  if (loadingBalance) {
    return (
      <div className="flex flex-col gap-2 animate-fade-in">
        <h2 className="text-[1.5rem] font-medium leading-none">Loading...</h2>
        <p className="font-lg text-[#adabb2] mt-1">
          Loading your token balance.
        </p>
      </div>
    );
  }

  if (balance?.value.gt(0)) {
    // Bridge tokens
    return (
      <div className="flex flex-col gap-2 animate-fade-in">
        <h2 className="text-[1.5rem] font-medium leading-none">
          Bridge Tokens
        </h2>
        <p className="font-lg text-[#adabb2] mt-1">
          Bridge your tokens back to Ethereum L1.
        </p>

        {/* Button that opens in new tab */}
        <Button
          onClick={() => {
            // Open https://portal.polygon.technology/ in a new tab
            window.open("https://portal.polygon.technology/", "_blank");
          }}
        >
          Bridge Tokens to Sepolia (Ethereum Testnet)
        </Button>

        <Link
          className="text-[#adabb2] text-sm text-left font-semibold underline"
          href="https://youtu.be/BDc_WzLgfDM"
          target="_blank"
        >
          Follow the YouTube tutorial ↗
        </Link>
      </div>
    );
  }

  // Mint tokens
  return (
    <div className="flex flex-col gap-2 transition animate-fade-in">
      <h2 className="text-[1.5rem] font-medium leading-none">Mint Tokens</h2>
      <p className="font-lg text-[#adabb2] mt-1">
        Mint ERC-20 tokens to your wallet.
      </p>

      <Web3Button
        contractAddress={cardonaPointsContract}
        action={(contract) => contract.erc20.mint(69)}
        onSuccess={() =>
          toast({
            title: "Minted 69 $DNVR tokens successfully!",
            description: `Tokens have been minted to your wallet. You are ready to bridge them back to L1!`,
          })
        }
        onError={(error) =>
          toast({
            title: "Error minting tokens",
            description: formatError(error.message),
            variant: "destructive",
          })
        }
      >
        Mint Tokens
      </Web3Button>

      <p className="text-[#adabb2] text-sm text-left">
        Your Balance:{" "}
        {loadingBalance
          ? "Loading..."
          : `${balance?.displayValue} $${balance?.symbol}`}
      </p>
    </div>
  );
}
