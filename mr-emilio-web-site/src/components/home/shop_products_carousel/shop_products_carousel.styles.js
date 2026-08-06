import styled from "styled-components";
import { Link } from "react-router-dom";

export const ShopProductsSection = styled.section`
  width: 100%;
  padding: 1rem 3.5rem 0;

  @media (min-width: 1440px) {
    padding: 1.1rem 4.5rem 0;
  }

  @media (max-width: 1280px) {
    padding: 0.95rem 3rem 0;
  }

  @media (max-width: 1024px) {
    padding: 0.85rem 2rem 0;
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1.25rem 0;
  }

  @media (max-width: 480px) {
    padding: 0.7rem 1rem 0;
  }

  @media (max-width: 375px) {
    padding-inline: 0.875rem;
  }
`;

export const ShopProductsContainer = styled.div`
  width: 100%;
  max-width: 1840px;

  margin: 0 auto;
  padding: 28px 36px 24px;

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 20px;

  background: ${({ theme }) => theme.colors.background.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding: 32px 44px 26px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 26px 28px 22px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding: 24px 22px 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 22px 18px 18px;

    border-radius: 18px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0;

    border: none;
    border-radius: 0;
  }
`;

export const ShopProductsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  margin-bottom: 22px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    align-items: flex-end;

    margin-bottom: 24px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;

    margin-bottom: 22px;
  }
`;

export const SectionTitle = styled.h2`
  margin: 0;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.5rem, 2vw, 2rem);
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.1;
  letter-spacing: -0.03em;
  text-transform: uppercase;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.text_24};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: ${({ theme }) => theme.fontSizes.text_22};
  }
`;

export const ViewAllLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-size: ${({ theme }) => theme.fontSizes.text_14};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  line-height: 1.2;
  text-decoration: none;

  transition: opacity 180ms ease;

  &:hover {
    opacity: 0.76;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand.primary};
    outline-offset: 4px;
    border-radius: 4px;
  }
`;

export const ViewAllIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  transition: transform 180ms ease;

  ${ViewAllLink}:hover & {
    transform: translateX(3px);
  }
`;

export const CarouselLayout = styled.div`
  position: relative;

  width: 100%;
`;

export const CarouselViewport = styled.div`
  width: 100%;

  margin: -10px 0 -14px;
  padding: 10px 0 14px;

  overflow-x: auto;
  overflow-y: hidden;

  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;

  overscroll-behavior-inline: contain;
  touch-action: pan-x pan-y;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin: 0;
    padding: 0;

    overflow: visible;

    scroll-snap-type: none;
    touch-action: auto;
  }
`;

export const ProductsTrack = styled.div`
  display: flex;
  align-items: stretch;
  gap: 18px;

  width: max-content;

  padding: 2px;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    gap: 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    gap: 16px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    gap: 14px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 14px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;

    width: 100%;

    padding: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    gap: 16px;
  }
