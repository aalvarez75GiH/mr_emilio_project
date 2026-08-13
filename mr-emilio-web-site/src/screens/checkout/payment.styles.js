import styled, { css } from "styled-components";

export const PaymentTransition = styled.div`
  width: 100%;
  min-height: 100vh;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    animation: ${({ $isExiting, $direction }) => {
      if (!$isExiting) {
        return css`
          payment-enter 260ms
            cubic-bezier(0.22, 1, 0.36, 1) both
        `;
      }

      if ($direction === "back") {
        return css`
          payment-back 260ms
            cubic-bezier(0.22, 1, 0.36, 1) both
        `;
      }

      return css`
        payment-forward 260ms
          cubic-bezier(0.22, 1, 0.36, 1) both
      `;
    }};

    @keyframes payment-enter {
      from {
        opacity: 0.96;
        transform: translateX(100%);
      }

      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes payment-forward {
      from {
        opacity: 1;
        transform: translateX(0);
      }

      to {
        opacity: 0.96;
        transform: translateX(-100%);
      }
    }

    @keyframes payment-back {
      from {
        opacity: 1;
        transform: translateX(0);
      }

      to {
        opacity: 0.96;
        transform: translateX(100%);
      }
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const PaymentPage = styled.main`
  width: 100%;
  min-height: 100vh;

  background: ${({ theme }) => theme.colors.background.primary};
`;

export const PaymentContainer = styled.div`
  width: 100%;
  max-width: 1180px;

  margin: 0 auto;
  padding: 42px 32px 64px;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    max-width: 1260px;
    padding: 48px 40px 72px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    max-width: 1080px;
    padding: 40px 32px 64px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    max-width: 900px;
    padding: 36px 28px 56px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 620px;
    padding: 30px 24px 48px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: none;
    padding: 26px 20px 38px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding: 24px 16px 34px;
  }
`;

export const CheckoutProgress = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto 1fr auto;
  align-items: start;

  width: 100%;
  max-width: 620px;

  margin: 0 auto 38px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: 32px;
  }
`;

export const CheckoutProgressItem = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 7px;
`;

export const CheckoutProgressDot = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 28px;
  height: 28px;

  border-radius: 50%;

  background: ${({ $active, $complete, theme }) =>
    $active || $complete
      ? theme.colors.brand.primary
      : theme.colors.border.light};

  color: ${({ $active, $complete, theme }) =>
    $active || $complete ? "#ffffff" : theme.colors.text.secondary};

  font-size: 0.72rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 25px;
    height: 25px;

    font-size: 0.66rem;
  }
`;

export const CheckoutProgressLabel = styled.span`
  color: ${({ $active, $complete, theme }) =>
    $active || $complete
      ? theme.colors.brand.primary
      : theme.colors.text.secondary};

  font-size: 0.7rem;
  font-weight: ${({ $active, $complete, theme }) =>
    $active || $complete ? theme.fontWeights.bold : theme.fontWeights.medium};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.64rem;
  }
`;

export const CheckoutProgressLine = styled.span`
  width: 100%;
  height: 1px;

  margin-top: 14px;

  background: ${({ $complete, theme }) =>
    $complete ? theme.colors.brand.primary : theme.colors.border.light};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: 12px;
  }
`;

export const PaymentHeader = styled.header`
  width: 100%;

  margin: 0 0 30px;

  text-align: left;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    margin-bottom: 32px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-bottom: 30px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    margin-bottom: 28px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: 26px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: 24px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    margin-bottom: 22px;
  }
`;
// export const PaymentHeader = styled.header`
//   max-width: 620px;

//   margin: 0 auto 30px;

//   text-align: left;
// `;

export const PaymentTitle = styled.h1`
  margin: 0;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.18;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.55rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 1.4rem;
  }
`;

export const PaymentSubtitle = styled.p`
  margin: 10px 0 0;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.9rem;
  line-height: 1.45;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.82rem;
  }
`;

