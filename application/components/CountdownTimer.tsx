import React from "react";
import Countdown from "react-countdown";
import {
  ConnectWallet,
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import { teamManagerContract } from "../const/contracts";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { formatError } from "@/lib/errorFormatter";
import Link from "next/link";
import router from "next/router";

export default function CountdownTimer() {
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
  const { contract: teamManager } = useContract(teamManagerContract, "custom");

  // Read user's team (if any)
  const { data: userTeam, isLoading: loadingTeam } = useContractRead(
    teamManager,
    "getUserTeam",
    [address]
  );

  return (
    <Countdown
      className="text-6xl mt-4"
      date={new Date("February 24, 2024 23:59:59")}
    >
      <>
        <div className="flex flex-col mt-4 w-full sm:w-1/2 backdrop-blur-[8px] bg-white/5 border border-white/10 rounded-xl p-6 relative transition-colors duration-300 ease-in-out">
          {/* User hasn't conented wallet */}
          {!address && (
            <div className="flex flex-col gap-2">
              <ConnectWallet />
            </div>
          )}

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
                    // Position at bottom right
                    className="rounded-xl h-8 absolute bottom-6 right-6 "
                    variant={"ghost"}
                    onClick={() => setFormState("default")}
                  >
                    &larr; Back
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
                    // Position at bottom right
                    className="rounded-xl h-4 w-2 absolute bottom-6 right-6"
                    variant={"ghost"}
                    onClick={() => setFormState("default")}
                  >
                    &larr;
                  </Button>
                </div>
              )}

              <Link
                href="https://faucet.polygon.technology/"
                target="_blank"
                className="mt-4 underline bold"
              >
                Get some testnet ETH on Polygon Cardona ↗
              </Link>
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
              <p className="font-lg text-[#adabb2] mt-4">
                Transaction lifecycles on the zkEVM are different from Mainnet,
                learn more about it by clicking the button below.
              </p>

              <Button
                variant="default"
                className="mt-4"
                onClick={() => router.push(`/bridge`)}
              >
                Go to Stage 2
              </Button>

              <Button
                variant="outline"
                className="mt-2"
                onClick={() => router.push(`/transaction-lifecycle`)}
              >
                Learn about Tx Lifecycles on Polygon zkEVM
              </Button>
            </div>
          )}
        </div>
      </>
    </Countdown>
  );
}
