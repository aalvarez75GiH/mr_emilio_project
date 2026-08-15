import styled, { css } from "styled-components";

export const ReviewTransition = styled.div`
  width: 100%;
  min-height: 100vh;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    animation: ${({ $isExiting, $direction }) => {
      if (!$isExiting) {
        return css`
          review-enter 260ms cubic-bezier(0.22, 1, 0.36, 1) both
        `;
      }

      if ($direction === "back") {
        return css`
          review-back 260ms cubic-bezier(0.22, 1, 0.36, 1) both
        `;
      }

      return css`
        review-forward 260ms cubic-bezier(0.22, 1, 0.36, 1) both
      `;
    }};

    @keyframes review-enter {
      from {
        opacity: 0.96;
        transform: translateX(100%);
      }

      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes review-forward {
      from {
        opacity: 1;
        transform: translateX(0);
      }

      to {
        opacity: 0.96;
        transform: translateX(-100%);
      }
    }

    @keyframes review-back {
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

export const ReviewPage = styled.main`
  width: 100%;
  min-height: 100vh;

  background: ${({ theme }) => theme.colors.background.primary};
`;

export const ReviewContainer = styled.div`
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

export const ReviewHeader = styled.header`
  width: 100%;

  margin-bottom: 30px;

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

export const ReviewTitle = styled.h1`
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

export const ReviewSubtitle = styled.p`
  margin: 10px 0 0;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.9rem;
  line-height: 1.45;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.82rem;
  }
`;

export const ReviewLayout = styled.div`
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

export const ReviewMainColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;

  min-width: 0;
`;

export const ReviewSideColumn = styled.aside`
  min-width: 0;
`;

export const ReviewSection = styled.section`
  width: 100%;
  padding: 24px;

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 14px;

  background: ${({ theme }) => theme.colors.background.primary};

  text-align: left;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 17px;

    border-radius: 12px;
  }
`;

export const ReviewSectionTitle = styled.h2`
  margin: 0 0 18px;

  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 1rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const SummaryCard = styled.div`
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    grid-template-columns: 40px minmax(0, 1fr);

    padding: 13px;
  }
`;

export const SummaryCardIcon = styled.span`
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

    svg {
      width: 21px;
      height: 21px;
    }

    img {
      width: 24px;
      height: 24px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    width: 40px;
    height: 40px;
  }
`;

export const SummaryCardContent = styled.div`
  min-width: 0;

  text-align: left;
`;

export const SummaryEyebrow = styled.span`
  display: block;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.7rem;
`;

export const SummaryTitle = styled.strong`
  display: block;

  margin-top: 3px;

  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 0.92rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const SummaryText = styled.p`
  margin: 4px 0 0;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.74rem;
  line-height: 1.45;
`;

export const SummaryMeta = styled.strong`
  display: block;

  margin-top: 8px;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-size: 0.74rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const SummaryAction = styled.button`
  margin-top: 10px;
  padding: 0;

  border: none;

  background: transparent;
  color: ${({ theme }) => theme.colors.brand.primary};

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.76rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand.primary};
    outline-offset: 3px;
  }
`;

export const PickupDistanceWarning = styled.div`
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr);
  align-items: start;
  gap: 9px;

  width: 100%;

  margin-top: 12px;
  padding: 10px 11px;

  border: 1px solid rgba(180, 120, 0, 0.24);
  border-radius: 9px;

  background: rgba(255, 248, 230, 0.92);

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    grid-template-columns: 30px minmax(0, 1fr);
    gap: 10px;

    padding: 11px 12px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 28px minmax(0, 1fr);
    gap: 9px;

    padding: 10px 11px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    grid-template-columns: 28px minmax(0, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 10px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 27px minmax(0, 1fr);
    gap: 8px;

    padding: 9px 10px;

    border-radius: 8px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    grid-template-columns: 26px minmax(0, 1fr);

    padding: 9px;
  }
`;

export const PickupDistanceWarningIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 28px;
  height: 28px;

  border-radius: 50%;

  background: rgba(180, 120, 0, 0.12);
  color: #9a6800;

  svg {
    width: 15px;
    height: 15px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    width: 30px;
    height: 30px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 28px;
    height: 28px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    width: 28px;
    height: 28px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 28px;
    height: 28px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 27px;
    height: 27px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    width: 26px;
    height: 26px;
  }
`;

export const PickupDistanceWarningContent = styled.div`
  min-width: 0;
`;

export const PickupDistanceWarningTitle = styled.strong`
  display: block;

  color: #795200;

  font-size: 0.74rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.3;
`;

export const PickupDistanceWarningText = styled.span`
  display: block;

  margin-top: 3px;

  color: #765f2c;

  font-size: 0.69rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1.4;
`;

export const ReviewItems = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

export const ReviewItem = styled.div`
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

export const ReviewItemImageContainer = styled.div`
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

export const ReviewItemImage = styled.img`
  display: block;

  width: 96%;
  height: 96%;

  object-fit: contain;
`;

export const ReviewItemContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  min-width: 0;

  text-align: left;
`;

export const ReviewItemName = styled.strong`
  display: block;

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

export const ReviewItemDescription = styled.span`
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

export const ReviewItemMeta = styled.div`
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

export const ReviewItemPrice = styled.strong`
  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 0.94rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  white-space: nowrap;

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

export const OrderSummary = styled.section`
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

export const OrderSummaryTitle = styled.h2`
  margin: 0 0 20px;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-size: 1.05rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const OrderSummaryRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  margin-top: 14px;
`;

export const OrderSummaryLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.78rem;
`;

export const OrderSummaryValue = styled.strong`
  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 0.78rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  text-align: right;
`;

export const OrderSummaryDivider = styled.div`
  width: 100%;
  height: 1px;

  margin: 20px 0;

  background: ${({ theme }) => theme.colors.border.light};
`;

export const OrderSummaryTotalRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

export const OrderSummaryTotalLabel = styled.strong`
  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 0.88rem;
`;

export const OrderSummaryTotalValue = styled.strong`
  color: ${({ theme }) => theme.colors.brand.primary};

  font-size: 1.35rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const PlaceOrderButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-height: 50px;

  margin-top: 22px;

  border: none;
  border-radius: 10px;

  background: ${({ theme }) => theme.colors.brand.primary};
  color: #ffffff;

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.86rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  cursor: pointer;

  transition: opacity 180ms ease, transform 180ms ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.48;

    cursor: not-allowed;
  }
`;

export const PlaceOrderError = styled.div`
  width: 100%;

  margin-top: 12px;
  padding: 10px 11px;

  border: 1px solid rgba(188, 52, 52, 0.22);
  border-radius: 8px;

  background: rgba(188, 52, 52, 0.06);
  color: #9f2f2f;

  font-size: 0.7rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1.4;

  text-align: left;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding: 11px 12px;

    font-size: 0.72rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 10px 11px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    font-size: 0.7rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 0.69rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 9px 10px;

    font-size: 0.68rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 0.66rem;
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

export const ReviewUnavailableState = styled.div`
  width: 100%;

  padding: 28px 20px;

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 14px;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.86rem;
  line-height: 1.5;

  text-align: center;
`;
