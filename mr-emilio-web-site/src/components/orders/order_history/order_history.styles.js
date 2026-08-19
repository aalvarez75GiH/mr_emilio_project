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
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-top: ${({ theme }) => theme.spacing.section};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding-top: ${({ theme }) => theme.spacing.xxxl};
    padding-bottom: ${({ theme }) => theme.spacing.section};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.headerMobile}) {
    min-height: calc(100vh - ${({ theme }) => theme.sizes.header.tabletHeight});
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xxl}
      ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.section};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: calc(100vh - ${({ theme }) => theme.sizes.header.mobileHeight});

    padding: ${({ theme }) => theme.spacing.xl}
      ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xxxl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding-left: ${({ theme }) => theme.spacing.md};
    padding-right: ${({ theme }) => theme.spacing.md};
  }
`;

export const OrderMetaIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  color: ${({ theme }) => theme.colors.brand.primary};

  svg {
    width: 18px;
    height: 18px;
    display: block;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.wide}) {
    svg {
      width: 18px;
      height: 18px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    svg {
      width: 18px;
      height: 18px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    svg {
      width: 17px;
      height: 17px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    svg {
      width: 16px;
      height: 16px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    svg {
      width: 15px;
      height: 15px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    svg {
      width: 14px;
      height: 14px;
    }
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
`;

export const OrderHistoryHeader = styled.div`
  width: 100%;

  margin-bottom: ${({ theme }) => theme.spacing.xxl};

  text-align: left;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    margin-bottom: ${({ theme }) => theme.spacing.xxxl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;
// export const OrderHistoryHeader = styled.div`
//   margin-bottom: ${({ theme }) => theme.spacing.xxl};

//   @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
//     margin-bottom: ${({ theme }) => theme.spacing.xxxl};
//   }

//   @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
//     margin-bottom: ${({ theme }) => theme.spacing.xl};
//   }

//   @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
//     margin-bottom: ${({ theme }) => theme.spacing.lg};
//   }
// `;

export const OrderHistoryTitle = styled.h1`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};

  font-family: ${({ theme }) => theme.fonts.heading};

  font-size: ${({ theme }) => theme.fontSizes.text_40};

  font-weight: ${({ theme }) => theme.fontWeights.bold};

  line-height: 1.15;

  color: ${({ theme }) => theme.colors.brand.primary};

  text-align: left;

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
    font-size: ${({ theme }) => theme.fontSizes.text_28};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.text_24};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: ${({ theme }) => theme.fontSizes.text_22};
  }
`;

export const OrderHistorySubtitle = styled.p`
  margin: 0;

  max-width: 720px;

  font-family: ${({ theme }) => theme.fonts.body};

  font-size: ${({ theme }) => theme.fontSizes.text_16};

  line-height: 1.6;

  color: ${({ theme }) => theme.colors.text.secondary};

  text-align: left;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    font-size: ${({ theme }) => theme.fontSizes.text_18};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: ${({ theme }) => theme.fontSizes.text_16};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    font-size: ${({ theme }) => theme.fontSizes.text_16};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.text_14};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.text_14};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: ${({ theme }) => theme.fontSizes.text_12};
  }
`;

export const OrdersList = styled.div`
  display: flex;
  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.xl};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    gap: ${({ theme }) => theme.spacing.xxl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const OrderCard = styled.article`
  width: 100%;
  overflow: hidden;

  padding: ${({ theme }) => theme.spacing.xl};

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.sizes.radius.large};

  background: ${({ theme }) => theme.colors.background.primary};

  box-shadow: ${({ theme }) => theme.sizes.shadow.subtle};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding: ${({ theme }) => theme.spacing.xxl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding: ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.lg};

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
  position: relative;

  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;

  align-items: start;

  gap: ${({ theme }) => theme.spacing.lg};

  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: ${({ theme }) => theme.spacing.md};

    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

export const OrderCardHeaderGroup = styled.div`
  min-width: 0;

  display: flex;
  flex-direction: column;

  align-items: flex-start;

  gap: ${({ theme }) => theme.spacing.xs};

  text-align: left;
`;

