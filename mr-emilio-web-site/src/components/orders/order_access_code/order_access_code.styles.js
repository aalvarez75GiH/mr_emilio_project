import styled from "styled-components";

export const OrderAccessSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;

  padding: ${({ theme }) => theme.spacing.section}
    ${({ theme }) => theme.spacing.xl}
    ${({ theme }) => theme.spacing.sectionLarge};

  background: ${({ theme }) => theme.colors.background.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding-top: ${({ theme }) => theme.spacing.sectionLarge};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-left: ${({ theme }) => theme.spacing.xl};
    padding-right: ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding-top: ${({ theme }) => theme.spacing.xxxl};
    padding-bottom: ${({ theme }) => theme.spacing.section};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xxxl}
      ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.section};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.xxl}
      ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xxxl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding-left: ${({ theme }) => theme.spacing.md};
    padding-right: ${({ theme }) => theme.spacing.md};
  }
`;

export const OrderAccessCard = styled.div`
  width: 100%;
  max-width: 560px;

  padding: ${({ theme }) => theme.spacing.xxxl};

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.sizes.radius.large};

  background: ${({ theme }) => theme.colors.background.primary};

  box-shadow: ${({ theme }) => theme.sizes.shadow.card};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    max-width: 580px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    max-width: 560px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    max-width: 540px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 520px;
    padding: ${({ theme }) => theme.spacing.xxl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.xl};
    border-radius: ${({ theme }) => theme.sizes.radius.medium};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

export const OrderAccessHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  text-align: center;
`;

export const OrderAccessTitle = styled.h1`
  margin: 0 0 ${({ theme }) => theme.spacing.md};

  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.text_36};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.15;

  color: ${({ theme }) => theme.colors.text.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    font-size: ${({ theme }) => theme.fontSizes.text_40};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: ${({ theme }) => theme.fontSizes.text_36};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    font-size: ${({ theme }) => theme.fontSizes.text_32};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.text_32};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.text_28};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: ${({ theme }) => theme.fontSizes.text_24};
  }
`;

export const OrderAccessDescription = styled.p`
  margin: 0;

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.text_16};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: 1.6;

  color: ${({ theme }) => theme.colors.text.secondary};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.text_14};
  }
`;

export const OrderAccessEmail = styled.p`
  margin: ${({ theme }) => theme.spacing.xs} 0 0;

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.text_16};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};

  color: ${({ theme }) => theme.colors.text.primary};

  overflow-wrap: anywhere;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.text_14};
  }
`;

export const OrderAccessForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

export const OrderAccessField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const OrderAccessLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.text_14};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const OrderAccessCodeInput = styled.input`
  width: 100%;
  min-height: 64px;

  padding: 0 ${({ theme }) => theme.spacing.lg};

  border: 1px solid ${({ theme }) => theme.colors.border.medium};
  border-radius: ${({ theme }) => theme.sizes.radius.medium};

  background: ${({ theme }) => theme.colors.background.primary};

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.text_28};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: 0.35em;
  text-align: center;

  color: ${({ theme }) => theme.colors.text.brand};

  transition: border-color 160ms ease, box-shadow 160ms ease,
    background-color 160ms ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.muted};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.brand.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.brand.primaryLight};
  }

  &:disabled {
    cursor: not-allowed;
    background: ${({ theme }) => theme.colors.background.secondary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 60px;
    font-size: ${({ theme }) => theme.fontSizes.text_24};
  }
`;

export const OrderAccessError = styled.p`
  margin: 0;

  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};

  border: 1px solid ${({ theme }) => theme.colors.state.error};
  border-radius: ${({ theme }) => theme.sizes.radius.small};

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.text_14};
  line-height: 1.5;

  color: ${({ theme }) => theme.colors.state.error};
`;

export const OrderAccessButton = styled.button`
  width: 100%;
  min-height: 52px;

  padding: 0 ${({ theme }) => theme.spacing.xl};

  border: none;
  border-radius: ${({ theme }) => theme.sizes.radius.medium};

  background: ${({ theme }) => theme.colors.brand.primary};
  color: ${({ theme }) => theme.colors.text.inverse};

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.text_16};
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  cursor: pointer;

  transition: background-color 160ms ease, transform 160ms ease,
    opacity 160ms ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.brand.primaryDark};
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.brand.primaryLight};
    outline-offset: 3px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`;

export const OrderAccessSecondaryButton = styled.button`
  align-self: center;

  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};

  border: none;
  background: transparent;

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.text_14};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};

  color: ${({ theme }) => theme.colors.text.brand};

  cursor: pointer;

  &:hover:not(:disabled) {
    text-decoration: underline;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`;
