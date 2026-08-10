export const getDigitsOnly = (value = "") => {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\D/g, "");
};

export const isValidEmail = (email = "") => {
  if (typeof email !== "string") {
    return false;
  }

  const normalizedEmail = email.trim();

  if (!normalizedEmail) {
    return false;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);
};

export const isValidUSPhoneNumber = (phone = "") => {
  if (typeof phone !== "string") {
    return false;
  }

  return getDigitsOnly(phone).length === 10;
};

export const isRequiredText = (value = "") => {
  return typeof value === "string" && value.trim().length > 0;
};
