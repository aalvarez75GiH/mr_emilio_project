import styled from "styled-components";

export const ConfirmationPage = styled.main`
  width: 100%;
  min-height: 100vh;

  padding: 42px 24px 64px;

  background: ${({ theme }) => theme.colors.background.softBlue};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding: 54px 32px 76px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 42px 28px 64px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding: 38px 24px 58px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 28px 20px 48px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding: 0;
  }
`;

export const ConfirmationContainer = styled.div`
  width: 100%;
  max-width: 560px;

  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    max-width: 590px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    max-width: 550px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    max-width: 540px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 520px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: none;
  }
`;

export const ConfirmationSectionContent = styled.div`
  min-width: 0;

  text-align: left;
`;

export const ConfirmationCard = styled.div`
  position: relative;

  width: 100%;

  padding: 0 22px 28px;

  border-radius: 26px;

  background: ${({ theme }) => theme.colors.background.primary};

  box-shadow: 0 18px 55px rgba(16, 38, 89, 0.12);

  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding: 0 26px 32px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 0 22px 28px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding: 0 21px 28px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 20px 26px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 100vh;

    padding: 0 18px 30px;

    border-radius: 0;

    box-shadow: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding: 0 15px 28px;
  }
`;

export const ConfirmationBanner = styled.div`
  width: calc(100% + 44px);

  margin-left: -22px;

  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    width: calc(100% + 52px);
    margin-left: -26px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: calc(100% + 44px);
    margin-left: -22px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    width: calc(100% + 42px);
    margin-left: -21px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: calc(100% + 40px);
    margin-left: -20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: calc(100% + 36px);
    margin-left: -18px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    width: calc(100% + 30px);
    margin-left: -15px;
  }
`;

export const ConfirmationBannerImage = styled.img`
  display: block;

  width: 100%;
  height: auto;

  object-fit: contain;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    width: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    width: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    width: 100%;
  }
`;
// export const ConfirmationBannerImage = styled.img`
//   display: block;

//   width: 100%;
//   height: 205px;

//   object-fit: cover;
//   object-position: center;

//   @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
//     height: 220px;
//   }

//   @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
//     height: 200px;
//   }

//   @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
//     height: 190px;
//   }

//   @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
//     height: 180px;
//   }

//   @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
//     height: 175px;
//   }

//   @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
//     height: 155px;
//   }
// `;

export const ConfirmationSuccessIcon = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 54px;
  height: 54px;

  margin: -27px auto 0;

  border: 5px solid ${({ theme }) => theme.colors.background.primary};
  border-radius: 50%;

  background: #24a45a;
  color: #ffffff;

  z-index: 2;

  svg {
    width: 27px;
    height: 27px;

    stroke-width: 3;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 50px;
    height: 50px;

    margin-top: -25px;

    svg {
      width: 25px;
      height: 25px;
    }
  }
`;

export const ConfirmationHeader = styled.header`
  margin-top: 8px;
  margin-bottom: 20px;

  text-align: center;
`;

export const ConfirmationTitle = styled.h1`
  margin: 0;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.15;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.72rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 1.55rem;
  }
`;

export const ConfirmationSubtitle = styled.p`
  margin: 8px 0 0;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.86rem;
  line-height: 1.45;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.8rem;
  }
`;

export const OrderNumberCard = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  width: 100%;

  margin-bottom: 12px;
  padding: 15px 17px;

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 14px;

  background: ${({ theme }) => theme.colors.background.primary};

  text-align: left;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding: 17px 19px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 15px 17px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding: 15px 16px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 14px 16px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 14px 15px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding: 13px 14px;
  }
`;

export const CopyOrderButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  flex: 0 0 auto;

  width: 36px;
  height: 36px;

  padding: 0;

  border: none;
  border-radius: 8px;

  background: transparent;
  color: ${({ theme }) => theme.colors.brand.primary};

  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.background.softBlue};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand.primary};
    outline-offset: 2px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 34px;
    height: 34px;

    svg {
      width: 19px;
      height: 19px;
    }
  }
`;
export const OrderNumberContent = styled.div`
  min-width: 0;
`;

export const OrderNumberLabel = styled.span`
  display: block;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-size: 0.72rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const OrderNumberValue = styled.strong`
  display: block;

  margin-top: 3px;

  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 1rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: 0.02em;
`;

export const ConfirmationSection = styled.section`
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr);
  align-items: start;
  gap: 12px;

  width: 100%;

  margin-top: 12px;
  padding: 16px;

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 14px;

  background: ${({ theme }) => theme.colors.background.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    grid-template-columns: 46px minmax(0, 1fr);
    gap: 14px;

    padding: 18px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 44px minmax(0, 1fr);
    gap: 12px;

    padding: 16px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding: 15px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 15px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 42px minmax(0, 1fr);

    padding: 14px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    grid-template-columns: 40px minmax(0, 1fr);
    gap: 10px;

    padding: 13px;
  }
`;

