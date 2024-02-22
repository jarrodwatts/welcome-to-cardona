/**
 * Accept an error message and return something more meaningful to the user
 */

export const formatError = (errorMessage: string): string => {
  // Team does not exist?
  if (errorMessage.includes("Team does not exist")) {
    return "Team name does not exist! Check the name and try again. Need help? Reach out to us at the booth!";
  }

  // No gas?

  return errorMessage;
};
