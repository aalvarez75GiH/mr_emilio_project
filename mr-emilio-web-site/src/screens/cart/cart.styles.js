import styled from "styled-components";

export const CartPage = styled.main`
  width: 100%;
  min-height: calc(100vh - ${({ theme }) => theme.sizes.header.desktopHeight});

  background: ${({ theme }) => theme.colors.background.primary};
`;

export const CartPageContainer = styled.div`
  width: 100%;
  max-width: 1280px;

  margin: 0 auto;
  padding: 42px 64px 72px;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    max-width: 1360px;
    padding: 48px 80px 80px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 40px 48px 64px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding: 36px 32px 56px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 30px 24px 48px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 24px 20px 42px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding: 22px 16px 38px;
  }
`;

export const CartHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;

  margin-bottom: 26px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    align-items: flex-start;
    gap: 14px;

    margin-bottom: 20px;
  }
`;

export const CartTitleGroup = styled.div`
  min-width: 0;

  text-align: left;
`;

export const CartTitle = styled.h1`
  margin: 0;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2.35rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.05;
  letter-spacing: -0.035em;

  span {
    color: ${({ theme }) => theme.colors.text.primary};

    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 0.48em;
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
    letter-spacing: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.75rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 1.6rem;
  }
`;

export const CartSubtitle = styled.p`
  margin: 8px 0 0;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: ${({ theme }) => theme.fontSizes.text_14};
  line-height: 1.45;
  text-align: left;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 280px;

    margin-top: 6px;

    font-size: 0.78rem;
  }
`;

export const ClearCartButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 7px;

  flex: 0 0 auto;

  padding: 8px 4px;

  border: none;

  background: transparent;
  color: ${({ theme }) => theme.colors.brand.primary};

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.82rem;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};

  cursor: pointer;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    opacity: 0.75;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 5px;

    padding-top: 4px;

    font-size: 0.72rem;

    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

export const CartLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 760px) minmax(300px, 340px);
  align-items: start;
  justify-content: center;
  gap: 28px;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    grid-template-columns: minmax(0, 800px) 360px;
    gap: 32px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr) 330px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    grid-template-columns: minmax(0, 1fr) 310px;
    gap: 24px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const CartItemsColumn = styled.section`
  min-width: 0;
`;

export const CartItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 14px;
  }
`;

export const CartItem = styled.article`
  position: relative;

  display: grid;
  grid-template-columns: 180px minmax(0, 1fr);
  gap: 24px;

  padding: 18px;

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 16px;

  background: ${({ theme }) => theme.colors.background.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    grid-template-columns: 150px minmax(0, 1fr);
    gap: 18px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 140px minmax(0, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 132px minmax(0, 1fr);
    align-items: start;
    gap: 14px;

    padding: 12px 14px 16px;

    border-radius: 12px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    grid-template-columns: 116px minmax(0, 1fr);
    gap: 12px;

    padding: 11px 12px 15px;
  }
`;

export const CartItemImageColumn = styled.div`
  min-width: 0;
`;

export const CartItemImageContainer = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  aspect-ratio: 1;

  padding: 12px;

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 12px;

  background: ${({ theme }) => theme.colors.background.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 8px;

    border-color: rgba(22, 70, 172, 0.08);
    border-radius: 10px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding: 7px;
  }
`;

export const CartItemImage = styled.img`
  display: block;

  width: 100%;
  height: 100%;

  object-fit: contain;
`;
// export const CartItemImage = styled.img`

export const CartItemSizeBadge = styled.span`
  position: absolute;

  right: -8px;
  bottom: -8px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-width: 48px;
  min-height: 48px;

  padding: 7px;

  border: 3px solid #ffffff;
  border-radius: 50%;

  background: ${({ theme }) => theme.colors.brand.primary};
  color: #ffffff;

  font-size: 0.64rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.05;
  text-align: center;
  text-transform: uppercase;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-width: 42px;
    min-height: 42px;

    font-size: 0.56rem;
  }
`;

export const CartItemContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  min-width: 0;

  text-align: left;
`;

export const CartItemHeading = styled.div`
  display: block;

  min-width: 0;

  text-align: left;