export const ConfirmationSectionIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 44px;
  height: 44px;

  border-radius: 50%;

  background: ${({ theme }) => theme.colors.background.softBlue};
  color: ${({ theme }) => theme.colors.brand.primary};

  svg {
    width: 21px;
    height: 21px;
  }

  img {
    display: block;

    width: 23px;
    height: 23px;

    object-fit: contain;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    width: 46px;
    height: 46px;

    svg {
      width: 22px;
      height: 22px;
    }

    img {
      width: 24px;
      height: 24px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 44px;
    height: 44px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    width: 44px;
    height: 44px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 44px;
    height: 44px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 42px;
    height: 42px;

    svg {
      width: 20px;
      height: 20px;
    }

    img {
      width: 22px;
      height: 22px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    width: 40px;
    height: 40px;

    img {
      width: 21px;
      height: 21px;
    }
  }
`;

export const ConfirmationEyebrow = styled.span`
  display: block;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-size: 0.72rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const ConfirmationSectionTitle = styled.strong`
  display: block;

  margin-top: 2px;

  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 0.92rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.35;
`;

export const ConfirmationText = styled.p`
  margin: 4px 0 0;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.75rem;
  line-height: 1.45;

  strong {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const FulfillmentMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;

  margin-top: 12px;

  color: ${({ theme }) => theme.colors.brand.primary};

  svg {
    flex: 0 0 auto;

    width: 18px;
    height: 18px;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  span {
    color: ${({ theme }) => theme.colors.text.secondary};

    font-size: 0.68rem;
  }
`;

export const FulfillmentMetaStrong = styled.strong`
  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 0.78rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const OrderItems = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  margin-top: 10px;
`;

export const OrderItem = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;

  padding: 5px 0;
`;

export const OrderItemContent = styled.div`
  min-width: 0;
`;

export const OrderItemName = styled.strong`
  display: block;

  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 0.76rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const OrderItemMeta = styled.span`
  display: block;

  margin-top: 2px;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.67rem;
`;

export const OrderItemPrice = styled.strong`
  flex: 0 0 auto;

  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 0.76rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};

  white-space: nowrap;
`;

export const OrderPricingDivider = styled.div`
  width: 100%;
  height: 1px;

  margin: 11px 0 8px;

  background: ${({ theme }) => theme.colors.border.light};
`;

export const OrderPricingRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;

  margin-top: 7px;
`;

export const OrderPricingLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.75rem;
`;

export const OrderPricingValue = styled.strong`
  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const OrderTotalRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  margin-top: 9px;
`;

export const OrderTotalLabel = styled.strong`
  color: ${({ theme }) => theme.colors.brand.primary};

  font-size: 1rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const OrderTotalValue = styled.strong`
  color: ${({ theme }) => theme.colors.brand.primary};

  font-size: 1.15rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const PaymentRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;

  width: 100%;

  margin-top: 3px;
`;

export const PaymentDetails = styled.div`
  min-width: 0;

  ${ConfirmationText} {
    margin-top: 0;

    color: ${({ theme }) => theme.colors.text.primary};

    font-size: 0.76rem;
  }
`;

export const PaymentAmountGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  flex: 0 0 auto;

  strong {
    color: ${({ theme }) => theme.colors.brand.primary};

    font-size: 0.82rem;
    font-weight: ${({ theme }) => theme.fontWeights.bold};

    white-space: nowrap;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    gap: 7px;

    strong {
      font-size: 0.78rem;
    }
  }
`;
// export const PaymentRow = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   gap: 14px;

//   width: 100%;
// `;

export const PaymentStatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  flex: 0 0 auto;

  min-height: 27px;

  padding: 4px 10px;

  border-radius: 999px;

  background: rgba(36, 164, 90, 0.12);
  color: #168244;

  font-size: 0.68rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const NextStepsCard = styled.section`
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr);
  gap: 12px;

  width: 100%;

  margin-top: 12px;
  padding: 16px;

  border: 1px solid rgba(33, 105, 214, 0.18);
  border-radius: 14px;

  background: ${({ theme }) => theme.colors.background.softBlue};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 42px minmax(0, 1fr);

    padding: 14px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    grid-template-columns: 40px minmax(0, 1fr);
    gap: 10px;

    padding: 13px;
  }
`;

export const ContinueShoppingButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-height: 48px;

  margin-top: 18px;

  border: none;
  border-radius: 10px;

  background: ${({ theme }) => theme.colors.brand.primary};
  color: #ffffff;

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.84rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  cursor: pointer;

  transition: transform 180ms ease, opacity 180ms ease;

  &:hover {
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand.primary};
    outline-offset: 3px;
  }
`;

export const ConfirmationUnavailable = styled.div`
  width: 100%;

  padding: 34px 24px;

  border-radius: 16px;

  background: ${({ theme }) => theme.colors.background.primary};

  text-align: center;

  h1 {
    margin: 0;

    color: ${({ theme }) => theme.colors.brand.primary};

    font-size: 1.3rem;
  }

  p {
    margin: 10px 0 0;

    color: ${({ theme }) => theme.colors.text.secondary};

    font-size: 0.82rem;
  }
`;

export const SupportLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  width: fit-content;

  margin: 18px auto 0;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-size: 0.76rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};

  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand.primary};
    outline-offset: 3px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: 17px;

    font-size: 0.74rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 0.71rem;
  }
`;

export const SupportIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 17px;
    height: 17px;
  }
`;
