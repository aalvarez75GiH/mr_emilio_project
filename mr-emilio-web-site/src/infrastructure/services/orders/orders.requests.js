import customerAccessClient from "../../api/customer_access.client";

const CUSTOMER_ACCESS_PATH = "/api/customer-access";

export const requestCustomerAccessCodeRequest = async ({ email }) => {
  const response = await customerAccessClient.post(
    `${CUSTOMER_ACCESS_PATH}/request-code`,
    {
      email,
    }
  );

  return response.data;
};

export const verifyCustomerAccessCodeRequest = async ({
  challengeId,
  code,
}) => {
  const response = await customerAccessClient.post(
    `${CUSTOMER_ACCESS_PATH}/verify-code`,
    {
      challengeId,
      code,
    }
  );

  return response.data;
};

export const getCustomerOrdersRequest = async () => {
  const response = await customerAccessClient.get(
    `${CUSTOMER_ACCESS_PATH}/orders`
  );

  return response.data;
};
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const CUSTOMER_ACCESS_PATH = "/api/customer-access";

// const parseResponse = async (response) => {
//   const data = await response.json().catch(() => null);

//   if (!response.ok) {
//     const error = new Error(data?.error || "Customer orders request failed");

//     error.statusCode = response.status;
//     error.details = data?.details || null;

//     throw error;
//   }

//   return data;
// };

// export const requestCustomerAccessCodeRequest = async ({ email }) => {
//   const response = await fetch(
//     `${API_BASE_URL}${CUSTOMER_ACCESS_PATH}/request-code`,
//     {
//       method: "POST",

//       headers: {
//         "Content-Type": "application/json",
//       },

//       credentials: "include",

//       body: JSON.stringify({
//         email,
//       }),
//     }
//   );

//   return parseResponse(response);
// };

// export const verifyCustomerAccessCodeRequest = async ({
//   challengeId,
//   code,
// }) => {
//   const response = await fetch(
//     `${API_BASE_URL}${CUSTOMER_ACCESS_PATH}/verify-code`,
//     {
//       method: "POST",

//       headers: {
//         "Content-Type": "application/json",
//       },

//       credentials: "include",

//       body: JSON.stringify({
//         challengeId,
//         code,
//       }),
//     }
//   );

//   return parseResponse(response);
// };

// export const getCustomerOrdersRequest = async () => {
//   const response = await fetch(
//     `${API_BASE_URL}${CUSTOMER_ACCESS_PATH}/orders`,
//     {
//       method: "GET",

//       credentials: "include",
//     }
//   );

//   return parseResponse(response);
// };
