import styled from "styled-components";

export const OrderCardRoot = styled.article`
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
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;

  gap: ${({ theme }) => theme.spacing.lg};

  margin-bottom: ${({ theme }) => theme.spacing.xxl};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    gap: ${({ theme }) => theme.spacing.xl};

    margin-bottom: ${({ theme }) => theme.spacing.xxxl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    gap: ${({ theme }) => theme.spacing.lg};

    margin-bottom: ${({ theme }) => theme.spacing.xxl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: ${({ theme }) => theme.spacing.md};

    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing.md};

    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const OrderIdentityIcon = styled.div`
  width: 54px;
  height: 54px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border-radius: ${({ theme }) => theme.sizes.radius.medium};

  background: ${({ theme }) => theme.colors.background.softBlue};

  color: ${({ theme }) => theme.colors.brand.primary};

  svg {
    width: 25px;
    height: 25px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    width: 60px;
    height: 60px;

    svg {
      width: 28px;
      height: 28px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 54px;
    height: 54px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    width: 50px;
    height: 50px;

    svg {
      width: 23px;
      height: 23px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 46px;
    height: 46px;

    svg {
      width: 21px;
      height: 21px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 42px;
    height: 42px;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    width: 38px;
    height: 38px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

export const OrderIdentityContent = styled.div`
  min-width: 0;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: ${({ theme }) => theme.spacing.xs};

  text-align: left;
`;

export const OrderIdentityPrimaryRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const OrderNumber = styled.h2`
  margin: 0;

  font-family: ${({ theme }) => theme.fonts.heading};

  font-size: ${({ theme }) => theme.fontSizes.text_24};

  font-weight: ${({ theme }) => theme.fontWeights.bold};

  line-height: 1.15;

  color: ${({ theme }) => theme.colors.text.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    font-size: ${({ theme }) => theme.fontSizes.text_28};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: ${({ theme }) => theme.fontSizes.text_24};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    font-size: ${({ theme }) => theme.fontSizes.text_22};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.text_20};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.text_18};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: ${({ theme }) => theme.fontSizes.text_16};
  }
`;

export const OrderStatus = styled.span`
  display: inline-flex;
  align-items: center;

  width: fit-content;

  padding: 4px ${({ theme }) => theme.spacing.md};

  border-radius: ${({ theme }) => theme.sizes.radius.pill};

  background: ${({ $status }) =>
    $status === "delivered" ? "#EEE7FF" : "#E7F8EE"};

  font-family: ${({ theme }) => theme.fonts.body};

  font-size: ${({ theme }) => theme.fontSizes.text_12};

  font-weight: ${({ theme }) => theme.fontWeights.semiBold};

  line-height: 1.2;

  color: ${({ $status, theme }) =>
    $status === "delivered" ? "#6941C6" : theme.colors.state.success};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 3px ${({ theme }) => theme.spacing.sm};

    font-size: ${({ theme }) => theme.fontSizes.text_10};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 0.52rem;
  }
`;

export const OrderDate = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};

  font-size: ${({ theme }) => theme.fontSizes.text_14};

  line-height: 1.35;

  color: ${({ theme }) => theme.colors.text.secondary};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.text_12};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.text_10};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 0.55rem;
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

  padding: 0 ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding-left: ${({ theme }) => theme.spacing.xl};

    padding-right: ${({ theme }) => theme.spacing.xl};
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
    padding-left: 0;
    padding-right: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    /*
     * Preserve the approved behavior:
     * timeline stays horizontal on mobile.
     */
    padding-left: 0;
    padding-right: 0;
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

  line-height: 1.2;

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

  line-height: 1.3;

  color: ${({ theme }) => theme.colors.text.muted};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: 24px;

    font-size: 0.55rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 0.48rem;
  }
