import apiClient from "../../api/api.client";

const CHECKOUT_PATH = "/api/checkout";

const validateObjectPayload = (payload, errorMessage) => {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new Error(errorMessage);
  }

  return payload;
};

export const prepareReviewRequest = async (payload, { signal } = {}) => {
  const validatedPayload = validateObjectPayload(
    payload,
    "A valid checkout payload is required"
  );

  const { data } = await apiClient.post(
    `${CHECKOUT_PATH}/prepare-review`,
    validatedPayload,
    {
      signal,
    }
  );

  return data;
};

export const placeOrderRequest = async (payload, { signal } = {}) => {
  const validatedPayload = validateObjectPayload(
    payload,
    "A valid place order payload is required"
  );

  const { data } = await apiClient.post(
    `${CHECKOUT_PATH}/place-order`,
    validatedPayload,
    {
      signal,
    }
  );

  return data;
};
