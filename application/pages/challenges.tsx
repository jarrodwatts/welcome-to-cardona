import { Button } from "@/components/ui/button";
import type { NextPage } from "next";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/router";
import { useSDK } from "@thirdweb-dev/react";
import { cardonaPointsContract } from "../const/contracts";

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
          </p>

          <Separator className="my-6" />

          <h2 className="text-[2.675rem] leading-none">Challenges</h2>

          <div className="flex flex-col md:flex-row flex-wrap mt-6 w-full sm:w-3/4 gap-2 items-center justify-center">
            <div className="flex flex-col w-full sm:w-[48%] backdrop-blur-[8px] bg-white/5 border border-white/10 rounded-xl p-6 relative transition-colors duration-300 ease-in-out">
              <h3 className="text-xl font-medium">Yield Optimizer Vault</h3>
              <p className="text-[#adabb2] mt-2">
                Recover funds from a yield optimization protocol.
              </p>
              <Button variant="default" className="mt-4">
                Start Hacking
              </Button>
            </div>

            <div className="flex flex-col w-full sm:w-[48%] backdrop-blur-[8px] bg-white/5 border border-white/10 rounded-xl p-6 relative transition-colors duration-300 ease-in-out">
              <h3 className="text-xl font-medium">ERC4626 Vault</h3>
              <p className="text-[#adabb2] mt-2">
                Claim funds from a compromised ERC4626 vault.
              </p>
              <Button variant="default" className="mt-4">
                Start Hacking
              </Button>
            </div>

            <div className="flex flex-col w-full sm:w-[48%] backdrop-blur-[8px] bg-white/5 border border-white/10 rounded-xl p-6 relative transition-colors duration-300 ease-in-out">
              <h3 className="text-xl font-medium">Lending Pool #1</h3>
              <p className="text-[#adabb2] mt-2">
                Empty a compromised lending pool.
              </p>
              <Button variant="default" className="mt-4">
                Start Hacking
              </Button>
            </div>

            <div className="flex flex-col w-full sm:w-[48%] backdrop-blur-[8px] bg-white/5 border border-white/10 rounded-xl p-6 relative transition-colors duration-300 ease-in-out">
              <h3 className="text-xl font-medium">Lending Pool #2</h3>
              <p className="text-[#adabb2] mt-2">Avoid getting liquidated.</p>
              <Button variant="default" className="mt-4">
                Start Hacking
              </Button>
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
