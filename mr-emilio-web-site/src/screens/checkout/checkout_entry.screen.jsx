import { FiChevronRight, FiLock, FiUser, FiUserPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import checkoutProducts from "../../assets/checkout/type_of_customer/cartoonish_products.png";

import { MainHeader } from "../../components/main_header/main_header.component";
import { CheckoutBackHeader } from "../../components/layout/checkout_back_header/checkout_back_header.component";

import {
  CheckoutEntryTransition,
  CheckoutEntryPage,
  CheckoutEntryContainer,
  CheckoutIllustrationSection,
  CheckoutProductsImage,
  GuestCheckoutCard,
  GuestCheckoutTitle,
  GuestCheckoutMessage,
  GuestCheckoutButton,
  CheckoutDivider,
  CheckoutDividerLabel,
  AccountOptions,
  AccountOption,
  AccountOptionIcon,
  AccountOptionContent,
  AccountOptionTitle,
  AccountOptionDescription,
  AccountOptionChevron,
  CheckoutLegal,
  CheckoutLegalIcon,
  CheckoutLegalText,
  CheckoutLegalLink,
} from "./checkout_entry.styles";

const TRANSITION_DURATION_MS = 260;

export const CheckoutEntry = () => {
  const navigate = useNavigate();

  const [transitionState, setTransitionState] = useState({
    isExiting: false,
    direction: "forward",
  });

  const navigateWithTransition = (path, direction) => {
    setTransitionState({
      isExiting: true,
      direction,
    });

    window.setTimeout(() => {
      navigate(path);
    }, TRANSITION_DURATION_MS);
  };

  const handleBackToCart = () => {
    navigateWithTransition("/cart", "back");
  };

  const handleGuestCheckout = () => {
    /*
     * Next:
     * set checkoutMode = "guest"
     * inside CheckoutContext.
     */
    navigateWithTransition("/checkout/delivery", "forward");
  };

  const handleSignIn = () => {
    /*
     * Authentication screen will be connected here later.
     */
    console.log("Sign in");
  };

  const handleCreateAccount = () => {
    /*
     * Authentication screen will be connected here later.
     */
    console.log("Create account");
  };

  return (
    <CheckoutEntryTransition
      $isExiting={transitionState.isExiting}
      $direction={transitionState.direction}
    >
      <MainHeader />

      <CheckoutBackHeader
        label="Cart"
        ariaLabel="Return to cart"
        onBack={handleBackToCart}
      />

      <CheckoutEntryPage>
        <CheckoutEntryContainer>
          <CheckoutIllustrationSection>
            <CheckoutProductsImage
              src={checkoutProducts}
              alt="Mr. Emilio Venezuelan products"
            />
          </CheckoutIllustrationSection>

          <GuestCheckoutCard>
            <GuestCheckoutTitle>Continue as Guest</GuestCheckoutTitle>

            <GuestCheckoutMessage>
              No account required.
              <br />
              Checkout quickly and securely.
            </GuestCheckoutMessage>

            <GuestCheckoutButton type="button" onClick={handleGuestCheckout}>
              <span>Continue as Guest</span>

              <FiChevronRight aria-hidden="true" />
            </GuestCheckoutButton>
          </GuestCheckoutCard>

          <CheckoutDivider>
            <span />

            <CheckoutDividerLabel>
              OR CONTINUE WITH AN ACCOUNT
            </CheckoutDividerLabel>

            <span />
          </CheckoutDivider>

          <AccountOptions>
            <AccountOption type="button" onClick={handleSignIn}>
              <AccountOptionIcon aria-hidden="true">
                <FiUser />
              </AccountOptionIcon>

              <AccountOptionContent>
                <AccountOptionTitle>Sign In</AccountOptionTitle>

                <AccountOptionDescription>
                  Already have an account
                </AccountOptionDescription>
              </AccountOptionContent>

              <AccountOptionChevron aria-hidden="true">
                <FiChevronRight />
              </AccountOptionChevron>
            </AccountOption>

            <AccountOption type="button" onClick={handleCreateAccount}>
              <AccountOptionIcon aria-hidden="true">
                <FiUserPlus />
              </AccountOptionIcon>

              <AccountOptionContent>
                <AccountOptionTitle>Create Account</AccountOptionTitle>

                <AccountOptionDescription>
                  New here? Let&apos;s get you set up
                </AccountOptionDescription>
              </AccountOptionContent>

              <AccountOptionChevron aria-hidden="true">
                <FiChevronRight />
              </AccountOptionChevron>
            </AccountOption>
          </AccountOptions>

          <CheckoutLegal>
            <CheckoutLegalIcon aria-hidden="true">
              <FiLock />
            </CheckoutLegalIcon>

            <CheckoutLegalText>
              By continuing, you agree to our{" "}
              <CheckoutLegalLink href="/terms">
                Terms of Service
              </CheckoutLegalLink>{" "}
              and{" "}
              <CheckoutLegalLink href="/privacy">
                Privacy Policy
              </CheckoutLegalLink>
              .
            </CheckoutLegalText>
          </CheckoutLegal>
        </CheckoutEntryContainer>
      </CheckoutEntryPage>
    </CheckoutEntryTransition>
  );
};