`;

export const CartItemName = styled.h2`
  margin: 0;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-size: 1.15rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.2;
  text-align: left;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.9rem;
    line-height: 1.18;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 0.84rem;
  }
`;

export const CartItemDescription = styled.p`
  margin: 4px 0 0;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.8rem;
  line-height: 1.35;
  text-align: left;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: 3px;

    font-size: 0.68rem;
    line-height: 1.3;
  }
`;

export const CartItemPrice = styled.span`
  display: block;

  margin-top: 6px;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-size: 1rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: left;

  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: 5px;

    font-size: 0.82rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 0.76rem;
  }
`;

export const CartItemBenefits = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  width: min(100%, 390px);

  margin-top: 16px;
  padding-top: 14px;

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    margin-top: 14px;
    padding-top: 12px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

export const CartItemBenefit = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 6px;

  min-width: 0;
  padding: 0 10px;

  text-align: center;

  &:not(:last-child) {
    border-right: 1px solid ${({ theme }) => theme.colors.border.light};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding-inline: 7px;
  }
`;

export const CartItemBenefitIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  color: ${({ theme }) => theme.colors.brand.primary};

  svg {
    display: block;

    width: 20px;
    height: 20px;
  }
`;

export const CartItemBenefitLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.67rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1.25;
`;

export const CartItemControlsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  width: 100%;

  margin-top: auto;
  padding-top: 32px;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding-top: 34px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-top: 32px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding-top: 28px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-top: 24px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 10px;

    padding-top: 10px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    gap: 8px;

    padding-top: 8px;
  }
`;
// export const CartItemControlsRow = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   gap: 12px;

//   width: 100%;

//   margin-top: auto;
//   padding-top: 14px;

//   @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
//     gap: 10px;

//     padding-top: 10px;
//   }

//   @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
//     gap: 8px;

//     padding-top: 8px;
//   }
// `;

export const QuantityControl = styled.div`
  display: grid;
  grid-template-columns: 38px 42px 38px;
  align-items: center;

  min-height: 42px;

  overflow: hidden;

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 9px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 30px 34px 30px;

    min-height: 34px;

    border-radius: 8px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    grid-template-columns: 28px 32px 28px;

    min-height: 32px;
  }
`;

export const QuantityButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  padding: 0;

  border: none;

  background: transparent;
  color: ${({ theme }) => theme.colors.text.primary};

  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.background.softBlue};
    color: ${({ theme }) => theme.colors.brand.primary};
  }

  &:disabled {
    opacity: 0.28;
    cursor: not-allowed;
  }
`;

export const QuantityValue = styled.span`
  text-align: center;

  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 0.94rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const CartItemLineTotal = styled.strong`
  flex: 0 0 auto;

  min-width: 72px;

  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 0.95rem;
  text-align: right;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-width: 58px;

    font-size: 0.82rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    min-width: 52px;

    font-size: 0.78rem;
  }
`;

export const RemoveItemButton = styled.button`
  position: absolute;
  top: 48px;
  right: 28px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 34px;
  height: 34px;

  padding: 0;

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 50%;

  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 15px;

  cursor: pointer;

  transition: color 180ms ease, border-color 180ms ease, background 180ms ease;

  svg {
    width: 1em;
    height: 1em;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.brand.primary};
    border-color: ${({ theme }) => theme.colors.brand.primary};
    background: ${({ theme }) => theme.colors.background.softBlue};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand.primary};
    outline-offset: 2px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    top: 48px;
    right: 30px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    top: 46px;
    right: 24px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    top: 44px;
    right: 22px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    top: 42px;
    right: 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    top: auto;
    right: 12px;
    bottom: -14px;

    width: 30px;
    height: 30px;

    font-size: 13px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    right: 10px;
    bottom: -13px;

    width: 28px;
    height: 28px;
  }
`;
// export const RemoveItemButton = styled.button`
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;

//   align-self: flex-end;

//   width: 34px;
//   height: 34px;

//   margin-top: 10px;
//   padding: 0;

//   border: 1px solid ${({ theme }) => theme.colors.border.light};
//   border-radius: 50%;

//   background: ${({ theme }) => theme.colors.background.primary};
//   color: ${({ theme }) => theme.colors.text.secondary};

//   cursor: pointer;