export const OrderHeaderPrimaryRow = styled.div`
  display: flex;

  align-items: center;

  flex-wrap: wrap;

  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;
export const OrderNumberLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};

  font-size: ${({ theme }) => theme.fontSizes.text_12};

  font-weight: ${({ theme }) => theme.fontWeights.medium};

  line-height: 1.2;

  color: ${({ theme }) => theme.colors.text.muted};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    font-size: ${({ theme }) => theme.fontSizes.text_12};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: ${({ theme }) => theme.fontSizes.text_12};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    font-size: ${({ theme }) => theme.fontSizes.text_10};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.text_10};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.text_10};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 0.55rem;
  }
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

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    font-size: ${({ theme }) => theme.fontSizes.text_20};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.text_16};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.text_14};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: ${({ theme }) => theme.fontSizes.text_12};
  }
`;

export const OrderDate = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};

  font-size: ${({ theme }) => theme.fontSizes.text_14};

  color: ${({ theme }) => theme.colors.text.muted};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.text_10};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 0.55rem;
  }
`;

export const OrderStatus = styled.span`
  display: inline-flex;

  align-items: center;

  width: fit-content;

  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};

  border-radius: ${({ theme }) => theme.sizes.radius.pill};

  background: ${({ $status }) =>
    $status === "delivered" ? "#EEE7FF" : "#E7F8EE"};

  font-family: ${({ theme }) => theme.fonts.body};

  font-size: ${({ theme }) => theme.fontSizes.text_12};

  font-weight: ${({ theme }) => theme.fontWeights.semiBold};

  color: ${({ $status, theme }) =>
    $status === "delivered" ? "#6941C6" : theme.colors.state.success};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 3px ${({ theme }) => theme.spacing.sm};

    font-size: ${({ theme }) => theme.fontSizes.text_10};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 0.5rem;
  }
`;

export const OrderCardHeaderRight = styled.div`
  display: flex;

  flex-direction: column;

  align-items: flex-end;

  gap: ${({ theme }) => theme.spacing.xs};

  flex-shrink: 0;
`;

export const OrderHeaderTotal = styled.strong`
  font-family: ${({ theme }) => theme.fonts.heading};

  font-size: ${({ theme }) => theme.fontSizes.text_24};

  font-weight: ${({ theme }) => theme.fontWeights.bold};

  color: ${({ theme }) => theme.colors.brand.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    font-size: ${({ theme }) => theme.fontSizes.text_28};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    font-size: ${({ theme }) => theme.fontSizes.text_22};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.text_16};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: ${({ theme }) => theme.fontSizes.text_14};
  }
`;

export const OrderHeaderPayment = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};

  font-size: ${({ theme }) => theme.fontSizes.text_12};

  color: ${({ theme }) => theme.colors.text.secondary};

  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 0.55rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 0.5rem;
  }
`;

export const OrderCollapseButton = styled.button`
  width: 30px;

  height: 30px;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 0;

  border: none;

  border-radius: ${({ theme }) => theme.sizes.radius.round};

  background: ${({ theme }) => theme.colors.background.softBlue};

  color: ${({ theme }) => theme.colors.text.primary};

  cursor: pointer;

  svg {
    width: 16px;

    height: 16px;

    transform: ${({ $expanded }) =>
      $expanded ? "rotate(180deg)" : "rotate(0deg)"};

    transition: transform 160ms ease;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 24px;

    height: 24px;

    svg {
      width: 13px;

      height: 13px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    width: 20px;

    height: 20px;

    svg {
      width: 11px;

      height: 11px;
    }
  }
`;

/* TIMELINE */

