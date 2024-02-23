/**
 * Configure your smart contract addresses here.
 * Each smart contract should have two addresses defined:
 *   1. Development address - used for testing purposes
 *   2. Production address - the mainnet smart contract address for when you deploy your application
 */

import { IS_DEV_ENV } from "./chains";

const teamManager_dev = "0x92705a1A02c45CFD594B2b0551bc0B921b9a1d4A";
const teamManager_prod = "0x92705a1A02c45CFD594B2b0551bc0B921b9a1d4A";

export const teamManagerContract = IS_DEV_ENV
  ? teamManager_dev
  : (teamManager_prod as typeof teamManager_dev);
