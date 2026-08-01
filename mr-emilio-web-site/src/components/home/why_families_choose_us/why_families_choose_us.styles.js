import styled from "styled-components";

export const WhyChooseSection = styled.section`
  width: 100%;

  padding: 28px 24px 72px;

  background: ${({ theme }) => theme.colors.background.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding: 32px 32px 80px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 28px 24px 64px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding: 26px 24px 58px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 24px 24px 52px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 20px 20px 46px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding: 18px 16px 42px;
  }
`;

export const WhyChooseContainer = styled.div`
  width: 100%;

  padding: 30px 48px 34px;

  border-radius: 20px;

  background: ${({ theme }) => theme.colors.background.softBlue};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding: 34px 64px 38px;

    border-radius: 22px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 28px 40px 32px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding: 26px 32px 30px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 28px 24px 30px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 26px 20px 28px;

    border-radius: 18px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding: 24px 16px 26px;

    border-radius: 16px;
  }
`;

export const WhyChooseTitle = styled.h2`
  margin: 0 0 28px;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.8rem, 2.2vw, 2.4rem);
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.1;
  letter-spacing: -0.035em;

  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: 26px;

    font-size: clamp(1.7rem, 5vw, 2.15rem);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: 24px;

    font-size: clamp(1.55rem, 7vw, 1.95rem);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: clamp(1.4rem, 7vw, 1.75rem);
  }
`;

export const ReasonsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;

  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    gap: 18px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 28px 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 24px 14px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    gap: 22px 10px;
  }
`;

export const ReasonItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;

  min-width: 0;

  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 10px;
  }
`;

export const ReasonIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-size: 46px;

  svg {
    width: 1em;
    height: 1em;

    stroke-width: 1.6;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    font-size: 42px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 40px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 34px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 31px;
  }
`;

export const ReasonText = styled.p`
  display: flex;
  flex-direction: column;

  margin: 0;

  color: ${({ theme }) => theme.colors.text.primary};

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.text_16};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  line-height: 1.35;

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    font-size: ${({ theme }) => theme.fontSizes.text_14};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.text_12};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: ${({ theme }) => theme.fontSizes.text_10};
  }
`;
