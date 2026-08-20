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
