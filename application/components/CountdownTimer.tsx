import { ConnectWallet } from "@thirdweb-dev/react";
import React from "react";
import Countdown from "react-countdown";

export default function CountdownTimer() {
  return (
    <Countdown
      className="text-6xl mt-4"
      date={new Date("February 24, 2024 23:59:59")}
    >
      <ConnectWallet style={{ maxWidth: "596px" }} switchToActiveChain />
    </Countdown>
  );
}