export const OrderTimeline = styled.div`
  --timeline-steps: ${({ $stepCount }) => $stepCount};

  position: relative;

  display: grid;
  grid-template-columns: repeat(
    ${({ $stepCount }) => $stepCount},
    minmax(0, 1fr)
  );

  width: 100%;

  padding: 0 ${({ theme }) => theme.spacing.xl}
    ${({ theme }) => theme.spacing.lg};

  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding-left: ${({ theme }) => theme.spacing.xxl};
    padding-right: ${({ theme }) => theme.spacing.xxl};
    padding-bottom: ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-left: ${({ theme }) => theme.spacing.xl};
    padding-right: ${({ theme }) => theme.spacing.xl};
    padding-bottom: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding-left: ${({ theme }) => theme.spacing.lg};
    padding-right: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 0 ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    /* Approved responsive behavior:
       timeline always stays horizontal. */
    padding-bottom: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

export const OrderTimelineTrack = styled.div`
  position: absolute;

  top: 16px;

  left: calc(50% / var(--timeline-steps));

  right: calc(50% / var(--timeline-steps));

  height: 2px;

  background: ${({ theme }) => theme.colors.border.medium};

  z-index: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    top: 12px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    top: 10px;
  }
`;

export const OrderTimelineStep = styled.div`
  position: relative;

  z-index: 1;

  min-width: 0;

  display: flex;

  flex-direction: column;

  align-items: center;

  text-align: center;
`;

export const OrderTimelineNode = styled.div`
  width: 32px;
  height: 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: ${({ theme }) => theme.sizes.radius.round};

  background: ${({ $completed, $status, theme }) => {
    if (!$completed) {
      return theme.colors.border.medium;
    }

    if ($status === "order_placed") {
      return theme.colors.brand.primary;
    }

    if ($status === "out_for_delivery") {
      return theme.colors.state.warning;
    }

    return theme.colors.state.success;
  }};

  color: ${({ theme }) => theme.colors.text.inverse};

  box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.background.primary};

  svg {
    width: 14px;
    height: 14px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    width: 34px;
    height: 34px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 32px;
    height: 32px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    width: 30px;
    height: 30px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 24px;
    height: 24px;

    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.background.primary};

    svg {
      width: 11px;
      height: 11px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 24px;
    height: 24px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    width: 20px;
    height: 20px;

    svg {
      width: 9px;
      height: 9px;
    }
  }
`;

export const OrderTimelineLabel = styled.span`
  margin-top: ${({ theme }) => theme.spacing.sm};

  font-family: ${({ theme }) => theme.fonts.body};

  font-size: ${({ theme }) => theme.fontSizes.text_14};

  font-weight: ${({ theme }) => theme.fontWeights.semiBold};

  line-height: 1.25;

  color: ${({ theme }) => theme.colors.text.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-top: ${({ theme }) => theme.spacing.xs};

    font-size: ${({ theme }) => theme.fontSizes.text_10};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 0.5rem;
  }
`;

export const OrderTimelineDate = styled.span`
  min-height: 32px;

  display: flex;

  flex-direction: column;

  margin-top: ${({ theme }) => theme.spacing.xs};

  font-family: ${({ theme }) => theme.fonts.body};

  font-size: ${({ theme }) => theme.fontSizes.text_12};

  line-height: 1.35;

  color: ${({ theme }) => theme.colors.text.muted};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: 24px;

    font-size: 0.55rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 0.48rem;
  }
`;

/* DESKTOP / LAPTOP */

export const DesktopOrderDetails = styled.div`
  display: block;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

export const DesktopMetaGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(3, minmax(0, 1fr));

  padding: ${({ theme }) => theme.spacing.lg} 0;

  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));

    padding: ${({ theme }) => theme.spacing.xl} 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));

    padding: ${({ theme }) => theme.spacing.lg} 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));

    padding: ${({ theme }) => theme.spacing.md} 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;
export const DesktopMetaItem = styled.div`
  min-width: 0;

  display: grid;
  grid-template-columns: auto minmax(0, 1fr);

  align-items: start;

  column-gap: 0;

  padding: 0 ${({ theme }) => theme.spacing.xl};

  border-right: 1px solid ${({ theme }) => theme.colors.border.light};

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
    border-right: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding-left: ${({ theme }) => theme.spacing.xl};
    padding-right: ${({ theme }) => theme.spacing.xl};

    &:first-child {
      padding-left: 0;
    }

    &:last-child {
      padding-right: 0;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-left: ${({ theme }) => theme.spacing.lg};
    padding-right: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding-left: ${({ theme }) => theme.spacing.md};
    padding-right: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-left: ${({ theme }) => theme.spacing.sm};
    padding-right: ${({ theme }) => theme.spacing.sm};
  }
`;

