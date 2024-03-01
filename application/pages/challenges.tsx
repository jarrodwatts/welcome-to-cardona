import { Button } from "@/components/ui/button";
import type { NextPage } from "next";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/router";
import { useSDK } from "@thirdweb-dev/react";
import Link from 'next/link'

const NoSSRCounter = dynamic(() => import("../components/CountdownTimer"), {
  ssr: false,
});

const Home: NextPage = () => {
  const router = useRouter();
  const sdk = useSDK();
  const [toggleVideo, setToggleVideo] = useState<boolean>(false);

  return (
    <div className="container mx-auto max-w-[1440px] bg-white/5 rounded-3xl p-18 relative overflow-hidden mt-24 min-h-[620px] p-6 sm:p-12 md:p-20">
      {/* Gradient 1 */}
      <img
        src="/gradient1.webp"
        className="absolute top-0 left-[-18%] w-full h-full -z-10"
      />

      {/* Gradient 2 */}
      <img
        src="/gradient2.webp"
        className="absolute top-0 left-[13%] w-full h-full -z-10"
      />

      {/* Content */}
      <div className="mx-auto flex flex-col sm:flex-row pl-4 w-full min-w-[50%]">
        <div className="flex flex-col items-center">
          <h1 className="text-[3rem] font-medium text-center leading-none">
            Polygon @ ETH Denver
          </h1>
          <p className="text-2xl text-center mt-6">
            Hack smart contracts to win prizes. Good luck!
            To win, submit a working Github example of the exploit.
          </p>

          <Separator className="my-6" />

          <h2 className="text-[2.675rem] leading-none">Challenges</h2>

          <div className="flex flex-col md:flex-row flex-wrap mt-6 w-full sm:w-3/4 gap-2 items-center justify-center">
            <div className="flex flex-col w-full sm:w-[48%] backdrop-blur-[8px] bg-white/5 border border-white/10 rounded-xl p-6 relative transition-colors duration-300 ease-in-out">
              <h3 className="text-xl font-medium">Effective Altruist</h3>
              <p className="text-[#adabb2] mt-2">
                A yield optimization protocol is launching a new vault that allows users to deposit crvUSD and earn rewards. You happen to follow the deployer address of that protocol, and so you're the first one who has access to that new vault. You have a balance of 10 crvUSD. Alice will deposit 10,000 crvUSD, after you've already had the chance to interact with the vault. She expects to get 10,000 shares. Pass the challange by rugging Alice's deposit, so that she gets less than 10,000 shares.
              </p>
              <Link href="https://github.com/teeolendo/EthDenverCTFs/tree/main/src/effective-altruist" rel="noopener noreferrer">
                <Button variant="default" className="mt-4">
                  View Challenge 1 Contract
                </Button>
              </Link>
            </div>

            <div className="flex flex-col w-full sm:w-[48%] backdrop-blur-[8px] bg-white/5 border border-white/10 rounded-xl p-6 relative transition-colors duration-300 ease-in-out">
              <h3 className="text-xl font-medium">Honest Farmer</h3>
              <p className="text-[#adabb2] mt-2">
                There’s a lending pool where users can borrow WETH Tokens. To do so, they first need to deposit twice the borrow amount in Balancer B-33WETH-33WBTC-33USDC LP tokens as collateral. The pool currently has 10 WETH in liquidity, supplied by honest farmers.
                Pass the challenge by emptying the lending pool and earning more than 5 WETH.
              </p>
              <Link target="_blank" href="https://github.com/teeolendo/EthDenverCTFs/tree/main/src/honest-farmer" rel="noopener noreferrer">
                <Button variant="default" className="mt-4">
                  View Challenge 2 Contract
                </Button>
              </Link>
            </div>
            <div className="flex flex-col w-full sm:w-[48%] backdrop-blur-[8px] bg-white/5 border border-white/10 rounded-xl p-6 relative transition-colors duration-300 ease-in-out">
              <h3 className="text-xl font-medium">Honest Farmer v2</h3>
              <p className="text-[#adabb2] mt-2">
                The devs of the previous pool seem to have learned the lesson. And released a new version! Now they’re using a simpler collateral token - ETH. That should be enough.
                Users can now borrow a stablecoin - crvUSD. To do so, they first need to deposit twice the borrow amount in ETH as collateral. Click the button below to find out more.
              </p>
              <Link target="_blank" href="https://github.com/teeolendo/EthDenverCTFs/tree/main/src/honest-farmer-v2" rel="noopener noreferrer">
                <Button variant="default" className="mt-4">
                  View Challenge 3 Contract
                </Button>
              </Link>
            </div>

            <div className="flex flex-col w-full sm:w-[48%] backdrop-blur-[8px] bg-white/5 border border-white/10 rounded-xl p-6 relative transition-colors duration-300 ease-in-out">
              <h3 className="text-xl font-medium">Quick Earner</h3>
              <p className="text-[#adabb2] mt-2">
                There’s an ERC4626 vault where users can deposit WETH and earn auto-compounded yield. Some users already deposited in The Vault, and it currently has 50 ETH of unclaimed rewards.
                Anyone can claim the pending ETH rewards, for a bounty of 5%. You don't have any ETH. Pass the challenge by claiming >90% of the rewards.
              </p>
              <Link target="_blank" href="https://github.com/teeolendo/EthDenverCTFs/tree/main/src/quick-earner" rel="noopener noreferrer">
                <Button variant="default" className="mt-4">
                  View Challenge 4 Contract
                </Button>
              </Link>
            </div>
          </div>

          <Separator className="my-6" />

          <h2 className="text-[2.675rem] leading-none mt-4">Stages</h2>

          <div className="flex flex-col md:flex-row mt-6">
            <div className="max-w-sm mr-4 rounded overflow-hidden shadow-lg">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  1. Create or Join a Team
                </div>
                <p className="text-gray-300 text-xl">
                  From the 25th of February, you'll be able to create or join a
                  team. You can do it solo or with a team of up to 4 people. You
                  can partner with anyone you like, doesn't have to be the folks
                  that you're working with on your main project.
                </p>
                <p className="text-gray-300 mt-4 text-xl">
                  We'll also give you a primer on the transaction lifecycle of a
                  zkEVM transaction.
                </p>
              </div>
            </div>
            <div className="max-w-sm mr-4 rounded overflow-hidden shadow-lg">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  2. Bridge from the zkEVM
                </div>
                <p className="text-gray-300 text-xl">
                  If you're a part of a team, then you'll be able mint our
                  special Cardona dummy token which you'll have to bridge to
                  Sepolia to complete this stage. You'll have loads of time to
                  do this so don't worry.
                </p>
                <p className="text-gray-300 mt-4 text-xl">
                  We'll also give you a primer on how our bridge works and how
                  it fits into the Aggregration layer that we are building.
                </p>
              </div>
            </div>
            <div className="max-w-sm mr-4 rounded overflow-hidden shadow-lg">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  3. Hack a Smart Contract
                </div>
                <p className="text-gray-300 text-xl">
                  On February 29th, at 12:00:00 AM, every team will get to pick
                  one of four smart contracts to hack. You'll need to bring your
                  A-game. Winners will get $2500 USDC per smart contract and the
                  chance to get 15 mins with either Jordi or Sandeep.
                </p>
                <p className="text-gray-300 mt-4 text-xl">
                  {" "}
                  Pro-tip: They won't be easy.{" "}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-4 mt-10">
            <Button
              variant="default"
              onClick={() => setToggleVideo(!toggleVideo)}
            >
              Show me a cool video while I wait
            </Button>

            <Button
              variant="secondary"
              onClick={() => router.push(`/transaction-lifecycle`)}
            >
              Learn about Polygon zkEVM
            </Button>
          </div>

          {toggleVideo && (
            <div className="mt-6">
              <video
                width="1280"
                height="720"
                controls
                preload="metadata"
                autoPlay
                muted
              >
                <source src="/agglayer-compressed.mp4" type="video/mp4" />
              </video>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
