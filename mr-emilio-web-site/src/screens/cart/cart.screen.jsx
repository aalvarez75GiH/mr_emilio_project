import { useState } from "react";

import {
  FiAlertCircle,
  FiAward,
  FiChevronLeft,
  FiHeart,
  FiLock,
  FiMinus,
  FiPackage,
  FiPlus,
  FiRefreshCw,
  FiShield,
  FiShoppingBag,
  FiTrash2,
  FiTruck,
} from "react-icons/fi";

import { Link, useNavigate } from "react-router-dom";
import { BenefitIcon } from "../../assets/shop_products_carousel/product_card/icons";
import { ScreenTransition } from "../../components/common/screen_transition/screen_transition.styles";

import {
  // CartScreenTransition,
  CartPage,
  CartPageContainer,
  CartHeader,
  CartTitleGroup,
  CartTitle,
  CartSubtitle,
  ClearCartButton,
  StoreChangeNotice,
  StoreChangeNoticeIcon,
  StoreChangeNoticeContent,
  StoreChangeNoticeTitle,
  StoreChangeNoticeMessage,
  StoreChangeNoticeDismiss,
  CartLayout,
  CartItemsColumn,
  CartItemsList,
  CartItem,
  CartItemImageColumn,
  CartItemImageContainer,
  CartItemImage,
  CartItemSizeBadge,
  CartItemContent,
  CartItemHeading,
  CartItemName,
  CartItemDescription,
  CartItemPrice,
  CartItemAvailability,
  CartItemAvailabilityIcon,
  CartItemAvailabilityContent,
  CartItemAvailabilityTitle,
  CartItemAvailabilityMessage,
  CartItemControlsRow,
  QuantityControl,
  QuantityButton,
  QuantityValue,
  CartItemLineTotal,
  RemoveItemButton,
  CartSummaryColumn,
  OrderSummary,
  OrderSummaryTitle,
  SummaryRow,
  SummaryLabel,
  SummaryValue,
  SummaryDivider,
  SummaryTotalRow,
  SummaryTotalLabel,
  SummaryTotalValue,
  ShippingMessage,
  CheckoutValidationMessage,
  CheckoutButton,
  ContinueShoppingButton,
  SecurePanel,
  SecureIcon,
  SecureContent,
  SecureTitle,
  SecureMessage,
  EmptyCart,
  EmptyCartIcon,
  EmptyCartTitle,
  EmptyCartMessage,
  EmptyCartButton,
  CartItemBenefits,
  CartItemBenefit,
  CartItemBenefitIcon,
  CartItemBenefitLabel,
  PaymentPanel,
  PaymentPanelTitle,
  PaymentMethods,
  PaymentMethod,
  TrustBenefitsPanel,
  TrustBenefit,
  TrustBenefitIcon,
  TrustBenefitContent,
  TrustBenefitTitle,
  TrustBenefitMessage,
} from "./cart.styles";

import { MainHeader } from "../../components/main_header/main_header.component";
import { BackHeader } from "../../components/common/back_header/back_header.component";

import { useCart } from "../../infrastructure/services/cart/use-cart.hook";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(amount || 0));

const trustBenefits = [
  {
    id: "authentic",
    title: "100% Authentic",
    message: "Authentic Venezuelan products you can trust.",
    icon: FiAward,
  },
  {
    id: "quality",
    title: "Premium Quality",
    message: "Carefully selected ingredients and traditional recipes.",
    icon: FiPackage,
  },
  {
    id: "purpose",
    title: "Made with Purpose",
    message: "Every purchase supports our family and community in Venezuela.",
    icon: FiHeart,
  },
  {
    id: "delivery",
    title: "Fast & Reliable",
    message: "Quick delivery and carefully packaged with care.",
    icon: FiTruck,
  },
];