//   transition: color 180ms ease, border-color 180ms ease, background 180ms ease;

//   svg {
//     width: 14px;
//     height: 14px;
//   }

//   &:hover {
//     border-color: ${({ theme }) => theme.colors.brand.primary};
//     background: ${({ theme }) => theme.colors.background.softBlue};
//     color: ${({ theme }) => theme.colors.brand.primary};
//   }

//   @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
//     position: absolute;

//     right: 10px;
//     bottom: -12px;

//     width: 30px;
//     height: 30px;

//     margin: 0;

//     box-shadow: 0 5px 12px rgba(18, 26, 42, 0.08);

//     svg {
//       width: 13px;
//       height: 13px;
//     }
//   }

//   @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
//     right: 8px;
//     bottom: -11px;

//     width: 28px;
//     height: 28px;
//   }
// `;

export const CartSummaryColumn = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 20px;

  position: sticky;
  top: calc(${({ theme }) => theme.sizes.header.desktopHeight} + 24px);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    position: static;

    margin-top: 8px;
  }
`;

export const OrderSummary = styled.section`
  padding: 24px;

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 16px;

  background: ${({ theme }) => theme.colors.background.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 16px;

    border-radius: 12px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding: 14px;
  }
`;

export const OrderSummaryTitle = styled.h2`
  margin: 0 0 22px;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-size: 1.3rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: left;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: 14px;

    font-size: 1rem;
  }
`;

export const SummaryRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;

  margin-bottom: 14px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: 11px;
  }
`;

export const SummaryLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.82rem;
`;

export const SummaryValue = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 0.82rem;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  text-align: right;
`;

export const SummaryDivider = styled.div`
  width: 100%;
  height: 1px;

  margin: 20px 0;

  background: ${({ theme }) => theme.colors.border.light};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin: 14px 0;
  }
`;

export const SummaryTotalRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

export const SummaryTotalLabel = styled.strong`
  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 0.92rem;
`;

export const SummaryTotalValue = styled.strong`
  color: ${({ theme }) => theme.colors.brand.primary};

  font-size: 1.55rem;
  line-height: 1;
`;

export const ShippingMessage = styled.div`
  margin-top: 20px;
  padding: 12px 14px;

  border-radius: 9px;

  background: ${({ theme }) => theme.colors.background.softBlue};
  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.73rem;
  line-height: 1.4;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: 14px;
    padding: 9px 11px;

    font-size: 0.67rem;
    line-height: 1.35;
  }
`;

export const CheckoutButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  width: 100%;
  min-height: 50px;

  margin-top: 20px;
  padding: 0 20px;

  border: none;
  border-radius: 999px;

  background: ${({ theme }) => theme.colors.brand.primary};
  color: #ffffff;

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.92rem;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};

  cursor: pointer;

  transition: transform 180ms ease, opacity 180ms ease, box-shadow 180ms ease;

  &:hover {
    transform: translateY(-2px);

    box-shadow: 0 10px 22px rgba(22, 70, 172, 0.2);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 44px;

    margin-top: 16px;

    font-size: 0.82rem;
  }
`;

export const ContinueShoppingButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  width: 100%;
  min-height: 48px;

  margin-top: 12px;

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 999px;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-size: 0.86rem;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};

  text-decoration: none;
`;

export const SecurePanel = styled.section`
  display: flex;
  align-items: center;
  gap: 16px;

  width: 100%;

  margin-top: 22px;
  padding: 20px 22px;

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 14px;

  background: linear-gradient(
    90deg,
    rgba(235, 242, 253, 0.72) 0%,
    rgba(255, 255, 255, 1) 72%
  );

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    margin-top: 24px;
    padding: 22px 24px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-top: 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding: 18px 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-top: 18px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 12px;

    margin-top: 18px;
    padding: 14px 16px;

    border-radius: 12px;

    background: ${({ theme }) => theme.colors.background.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding: 13px 14px;
  }
`;

export const SecureIcon = styled.span`
  display: inline-flex;

  flex: 0 0 auto;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-size: 26px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 22px;
  }
`;

export const SecureContent = styled.div`
  flex: 1;
  min-width: 0;

  text-align: left;
`;

