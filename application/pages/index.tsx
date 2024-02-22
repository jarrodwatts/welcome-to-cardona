import {
  ConnectWallet,
  ThirdwebNftMedia,
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
  useNFT,
} from "@thirdweb-dev/react";
import { nftContract, teamManagerContract } from "../const/contracts";
import { Button } from "@/components/ui/button";
import type { NextPage } from "next";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { formatError } from "@/lib/errorFormatter";
import Link from "next/link";
import { CHAIN } from "../const/chains";

const Home: NextPage = () => {
  // Form state - empty, join team, create team
  const [formState, setFormState] = useState<"default" | "join" | "create">(
    "default"
  );

  // Toaster hook
  const { toast } = useToast();

  // Team name state
  const [teamName, setTeamName] = useState<string>("");

  // Read wallet information
  const address = useAddress();

  // Connect to smart contracts
  const { contract: ticketNfts } = useContract(nftContract, "custom");
  const { contract: teamManager } = useContract(teamManagerContract, "custom");

  // Read NFT metadata
  const { data: nftMetadata, isLoading: loadingNftMetadata } = useNFT(
    ticketNfts,
    0
  );

  // Read user's team (if any)
  const { data: userTeam, isLoading: loadingTeam } = useContractRead(
    teamManager,
    "getUserTeam",
    [address]
  );

  console.log(userTeam, "userTeam");

  return (
    <div className="max-w-[1440px] bg-white/5 rounded-3xl p-18 relative overflow-hidden mt-24 mx-[2.5rem] min-h-[620px] p-6 sm:p-12 md:p-20">
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
      <div className="mx-auto flex flex-col sm:flex-row pl-4 items-center justify-between gap-8 w-full min-w-[50%]">
        <div className="flex flex-col">
          <h1 className="text-[2.675rem] font-medium leading-none">
            Polygon @ ETH Denver
          </h1>

          <p className="font-lg text-[#adabb2] mt-6">
            Welcome to ETH Denver, anon.
          </p>

          <p className="font-lg text-[#adabb2] mt-6">
            On February 29th, at 12:00:00, we'll open a series of{" "}
            <strong>4 challenges</strong>.
          </p>

          <p className="font-lg text-[#adabb2] mt-6">
            In teams, you will have 24 hours to solve each challenge.
          </p>

          <p className="font-lg text-[#adabb2] mt-6">
            To play, you&rsquo;ll need to either <strong>create</strong> or{" "}
            <strong>join</strong> a team.
          </p>

          <p className="font-lg text-[#adabb2] mt-6 mb-6">
            Start by connecting your wallet below.
          </p>

          <ConnectWallet style={{ maxWidth: "596px" }} switchToActiveChain />
        </div>

        <div className="flex flex-col sm:ml-16 w-full sm:w-1/2 min-h-[140px] backdrop-blur-[8px] bg-white/5 border border-white/10 rounded-xl p-6 relative transition-colors duration-300 ease-in-out">
          {/* User hasn't conented wallet */}
          {!address && <></>}

          {/* User has connected wallet + team information is loading */}
          {address && loadingTeam && (
            <p className="font-lg text-[#adabb2] mt-6">Loading team info...</p>
          )}

          {/* User has connected wallet + has not joined a team yet. */}
          {address && !loadingTeam && !userTeam && (
            <div className="flex flex-col">
              <h2 className="text-[1.5rem] font-medium leading-none">
                Join A Team! 👨‍👩‍👧‍👦
              </h2>

              <p className="font-lg text-[#adabb2] mt-4">
                You aren&rsquo;t in a team yet. Join a team to start playing.
              </p>

              {/* Has not selected an option yet */}
              {formState === "default" && (
                <div className="flex flex-row gap-4 mt-4">
                  <Button
                    variant="default"
                    onClick={() => setFormState("join")}
                  >
                    Join a Team
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setFormState("create")}
                  >
                    Create a team
                  </Button>
                </div>
              )}

              {/* Join a team */}
              {formState === "join" && (
                <div className="flex flex-col gap-4 mt-4">
                  <p className="font-lg text-[#adabb2]">
                    Enter the team name to join:
                  </p>

                  <div className="flex flex-row gap-4">
                    <Input
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="Team Name"
                    />

                    <Web3Button
                      contractAddress={teamManagerContract}
                      action={(contract) =>
                        contract.call("joinTeam", [teamName])
                      }
                      onSuccess={() => {
                        toast({
                          title: "Joined team successfully!",
                        });
                        setTeamName("");
                        setFormState("default");
                      }}
                      onError={(error) => {
                        console.log("WTF:", error);
                        toast({
                          title: "Error joining team",
                          description: formatError(error.message),
                          variant: "destructive",
                        });
                      }}
                      style={{ height: 30 }}
                    >
                      Join Team
                    </Web3Button>
                  </div>

                  <Button
                    className="rounded-xl h-4 w-2"
                    variant={"ghost"}
                    onClick={() => setFormState("default")}
                  >
                    &larr;
                  </Button>
                </div>
              )}

              {/* Create a team */}
              {formState === "create" && (
                <div className="flex flex-col gap-4 mt-4">
                  <p className="font-lg text-[#adabb2]">
                    Enter the team name to create:
                  </p>

                  <div className="flex flex-row gap-4">
                    <Input
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="Team Name"
                    />

                    <Web3Button
                      contractAddress={teamManagerContract}
                      action={(contract) =>
                        contract.call("createTeam", [teamName])
                      }
                      onSuccess={() => {
                        toast({
                          title: "Created team successfully!",
                          description:
                            "You are now the leader of your team. Invite others to join!",
                        });
                        setTeamName("");
                        setFormState("default");
                      }}
                      onError={(error) => {
                        toast({
                          title: "Error creating team",
                          description: formatError(error.message),
                          variant: "destructive",
                        });
                      }}
                      style={{ height: 30 }}
                    >
                      Create Team
                    </Web3Button>
                  </div>

                  <Button
                    className="rounded-xl h-4 w-2"
                    variant={"ghost"}
                    onClick={() => setFormState("default")}
                  >
                    &larr;
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* User has connected wallet + has joined a team */}
          {address && !loadingTeam && userTeam && (
            <div className="flex flex-col">
              <h2 className="text-[1.5rem] font-medium leading-none">
                Team {userTeam} 🏆
              </h2>

              <p className="font-lg text-[#adabb2] mt-4">
                You are part of team <strong>{userTeam}</strong>. Good luck!
              </p>

              {nftMetadata && (
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <ThirdwebNftMedia
                    metadata={nftMetadata.metadata}
                    style={{
                      maxWidth: 256,
                      borderRadius: 64,
                      padding: 8,
                    }}
                  />

                  <div className="flex flex-col gap-2 mt-6">
                    <h4 className="text-[1.15rem] font-medium leading-none">
                      NFT Ticket Minted!
                    </h4>

                    <p className="font-medium text-sm text-[#adabb2]">
                      Here&rsquo;s your NFT to grant access to the challenges.
                      <strong> Come and show us at the booth!</strong>
                    </p>

                    <hr />

                    <p className="font-medium text-sm text-[#adabb2]">
                      <strong>Team Name:</strong> {userTeam}
                    </p>

                    <p className="font-medium text-sm text-[#adabb2]">
                      <strong>Token ID:</strong> {nftMetadata.metadata.id}
                    </p>

                    <Link
                      href={`${CHAIN.explorers[0].url}/nft/${nftContract}/${nftMetadata.metadata.id}`}
                      className="font-medium text-sm text-[#adabb2] underline"
                    >
                      View on {CHAIN.explorers[0].name} ↗
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