`;

export const ProductCard = styled.article`
  flex: 0 0 clamp(220px, 15vw, 270px);

  min-width: 0;

  overflow: hidden;

  scroll-snap-align: start;
  scroll-snap-stop: always;

  border: 1px solid rgba(22, 70, 172, 0.14);
  border-radius: 16px;

  background: ${({ theme }) => theme.colors.background.primary};

  transition: transform 180ms ease, box-shadow 180ms ease,
    border-color 180ms ease;

  &:hover {
    border-color: rgba(22, 70, 172, 0.34);

    transform: translateY(-6px);

    box-shadow: 0 20px 44px rgba(22, 70, 172, 0.12);
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    flex-basis: clamp(240px, 14.5vw, 290px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex-basis: clamp(210px, 20vw, 250px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    flex-basis: clamp(205px, 27vw, 235px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    box-shadow: 0 0 0 1px rgba(22, 70, 172, 0.08),
      0 18px 36px rgba(20, 32, 60, 0.06);
    flex-basis: clamp(220px, 43vw, 280px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;

    border-radius: 16px;

    &:hover {
      transform: none;
      box-shadow: none;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    border-radius: 14px;
  }
`;

export const ProductLink = styled(Link)`
  display: flex;
  flex-direction: column;

  min-height: 100%;

  color: inherit;
  text-decoration: none;

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.brand.primary};
    outline-offset: -3px;
    border-radius: inherit;
  }
`;

export const ProductImageContainer = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 210px;

  padding: 22px;

  overflow: hidden;

  background: ${({ theme }) => theme.colors.background.primary};

  &::before {
    content: "";

    position: absolute;

    width: 72%;
    aspect-ratio: 1;

    border-radius: 50%;

    background: radial-gradient(
      circle,
      rgba(22, 70, 172, 0.07) 0%,
      rgba(22, 70, 172, 0.025) 56%,
      rgba(22, 70, 172, 0) 74%
    );

    pointer-events: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    height: 230px;

    padding: 24px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    height: 200px;

    padding: 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    height: 190px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 220px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 330px;

    padding: 34px 28px 18px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    height: 290px;

    padding: 30px 22px 16px;
  }
`;
export const ProductImage = styled.img`
  display: block;

  width: 100%;
  height: 100%;

  position: relative;
  z-index: 1;

  object-fit: contain;
  object-position: center;

  transform: translate(
      ${({ $imageOffsetX = 0 }) => `${$imageOffsetX}px`},
      ${({ $imageOffsetY = 0 }) => `${$imageOffsetY}px`}
    )
    scale(${({ $imageScale = 1 }) => $imageScale});

  transform-origin: center;
  transition: transform 220ms ease;

  user-select: none;
  pointer-events: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    transform: translate(
        ${({ $imageOffsetX = 0 }) => `${$imageOffsetX}px`},
        ${({ $imageOffsetY = 0 }) => `${$imageOffsetY}px`}
      )
      scale(${({ $imageScale = 1 }) => $imageScale});
  }
`;

export const ProductQuantityBadge = styled.span`
  position: absolute;
  z-index: 2;

  right: 16px;
  bottom: 14px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 58px;
  height: 58px;

  padding: 8px;

  border: 4px solid ${({ theme }) => theme.colors.background.primary};
  border-radius: 50%;

  background: ${({ theme }) => theme.colors.brand.primary};
  color: #ffffff;

  text-align: center;

  box-shadow: 0 8px 20px rgba(22, 70, 172, 0.2);

  strong {
    font-size: 0.74rem;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    line-height: 1.05;
    text-transform: uppercase;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    width: 62px;
    height: 62px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    width: 54px;
    height: 54px;

    right: 12px;
    bottom: 12px;

    strong {
      font-size: 0.68rem;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 68px;
    height: 68px;

    right: 22px;
    bottom: 12px;

    strong {
      font-size: 0.82rem;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    width: 60px;
    height: 60px;

    right: 16px;

    strong {
      font-size: 0.74rem;
    }
  }
`;

export const ProductInformation = styled.div`
  width: 100%;

  padding: 18px;

  text-align: left;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding: 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding: 16px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 14px 16px 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding: 12px 14px 18px;
  }
`;

export const ProductTextContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;
  min-width: 0;

  text-align: left;
`;

export const ProductBadge = styled.span`
  position: absolute;
  z-index: 2;

  top: 16px;
  left: 16px;

  display: inline-flex;
  align-items: center;

  min-height: 24px;

  padding: 5px 9px;

  border-radius: 6px;

  background: rgba(255, 173, 51, 0.16);
  color: #b85e00;

  font-size: 0.68rem;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  line-height: 1;
  letter-spacing: 0.02em;
  text-transform: uppercase;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    top: 18px;
    left: 16px;

    min-height: 26px;

    padding: 6px 10px;

    font-size: 0.72rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    top: 14px;
    left: 14px;
  }
`;

export const ProductFavoriteButton = styled.button`
  position: absolute;
  z-index: 3;

  top: 14px;
  right: 14px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;

  padding: 0;

  border: 1px solid
    ${({ theme, $favorite }) =>
      $favorite ? theme.colors.brand.primary : theme.colors.border.light};

  border-radius: 50%;

  background: ${({ theme }) => theme.colors.background.primary};

  color: ${({ theme, $favorite }) =>
    $favorite ? theme.colors.brand.primary : theme.colors.text.secondary};

  cursor: pointer;

  transition: color 180ms ease, border-color 180ms ease, background 180ms ease,
    transform 180ms ease, opacity 180ms ease;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.brand.primary};
    color: ${({ theme }) => theme.colors.brand.primary};

    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.55;
    cursor: wait;
  }

  &:focus-visible {
    outline: 3px solid rgba(22, 70, 172, 0.22);
    outline-offset: 3px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    top: 16px;
    right: 16px;

    width: 44px;
    height: 44px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    top: 12px;
    right: 12px;

    width: 42px;
    height: 42px;
  }
`;

export const ProductName = styled.h3`
  min-height: 5.4rem;

  margin: 0 0 0.35rem;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-weight: 700;
  font-size: 1.8rem;
  line-height: 1.08;
  letter-spacing: -0.03em;

  @media (max-width: ${({ theme }) => theme.breakpoints.wide}) {
    min-height: 5rem;
    font-size: 1.6rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    min-height: 4.8rem;
    font-size: 1.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    min-height: 4.5rem;
    font-size: 1.4rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: 4.4rem;
    font-size: 1.7rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: auto;
    font-size: 2rem;
    line-height: 1.1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    min-height: auto;
    font-size: 1.75rem;
  }