export const SecureTitle = styled.strong`
  display: block;

  width: 100%;

  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 0.85rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.25;
  text-align: left;
`;

export const SecureMessage = styled.p`
  width: 100%;

  margin: 5px 0 0;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.72rem;
  line-height: 1.45;
  text-align: left;
`;

export const EmptyCart = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;

  max-width: 520px;

  margin: 90px auto;
  padding: 52px 32px;

  text-align: center;

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 18px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin: 48px auto;
    padding: 42px 24px;
  }
`;

export const EmptyCartIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 68px;
  height: 68px;

  margin-bottom: 20px;

  border-radius: 50%;

  background: ${({ theme }) => theme.colors.background.softBlue};
  color: ${({ theme }) => theme.colors.brand.primary};

  font-size: 30px;
`;

export const EmptyCartTitle = styled.h1`
  margin: 0;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-size: 1.8rem;
`;

export const EmptyCartMessage = styled.p`
  max-width: 360px;

  margin: 10px 0 24px;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.9rem;
  line-height: 1.5;
`;

export const EmptyCartButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-height: 48px;

  padding: 0 24px;

  border-radius: 999px;

  background: ${({ theme }) => theme.colors.brand.primary};
  color: #ffffff;

  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  text-decoration: none;
`;

export const PaymentPanel = styled.section`
  padding: 20px;

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 14px;

  background: ${({ theme }) => theme.colors.background.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 16px;

    border: none;
    border-radius: 0;
  }
`;

export const PaymentPanelTitle = styled.h3`
  margin: 0 0 14px;

  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 0.76rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.2;
  text-align: left;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: 12px;
    font-size: 0.72rem;
  }
`;

export const PaymentMethods = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;

  width: 100%;
`;

export const PaymentMethod = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-width: 44px;
  height: 28px;

  padding: 0 7px;

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 4px;

  background: #ffffff;
  color: ${({ $variant }) =>
    $variant === "amex"
      ? "#1877b8"
      : $variant === "google"
      ? "#303134"
      : "#1746a2"};

  font-family: Arial, sans-serif;
  font-size: 0.67rem;
  font-weight: 700;
  line-height: 1;

  ${({ $variant }) =>
    $variant === "mastercard" &&
    `
      min-width: 46px;

      span {
        width: 15px;
        height: 15px;

        border-radius: 50%;
      }

      span:first-child {
        margin-right: -4px;
        background: #eb001b;
      }

      span:last-child {
        background: #f79e1b;
      }
    `}

  ${({ $variant }) =>
    $variant === "apple" &&
    `
      color: #111111;
      font-weight: 600;
    `}

  strong {
    margin-right: 2px;

    font-size: 0.9rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-width: 42px;
    height: 27px;

    font-size: 0.63rem;
  }
`;

export const TrustBenefitsPanel = styled.section`
  display: flex;
  flex-direction: column;
  gap: 22px;

  padding: 22px 20px;

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 14px;

  background: ${({ theme }) => theme.colors.background.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

export const TrustBenefit = styled.div`
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr);
  align-items: start;
  gap: 12px;

  min-width: 0;
`;

export const TrustBenefitIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  color: ${({ theme }) => theme.colors.brand.primary};

  svg {
    width: 25px;
    height: 25px;
  }
`;

export const TrustBenefitContent = styled.div`
  min-width: 0;

  text-align: left;
`;

export const TrustBenefitTitle = styled.strong`
  display: block;

  margin-bottom: 5px;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-size: 0.76rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.25;
  text-align: left;
`;

export const TrustBenefitMessage = styled.p`
  margin: 0;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.68rem;
  line-height: 1.45;
  text-align: left;
`;
// export const TrustBenefitContent = styled.div`
//   min-width: 0;
// `;

// export const TrustBenefitTitle = styled.strong`
//   display: block;

//   margin-bottom: 5px;

//   color: ${({ theme }) => theme.colors.brand.primary};

//   font-size: 0.76rem;
//   font-weight: ${({ theme }) => theme.fontWeights.bold};
//   line-height: 1.25;
// `;

// export const TrustBenefitMessage = styled.p`
//   margin: 0;

//   color: ${({ theme }) => theme.colors.text.secondary};

//   font-size: 0.68rem;
//   line-height: 1.45;
// `;
