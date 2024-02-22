/**
 * Configure your smart contract addresses here.
 * Each smart contract should have two addresses defined:
 *   1. Development address - used for testing purposes
 *   2. Production address - the mainnet smart contract address for when you deploy your application
 */

import { IS_DEV_ENV } from "./chains";

// For example, below, we have a Greeter smart contract that has two addresses defined.
// Then, we use the IS_DEV_ENV variable to determine which address to use in the current environment.
const nft_dev = "0x92705a1A02c45CFD594B2b0551bc0B921b9a1d4A";
const nft_prod = "0x92705a1A02c45CFD594B2b0551bc0B921b9a1d4A";

// Below, we force the typescript type to be of the dev address type.
// This is to ensure thirdweb generate knows what the ABI is when using useContract
// So that we get type-safety when interacting with it's functions.
export const nftContract = IS_DEV_ENV ? nft_dev : (nft_prod as typeof nft_prod); // Here's the type assertion, since we assume the ABIs are the same in dev and prod.

const teamManager_dev = "0x332e358716edC77FeA9E3CDFd006dA56a090075A";
const teamManager_prod = "0x332e358716edC77FeA9E3CDFd006dA56a090075A";

export const teamManagerContract = IS_DEV_ENV
  ? teamManager_dev
  : (teamManager_prod as typeof teamManager_dev);