export const DesktopMetaIcon = styled.div`
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 2px;

  color: ${({ theme }) => theme.colors.brand.primary};

  svg {
    display: block;

    width: ${({ theme }) => theme.sizes.icon.small};
    height: ${({ theme }) => theme.sizes.icon.small};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    svg {
      width: ${({ theme }) => theme.sizes.icon.medium};
      height: ${({ theme }) => theme.sizes.icon.medium};
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    svg {
      width: ${({ theme }) => theme.sizes.icon.small};
      height: ${({ theme }) => theme.sizes.icon.small};
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    svg {
      width: 16px;
      height: 16px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    svg {
      width: 14px;
      height: 14px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    svg {
      width: 13px;
      height: 13px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    svg {
      width: 12px;
      height: 12px;
    }
  }
`;

export const DesktopMetaContent = styled.div`
  min-width: 0;

  display: flex;
  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.xs};

  padding-left: ${({ theme }) => theme.spacing.lg};

  text-align: left;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding-left: ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-left: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding-left: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-left: ${({ theme }) => theme.spacing.sm};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding-left: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding-left: 0;
  }
`;

export const DesktopMetaLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};

  font-size: ${({ theme }) => theme.fontSizes.text_12};

  color: ${({ theme }) => theme.colors.text.muted};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.text_10};
  }
`;

export const DesktopMetaValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};

  font-size: ${({ theme }) => theme.fontSizes.text_14};

  font-weight: ${({ theme }) => theme.fontWeights.medium};

  line-height: 1.45;

  color: ${({ theme }) => theme.colors.text.primary};

  overflow-wrap: anywhere;

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    font-size: ${({ theme }) => theme.fontSizes.text_12};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.text_10};
  }
`;

export const DesktopBottomGrid = styled.div`
  display: grid;

  grid-template-columns: minmax(0, 1.7fr) minmax(280px, 0.85fr);

  align-items: ${({ $singleItem }) => ($singleItem ? "start" : "stretch")};

  gap: ${({ theme }) => theme.spacing.xl};

  padding-top: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    grid-template-columns: minmax(0, 1.8fr) minmax(320px, 0.8fr);

    gap: ${({ theme }) => theme.spacing.xxl};

    padding-top: ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1.7fr) minmax(280px, 0.85fr);

    gap: ${({ theme }) => theme.spacing.xl};

    padding-top: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    grid-template-columns: minmax(0, 1.5fr) minmax(260px, 0.85fr);

    gap: ${({ theme }) => theme.spacing.lg};

    padding-top: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: minmax(0, 1.45fr) minmax(220px, 0.9fr);

    gap: ${({ theme }) => theme.spacing.md};

    padding-top: ${({ theme }) => theme.spacing.md};
  }
`;

export const DesktopOrderItems = styled.div`
  display: flex;
  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.lg};

  padding-right: ${({ theme }) => theme.spacing.xl};

  border-right: 1px solid ${({ theme }) => theme.colors.border.light};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    gap: ${({ theme }) => theme.spacing.xl};

    padding-right: ${({ theme }) => theme.spacing.xxl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    gap: ${({ theme }) => theme.spacing.lg};

    padding-right: ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    gap: ${({ theme }) => theme.spacing.md};

    padding-right: ${({ theme }) => theme.spacing.lg};
  }
`;

