export const validateEmail = (email: string): string => {
  if (!email) return "Email is required";
  if (!/^\S+@\S+\.\S+$/.test(email)) return "Invalid email";
  return "";
};
