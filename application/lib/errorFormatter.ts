/**
 * Accept an error message and return something more meaningful to the user
 */

export const formatError = (errorMessage: string): string => {
  // Team does not exist?
  if (errorMessage.includes("Team does not exist")) {
    return "Team name does not exist! Check the name and try again. Need help? Reach out to us at the booth!";
  }

  if (errorMessage.includes("Reason: user rejected transaction")) {
    return "Transaction rejected by user. Please try again.";
  }

  if (errorMessage.includes("User not part of a team")) {
    return "You are not part of a team. Join or create a team first!";
  }

  if (errorMessage.includes("Team name cannot be empty")) {
    return "Team name cannot be empty. Please enter a team name!";
  }

  if (errorMessage.includes("Creator is already part of a team")) {
    return "You are already part of a team. You cannot create a new team!";
  }

  if (errorMessage.includes("Team already exists")) {
    return "Team name already exists. Please choose a different name!";
  }

  if (errorMessage.includes("User is already part of a team")) {
    return "You are already part of a team. You cannot join another team!";
  }

  if (errorMessage.includes("User is not part of a team.")) {
    return "You are not part of a team. You cannot leave a team!";
  }

  if (errorMessage.includes("insufficient funds for gas * price + value")) {
    return "Insufficient funds for gas. Please check your wallet and try again.";
  }

  // No gas?

  return errorMessage;
};
