import styled from "styled-components";

export const OrderHistorySection = styled.section`
  width: 100%;
  min-height: calc(100vh - ${({ theme }) => theme.sizes.header.desktopHeight});

  padding: ${({ theme }) => theme.spacing.section}
    ${({ theme }) => theme.spacing.xl}
    ${({ theme }) => theme.spacing.sectionLarge};

  background: ${({ theme }) => theme.colors.background.secondary};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding-top: ${({ theme }) => theme.spacing.sectionLarge};
    padding-bottom: ${({ theme }) => theme.spacing.sectionLarge};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-top: ${({ theme }) => theme.spacing.section};
    padding-left: ${({ theme }) => theme.spacing.xl};
    padding-right: ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    min-height: calc(
      100vh - ${({ theme }) => theme.sizes.header.desktopHeight}
    );

    padding-top: ${({ theme }) => theme.spacing.xxxl};
    padding-bottom: ${({ theme }) => theme.spacing.section};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.headerMobile}) {
    min-height: calc(100vh - ${({ theme }) => theme.sizes.header.tabletHeight});
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xxxl}
      ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.section};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: calc(100vh - ${({ theme }) => theme.sizes.header.mobileHeight});

    padding: ${({ theme }) => theme.spacing.xxl}
      ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xxxl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding-left: ${({ theme }) => theme.spacing.md};
    padding-right: ${({ theme }) => theme.spacing.md};
  }
`;

export const OrderHistoryContainer = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.layout.narrowContentWidth};

  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    max-width: ${({ theme }) => theme.sizes.layout.contentWidth};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    max-width: ${({ theme }) => theme.sizes.layout.narrowContentWidth};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    max-width: 960px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    max-width: 100%;
  }
`;

export const OrderHistoryHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    margin-bottom: ${({ theme }) => theme.spacing.xxxl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

export const OrderHistoryTitle = styled.h1`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};

  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.text_40};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.15;

  color: ${({ theme }) => theme.colors.text.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    font-size: ${({ theme }) => theme.fontSizes.text_48};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: ${({ theme }) => theme.fontSizes.text_40};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    font-size: ${({ theme }) => theme.fontSizes.text_36};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.text_32};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.text_28};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: ${({ theme }) => theme.fontSizes.text_24};
  }
`;

export const OrderHistorySubtitle = styled.p`
  max-width: 640px;

  margin: 0;

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.text_16};
  line-height: 1.6;

  color: ${({ theme }) => theme.colors.text.secondary};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    font-size: ${({ theme }) => theme.fontSizes.text_18};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: ${({ theme }) => theme.fontSizes.text_16};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    max-width: 600px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 560px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.text_14};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    line-height: 1.55;
  }
`;

export const OrdersList = styled.div`
  display: flex;
  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.xl};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    gap: ${({ theme }) => theme.spacing.xxl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    gap: ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    gap: ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const OrderCard = styled.article`
  width: 100%;

  padding: ${({ theme }) => theme.spacing.xxl};

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.sizes.radius.large};

  background: ${({ theme }) => theme.colors.background.primary};

  box-shadow: ${({ theme }) => theme.sizes.shadow.subtle};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding: ${({ theme }) => theme.spacing.xxxl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: ${({ theme }) => theme.spacing.xxl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding: ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xl};

    border-radius: ${({ theme }) => theme.sizes.radius.medium};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

export const OrderCardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  gap: ${({ theme }) => theme.spacing.xl};

  padding-bottom: ${({ theme }) => theme.spacing.xl};

  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    gap: ${({ theme }) => theme.spacing.xxl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    gap: ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    gap: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-bottom: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;

    gap: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const OrderCardHeaderGroup = styled.div`
  display: flex;
  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.xs};
`;

export const OrderNumber = styled.h2`
  margin: 0;

  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.text_22};
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  color: ${({ theme }) => theme.colors.text.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    font-size: ${({ theme }) => theme.fontSizes.text_24};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: ${({ theme }) => theme.fontSizes.text_22};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    font-size: ${({ theme }) => theme.fontSizes.text_20};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.text_20};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.text_18};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: ${({ theme }) => theme.fontSizes.text_18};
  }
`;

export const OrderDate = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.text_14};

  color: ${({ theme }) => theme.colors.text.muted};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.text_12};
  }
`;

export const OrderStatus = styled.span`
  align-self: flex-start;

  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};

  border-radius: ${({ theme }) => theme.sizes.radius.pill};

  background: ${({ theme }) => theme.colors.brand.primaryLight};

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.text_12};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-transform: capitalize;

  color: ${({ theme }) => theme.colors.text.brand};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.xs}
      ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: ${({ theme }) => theme.fontSizes.text_10};
  }
`;