export const PaymentLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(300px, 0.8fr);
  align-items: start;
  gap: 28px;

  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    gap: 34px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    gap: 24px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    grid-template-columns: minmax(0, 1.45fr) minmax(280px, 0.8fr);
    gap: 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 22px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 18px;
  }
`;

export const PaymentMainColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;

  min-width: 0;
`;

export const PaymentSideColumn = styled.aside`
  min-width: 0;
`;

export const PaymentSection = styled.section`
  width: 100%;
  text-align: left;
  padding: 24px;

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 14px;

  background: ${({ theme }) => theme.colors.background.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 17px;
    border-radius: 12px;
  }
`;

export const PaymentSectionTitle = styled.h2`
  margin: 0 0 18px;

  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 1rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const OrderItems = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;
export const OrderItem = styled.div`
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr) auto;
  align-items: center;
  gap: 18px;

  width: 100%;

  padding: 18px 0;

  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    grid-template-columns: 104px minmax(0, 1fr) auto;

    gap: 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 96px minmax(0, 1fr) auto;

    gap: 18px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    grid-template-columns: 88px minmax(0, 1fr) auto;

    gap: 16px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 82px minmax(0, 1fr) auto;

    gap: 14px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 78px minmax(0, 1fr) auto;

    gap: 12px;

    padding: 14px 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    grid-template-columns: 72px minmax(0, 1fr) auto;

    gap: 10px;
  }
`;

export const OrderItemImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 96px;
  height: 96px;

  border: 1px solid ${({ theme }) => theme.colors.border.light};

  border-radius: 12px;

  background: ${({ theme }) => theme.colors.background.softBlue};

  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    width: 104px;
    height: 104px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 96px;
    height: 96px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    width: 88px;
    height: 88px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 82px;
    height: 82px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 78px;
    height: 78px;

    border-radius: 10px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    width: 72px;
    height: 72px;
  }
`;

export const OrderItemImage = styled.img`
  display: block;

  width: 96%;
  height: 96%;

  object-fit: contain;
`;

export const OrderItemContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  min-width: 0;

  text-align: left;
`;

export const OrderItemName = styled.strong`
  display: block;

  margin: 0;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-size: 0.94rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.25;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    font-size: 0.98rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.9rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 0.86rem;
  }
`;
export const OrderItemDescription = styled.span`
  display: block;

  margin-top: 5px;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.76rem;
  line-height: 1.4;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.72rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 0.69rem;
  }
`;

export const OrderItemMeta = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;

  margin-top: 10px;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.72rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: 8px;

    font-size: 0.69rem;
  }
`;

export const OrderItemPrice = styled.strong`
  align-self: center;

  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 0.94rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  white-space: nowrap;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    font-size: 0.98rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    align-self: end;

    padding-bottom: 4px;

    font-size: 0.9rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 0.86rem;
  }
`;

export const FulfillmentPanel = styled.div`
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr);
  align-items: start;
  gap: 14px;

  padding: 16px;

  border-radius: 11px;

  background: ${({ theme }) => theme.colors.background.softBlue};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 42px minmax(0, 1fr);
    gap: 12px;
    padding: 14px;
  }
`;

export const FulfillmentIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 48px;
  height: 48px;

  border-radius: 10px;

  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.brand.primary};

  svg {
    width: 23px;
    height: 23px;
  }

  img {
    display: block;

    width: 27px;
    height: 27px;

    object-fit: contain;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 42px;
    height: 42px;
  }
`;

export const FulfillmentContent = styled.div`
  min-width: 0;

  text-align: left;
`;

export const FulfillmentEyebrow = styled.span`
  display: block;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.7rem;
  text-align: left;
`;

export const FulfillmentTitle = styled.strong`
  display: block;

  margin-top: 3px;

  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 0.92rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: left;
`;

export const FulfillmentText = styled.p`
  margin: 4px 0 0;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.74rem;
  line-height: 1.45;
  text-align: left;
