import styled from "styled-components";

export const BenefitsSection = styled.section`
  position: relative;

  width: 100%;

  background: ${({ theme }) => theme.colors.background.primary};

  &::before {
    content: "";

    position: absolute;

    top: 0;
    left: 64px;
    right: 64px;

    height: 1px;

    background: ${({ theme }) => theme.colors.border.light};
  }

  &::after {
    content: "";

    position: absolute;

    bottom: 0;
    left: 64px;
    right: 64px;

    height: 1px;

    background: ${({ theme }) => theme.colors.border.light};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    &::before,
    &::after {
      left: 80px;
      right: 80px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    &::before,
    &::after {
      left: 48px;
      right: 48px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    &::before,
    &::after {
      left: 32px;
      right: 32px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    &::before,
    &::after {
      left: 24px;
      right: 24px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    &::before,
    &::after {
      left: 20px;
      right: 20px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    &::before,
    &::after {
      left: 16px;
      right: 16px;
    }
  }
`;

export const BenefitsInner = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  width: 100%;

  padding: 26px 64px;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding: 28px 80px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 24px 48px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding: 22px 32px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 28px 20px;

    padding: 30px 24px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 28px 12px;

    padding: 30px 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    gap: 24px 10px;

    padding: 26px 16px;
  }
`;

export const BenefitItem = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;

  min-width: 0;
  min-height: 54px;

  padding: 0 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    gap: 14px;

    padding: 0 18px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    gap: 12px;

    padding: 0 12px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    justify-content: flex-start;
    gap: 10px;

    min-height: 112px;

    padding: 0 10px;

    text-align: center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 104px;

    padding: 0 6px;

    border-bottom: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    min-height: 96px;

    padding: 0 4px;
  }
`;

export const BenefitIcon = styled.span`
  flex: 0 0 auto;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-size: 38px;

  svg {
    width: 1em;
    height: 1em;

    stroke-width: 1.6;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    font-size: 34px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 30px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: auto;

    font-size: 28px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 26px;
  }
`;

export const BenefitCopy = styled.div`
  display: flex;
  flex-direction: column;

  min-width: 0;

  text-align: left;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    align-items: center;

    text-align: center;
  }
`;

export const BenefitTitle = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.text_14};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  line-height: 1.25;

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    font-size: ${({ theme }) => theme.fontSizes.text_12};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.text_12};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: ${({ theme }) => theme.fontSizes.text_10};
  }
`;

export const BenefitSubtitle = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.text_14};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  line-height: 1.25;

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    font-size: ${({ theme }) => theme.fontSizes.text_12};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.text_12};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: ${({ theme }) => theme.fontSizes.text_10};
  }
`;

export const BenefitDivider = styled.span`
  position: absolute;

  top: 50%;
  right: 0;

  width: 2px;
  height: 42px;

  background: ${({ theme }) => theme.colors.border.medium};

  transform: translateY(-50%);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;