export const DesktopOrderItem = styled.div`
  display: grid;

  grid-template-columns: 72px minmax(0, 1fr) auto;

  align-items: center;

  gap: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    grid-template-columns: 84px minmax(0, 1fr) auto;

    gap: ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 72px minmax(0, 1fr) auto;

    gap: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    grid-template-columns: 64px minmax(0, 1fr) auto;

    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const DesktopOrderItemVisual = styled.div`
  width: 72px;
  height: 72px;

  position: relative;

  flex-shrink: 0;

  overflow: hidden;

  border: 1px solid ${({ theme }) => theme.colors.border.light};

  border-radius: ${({ theme }) => theme.sizes.radius.medium};

  background: ${({ theme }) => theme.colors.background.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    width: 84px;
    height: 84px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 72px;
    height: 72px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    width: 64px;
    height: 64px;
  }
`;

export const ProductThumbnail = styled.img`
  position: absolute;

  top: 50%;
  left: 50%;

  width: 100%;
  height: 100%;

  object-fit: contain;

  transform: translate(-50%, -50%) scale(1.45);

  transform-origin: center center;

  display: block;
`;

export const ProductThumbnailFallback = styled.div`
  width: 100%;

  height: 100%;

  display: flex;

  align-items: center;

  justify-content: center;

  color: ${({ theme }) => theme.colors.brand.primary};

  svg {
    width: 20px;

    height: 20px;
  }
`;

export const DesktopOrderItemContent = styled.div`
  min-width: 0;

  display: flex;
  flex-direction: column;

  align-items: flex-start;

  justify-content: center;

  text-align: left;
`;
// export const DesktopOrderItemContent = styled.div`
//   min-width: 0;
// `;

export const DesktopOrderItemName = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.xs};

  font-family: ${({ theme }) => theme.fonts.body};

  font-size: ${({ theme }) => theme.fontSizes.text_14};

  font-weight: ${({ theme }) => theme.fontWeights.semiBold};

  line-height: 1.3;

  color: ${({ theme }) => theme.colors.text.primary};

  text-align: left;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    font-size: ${({ theme }) => theme.fontSizes.text_16};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: ${({ theme }) => theme.fontSizes.text_14};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    font-size: ${({ theme }) => theme.fontSizes.text_14};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.text_12};
  }
`;

export const DesktopOrderItemMeta = styled.p`
  margin: 0;

  font-family: ${({ theme }) => theme.fonts.body};

  font-size: ${({ theme }) => theme.fontSizes.text_12};

  line-height: 1.4;

  color: ${({ theme }) => theme.colors.text.secondary};

  text-align: left;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    font-size: ${({ theme }) => theme.fontSizes.text_12};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: ${({ theme }) => theme.fontSizes.text_12};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    font-size: ${({ theme }) => theme.fontSizes.text_12};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.text_10};
  }
`;

export const DesktopOrderItemPrice = styled.span`
  align-self: center;

  flex-shrink: 0;

  font-family: ${({ theme }) => theme.fonts.body};

  font-size: ${({ theme }) => theme.fontSizes.text_14};

  font-weight: ${({ theme }) => theme.fontWeights.semiBold};

  color: ${({ theme }) => theme.colors.text.primary};

  text-align: right;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    font-size: ${({ theme }) => theme.fontSizes.text_16};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: ${({ theme }) => theme.fontSizes.text_14};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    font-size: ${({ theme }) => theme.fontSizes.text_14};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.text_12};
  }
`;

export const DesktopOrderSummary = styled.div`
  min-height: ${({ $singleItem }) => ($singleItem ? "auto" : "100%")};

  display: grid;

  grid-template-rows: ${({ $singleItem }) =>
    $singleItem ? "auto auto auto auto" : "auto auto auto 1fr auto"};

  align-content: stretch;

  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    gap: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    gap: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const SummaryRow = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: ${({ theme }) => theme.spacing.xl};
