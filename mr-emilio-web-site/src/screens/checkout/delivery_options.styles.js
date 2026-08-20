import styled, { css } from "styled-components";

export const DeliveryPage = styled.main`
  width: 100%;

  min-height: calc(100vh - ${({ theme }) => theme.sizes.header.desktopHeight});

  background: ${({ theme }) => theme.colors.background.primary};
`;

export const DeliveryContainer = styled.div`
  width: 100%;
  max-width: 620px;

  margin: 0 auto;
  padding: 42px 32px 56px;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
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

    padding: 26px 20px 38px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding: 24px 16px 34px;
  }
`;

export const CheckoutProgress = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto 1fr auto;
  align-items: start;

  width: 100%;

  margin-bottom: 38px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: 32px;
  }
`;

export const CheckoutProgressItem = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 7px;
`;

export const CheckoutProgressDot = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 28px;
  height: 28px;

  border-radius: 50%;

  background: ${({ $active, theme }) =>
    $active ? theme.colors.brand.primary : theme.colors.border.light};

  color: ${({ $active, theme }) =>
    $active ? "#ffffff" : theme.colors.text.secondary};

  font-size: 0.72rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 25px;
    height: 25px;

    font-size: 0.66rem;
  }
`;

export const CheckoutProgressLabel = styled.span`
  color: ${({ $active, theme }) =>
    $active ? theme.colors.brand.primary : theme.colors.text.secondary};

  font-size: 0.7rem;
  font-weight: ${({ $active, theme }) =>
    $active ? theme.fontWeights.bold : theme.fontWeights.medium};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.64rem;
  }
`;

export const CheckoutProgressLine = styled.span`
  width: 100%;
  height: 1px;

  margin-top: 14px;

  background: ${({ theme }) => theme.colors.border.light};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: 12px;
  }
`;

export const DeliveryHeader = styled.header`
  margin-bottom: 26px;

  text-align: left;
`;

export const DeliveryTitle = styled.h1`
  max-width: 460px;

  margin: 0;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.18;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 320px;

    font-size: 1.55rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 1.4rem;
  }
`;

export const DeliverySubtitle = styled.p`
  margin: 10px 0 0;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.9rem;
  line-height: 1.45;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.8rem;
  }
`;

export const DeliveryOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const DeliveryOption = styled.button`
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr) auto;
  align-items: center;
  gap: 16px;

  width: 100%;

  padding: 20px;

  border: 1.5px solid
    ${({ $selected, theme }) =>
      $selected ? theme.colors.brand.primary : theme.colors.border.light};

  border-radius: 15px;

  background: ${({ $selected, theme }) =>
    $selected
      ? theme.colors.background.softBlue
      : theme.colors.background.primary};

  text-align: left;

  cursor: pointer;

  transition: border-color 180ms ease, background 180ms ease,
    transform 180ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brand.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand.primary};
    outline-offset: 3px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 42px minmax(0, 1fr) auto;
    gap: 13px;

    padding: 17px 15px;

    border-radius: 13px;
  }
`;

export const DeliveryOptionIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 48px;
  height: 48px;

  border-radius: 50%;

  background: ${({ theme }) => theme.colors.background.softBlue};
  color: ${({ theme }) => theme.colors.brand.primary};

  svg {
    width: 25px;
    height: 25px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 42px;
    height: 42px;

    svg {
      width: 22px;
      height: 22px;
    }
  }
`;

export const DeliveryOptionContent = styled.span`
  display: block;

  min-width: 0;
`;

export const DeliveryOptionTitle = styled.strong`
  display: block;

  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 1.05rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.25;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    font-size: 1.08rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: 1.04rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    font-size: 1rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.02rem;
    line-height: 1.3;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 0.98rem;
  }
`;

export const DeliveryOptionDescription = styled.span`
  display: block;

  margin-top: 6px;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.84rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1.45;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    font-size: 0.86rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: 0.84rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    font-size: 0.82rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 0.82rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: 7px;

    font-size: 0.86rem;
    line-height: 1.45;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 0.82rem;
  }
`;

export const DeliveryOptionMeta = styled.span`
  display: block;

  margin-top: 9px;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-size: 0.86rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.25;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    font-size: 0.88rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: 0.86rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    font-size: 0.84rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 0.84rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: 10px;

    font-size: 0.9rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 0.86rem;
  }
`;

export const DeliveryOptionRadio = styled.span`
  position: relative;

  width: 20px;
  height: 20px;

  flex: 0 0 auto;

  border: 1.5px solid
    ${({ $selected, theme }) =>
      $selected ? theme.colors.brand.primary : theme.colors.border.light};

  border-radius: 50%;

  ${({ $selected, theme }) =>
    $selected &&
    css`
      &::after {
        position: absolute;

        top: 50%;
        left: 50%;

        width: 10px;
        height: 10px;

        border-radius: 50%;

        background: ${theme.colors.brand.primary};

        content: "";

        transform: translate(-50%, -50%);
      }
    `}
`;

export const DeliveryInfo = styled.div`
  margin-top: 18px;
  padding: 14px 16px;

  border-radius: 10px;

  background: ${({ theme }) => theme.colors.background.softBlue};
  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.8rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1.5;

  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    font-size: 0.82rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: 0.8rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    font-size: 0.78rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 0.78rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 15px 16px;

    font-size: 0.82rem;
    line-height: 1.5;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding: 14px;

    font-size: 0.78rem;
  }
`;

export const DeliveryContinueButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  width: 100%;
  min-height: 52px;

  margin-top: 20px;
  padding: 0 22px;

  border: none;
  border-radius: 10px;

  background: ${({ theme }) => theme.colors.brand.primary};
  color: #ffffff;

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.92rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  cursor: pointer;

  transition: opacity 180ms ease, transform 180ms ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.42;
    cursor: not-allowed;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 48px;

    font-size: 0.86rem;
  }
`;