`;

export const ProductDescription = styled.p`
  width: 100%;

  margin: 0 0 12px;

  overflow: hidden;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: ${({ theme }) => theme.fontSizes.text_14};
  line-height: 1.35;
  text-align: left;

  white-space: nowrap;
  text-overflow: ellipsis;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: 14px;

    font-size: ${({ theme }) => theme.fontSizes.text_16};

    white-space: normal;
  }
`;

export const ProductBenefits = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  width: 100%;

  margin: 2px 0 14px;
  padding: 12px 0;

  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding: 10px 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: 16px;
    padding: 14px 0;
  }
`;

export const ProductBenefitItem = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 6px;

  min-width: 0;
  padding: 0 8px;

  text-align: center;

  &:not(:last-child) {
    border-right: 1px solid ${({ theme }) => theme.colors.border.light};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding: 0 5px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 8px;
    padding: 0 10px;
  }
`;

export const ProductBenefitIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  color: ${({ theme }) => theme.colors.brand.primary};

  svg {
    display: block;
  }
`;

export const ProductBenefitLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.64rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1.2;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.76rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 0.68rem;
  }
`;

export const ProductDetailsPanel = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) 1px minmax(0, 1.18fr);
  align-items: stretch;

  width: 100%;

  margin-bottom: 13px;
  padding: 12px 14px;

  border-radius: 10px;

  background: rgba(22, 70, 172, 0.055);

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding: 13px 15px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 0.78fr) 1px minmax(0, 1.22fr);

    padding: 11px 12px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    grid-template-columns: minmax(0, 0.72fr) 1px minmax(0, 1.28fr);

    padding: 10px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: minmax(0, 0.82fr) 1px minmax(0, 1.18fr);

    padding: 12px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 0.78fr) 1px minmax(0, 1.22fr);

    padding: 14px 16px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    grid-template-columns: minmax(0, 0.72fr) 1px minmax(0, 1.28fr);

    padding: 12px 13px;
  }
`;

