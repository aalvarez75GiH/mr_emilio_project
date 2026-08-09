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

export const CartItemControlsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  width: 100%;

  margin-top: auto;
  padding-top: 14px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 10px;

    padding-top: 10px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    gap: 8px;

    padding-top: 8px;
  }
`;

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
  display: inline-flex;
  align-items: center;
  justify-content: center;

  align-self: flex-end;

  width: 34px;
  height: 34px;

  margin-top: 10px;
  padding: 0;

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 50%;

  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.secondary};

  cursor: pointer;

  transition: color 180ms ease, border-color 180ms ease, background 180ms ease;

  svg {
    width: 14px;
    height: 14px;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.brand.primary};
    background: ${({ theme }) => theme.colors.background.softBlue};
    color: ${({ theme }) => theme.colors.brand.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    position: absolute;

    right: 10px;
    bottom: -12px;

    width: 30px;
    height: 30px;

    margin: 0;

    box-shadow: 0 5px 12px rgba(18, 26, 42, 0.08);

    svg {
      width: 13px;
      height: 13px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    right: 8px;
    bottom: -11px;

    width: 28px;
    height: 28px;
  }
`;

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
  align-items: flex-start;
  gap: 14px;

  padding: 20px;

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 14px;

  background: ${({ theme }) => theme.colors.background.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    align-items: center;
    gap: 12px;

    padding: 13px 14px;

    border-radius: 12px;
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
  min-width: 0;
`;

export const SecureTitle = styled.strong`
  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 0.85rem;
`;

export const SecureMessage = styled.p`
  margin: 5px 0 0;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.72rem;
  line-height: 1.45;
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
