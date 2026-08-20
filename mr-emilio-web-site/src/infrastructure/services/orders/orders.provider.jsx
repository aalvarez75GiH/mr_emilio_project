import { useCallback, useMemo, useState } from "react";

import { OrdersContext } from "./orders.context";

import {
  requestCustomerAccessCodeRequest,
  verifyCustomerAccessCodeRequest,
  getCustomerOrdersRequest,
} from "./orders.requests";

import { getOrdersErrorMessage } from "./orders.helpers";

const ORDER_ACCESS_STATES = {
  IDLE: "idle",
  CHECKING_SESSION: "checking_session",
  EMAIL_REQUIRED: "email_required",
  CODE_REQUIRED: "code_required",
  VERIFIED: "verified",
  ERROR: "error",
};

export const OrdersProvider = ({ children }) => {
  const [accessState, setAccessState] = useState(ORDER_ACCESS_STATES.IDLE);

  const [email, setEmail] = useState("");

  const [challengeId, setChallengeId] = useState(null);

  const [customerOrders, setCustomerOrders] = useState([]);

  const [isRequestingCode, setIsRequestingCode] = useState(false);

  const [isVerifyingCode, setIsVerifyingCode] = useState(false);

  const [isLoadingOrders, setIsLoadingOrders] = useState(false);

  const [error, setError] = useState(null);

  const loadCustomerOrders = useCallback(async () => {
    setIsLoadingOrders(true);
    setError(null);

    try {
      const response = await getCustomerOrdersRequest();

      const orders = Array.isArray(response?.customerOrders)
        ? response.customerOrders
        : [];

      setCustomerOrders(orders);

      setAccessState(ORDER_ACCESS_STATES.VERIFIED);

      return orders;
    } catch (error) {
      const statusCode = error?.response?.status ?? error?.statusCode;

      if (statusCode === 401) {
        setCustomerOrders([]);

        setAccessState(ORDER_ACCESS_STATES.EMAIL_REQUIRED);

        return [];
      }

      setError(getOrdersErrorMessage(error, "We could not load your orders."));
      //   setError(
      //     error?.response?.data?.error ||
      //       error?.message ||
      //       "We could not load your orders."
      //   );

      throw error;
    } finally {
      setIsLoadingOrders(false);
    }
  }, []);

  const checkCustomerAccessSession = useCallback(async () => {
    setAccessState(ORDER_ACCESS_STATES.CHECKING_SESSION);

    return loadCustomerOrders();
  }, [loadCustomerOrders]);

  const requestAccessCode = useCallback(async (customerEmail) => {
    setIsRequestingCode(true);
    setError(null);

    try {
      const response = await requestCustomerAccessCodeRequest({
        email: customerEmail,
      });

      setEmail(customerEmail);

      setChallengeId(response?.challengeId || null);

      setAccessState(ORDER_ACCESS_STATES.CODE_REQUIRED);

      return response;
    } catch (error) {
      setError(
        getOrdersErrorMessage(
          error,
          "We could not send your verification code."
        )
      );

      throw error;
    } finally {
      setIsRequestingCode(false);
    }
  }, []);

  const verifyAccessCode = useCallback(
    async (code) => {
      if (!challengeId) {
        const error = new Error(
          "Verification challenge is no longer available."
        );

        setError(error.message);

        throw error;
      }

      setIsVerifyingCode(true);
      setError(null);

      try {
        await verifyCustomerAccessCodeRequest({
          challengeId,
          code,
        });

        setAccessState(ORDER_ACCESS_STATES.VERIFIED);

        return await loadCustomerOrders();
      } catch (error) {
        setError(
          getOrdersErrorMessage(
            error,
            "The verification code could not be confirmed."
          )
        );

        throw error;
      } finally {
        setIsVerifyingCode(false);
      }
    },
    [challengeId, loadCustomerOrders]
  );

  const resetOrderAccess = useCallback(() => {
    setAccessState(ORDER_ACCESS_STATES.EMAIL_REQUIRED);

    setEmail("");
    setChallengeId(null);
    setCustomerOrders([]);
    setError(null);
  }, []);

  const value = useMemo(
    () => ({
      accessState,

      email,
      challengeId,

      customerOrders,

      isRequestingCode,
      isVerifyingCode,
      isLoadingOrders,

      error,

      checkCustomerAccessSession,
      requestAccessCode,
      verifyAccessCode,
      loadCustomerOrders,
      resetOrderAccess,

      orderAccessStates: ORDER_ACCESS_STATES,
    }),
    [
      accessState,
      email,
      challengeId,
      customerOrders,
      isRequestingCode,
      isVerifyingCode,
      isLoadingOrders,
      error,
      checkCustomerAccessSession,
      requestAccessCode,
      verifyAccessCode,
      loadCustomerOrders,
      resetOrderAccess,
    ]
  );

  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  );
};