`;

export const OrderSectionDivider = styled.div`
  width: 100%;

  height: 1px;

  margin: ${({ theme }) => theme.spacing.xl} 0;

  background: ${({ theme }) => theme.colors.border.light};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    margin: ${({ theme }) => theme.spacing.xxl} 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin: ${({ theme }) => theme.spacing.xl} 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    margin: ${({ theme }) => theme.spacing.lg} 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin: ${({ theme }) => theme.spacing.lg} 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin: ${({ theme }) => theme.spacing.md} 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    margin: ${({ theme }) => theme.spacing.sm} 0;
  }
`;

/* FULFILLMENT */

export const FulfillmentRow = styled.div`
  display: grid;

  grid-template-columns: auto minmax(0, 1fr);

  align-items: center;

  gap: ${({ theme }) => theme.spacing.lg};

  width: 100%;

  text-align: left;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const FulfillmentIcon = styled.div`
  width: 48px;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border-radius: ${({ theme }) => theme.sizes.radius.medium};

  background: ${({ theme }) => theme.colors.background.softBlue};

  color: ${({ theme }) => theme.colors.brand.primary};

  svg {
    width: 22px;
    height: 22px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    width: 52px;
    height: 52px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    width: 46px;
    height: 46px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 42px;
    height: 42px;

    svg {
      width: 19px;
      height: 19px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 38px;
    height: 38px;

    svg {
      width: 17px;
      height: 17px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    width: 34px;
    height: 34px;

    svg {
      width: 15px;
      height: 15px;
    }
  }
`;

export const FulfillmentContent = styled.div`
  min-width: 0;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 3px;
`;

export const FulfillmentMethod = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};

  font-size: ${({ theme }) => theme.fontSizes.text_18};

  font-weight: ${({ theme }) => theme.fontWeights.bold};

  line-height: 1.25;

  color: ${({ theme }) => theme.colors.text.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    font-size: ${({ theme }) => theme.fontSizes.text_16};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.text_14};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.text_12};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: ${({ theme }) => theme.fontSizes.text_10};
  }
`;

export const FulfillmentText = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};

  font-size: ${({ theme }) => theme.fontSizes.text_14};

  line-height: 1.4;

  color: ${({ theme }) => theme.colors.text.secondary};

  overflow-wrap: anywhere;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.text_12};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.text_10};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 0.52rem;
  }
`;

/* PRODUCT / PRICE */

export const ProductSummaryRow = styled.div`
  display: grid;

  grid-template-columns: auto minmax(0, 1fr) auto;

  align-items: center;

  gap: ${({ theme }) => theme.spacing.lg};

  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: auto minmax(0, 1fr) auto;

    gap: ${({ theme }) => theme.spacing.sm};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

export const ProductPreviewDesktop = styled.div`
  min-width: 0;

  display: flex;
  align-items: center;

  gap: ${({ theme }) => theme.spacing.sm};

  justify-self: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

export const ProductPreviewMobile = styled.div`
  min-width: 0;

  display: none;
  align-items: center;

  gap: ${({ theme }) => theme.spacing.xs};

  justify-self: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
  }
`;

export const ProductPreviewMore = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  min-width: 34px;
  height: 34px;
  padding: 0 8px;

  border: 1px solid ${({ theme }) => theme.colors.border.light};

  border-radius: 999px;

  background: ${({ theme }) => theme.colors.background.secondary};

  color: ${({ theme }) => theme.colors.text.secondary};

  font-family: ${({ theme }) => theme.fonts.body};

  font-size: 0.78rem;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};

  line-height: 1;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    min-width: 36px;
    height: 36px;

    font-size: 0.8rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    min-width: 34px;
    height: 34px;

    font-size: 0.78rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    min-width: 32px;
    height: 32px;

    font-size: 0.75rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-width: 30px;
    height: 30px;
    padding: 0 7px;

    font-size: 0.72rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-width: 28px;
    height: 28px;
    padding: 0 6px;

    font-size: 0.68rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    min-width: 26px;
    height: 26px;

    font-size: 0.65rem;
  }
