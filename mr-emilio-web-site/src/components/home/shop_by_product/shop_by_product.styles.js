import styled from "styled-components";

export const ShopSection = styled.section`
  width: 100%;

  padding: 52px 24px 28px;

  background: ${({ theme }) => theme.colors.background.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding: 58px 32px 32px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 48px 24px 28px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding: 44px 24px 26px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 42px 24px 24px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 38px 20px 22px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding: 34px 16px 20px;
  }
`;

export const ShopHeader = styled.div`
  position: relative;

  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;

  width: 100%;

  margin-bottom: 26px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 10px;

    margin-bottom: 22px;
  }
`;

export const ShopTitle = styled.h2`
  color: ${({ theme }) => theme.colors.brand.primary};

  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.9rem, 2.15vw, 2.45rem);
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.1;
  letter-spacing: -0.035em;

  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: clamp(1.75rem, 8vw, 2.15rem);

    text-align: left;
  }
`;

export const ViewAllLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.text_14};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};

  svg {
    font-size: 20px;

    transition: transform 180ms ease;
  }

  &:hover svg {
    transform: translateX(4px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    justify-content: flex-start;
  }
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;

  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    gap: 18px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));

    gap: 18px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;

    gap: 16px;
  }
`;

export const ProductCard = styled.a`
  display: flex;
  flex-direction: column;

  min-width: 0;
  overflow: hidden;

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.sizes.radius.medium};

  background: ${({ theme }) => theme.colors.background.primary};

  transition: transform 180ms ease, border-color 180ms ease,
    box-shadow 180ms ease;

  &:hover {
    transform: translateY(-3px);

    border-color: ${({ theme }) => theme.colors.border.brand};
    box-shadow: ${({ theme }) => theme.sizes.shadow.card};
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.brand.primaryLight};
    outline-offset: 3px;
  }
`;

export const ProductImageWrapper = styled.div`
  width: 100%;
  height: clamp(230px, 21vw, 315px);

  overflow: hidden;

  /* background: ${({ theme }) => theme.colors.background.secondary}; */
  /* background: rgb(247, 249, 253); */
  background: ${({ theme }) => theme.colors.background.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    height: 320px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    height: 265px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    height: 300px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 270px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 300px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    height: 250px;
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 100%;

  object-fit: contain;
  object-position: center;

  padding: 10px;

  transition: transform 260ms ease;

  ${ProductCard}:hover & {
    transform: scale(1.02);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 8px;
  }
`;

export const ProductCardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;

  min-height: 62px;

  padding: 12px 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 60px;

    padding: 12px 14px;
  }
`;

export const ProductName = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};

  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.text_16};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.2;
`;

export const ProductArrow = styled.span`
  flex: 0 0 auto;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 32px;

  border-radius: ${({ theme }) => theme.sizes.radius.round};

  background: ${({ theme }) => theme.colors.brand.primary};
  color: ${({ theme }) => theme.colors.text.inverse};

  svg {
    font-size: 17px;

    transition: transform 180ms ease;
  }

  ${ProductCard}:hover & svg {
    transform: translateX(3px);
  }
`;