`;

export const SummaryLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};

  font-size: ${({ theme }) => theme.fontSizes.text_14};

  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const SummaryValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};

  font-size: ${({ theme }) => theme.fontSizes.text_14};

  font-weight: ${({ theme }) => theme.fontWeights.medium};

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const SummaryTotalRow = styled(SummaryRow)`
  grid-row: ${({ $singleItem }) => ($singleItem ? "auto" : "5")};

  align-self: ${({ $singleItem }) => ($singleItem ? "auto" : "end")};

  margin-top: ${({ $singleItem, theme }) =>
    $singleItem ? theme.spacing.sm : "0"};

  padding-top: ${({ theme }) => theme.spacing.lg};

  border-top: 1px solid ${({ theme }) => theme.colors.border.light};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding-top: ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-top: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding-top: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-top: ${({ theme }) => theme.spacing.md};
  }
`;

export const SummaryTotalLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};

  font-size: ${({ theme }) => theme.fontSizes.text_18};

  font-weight: ${({ theme }) => theme.fontWeights.bold};

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const SummaryTotalValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};

  font-size: ${({ theme }) => theme.fontSizes.text_22};

  font-weight: ${({ theme }) => theme.fontWeights.bold};

  color: ${({ theme }) => theme.colors.brand.primary};
`;

/* TABLET / MOBILE / MOBILE SMALL */

export const CompactOrderDetails = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: block;
  }
`;

export const CompactFulfillmentRow = styled.div`
  display: grid;

  grid-template-columns: auto minmax(0, 1fr) auto;

  align-items: center;

  gap: ${({ theme }) => theme.spacing.md};

  padding: ${({ theme }) => theme.spacing.md} 0;

  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};

  text-align: left;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing.sm};

    padding: ${({ theme }) => theme.spacing.sm} 0
      ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    gap: ${({ theme }) => theme.spacing.sm};

    padding-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

export const CompactFulfillmentIcon = styled.div`
  display: flex;

  align-items: center;

  justify-content: center;

  color: ${({ theme }) => theme.colors.brand.primary};

  svg {
    width: 16px;

    height: 16px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    svg {
      width: 13px;

      height: 13px;
    }
  }
`;

export const CompactFulfillmentContent = styled.div`
  min-width: 0;

  display: flex;
  flex-direction: column;

  align-items: flex-start;

  gap: 2px;

  text-align: left;
`;

export const CompactFulfillmentMethod = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};

  font-size: ${({ theme }) => theme.fontSizes.text_12};

  font-weight: ${({ theme }) => theme.fontWeights.semiBold};

  color: ${({ theme }) => theme.colors.text.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: ${({ theme }) => theme.fontSizes.text_10};
  }
`;

export const CompactFulfillmentText = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};

  font-size: ${({ theme }) => theme.fontSizes.text_10};

  line-height: 1.35;

  color: ${({ theme }) => theme.colors.text.secondary};

  overflow-wrap: anywhere;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 0.52rem;
  }
`;

export const CompactFulfillmentArrow = styled.div`
  display: flex;

  align-items: center;

  color: ${({ theme }) => theme.colors.text.primary};

  svg {
    width: 14px;

    height: 14px;
  }
`;

export const CompactFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: ${({ theme }) => theme.spacing.lg};

  min-height: 72px;

  padding-top: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    min-height: 76px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    min-height: 72px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    min-height: 70px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: 68px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 66px;

    gap: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    min-height: 62px;

    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const CompactItemsSummary = styled.div`
  min-width: 0;

  display: flex;
  align-items: center;

  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const CompactItemCount = styled.span`
  flex-shrink: 0;

  font-family: ${({ theme }) => theme.fonts.body};

  font-size: ${({ theme }) => theme.fontSizes.text_16};

  font-weight: ${({ theme }) => theme.fontWeights.bold};

  color: ${({ theme }) => theme.colors.text.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.text_14};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.text_14};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: ${({ theme }) => theme.fontSizes.text_12};
  }
`;

export const CompactThumbnails = styled.div`
  display: flex;
  align-items: center;

  gap: ${({ theme }) => theme.spacing.sm};

  min-width: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

