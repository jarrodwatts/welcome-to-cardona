import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

const TransactionLifeCyclePage: NextPage = () => {
  const router = useRouter();

  const info = [
    {
      content: (
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-medium leading-none mb-2">
            Step 1: Submission
          </h1>

          <p className="text-md text-balance">
            Just like Ethereum or any other EVM chain, when using the Polygon
            zkEVM, you submit your transactions via JSON-RPC interface
            (typically through wallets like MetaMask).
          </p>

          <p className="text-md text-balance mt-2">
            The transactions then go into pending transactions pool, where they
            await the sequencer&rsquo;s selection for execution or discard.
          </p>

          <Button
            onClick={() => {
              handleSwitchPhase(2);
            }}
            className="absolute bottom-6 right-6"
          >
            &rarr;
          </Button>
        </div>
      ),
    },
    {
      content: (
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-medium leading-none mb-2">
            Step 2: Execution
          </h1>

          <p className="text-md text-balance">
            The sequencer reads transactions from the pending transaction pool,
            and decides whether to execute or discard them based on some quick
            checks.
          </p>

          <p className="text-md text-balance mt-2">
            Once executed, the updated L2 state is broadcast to all other zkEVM
            nodes via a broadcast service.
          </p>

          <p className="text-md text-balance mt-2">
            This all happens in a matter of seconds, and we reach a "trusted"
            state of finality at the L2 level.
          </p>

          <Button
            onClick={() => {
              handleSwitchPhase(1);
            }}
            className="absolute bottom-6 left-6"
            variant={"secondary"}
          >
            &larr;
          </Button>

          <Button
            onClick={() => {
              handleSwitchPhase(3);
            }}
            className="absolute bottom-6 right-6"
          >
            &rarr;
          </Button>
        </div>
      ),
    },

    {
      content: (
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-medium leading-none mb-2">
            Step 3: Batching
          </h1>

          <p className="text-md text-balance">
            Next, the sequencer sends all of the transaction data down to
            Ethereum in the form of batches.
          </p>

          <p className="text-md text-balance mt-2">
            It batches transactions together and serializes them using the RLP
            (recursive-length prefix) standard to send these transactions in the
            form of bytes.
          </p>

          <Button
            onClick={() => {
              handleSwitchPhase(2);
            }}
            className="absolute bottom-6 left-6"
            variant={"secondary"}
          >
            &larr;
          </Button>

          <Button
            onClick={() => {
              handleSwitchPhase(4);
            }}
            className="absolute bottom-6 right-6"
          >
            &rarr;
          </Button>
        </div>
      ),
    },

    {
      content: (
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-medium leading-none mb-2">
            Step 4: Sequencing
          </h1>

          <p className="text-md text-balance mt-2">
            Once the batches are created, the sequencer calls a function
            "sequencebatches" on a "PolygonZkEvm" rollup smart contract deployed
            to Ethereum, and provides the serialized bathces of transactions as
            an argument.
          </p>

          <Button
            onClick={() => {
              handleSwitchPhase(3);
            }}
            className="absolute bottom-6 left-6"
            variant={"secondary"}
          >
            &larr;
          </Button>

          <Button
            onClick={() => {
              handleSwitchPhase(5);
            }}
            className="absolute bottom-6 right-6"
          >
            &rarr;
          </Button>
        </div>
      ),
    },

    {
      content: (
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-medium leading-none mb-2">
            Step 5: Aggregating
          </h1>

          <p className="text-md text-balance mt-2">
            Once the batches arrive to the rollup smart contract, a
            zero-knowledge proof is generated and verified to ensure the
            validity of the batches received.
          </p>

          <p className="text-md text-balance mt-2">
            This way, the Ethereum network is the environment where ZK proofs
            are verified, and users can trust Ethereum to enforce the validity
            of the transactions that occurred on the L2.
          </p>

          <Button
            onClick={() => {
              handleSwitchPhase(4);
            }}
            className="absolute bottom-6 left-6"
            variant={"secondary"}
          >
            &larr;
          </Button>

          <Button
            onClick={() => {
              router.push(`/`);
            }}
            className="absolute bottom-6 right-6"
          >
            Awesome!
          </Button>
        </div>
      ),
    },
  ];

  const [stage, setStage] = useState(1);

  const handleSwitchPhase = (stage: number) => {
    const formContainer = document.getElementById("form-container");
    if (formContainer) {
      // Apply a negative translation to slide to the left
      formContainer.style.transform = "translateX(-100%)";
      formContainer.style.opacity = "0";
      setTimeout(() => {
        setStage(stage);
        // Remove the translation to reset for the next stage
        formContainer.style.transform = "translateX(0)";
        formContainer.style.opacity = "1";
      }, 200); // Short delay to allow the initial slide out before switching content
    }
  };

  return (
    <>
      <div className="flex flex-col items-center mt-24">
        <img
          src="/gradient2.webp"
          className="absolute top-0 left-0 w-full h-full -z-10 transform rotate-180"
        />

        <h1 className="text-4xl font-medium leading-none inline-block z-10 relative text-center">
          Polygon zkEVM Transaction Lifecycle
        </h1>

        <p className="text-xl text-[#adabb2] text-center mt-6">
          How does a transaction <i>really</i> work on Polygon zkEVM?
        </p>

        <Separator className="my-6 w-1/2" />
      </div>

      <div className="flex flex-col items-center justify-center w-full">
        <div
          id="form-container"
          className="transition-all ease-in-out duration-500 w-3/4"
        >
          <div className="container mx-auto max-w-[1440px] bg-white/5 rounded-3xl p-18 relative overflow-hidden min-h-[420px] p-6 sm:p-12 md:p-20">
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

            <div>{info[stage - 1].content}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionLifeCyclePage;