`;

export const FulfillmentHours = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 6px;

  margin-top: 9px;

  text-align: left;
`;

export const FulfillmentHoursLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.72rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.69rem;
  }
`;

export const FulfillmentHoursValue = styled.strong`
  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 0.74rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.71rem;
  }
`;

export const FulfillmentMeta = styled.strong`
  display: block;

  margin-top: 8px;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-size: 0.74rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  text-align: left;
`;

export const SummaryPanel = styled.section`
  width: 100%;

  padding: 24px;

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 14px;

  background: ${({ theme }) => theme.colors.background.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 17px;
  }
`;

export const SummaryTitle = styled.h2`
  margin: 0 0 20px;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-size: 1.05rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const SummaryRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  margin-top: 14px;
`;

export const SummaryLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.78rem;
`;

export const SummaryValue = styled.strong`
  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 0.78rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  text-align: right;
`;

export const SummaryDivider = styled.div`
  width: 100%;
  height: 1px;

  margin: 20px 0;

  background: ${({ theme }) => theme.colors.border.light};
`;

export const SummaryTotalRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

export const SummaryTotalLabel = styled.strong`
  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 0.88rem;
`;

export const SummaryTotalValue = styled.strong`
  color: ${({ theme }) => theme.colors.brand.primary};

  font-size: 1.35rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const TaxMessage = styled.p`
  margin: 16px 0 0;
  padding: 11px 12px;

  border-radius: 9px;

  background: ${({ theme }) => theme.colors.background.softBlue};
  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.68rem;
  line-height: 1.45;
`;

export const PaymentMethods = styled.div`
  width: 100%;
`;

export const PaymentMethod = styled.button`
  display: grid;
  grid-template-columns: 20px 38px minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;

  width: 100%;

  padding: 15px;

  border: 1.5px solid
    ${({ $selected, theme }) =>
      $selected ? theme.colors.brand.primary : theme.colors.border.light};

  border-radius: 11px;

  background: ${({ $selected, theme }) =>
    $selected
      ? theme.colors.background.softBlue
      : theme.colors.background.primary};

  color: inherit;

  text-align: left;

  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 20px 34px minmax(0, 1fr);
  }
`;

export const PaymentMethodRadio = styled.span`
  position: relative;

  width: 18px;
  height: 18px;

  border: 1.5px solid
    ${({ $selected, theme }) =>
      $selected ? theme.colors.brand.primary : theme.colors.border.light};

  border-radius: 50%;

  ${({ $selected, theme }) =>
    $selected &&
    css`
      &::after {
        position: absolute;

        top: 50%;
        left: 50%;

        width: 9px;
        height: 9px;

        border-radius: 50%;

        background: ${theme.colors.brand.primary};

        content: "";

        transform: translate(-50%, -50%);
      }
    `}
`;

export const PaymentMethodIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 38px;
  height: 38px;

  border-radius: 8px;

  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.brand.primary};

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const PaymentMethodContent = styled.div`
  min-width: 0;
`;

export const PaymentMethodTitle = styled.strong`
  display: block;

  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 0.84rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const PaymentMethodDescription = styled.span`
  display: block;

  margin-top: 3px;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.68rem;
`;

export const PaymentProviderBadges = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

export const PaymentProviderBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-width: 34px;
  height: 22px;

  padding: 0 6px;

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 4px;

  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.brand.primary};

  font-size: 0.56rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const ContinueButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  width: 100%;
  min-height: 50px;

  margin-top: 20px;

  border: none;
  border-radius: 10px;

  background: ${({ theme }) => theme.colors.brand.primary};
  color: #ffffff;

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.86rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  cursor: pointer;

  transition: transform 180ms ease;
  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.48;
    cursor: not-allowed;
    transform: none;
  }
`;

export const SecureMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;

  margin-top: 14px;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.64rem;
  line-height: 1.4;

  text-align: center;

  svg {
    flex: 0 0 auto;

    width: 13px;
    height: 13px;
  }
`;
