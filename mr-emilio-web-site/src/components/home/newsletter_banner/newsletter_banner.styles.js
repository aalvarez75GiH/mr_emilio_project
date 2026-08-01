import styled from "styled-components";
export const NewsletterSection = styled.section`
  width: 100%;

  padding: 0 24px 72px;

  background: ${({ theme }) => theme.colors.background.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding: 0 32px 80px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 0 24px 64px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding: 0 24px 58px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 24px 52px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 20px 46px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding: 0 16px 42px;
  }
`;

export const NewsletterContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(360px, 0.8fr);
  align-items: center;
  gap: 40px;

  width: 100%;

  padding: 22px 26px;

  overflow: hidden;

  background: ${({ theme }) => theme.colors.background.softBlue};
  border-radius: 18px;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    grid-template-columns: minmax(0, 1fr) minmax(420px, 0.85fr);
    gap: 56px;

    padding: 24px 32px;

    border-radius: 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    gap: 30px;

    padding: 20px 24px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    grid-template-columns: 1fr;
    gap: 22px;

    padding: 24px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 20px;

    padding: 22px 20px;

    border-radius: 16px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding: 20px 16px;
  }
`;

export const NewsletterMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  min-width: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    align-items: flex-start;
    gap: 14px;
  }
`;

export const NewsletterIcon = styled.span`
  flex: 0 0 auto;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 72px;
  height: 54px;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-size: 58px;

  svg {
    width: 1em;
    height: 1em;

    stroke-width: 1.35;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    width: 64px;

    font-size: 50px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 46px;
    height: 42px;

    font-size: 38px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    width: 40px;

    font-size: 34px;
  }
`;

export const NewsletterCopy = styled.div`
  min-width: 0;
`;

export const NewsletterTitle = styled.h2`
  margin: 0 0 5px;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.35rem, 1.6vw, 1.75rem);
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.15;
  letter-spacing: -0.025em;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.35rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 1.2rem;
  }
`;

export const NewsletterDescription = styled.p`
  margin: 0;

  color: ${({ theme }) => theme.colors.text.brand};

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.text_14};
  line-height: 1.5;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.text_12};
  }
`;

export const NewsletterForm = styled.form`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;

  min-width: 0;

  padding: 4px;

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 999px;

  background: ${({ theme }) => theme.colors.background.primary};

  box-shadow: 0 4px 18px rgba(8, 39, 95, 0.05);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;

    gap: 10px;

    padding: 0;

    border: 0;
    border-radius: 0;

    background: transparent;

    box-shadow: none;
  }
`;

export const NewsletterInput = styled.input`
  width: 100%;
  min-width: 0;
  height: 46px;

  padding: 0 18px;

  border: 0;
  outline: 0;

  background: transparent;
  color: ${({ theme }) => theme.colors.text.primary};

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.text_14};

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.muted};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 48px;

    border: 1px solid ${({ theme }) => theme.colors.border.light};
    border-radius: 999px;

    background: ${({ theme }) => theme.colors.background.primary};
  }
`;

export const NewsletterButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-width: 138px;
  min-height: 46px;

  padding: 0 22px;

  border: 0;
  border-radius: 999px;

  background: ${({ theme }) => theme.colors.brand.primary};
  color: ${({ theme }) => theme.colors.text.inverse};

  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.text_12};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1;
  text-transform: uppercase;

  cursor: pointer;

  transition: background 180ms ease, transform 180ms ease;

  &:hover {
    background: ${({ theme }) => theme.colors.brand.primaryDark};

    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.brand.primaryLight};
    outline-offset: 3px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    min-height: 48px;
  }
`;