export const OrderMetaGrid = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1.1fr 1.8fr;

  gap: ${({ theme }) => theme.spacing.xl};

  padding: ${({ theme }) => theme.spacing.xl} 0;

  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    grid-template-columns: 0.85fr 1.15fr 2fr;
    gap: ${({ theme }) => theme.spacing.xxl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 0.9fr 1.1fr 1.7fr;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));

    gap: ${({ theme }) => theme.spacing.lg};

    ${"" /* Address naturally moves to second row */}
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;

    padding: ${({ theme }) => theme.spacing.lg} 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const OrderMetaItem = styled.div`
  min-width: 0;

  display: flex;
  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.xs};
`;

export const OrderMetaLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.text_12};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};

  text-transform: uppercase;
  letter-spacing: 0.04em;

  color: ${({ theme }) => theme.colors.text.muted};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: ${({ theme }) => theme.fontSizes.text_10};
  }
`;

export const OrderMetaValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.text_14};
  line-height: 1.5;

  color: ${({ theme }) => theme.colors.text.primary};

  overflow-wrap: anywhere;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    font-size: ${({ theme }) => theme.fontSizes.text_16};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.text_14};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: ${({ theme }) => theme.fontSizes.text_12};
  }
`;

export const OrderItems = styled.div`
  display: flex;
  flex-direction: column;

  padding: ${({ theme }) => theme.spacing.xl} 0;

  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.lg} 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.lg} 0;
  }
`;

export const OrderItem = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  gap: ${({ theme }) => theme.spacing.xl};

  padding: ${({ theme }) => theme.spacing.md} 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    gap: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    align-items: flex-start;

    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const OrderItemContent = styled.div`
  min-width: 0;
  flex: 1;
`;

export const OrderItemName = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.xs};

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.text_16};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};

  color: ${({ theme }) => theme.colors.text.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    font-size: ${({ theme }) => theme.fontSizes.text_18};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.text_14};
  }
`;

export const OrderItemMeta = styled.p`
  margin: 0;

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.text_14};

  color: ${({ theme }) => theme.colors.text.secondary};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.text_12};
  }
`;

export const OrderItemPrice = styled.span`
  flex-shrink: 0;

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.text_16};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};

  color: ${({ theme }) => theme.colors.text.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.text_14};
  }
`;

export const OrderSummary = styled.div`
  width: 100%;
  max-width: 420px;

  display: flex;
  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.md};

  margin-left: auto;

  padding-top: ${({ theme }) => theme.spacing.xl};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    max-width: 460px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    max-width: 420px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    max-width: 400px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 100%;

    padding-top: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const OrderSummaryRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

export const OrderSummaryLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.text_14};

  color: ${({ theme }) => theme.colors.text.secondary};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: ${({ theme }) => theme.fontSizes.text_12};
  }
`;

export const OrderSummaryValue = styled.span`
  flex-shrink: 0;

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.text_14};
  font-weight: ${({ theme }) => theme.fontWeights.medium};

  color: ${({ theme }) => theme.colors.text.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: ${({ theme }) => theme.fontSizes.text_12};
  }
`;

export const OrderSummaryTotalRow = styled(OrderSummaryRow)`
  margin-top: ${({ theme }) => theme.spacing.sm};

  padding-top: ${({ theme }) => theme.spacing.lg};

  border-top: 1px solid ${({ theme }) => theme.colors.border.light};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding-top: ${({ theme }) => theme.spacing.md};
  }
`;

export const OrderSummaryTotalLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.text_18};
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  color: ${({ theme }) => theme.colors.text.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.text_16};
  }
`;

export const OrderSummaryTotalValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.text_20};
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  color: ${({ theme }) => theme.colors.text.brand};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    font-size: ${({ theme }) => theme.fontSizes.text_22};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.text_18};
  }
`;

export const PaymentDetails = styled.p`
  width: 100%;
  max-width: 420px;

  margin: ${({ theme }) => theme.spacing.xl} 0 0 auto;

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.text_14};

  color: ${({ theme }) => theme.colors.text.secondary};

  text-align: right;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    max-width: 460px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    max-width: 400px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: ${({ theme }) => theme.spacing.lg};

    font-size: ${({ theme }) => theme.fontSizes.text_12};

    text-align: left;
  }
`;

export const EmptyOrdersState = styled.div`
  width: 100%;

  padding: ${({ theme }) => theme.spacing.xxxl};

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.sizes.radius.large};

  background: ${({ theme }) => theme.colors.background.primary};

  box-shadow: ${({ theme }) => theme.sizes.shadow.subtle};

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.text_16};
  line-height: 1.6;

  text-align: center;

  color: ${({ theme }) => theme.colors.text.secondary};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding: ${({ theme }) => theme.spacing.section};
    font-size: ${({ theme }) => theme.fontSizes.text_18};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: ${({ theme }) => theme.spacing.xxxl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding: ${({ theme }) => theme.spacing.xxl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.lg};

    font-size: ${({ theme }) => theme.fontSizes.text_14};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;
