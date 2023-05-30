// function to extract username from email

export const extractUsername = (email) => {
  const atIndex = email.indexOf("@");
  if (atIndex !== -1) {
    const username = email.substring(0, atIndex);
    return username;
  }
  return null; // Return null if the email format is invalid
};