`;

export const ProductVisual = styled.div`
  position: relative;

  width: 74px;
  height: 74px;

  overflow: hidden;

  flex-shrink: 0;

  border: 1px solid ${({ theme }) => theme.colors.border.light};

  border-radius: ${({ theme }) => theme.sizes.radius.medium};

  background: ${({ theme }) => theme.colors.background.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    width: 82px;
    height: 82px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 74px;
    height: 74px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    width: 68px;
    height: 68px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 62px;
    height: 62px;
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

export const ProductImage = styled.img`
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

export const ProductFallback = styled.div`
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

export const ProductCount = styled.span`
  justify-self: start;

  font-family: ${({ theme }) => theme.fonts.body};

  font-size: ${({ theme }) => theme.fontSizes.text_18};

  font-weight: ${({ theme }) => theme.fontWeights.bold};

  color: ${({ theme }) => theme.colors.text.primary};

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

export const ProductTotal = styled.strong`
  justify-self: end;

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
    font-size: ${({ theme }) => theme.fontSizes.text_20};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: ${({ theme }) => theme.fontSizes.text_18};
  }
`;

/* QR THUMBNAIL */

export const VerificationButton = styled.button`
  width: 100%;

  display: grid;

  grid-template-columns: auto minmax(0, 1fr);

  align-items: center;

  gap: ${({ theme }) => theme.spacing.lg};

  padding: 0;

  border: none;

  background: transparent;

  color: inherit;

  text-align: left;

  cursor: pointer;

  appearance: none;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand.primary};

    outline-offset: 6px;

    border-radius: ${({ theme }) => theme.sizes.radius.small};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const VerificationThumbnail = styled.div`
  width: 74px;
  height: 74px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  overflow: hidden;

  border: 1px solid ${({ theme }) => theme.colors.border.light};

  border-radius: ${({ theme }) => theme.sizes.radius.medium};

  background: #ffffff;

  svg {
    display: block;

    width: 64px;
    height: 64px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    width: 82px;
    height: 82px;

    svg {
      width: 72px;
      height: 72px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 74px;
    height: 74px;

    svg {
      width: 64px;
      height: 64px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    width: 68px;
    height: 68px;

    svg {
      width: 58px;
      height: 58px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 62px;
    height: 62px;

    svg {
      width: 52px;
      height: 52px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 58px;
    height: 58px;

    svg {
      width: 48px;
      height: 48px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    width: 52px;
    height: 52px;

    svg {
      width: 42px;
      height: 42px;
    }
  }
`;

export const VerificationContent = styled.div`
  min-width: 0;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 3px;
`;

export const VerificationEyebrow = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};

  font-size: ${({ theme }) => theme.fontSizes.text_12};

  font-weight: ${({ theme }) => theme.fontWeights.bold};

  line-height: 1.15;

  letter-spacing: 0.035em;

  text-transform: uppercase;

  color: ${({ theme }) => theme.colors.brand.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.text_10};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 0.5rem;
  }
`;

export const VerificationTitle = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};

  font-size: ${({ theme }) => theme.fontSizes.text_18};

  font-weight: ${({ theme }) => theme.fontWeights.bold};

  line-height: 1.15;

  color: ${({ theme }) => theme.colors.text.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.text_14};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.text_12};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: ${({ theme }) => theme.fontSizes.text_10};
  }
`;

export const VerificationAction = styled.span`
  margin-top: 1px;

  font-family: ${({ theme }) => theme.fonts.body};

  font-size: ${({ theme }) => theme.fontSizes.text_14};

  line-height: 1.1;

  color: ${({ theme }) => theme.colors.text.primary};

  text-decoration: underline;

  text-underline-offset: 2px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.text_12};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.text_10};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 0.52rem;
  }
`;

/* QR MODAL */

