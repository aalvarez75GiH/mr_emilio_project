import styled, { css } from "styled-components";

const sizeVariants = {
  small: css`
    min-height: 40px;
    padding: 0 18px;
    font-size: ${({ theme }) => theme.fontSizes.text_12};
  `,

  medium: css`
    min-height: 48px;
    padding: 0 24px;
    font-size: ${({ theme }) => theme.fontSizes.text_14};
  `,

  large: css`
    min-height: 54px;
    padding: 0 30px;
    font-size: ${({ theme }) => theme.fontSizes.text_16};
  `,
};

const buttonVariants = {
  primary: css`
    color: ${({ theme }) => theme.colors.text.inverse};
    background: ${({ theme }) => theme.colors.brand.primary};
    border-color: ${({ theme }) => theme.colors.brand.primary};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.brand.primaryDark};
      border-color: ${({ theme }) => theme.colors.brand.primaryDark};
    }
  `,

  secondary: css`
    color: ${({ theme }) => theme.colors.brand.primary};
    background: ${({ theme }) => theme.colors.background.primary};
    border-color: ${({ theme }) => theme.colors.border.brand};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.background.softBlue};
      border-color: ${({ theme }) => theme.colors.brand.primary};
    }
  `,

  outline: css`
    color: ${({ theme }) => theme.colors.brand.primary};
    background: transparent;
    border-color: ${({ theme }) => theme.colors.brand.primary};

    &:hover:not(:disabled) {
      color: ${({ theme }) => theme.colors.text.inverse};
      background: ${({ theme }) => theme.colors.brand.primary};
    }
  `,

  ghost: css`
    color: ${({ theme }) => theme.colors.brand.primary};
    background: transparent;
    border-color: transparent;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.background.softBlue};
    }
  `,
};

export const ButtonWrapper = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};

  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.sizes.radius.pill};

  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1;
  letter-spacing: 0.04em;
  text-decoration: none;
  text-transform: uppercase;
  white-space: nowrap;

  cursor: pointer;
  transition: color 180ms ease, background-color 180ms ease,
    border-color 180ms ease, transform 180ms ease, box-shadow 180ms ease;

  ${({ $size = "medium" }) => sizeVariants[$size] || sizeVariants.medium}
  ${({ $variant = "primary" }) =>
    buttonVariants[$variant] || buttonVariants.primary}

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => `${theme.colors.brand.accent}55`};
    outline-offset: 3px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: ${({ $size }) => ($size === "small" ? "40px" : "48px")};
  }
`;