const getAvailabilityCopy = ({ item, warehouseName }) => {
  const storeName = warehouseName || "your current store";

  switch (item.availabilityStatus) {
    case "not_offered":
      return {
        title: "Not available at this store",
        message: `${item.name} is not currently offered by ${storeName}.`,
      };

    case "sold_out":
      return {
        title: "Sold out at this store",
        message: `${item.name} is currently sold out at ${storeName}.`,
      };

    case "insufficient_stock":
      return {
        title: "Not enough stock",
        message: `Only ${item.availableStock} ${
          Number(item.availableStock) === 1 ? "unit is" : "units are"
        } available at ${storeName}.`,
      };

    default:
      return null;
  }
};

export const Cart = () => {
  const {
    cartItems,
    cartQuantity,
    cartSubtotal,

    currentWarehouse,
    storeChangeNotice,

    cartIsValidForCheckout,
    isCartValidationPending,
    hasCartValidationIssues,

    increaseCartItemQuantity,
    decreaseCartItemQuantity,
    removeProductFromCart,
    clearCart,

    dismissStoreChangeNotice,
  } = useCart();

  const navigate = useNavigate();

  const [isExiting, setIsExiting] = useState(false);

  const handleBackToShopping = (event) => {
    event?.preventDefault();

    setIsExiting(true);

    window.setTimeout(() => {
      navigate("/");
    }, 260);
  };

  const handleProceedToCheckout = () => {
    if (!cartIsValidForCheckout || isCartValidationPending) {
      return;
    }

    setIsExiting(true);

    window.setTimeout(() => {
      navigate("/checkout");
    }, 260);
  };

  if (cartItems.length === 0) {
    return (
      <>
        <ScreenTransition $isExiting={isExiting}>
          <MainHeader />

          <BackHeader
            label="Continue shopping"
            ariaLabel="Return to shopping"
            onBack={handleBackToShopping}
          />

          <CartPage>
            <CartPageContainer>
              <EmptyCart>
                <EmptyCartIcon aria-hidden="true">
                  <FiShoppingBag />
                </EmptyCartIcon>

                <EmptyCartTitle>Your cart is empty</EmptyCartTitle>

                <EmptyCartMessage>
                  Add some Mr. Emilio favorites and they will appear here.
                </EmptyCartMessage>

                <EmptyCartButton as={Link} to="/">
                  Continue shopping
                </EmptyCartButton>
              </EmptyCart>
            </CartPageContainer>
          </CartPage>
        </ScreenTransition>
      </>
    );
  }

  return (
    <>
      <ScreenTransition $isExiting={isExiting}>
        <MainHeader />

        <BackHeader
          label="Continue shopping"
          ariaLabel="Return to shopping"
          onBack={handleBackToShopping}
        />

        <CartPage>
          <CartPageContainer>
            <CartHeader>
              <CartTitleGroup>
                <CartTitle>
                  Your Cart <span>({cartQuantity})</span>
                </CartTitle>

                <CartSubtitle>
                  Review your items and proceed to secure checkout.
                </CartSubtitle>
              </CartTitleGroup>

              <ClearCartButton type="button" onClick={clearCart}>
                <FiTrash2 />
                Clear cart
              </ClearCartButton>
            </CartHeader>

            {storeChangeNotice && hasCartValidationIssues && (
              <StoreChangeNotice>
                <StoreChangeNoticeIcon aria-hidden="true">
                  <FiRefreshCw />
                </StoreChangeNoticeIcon>

                <StoreChangeNoticeContent>
                  <StoreChangeNoticeTitle>
                    Your store has changed
                  </StoreChangeNoticeTitle>

                  <StoreChangeNoticeMessage>
                    Your saved cart has been rechecked against{" "}
                    <strong>
                      {storeChangeNotice.currentWarehouseName ||
                        "your current store"}
                    </strong>
                    . Availability and prices may be different from your
                    previous shopping session.
                  </StoreChangeNoticeMessage>
                </StoreChangeNoticeContent>

                <StoreChangeNoticeDismiss
                  type="button"
                  onClick={dismissStoreChangeNotice}
                  aria-label="Dismiss store change notice"
                >
                  ×
                </StoreChangeNoticeDismiss>
              </StoreChangeNotice>
            )}

            <CartLayout>
              <CartItemsColumn>
                <CartItemsList>
                  {cartItems.map((item) => {
                    const lineTotal =
                      Number(item.price || 0) * Number(item.quantity || 0);

                    const itemIsAvailable =
                      item.isAvailableAtWarehouse === true;

                    const hasReachedStockLimit =
                      !itemIsAvailable || item.quantity >= item.availableStock;

                    const availabilityCopy = getAvailabilityCopy({
                      item,
                      warehouseName: currentWarehouse?.warehouse_name,
                    });

                    return (
                      <CartItem
                        key={item.key}
                        $hasAvailabilityIssue={!itemIsAvailable}
                      >
                        <CartItemImageColumn>
                          <CartItemImageContainer>
                            <CartItemImage
                              src={item.image}
                              alt={item.alt || item.name}
                              $imageScale={item.imageScale}
                              $imageOffsetX={item.imageOffsetX}
                              $imageOffsetY={item.imageOffsetY}
                            />

                            {item.sizeLabel && (
                              <CartItemSizeBadge>
                                {item.sizeLabel}
                              </CartItemSizeBadge>
                            )}
                          </CartItemImageContainer>
                        </CartItemImageColumn>

                        <CartItemContent>
                          <RemoveItemButton
                            type="button"
                            aria-label={`Remove ${item.name} from cart`}
                            onClick={() => removeProductFromCart(item.key)}
                          >
                            <FiTrash2 />
                          </RemoveItemButton>

                          <CartItemHeading>
                            <div>
                              <CartItemName>{item.name}</CartItemName>

                              {item.description && (
                                <CartItemDescription>
                                  {item.description}
                                </CartItemDescription>
                              )}

                              <CartItemPrice>
                                {item.displayedPrice ||
                                  formatCurrency(item.price)}
                              </CartItemPrice>
                            </div>
                          </CartItemHeading>

                          {availabilityCopy && (
                            <CartItemAvailability role="status">
                              <CartItemAvailabilityIcon aria-hidden="true">
                                <FiAlertCircle />
                              </CartItemAvailabilityIcon>

                              <CartItemAvailabilityContent>
                                <CartItemAvailabilityTitle>
                                  {availabilityCopy.title}
                                </CartItemAvailabilityTitle>

                                <CartItemAvailabilityMessage>
                                  {availabilityCopy.message}
                                </CartItemAvailabilityMessage>
                              </CartItemAvailabilityContent>
                            </CartItemAvailability>
                          )}

                          {item.priceChanged && (
                            <CartItemAvailability>
                              <CartItemAvailabilityIcon aria-hidden="true">
                                <FiRefreshCw />
                              </CartItemAvailabilityIcon>

                              <CartItemAvailabilityContent>
                                <CartItemAvailabilityTitle>
                                  Price updated
                                </CartItemAvailabilityTitle>

                                <CartItemAvailabilityMessage>
                                  This store&apos;s current price is{" "}
                                  {formatCurrency(item.price)}.
                                </CartItemAvailabilityMessage>
                              </CartItemAvailabilityContent>
                            </CartItemAvailability>
                          )}

                          {item.benefits?.length > 0 && (
                            <CartItemBenefits>
                              {item.benefits.slice(0, 3).map((benefit) => (
                                <CartItemBenefit
                                  key={`${item.key}-${benefit.type}`}
                                >
                                  <CartItemBenefitIcon aria-hidden="true">
                                    <BenefitIcon type={benefit.icon} />
                                  </CartItemBenefitIcon>

                                  <CartItemBenefitLabel>
                                    {benefit.label}
                                  </CartItemBenefitLabel>
                                </CartItemBenefit>
                              ))}
                            </CartItemBenefits>
                          )}

                          <CartItemControlsRow>
                            <QuantityControl
                              aria-label={`Quantity for ${item.name}`}
                            >
                              <QuantityButton
                                type="button"
                                aria-label={`Decrease ${item.name} quantity`}
                                onClick={() =>
                                  decreaseCartItemQuantity(item.key)
                                }
                              >
                                <FiMinus />
                              </QuantityButton>

                              <QuantityValue>{item.quantity}</QuantityValue>

                              <QuantityButton
                                type="button"
                                aria-label={`Increase ${item.name} quantity`}
                                disabled={hasReachedStockLimit}
                                onClick={() =>
                                  increaseCartItemQuantity(item.key)
                                }
                              >
                                <FiPlus />
                              </QuantityButton>
                            </QuantityControl>

                            <CartItemLineTotal>
                              {formatCurrency(lineTotal)}
                            </CartItemLineTotal>
                          </CartItemControlsRow>
                        </CartItemContent>
                      </CartItem>
                    );
                  })}
                </CartItemsList>

                <SecurePanel>
                  <SecureIcon aria-hidden="true">
                    <FiShield />
                  </SecureIcon>

                  <SecureContent>
                    <SecureTitle>Safe &amp; Secure</SecureTitle>

                    <SecureMessage>
                      Your checkout information will be protected and handled
                      securely.
                    </SecureMessage>
                  </SecureContent>
                </SecurePanel>
              </CartItemsColumn>

              <CartSummaryColumn>
                <OrderSummary>
                  <OrderSummaryTitle>Order Summary</OrderSummaryTitle>

                  <SummaryRow>
                    <SummaryLabel>
                      Subtotal ({cartQuantity}{" "}
                      {cartQuantity === 1 ? "item" : "items"})
                    </SummaryLabel>

                    <SummaryValue>{formatCurrency(cartSubtotal)}</SummaryValue>
                  </SummaryRow>

                  <SummaryRow>
                    <SummaryLabel>Fulfillment</SummaryLabel>

                    <SummaryValue>Selected at checkout</SummaryValue>
                  </SummaryRow>

                  <SummaryDivider />

                  <SummaryTotalRow>
                    <SummaryTotalLabel>Estimated subtotal</SummaryTotalLabel>

                    <SummaryTotalValue>
                      {formatCurrency(cartSubtotal)}
                    </SummaryTotalValue>
                  </SummaryTotalRow>

                  <ShippingMessage>
                    Pickup or Local Delivery will be confirmed during checkout
                    for{" "}
                    <strong>
                      {currentWarehouse?.warehouse_name || "your current store"}
                    </strong>
                    .
                  </ShippingMessage>

                  {!cartIsValidForCheckout && !isCartValidationPending && (
                    <CheckoutValidationMessage>
                      <FiAlertCircle aria-hidden="true" />

                      <span>
                        Some items in your cart need attention before you can
                        continue to checkout.
                      </span>
                    </CheckoutValidationMessage>
                  )}

                  <CheckoutButton
                    type="button"
                    disabled={
                      !cartIsValidForCheckout || isCartValidationPending
                    }
                    onClick={handleProceedToCheckout}
                  >
                    <FiLock />

                    {isCartValidationPending
                      ? "Checking cart..."
                      : "Proceed to Checkout"}
                  </CheckoutButton>

                  <ContinueShoppingButton
                    as={Link}
                    to="/"
                    onClick={handleBackToShopping}
                  >
                    <FiChevronLeft />
                    Continue Shopping
                  </ContinueShoppingButton>
                </OrderSummary>

                <PaymentPanel>
                  <PaymentPanelTitle>We accept</PaymentPanelTitle>

                  <PaymentMethods>
                    <PaymentMethod>VISA</PaymentMethod>

                    <PaymentMethod $variant="mastercard">
                      <span />
                      <span />
                    </PaymentMethod>
                  </PaymentMethods>
                </PaymentPanel>

                <TrustBenefitsPanel>
                  {trustBenefits.map((benefit) => {
                    const Icon = benefit.icon;

                    return (
                      <TrustBenefit key={benefit.id}>
                        <TrustBenefitIcon aria-hidden="true">
                          <Icon />
                        </TrustBenefitIcon>

                        <TrustBenefitContent>
                          <TrustBenefitTitle>{benefit.title}</TrustBenefitTitle>

                          <TrustBenefitMessage>
                            {benefit.message}
                          </TrustBenefitMessage>
                        </TrustBenefitContent>
                      </TrustBenefit>
                    );
                  })}
                </TrustBenefitsPanel>
              </CartSummaryColumn>
            </CartLayout>
          </CartPageContainer>
        </CartPage>
      </ScreenTransition>
    </>
  );
};