export const CompactThumbnailFrame = styled.div`
  position: relative;

  width: 64px;
  height: 64px;

  flex-shrink: 0;

  overflow: hidden;

  border: 1px solid ${({ theme }) => theme.colors.border.light};

  border-radius: ${({ theme }) => theme.sizes.radius.medium};

  background: ${({ theme }) => theme.colors.background.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    width: 68px;
    height: 68px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 64px;
    height: 64px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    width: 62px;
    height: 62px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 60px;
    height: 60px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 58px;
    height: 58px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    width: 52px;
    height: 52px;
  }
`;

export const CompactThumbnailImage = styled.img`
  position: absolute;

  top: 50%;
  left: 50%;

  width: 100%;
  height: 100%;

  object-fit: contain;

  transform: translate(-50%, -50%)
    scale(${({ $imageScale }) => $imageScale || 1.5});

  transform-origin: center center;

  display: block;
`;

export const CompactThumbnailFallback = styled.div`
  width: 52px;
  height: 52px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border: 1px solid ${({ theme }) => theme.colors.border.light};

  border-radius: ${({ theme }) => theme.sizes.radius.small};

  background: ${({ theme }) => theme.colors.background.secondary};

  color: ${({ theme }) => theme.colors.brand.primary};

  svg {
    width: 18px;
    height: 18px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 52px;
    height: 52px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    width: 50px;
    height: 50px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 48px;
    height: 48px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 46px;
    height: 46px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    width: 42px;
    height: 42px;
  }
`;

export const CompactTotalGroup = styled.div`
  display: flex;
  align-items: center;

  gap: ${({ theme }) => theme.spacing.md};

  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

export const CompactTotalLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};

  font-size: ${({ theme }) => theme.fontSizes.text_16};

  font-weight: ${({ theme }) => theme.fontWeights.bold};

  color: ${({ theme }) => theme.colors.text.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.text_14};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.text_14};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: ${({ theme }) => theme.fontSizes.text_12};
  }
`;

export const CompactTotalValue = styled.strong`
  font-family: ${({ theme }) => theme.fonts.heading};

  font-size: ${({ theme }) => theme.fontSizes.text_22};

  font-weight: ${({ theme }) => theme.fontWeights.bold};

  color: ${({ theme }) => theme.colors.brand.primary};

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
    font-size: ${({ theme }) => theme.fontSizes.text_20};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: ${({ theme }) => theme.fontSizes.text_18};
  }
`;

/* PAGINATION */

export const Pagination = styled.div`
  display: flex;

  align-items: center;

  justify-content: center;

  gap: ${({ theme }) => theme.spacing.xl};

  margin-top: ${({ theme }) => theme.spacing.xxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;

    gap: ${({ theme }) => theme.spacing.md};

    margin-top: ${({ theme }) => theme.spacing.xl};
  }
`;

export const PaginationSummary = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};

  font-size: ${({ theme }) => theme.fontSizes.text_12};

  color: ${({ theme }) => theme.colors.text.secondary};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: ${({ theme }) => theme.fontSizes.text_10};
  }
`;

export const PaginationControls = styled.div`
  display: flex;

  align-items: center;

  gap: ${({ theme }) => theme.spacing.sm};
`;

export const PaginationButton = styled.button`
  width: 30px;

  height: 30px;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 0;

  border: none;

  background: transparent;

  color: ${({ theme }) => theme.colors.text.primary};

  cursor: pointer;

  &:disabled {
    opacity: 0.3;

    cursor: default;
  }
`;

export const PaginationPageButton = styled.button`
  width: 34px;

  height: 34px;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 0;

  border: none;

  border-radius: ${({ theme }) => theme.sizes.radius.round};

  background: ${({ $active, theme }) =>
    $active ? theme.colors.brand.primaryLight : "transparent"};

  font-family: ${({ theme }) => theme.fonts.body};

  font-size: ${({ theme }) => theme.fontSizes.text_12};

  font-weight: ${({ $active, theme }) =>
    $active ? theme.fontWeights.bold : theme.fontWeights.medium};

  color: ${({ $active, theme }) =>
    $active ? theme.colors.brand.primary : theme.colors.text.primary};

  cursor: pointer;
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

  text-align: center;

  color: ${({ theme }) => theme.colors.text.secondary};

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