export const QrModalBackdrop = styled.div`
  position: fixed;

  inset: 0;

  z-index: 5000;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: ${({ theme }) => theme.spacing.xl};

  background: rgba(17, 24, 39, 0.76);

  backdrop-filter: blur(4px);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

export const QrModal = styled.div`
  position: relative;

  width: min(100%, 520px);

  max-height: calc(100vh - 48px);

  overflow-y: auto;

  padding: 38px 34px 34px;

  border-radius: 22px;

  background: ${({ theme }) => theme.colors.background.primary};

  box-shadow: 0 28px 70px rgba(15, 23, 42, 0.3);

  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    width: min(100%, 560px);

    padding: 42px 38px 38px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: min(100%, 520px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    width: min(100%, 500px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: min(100%, 460px);

    padding: 34px 28px 30px;

    border-radius: 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;

    max-height: calc(100vh - 24px);

    padding: 34px 20px 26px;

    border-radius: 18px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding: 32px 16px 22px;
  }
`;

export const QrModalCloseButton = styled.button`
  position: absolute;

  top: 16px;
  right: 16px;

  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;

  border: none;

  border-radius: ${({ theme }) => theme.sizes.radius.round};

  background: ${({ theme }) => theme.colors.background.secondary};

  color: ${({ theme }) => theme.colors.text.primary};

  cursor: pointer;

  svg {
    width: 22px;
    height: 22px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 36px;
    height: 36px;

    top: 12px;
    right: 12px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const QrModalEyebrow = styled.span`
  display: block;

  margin-top: 10px;

  font-family: ${({ theme }) => theme.fonts.body};

  font-size: ${({ theme }) => theme.fontSizes.text_12};

  font-weight: ${({ theme }) => theme.fontWeights.bold};

  line-height: 1.2;

  letter-spacing: 0.045em;

  text-transform: uppercase;

  color: ${({ theme }) => theme.colors.brand.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.text_10};
  }
`;

export const QrModalTitle = styled.h2`
  margin: 12px 0 0;

  font-family: ${({ theme }) => theme.fonts.heading};

  font-size: ${({ theme }) => theme.fontSizes.text_28};

  font-weight: ${({ theme }) => theme.fontWeights.bold};

  line-height: 1.2;

  color: ${({ theme }) => theme.colors.text.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.text_24};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.text_20};
  }
`;

export const QrModalDescription = styled.p`
  max-width: 410px;

  margin: 16px auto 0;

  font-family: ${({ theme }) => theme.fonts.body};

  font-size: ${({ theme }) => theme.fontSizes.text_16};

  line-height: 1.5;

  color: ${({ theme }) => theme.colors.text.secondary};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 320px;

    margin-top: 12px;

    font-size: ${({ theme }) => theme.fontSizes.text_14};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: ${({ theme }) => theme.fontSizes.text_12};
  }
`;

export const QrModalCodeFrame = styled.div`
  width: fit-content;

  display: flex;
  align-items: center;
  justify-content: center;

  margin: 26px auto 0;

  padding: 14px;

  border: 1px solid ${({ theme }) => theme.colors.border.light};

  border-radius: 18px;

  background: #ffffff;

  box-shadow: 0 10px 30px rgba(18, 41, 82, 0.08);

  svg {
    display: block;

    width: 320px;
    height: 320px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    svg {
      width: 290px;
      height: 290px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: 22px;

    padding: 12px;

    svg {
      width: min(68vw, 270px);
      height: min(68vw, 270px);
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    svg {
      width: min(70vw, 240px);
      height: min(70vw, 240px);
    }
  }
`;

export const QrModalOrderNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 6px;

  margin-top: 22px;

  font-family: ${({ theme }) => theme.fonts.body};
`;

export const QrModalOrderLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.text_14};

  color: ${({ theme }) => theme.colors.text.secondary};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.text_12};
  }
`;

export const QrModalOrderValue = styled.strong`
  font-size: ${({ theme }) => theme.fontSizes.text_14};

  font-weight: ${({ theme }) => theme.fontWeights.bold};

  color: ${({ theme }) => theme.colors.text.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.text_12};
  }
`;
