import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { OrderCard } from "../order_card/order_card.component";
import { ScreenTransition } from "../../common/screen_transition/screen_transition.styles";
const TRANSITION_DURATION_MS = 260;
import {
  OrderHistorySection,
  OrderHistoryContainer,
  OrderHistoryHeader,
  OrderHistoryTitle,
  OrderHistorySubtitle,
  OrdersList,
  Pagination,
  PaginationSummary,
  PaginationControls,
  PaginationButton,
  PaginationPageButton,
  EmptyOrdersState,
} from "./order_history.styles";
import { BackHeader } from "../../common/back_header/back_header.component";

import { useOrders } from "../../../infrastructure/services/orders/use-orders.hook";
import { useCustomerCatalog } from "../../../infrastructure/services/catalog/use-customer_catalog.hook";

const ORDERS_PER_PAGE = 2;

export const OrderHistory = () => {
  const navigate = useNavigate();

  const { customerOrders } = useOrders();
  const { customerCatalogProducts } = useCustomerCatalog();

  const [currentPage, setCurrentPage] = useState(1);

  const [transitionState, setTransitionState] = useState({
    isExiting: false,
    direction: "forward",
  });

  const handleBack = () => {
    setTransitionState({
      isExiting: true,
      direction: "back",
    });

    window.setTimeout(() => {
      navigate(-1);
    }, TRANSITION_DURATION_MS);
  };

  const totalPages = Math.max(
    1,
    Math.ceil((customerOrders?.length || 0) / ORDERS_PER_PAGE)
  );

  const pageOrders = useMemo(() => {
    if (!Array.isArray(customerOrders)) {
      return [];
    }

    const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;

    return customerOrders.slice(startIndex, startIndex + ORDERS_PER_PAGE);
  }, [customerOrders, currentPage]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);
  };

  if (!Array.isArray(customerOrders) || customerOrders.length === 0) {
    return (
      <OrderHistorySection>
        <OrderHistoryContainer>
          <EmptyOrdersState>You do not have any orders yet.</EmptyOrdersState>
        </OrderHistoryContainer>
      </OrderHistorySection>
    );
  }

  const firstVisibleOrder = (currentPage - 1) * ORDERS_PER_PAGE + 1;

  const lastVisibleOrder = Math.min(
    currentPage * ORDERS_PER_PAGE,
    customerOrders.length
  );

  return (
    <ScreenTransition
      $isExiting={transitionState.isExiting}
      $direction={transitionState.direction}
    >
      <BackHeader
        label="Back"
        ariaLabel="Go back from My Orders"
        onBack={handleBack}
      />
      <OrderHistorySection>
        <OrderHistoryContainer>
          <OrderHistoryHeader>
            <OrderHistoryTitle>My Orders</OrderHistoryTitle>

            <OrderHistorySubtitle>
              Track your orders, from placement to pickup or delivery.
            </OrderHistorySubtitle>
          </OrderHistoryHeader>
          <OrdersList>
            {pageOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                customerCatalogProducts={customerCatalogProducts}
              />
            ))}
          </OrdersList>

          {customerOrders.length > ORDERS_PER_PAGE && (
            <Pagination>
              <PaginationSummary>
                Showing {firstVisibleOrder}–{lastVisibleOrder} of{" "}
                {customerOrders.length} orders
              </PaginationSummary>

              <PaginationControls>
                <PaginationButton
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => goToPage(currentPage - 1)}
                  aria-label="Previous orders"
                >
                  <FiChevronLeft />
                </PaginationButton>

                {Array.from(
                  {
                    length: totalPages,
                  },
                  (_, index) => index + 1
                ).map((page) => (
                  <PaginationPageButton
                    key={page}
                    type="button"
                    $active={page === currentPage}
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </PaginationPageButton>
                ))}

                <PaginationButton
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => goToPage(currentPage + 1)}
                  aria-label="Next orders"
                >
                  <FiChevronRight />
                </PaginationButton>
              </PaginationControls>
            </Pagination>
          )}
        </OrderHistoryContainer>
      </OrderHistorySection>
    </ScreenTransition>
  );
};
