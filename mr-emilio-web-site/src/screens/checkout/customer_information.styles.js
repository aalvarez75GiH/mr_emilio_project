import styled, { css } from "styled-components";

export const CustomerInformationTransition = styled.div`
  width: 100%;
  min-height: 100vh;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    animation: ${({ $isExiting, $direction }) => {
      if (!$isExiting) {
        return css`
          customer-information-enter 260ms
            cubic-bezier(0.22, 1, 0.36, 1) both
        `;
      }

      if ($direction === "back") {
        return css`
          customer-information-back 260ms
            cubic-bezier(0.22, 1, 0.36, 1) both
        `;
      }

      return css`
        customer-information-forward 260ms
          cubic-bezier(0.22, 1, 0.36, 1) both
      `;
    }};

    @keyframes customer-information-enter {
      from {
        opacity: 0.96;
        transform: translateX(100%);
      }

      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes customer-information-forward {
      from {
        opacity: 1;
        transform: translateX(0);
      }

      to {
        opacity: 0.96;
        transform: translateX(-100%);
      }
    }

    @keyframes customer-information-back {
      from {
        opacity: 1;
        transform: translateX(0);
      }

      to {
        opacity: 0.96;
        transform: translateX(100%);
      }
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const CustomerInformationPage = styled.main`
  width: 100%;

  min-height: calc(100vh - ${({ theme }) => theme.sizes.header.desktopHeight});

  background: ${({ theme }) => theme.colors.background.primary};
`;

export const CustomerInformationContainer = styled.div`
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

export const CustomerInformationHeader = styled.header`
  margin-bottom: 28px;

  text-align: left;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: 24px;
  }
`;

export const CustomerInformationTitle = styled.h1`
  margin: 0;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.18;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.55rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 1.4rem;
  }
`;

export const CustomerInformationSubtitle = styled.p`
  margin: 10px 0 0;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.9rem;
  line-height: 1.45;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.82rem;
  }
`;

export const CustomerForm = styled.form`
  width: 100%;
`;

export const FormSection = styled.section`
  width: 100%;
  text-align: left;

  & + & {
    margin-top: 30px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    & + & {
      margin-top: 26px;
    }
  }
`;

export const FormSectionTitle = styled.h2`
  margin: 0 0 16px;

  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 1rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.25;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: 14px;

    font-size: 0.94rem;
  }
`;

export const FieldsGrid = styled.div`
  display: grid;
  gap: 16px;

  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 14px;
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;

  min-width: 0;
`;

export const FormLabel = styled.label`
  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 0.82rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.2;

  span {
    color: ${({ theme }) => theme.colors.text.secondary};

    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.8rem;
  }
`;

export const FormInput = styled.input`
  width: 100%;
  height: 50px;

  padding: 0 14px;

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 10px;

  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9rem;

  transition: border-color 180ms ease, box-shadow 180ms ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};

    opacity: 0.7;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.brand.primary};

    outline: none;

    box-shadow: 0 0 0 3px rgba(22, 70, 172, 0.08);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    height: 52px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    height: 50px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    height: 49px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 48px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 48px;

    font-size: 0.88rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding-inline: 12px;

    font-size: 0.84rem;
  }
`;

export const AddressGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 120px;
  gap: 14px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr) 92px;
    gap: 10px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    grid-template-columns: minmax(0, 1fr) 84px;
  }
`;

export const FulfillmentSummary = styled.section`
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr);
  align-items: start;
  gap: 14px;

  width: 100%;

  margin-top: 30px;
  padding: 18px;

  border-radius: 12px;

  background: ${({ theme }) => theme.colors.background.softBlue};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding: 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 18px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding: 17px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 16px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 42px minmax(0, 1fr);
    gap: 12px;

    margin-top: 26px;
    padding: 15px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    grid-template-columns: 40px minmax(0, 1fr);

    padding: 14px;
  }
`;

export const FulfillmentSummaryIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 48px;
  height: 48px;

  border-radius: 10px;

  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.brand.primary};

  svg {
    width: 23px;
    height: 23px;
  }

  img {
    display: block;

    width: 27px;
    height: 27px;

    object-fit: contain;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 42px;
    height: 42px;

    svg {
      width: 21px;
      height: 21px;
    }

    img {
      width: 24px;
      height: 24px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    width: 40px;
    height: 40px;

    img {
      width: 22px;
      height: 22px;
    }
  }
`;

export const FulfillmentSummaryContent = styled.div`
  min-width: 0;

  text-align: left;
`;

export const FulfillmentSummaryEyebrow = styled.span`
  display: block;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.72rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const FulfillmentSummaryTitle = styled.strong`
  display: block;

  margin-top: 3px;

  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 0.94rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.3;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.9rem;
  }
`;

export const FulfillmentSummaryText = styled.p`
  margin: 4px 0 0;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.76rem;
  line-height: 1.45;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.72rem;
  }
`;

export const FulfillmentSummaryAction = styled.button`
  margin-top: 10px;
  padding: 0;

  border: none;

  background: transparent;
  color: ${({ theme }) => theme.colors.brand.primary};

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.76rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand.primary};
    outline-offset: 3px;
  }
`;

export const CustomerInformationContinueButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  width: 100%;
  min-height: 52px;

  margin-top: 30px;
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

    margin-top: 26px;

    font-size: 0.86rem;
  }
`;

export const SecureMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;

  margin-top: 14px;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.68rem;
  line-height: 1.4;

  svg {
    flex: 0 0 auto;

    width: 14px;
    height: 14px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.64rem;
  }
`;

export const DeliveryQuoteError = styled.div`
  width: 100%;

  margin-top: 18px;
  padding: 12px 14px;

  border: 1px solid rgba(190, 52, 52, 0.2);
  border-radius: 10px;

  background: rgba(190, 52, 52, 0.06);
  color: #a52a2a;

  font-size: 0.78rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1.45;

  text-align: left;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.74rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 0.7rem;
  }
`;
