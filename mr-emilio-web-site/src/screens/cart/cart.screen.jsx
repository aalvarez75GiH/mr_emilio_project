import {
  FiAward,
  FiChevronLeft,
  FiHeart,
  FiLock,
  FiMinus,
  FiPackage,
  FiPlus,
  FiShield,
  FiShoppingBag,
  FiTrash2,
  FiTruck,
} from "react-icons/fi";
import { BenefitIcon } from "../../assets/shop_products_carousel/product_card/icons";

import { Link } from "react-router-dom";

import { useCart } from "../../infrastructure/services/cart/use-cart.hook";

import {
  CartPage,
  CartPageContainer,
  CartHeader,
  CartTitleGroup,
  CartTitle,
  CartSubtitle,
  ClearCartButton,
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

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

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

export const Cart = () => {
  const {
    cartItems,
    cartQuantity,
    cartSubtotal,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
    removeProductFromCart,
    clearCart,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <>
        <MainHeader />

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
      </>
    );
  }

  return (
    <>
      <MainHeader />

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

          <CartLayout>
            <CartItemsColumn>
              <CartItemsList>
                {cartItems.map((item) => {
                  const lineTotal =
                    Number(item.price || 0) * Number(item.quantity || 0);

                  const hasReachedStockLimit =
                    item.quantity >= item.availableStock;

                  return (
                    <CartItem key={item.key}>
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
                              onClick={() => decreaseCartItemQuantity(item.key)}
                            >
                              <FiMinus />
                            </QuantityButton>

                            <QuantityValue>{item.quantity}</QuantityValue>

                            <QuantityButton
                              type="button"
                              aria-label={`Increase ${item.name} quantity`}
                              disabled={hasReachedStockLimit}
                              onClick={() => increaseCartItemQuantity(item.key)}
                            >
                              <FiPlus />
                            </QuantityButton>
                          </QuantityControl>

                          <CartItemLineTotal>
                            {formatCurrency(lineTotal)}
                          </CartItemLineTotal>
                        </CartItemControlsRow>

                        {/* <RemoveItemButton
                          type="button"
                          aria-label={`Remove ${item.name} from cart`}
                          onClick={() => removeProductFromCart(item.key)}
                        >
                          <FiTrash2 />
                        </RemoveItemButton> */}
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
                  <SummaryLabel>Shipping</SummaryLabel>

                  <SummaryValue>Calculated at checkout</SummaryValue>
                </SummaryRow>

                <SummaryDivider />

                <SummaryTotalRow>
                  <SummaryTotalLabel>Estimated subtotal</SummaryTotalLabel>

                  <SummaryTotalValue>
                    {formatCurrency(cartSubtotal)}
                  </SummaryTotalValue>
                </SummaryTotalRow>

                <ShippingMessage>
                  Delivery and pickup options will be confirmed during checkout
                  based on your selected store.
                </ShippingMessage>

                <CheckoutButton type="button">
                  <FiLock />
                  Proceed to Checkout
                </CheckoutButton>

                <ContinueShoppingButton as={Link} to="/">
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

                  <PaymentMethod $variant="amex">AMEX</PaymentMethod>

                  <PaymentMethod $variant="apple">Pay</PaymentMethod>

                  <PaymentMethod $variant="google">
                    <strong>G</strong> Pay
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
    </>
  );
};