export const ProductWarehouseData = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  min-width: 0;

  animation: warehouse-product-data-enter 220ms ease both;

  @keyframes warehouse-product-data-enter {
    from {
      opacity: 0.2;
      transform: translateY(2px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const ProductDetailColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  min-width: 0;
  height: 100%;

  &:first-child {
    padding-right: 14px;
  }

  &:last-child {
    padding-left: 14px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    &:first-child {
      padding-right: 9px;
    }

    &:last-child {
      padding-left: 9px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    &:first-child {
      padding-right: 12px;
    }

    &:last-child {
      padding-left: 12px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    &:first-child {
      padding-right: 16px;
    }

    &:last-child {
      padding-left: 16px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    &:first-child {
      padding-right: 10px;
    }

    &:last-child {
      padding-left: 10px;
    }
  }
`;

export const ProductDetailDivider = styled.span`
  display: block;

  width: 1px;
  height: 100%;
  min-height: 42px;

  background: ${({ theme }) => theme.colors.border.light};
`;

export const ProductDetailHeading = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 6px;
  font-size: 0.72rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1.2;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.82rem;
  }
`;

export const ProductDetailValue = styled.span`
  min-width: 0;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-size: 0.82rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.2;

  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.94rem;
  }
`;

export const ProductAvailabilityValue = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 6px;

  min-width: 0;

  color: ${({ $status, theme }) =>
    $status === "soldOut"
      ? theme.colors.text.secondary
      : theme.colors.brand.primary};

  font-size: 0.82rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.2;

  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    gap: 5px;

    font-size: 0.74rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 0.8rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 7px;

    font-size: 0.94rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 0.86rem;
  }
`;
export const ProductInventoryStatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  max-width: 100%;
  min-height: 22px;

  padding: 5px 8px;

  border-radius: 6px;

  background: ${({ $status }) => {
    switch ($status) {
      case "soldOut":
        return "rgba(229, 72, 77, 0.12)";

      case "runningLow":
        return "rgba(242, 169, 0, 0.14)";

      default:
        return "rgba(46, 157, 91, 0.12)";
    }
  }};

  color: ${({ $status }) => {
    switch ($status) {
      case "soldOut":
        return "#C83238";

      case "runningLow":
        return "#B66D00";

      default:
        return "#247A48";
    }
  }};

  font-size: 0.62rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1;
  letter-spacing: 0.025em;
  text-transform: uppercase;

  white-space: nowrap;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    min-height: 23px;

    padding: 5px 9px;

    font-size: 0.64rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    min-height: 20px;

    padding: 4px 6px;

    font-size: 0.54rem;
    letter-spacing: 0.015em;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: 22px;

    padding: 5px 8px;

    font-size: 0.6rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 26px;

    padding: 6px 10px;

    font-size: 0.72rem;
    letter-spacing: 0.025em;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    min-height: 23px;

    padding: 5px 7px;

    font-size: 0.63rem;
  }
`;

export const ProductStockDot = styled.span`
  flex: 0 0 auto;

  width: 7px;
  height: 7px;

  border-radius: 50%;

  background: ${({ $status, theme }) => {
    switch ($status) {
      case "soldOut":
        return theme.colors.state.soldOut;
      // return "#E5484D";

      case "runningLow":
        return theme.colors.state.runningLow;
      // return "#F2A900";

      default:
        // return "#2E9D5B";
        return theme.colors.state.plenty;
    }
  }};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 8px;
    height: 8px;
  }
`;

export const ProductAttributes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 7px;

  width: 100%;

  margin-bottom: 10px;
`;

export const ProductRatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  width: 100%;
  min-height: 19px;

  margin-bottom: 11px;
`;

export const ProductStars = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 1px;
`;

export const ProductStar = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  color: ${({ $filled }) => ($filled ? "#f4b000" : "#c8cfdd")};
`;

export const ProductReviewCount = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.78rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1;
`;

export const ProductNotReviewed = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.78rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1.2;
`;
export const ProductPurchaseRow = styled.div`
  display: flex;
  align-items: center;

  width: 100%;

  margin-top: auto;
`;

export const ProductPrice = styled.p`
  margin: 0;
  margin-right: auto;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-size: ${({ theme }) => theme.fontSizes.text_18};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.15;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.text_20};
  }
`;

export const AddToCartButton = styled.button`
  display: inline-flex;
  margin-left: auto;

  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  gap: 8px;
  /* gap: 0.35rem; */

  min-width: 116px;
  min-height: 44px;

  padding: 0 14px;

  border: none;
  border-radius: 999px;

  background: ${({ theme }) => theme.colors.brand.primary};
  color: #ffffff;

  cursor: pointer;

  transition: opacity 180ms ease, transform 180ms ease, box-shadow 180ms ease;

  &:hover:not(:disabled) {
    opacity: 0.92;

    transform: translateY(-2px);

    box-shadow: 0 8px 18px rgba(22, 70, 172, 0.2);
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 3px solid rgba(22, 70, 172, 0.25);
    outline-offset: 3px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    min-width: 104px;

    padding: 0 11px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-width: 138px;
    min-height: 50px;

    padding: 0 18px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    min-width: 124px;
    min-height: 46px;

    padding: 0 14px;
  }
`;

export const AddToCartLabel = styled.span`
  font-size: 0.76rem;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  line-height: 1;
  white-space: nowrap;

  display: inline-block;
  transform: translateY(3px);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.88rem;
    display: inline-block;
    transform: translateY(2px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 0.8rem;
  }
`;

export const CarouselArrow = styled.button`
  position: absolute;
  z-index: 4;

  top: 50%;

  ${({ $position }) =>
    $position === "left" ? "left: -24px;" : "right: -24px;"}

  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 46px;
  height: 46px;

  padding: 0;

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 50%;

  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.brand.primary};

  box-shadow: 0 8px 20px rgba(19, 41, 83, 0.1);

  cursor: pointer;

  transform: translateY(-50%);

  transition: opacity 180ms ease, transform 180ms ease, background 180ms ease,
    color 180ms ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.brand.primary};
    color: #ffffff;

    transform: translateY(-50%) scale(1.04);
  }

  &:disabled {
    opacity: 0.3;
    cursor: default;
  }

  &:focus-visible {
    outline: 3px solid rgba(22, 70, 172, 0.25);
    outline-offset: 3px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    ${({ $position }) =>
      $position === "left" ? "left: -28px;" : "right: -28px;"}
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 42px;
    height: 42px;

    ${({ $position }) =>
      $position === "left" ? "left: -18px;" : "right: -18px;"}
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    ${({ $position }) =>
      $position === "left" ? "left: -15px;" : "right: -15px;"}
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 40px;
    height: 40px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

export const CarouselDots = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;

  margin-top: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

export const CarouselDot = styled.button`
  width: ${({ $active }) => ($active ? "11px" : "9px")};
  height: ${({ $active }) => ($active ? "11px" : "9px")};

  padding: 0;

  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.brand.primary : theme.colors.border.light};

  border-radius: 50%;

  background: ${({ theme, $active }) =>
    $active ? theme.colors.brand.primary : "transparent"};

  cursor: pointer;

  transition: width 180ms ease, height 180ms ease, background 180ms ease,
    border-color 180ms ease;

  &:focus-visible {
    outline: 2px solid rgba(22, 70, 172, 0.25);
    outline-offset: 3px;
  }
`;
