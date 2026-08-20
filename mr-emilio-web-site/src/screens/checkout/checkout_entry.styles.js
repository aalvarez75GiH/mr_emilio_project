import styled from "styled-components";

export const CheckoutEntryPage = styled.main`
  width: 100%;
  min-height: calc(100vh - ${({ theme }) => theme.sizes.header.desktopHeight});

  background: ${({ theme }) => theme.colors.background.primary};
`;

export const CheckoutEntryContainer = styled.div`
  width: 100%;
  max-width: 600px;

  margin: 0 auto;
  padding: 42px 32px 56px;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    max-width: 620px;

    padding-top: 48px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-top: 40px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    max-width: 580px;

    padding-top: 36px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 540px;

    padding: 30px 24px 48px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: none;

    padding: 30px 20px 38px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding: 26px 16px 34px;
  }
`;

export const CheckoutIllustrationSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  margin-bottom: 44px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: 40px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: 42px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    margin-bottom: 36px;
  }
`;

export const CheckoutProductsImage = styled.img`
  display: block;

  width: min(100%, 390px);
  height: auto;

  object-fit: contain;

  user-select: none;
  pointer-events: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: min(100%, 360px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: min(76vw, 330px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    width: min(78vw, 290px);
  }
`;

export const GuestCheckoutCard = styled.section`
  width: 100%;

  padding: 30px 28px 28px;

  border: 1.5px solid rgba(22, 70, 172, 0.38);
  border-radius: 18px;

  background: ${({ theme }) => theme.colors.background.primary};

  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 26px 20px 20px;

    border-radius: 16px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding: 24px 16px 18px;
  }
`;

export const GuestCheckoutTitle = styled.h1`
  margin: 0;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.12;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.65rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 1.5rem;
  }
`;

export const GuestCheckoutMessage = styled.p`
  margin: 14px 0 0;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.98rem;
  line-height: 1.5;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: 12px;

    font-size: 0.9rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 0.84rem;
  }
`;

export const GuestCheckoutButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 14px;

  width: 100%;
  min-height: 54px;

  margin-top: 24px;
  padding: 0 24px;

  border: none;
  border-radius: 10px;

  background: linear-gradient(
    110deg,
    ${({ theme }) => theme.colors.brand.primary} 0%,
    #0757bb 100%
  );

  color: #ffffff;

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  cursor: pointer;

  transition: transform 180ms ease, box-shadow 180ms ease;

  svg {
    width: 21px;
    height: 21px;
  }

  &:hover {
    transform: translateY(-2px);

    box-shadow: 0 12px 26px rgba(22, 70, 172, 0.22);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand.primary};
    outline-offset: 3px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 50px;

    margin-top: 20px;

    font-size: 0.92rem;
  }
`;

export const CheckoutDivider = styled.div`
  display: grid;
  grid-template-columns: minmax(24px, 1fr) auto minmax(24px, 1fr);
  align-items: center;
  gap: 14px;

  width: 100%;

  margin: 26px 0 20px;

  > span {
    height: 1px;

    background: ${({ theme }) => theme.colors.border.light};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 10px;

    margin: 22px 0 18px;
  }
`;

export const CheckoutDividerLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.7rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1;

  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 0.62rem;
  }
`;

export const AccountOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;
`;

export const AccountOption = styled.button`
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr) auto;
  align-items: center;
  gap: 14px;

  width: 100%;

  padding: 15px 18px;

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 14px;

  background: ${({ theme }) => theme.colors.background.primary};

  text-align: left;

  cursor: pointer;

  transition: border-color 180ms ease, background 180ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brand.primary};

    background: ${({ theme }) => theme.colors.background.softBlue};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand.primary};
    outline-offset: 2px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 40px minmax(0, 1fr) auto;
    gap: 12px;

    padding: 13px 15px;

    border-radius: 12px;
  }
`;

export const AccountOptionIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 44px;
  height: 44px;

  border: 1px solid rgba(22, 70, 172, 0.18);
  border-radius: 50%;

  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.brand.primary};

  svg {
    width: 22px;
    height: 22px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 40px;
    height: 40px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const AccountOptionContent = styled.span`
  display: block;

  min-width: 0;
`;

export const AccountOptionTitle = styled.strong`
  display: block;

  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 0.96rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.2;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.9rem;
  }
`;

export const AccountOptionDescription = styled.span`
  display: block;

  margin-top: 4px;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.76rem;
  line-height: 1.3;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.7rem;
  }
`;

export const AccountOptionChevron = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  color: ${({ theme }) => theme.colors.text.primary};

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const CheckoutLegal = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;

  width: 100%;

  margin-top: 30px;
  padding: 0 18px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: 26px;

    padding-inline: 8px;
  }
`;

export const CheckoutLegalIcon = styled.span`
  display: inline-flex;

  flex: 0 0 auto;

  margin-top: 2px;

  color: ${({ theme }) => theme.colors.text.secondary};

  svg {
    width: 17px;
    height: 17px;
  }
`;

export const CheckoutLegalText = styled.p`
  margin: 0;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.68rem;
  line-height: 1.5;
  text-align: left;
`;

export const CheckoutLegalLink = styled.a`
  color: ${({ theme }) => theme.colors.brand.primary};

  font-weight: ${({ theme }) => theme.fontWeights.semiBold};

  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
