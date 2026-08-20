export const ORDER_TIMELINE_STATES = {
  COMPLETED: "completed",
  UPCOMING: "upcoming",
};

const getHistoryEntry = (statusHistory, status) => {
  if (!Array.isArray(statusHistory)) {
    return null;
  }

  return statusHistory.find((entry) => entry?.status === status) || null;
};

const buildTimelineStep = ({
  status,
  label,
  historyEntry,
  fallbackCreatedAt = null,
}) => {
  const createdAt = historyEntry?.createdAt || fallbackCreatedAt || null;

  return {
    status,
    label,
    createdAt,
    state: createdAt
      ? ORDER_TIMELINE_STATES.COMPLETED
      : ORDER_TIMELINE_STATES.UPCOMING,
  };
};

export const buildOrderTimeline = (order) => {
  const statusHistory = Array.isArray(order?.statusHistory)
    ? order.statusHistory
    : [];

  const orderPlacedEntry = getHistoryEntry(statusHistory, "order_placed");

  const confirmedEntry = getHistoryEntry(statusHistory, "confirmed");

  /**
   * Legacy-order compatibility:
   *
   * Orders created before statusHistory existed still have
   * authoritative timestamps we can use:
   *
   * - createdAt represents when the order was placed.
   * - payment.paidAt represents when the successful checkout
   *   became confirmed in our existing flow.
   *
   * New orders use statusHistory directly.
   */
  const orderPlacedFallback =
    !orderPlacedEntry && order?.createdAt ? order.createdAt : null;

  const confirmedFallback =
    !confirmedEntry && order?.status === "confirmed" && order?.payment?.paidAt
      ? order.payment.paidAt
      : null;

  const sharedSteps = [
    buildTimelineStep({
      status: "order_placed",
      label: "Order placed",
      historyEntry: orderPlacedEntry,
      fallbackCreatedAt: orderPlacedFallback,
    }),

    buildTimelineStep({
      status: "confirmed",
      label: "Confirmed",
      historyEntry: confirmedEntry,
      fallbackCreatedAt: confirmedFallback,
    }),
  ];

  if (order?.fulfillment?.method === "pickup") {
    const pickedUpEntry = getHistoryEntry(statusHistory, "picked_up");

    return [
      ...sharedSteps,

      buildTimelineStep({
        status: "picked_up",
        label: "Picked up",
        historyEntry: pickedUpEntry,
      }),
    ];
  }

  if (order?.fulfillment?.method === "local_delivery") {
    const outForDeliveryEntry = getHistoryEntry(
      statusHistory,
      "out_for_delivery"
    );

    const deliveredEntry = getHistoryEntry(statusHistory, "delivered");

    return [
      ...sharedSteps,

      buildTimelineStep({
        status: "out_for_delivery",
        label: "Out for delivery",
        historyEntry: outForDeliveryEntry,
      }),

      buildTimelineStep({
        status: "delivered",
        label: "Delivered",
        historyEntry: deliveredEntry,
      }),
    ];
  }

  return sharedSteps;
};

export const getOrdersErrorMessage = (
  error,
  fallbackMessage = "Something went wrong."
) => {
  return (
    error?.response?.data?.error ||
    error?.response?.data?.message ||
    error?.message ||
    fallbackMessage
  );
};
