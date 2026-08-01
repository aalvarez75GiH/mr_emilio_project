import styled, { css } from "styled-components";

const variants = {
  heroTitle: css`
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: clamp(3.25rem, 5vw, 5.25rem);
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    line-height: 1;
    letter-spacing: -0.03em;
  `,

  sectionTitle: css`
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: clamp(2.25rem, 3.5vw, 3.5rem);
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
    line-height: 1;
    letter-spacing: -0.015em;
  `,

  cardTitle: css`
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: clamp(1rem, 1.4vw, 1.25rem);
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    line-height: 1.2;
  `,

  body: css`
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: clamp(1rem, 1.1vw, 1.125rem);
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    line-height: 1.65;
  `,

  bodySmall: css`
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: clamp(0.875rem, 0.9vw, 1rem);
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    line-height: 1.55;
  `,

  label: css`
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: clamp(0.7rem, 0.7vw, 0.8rem);
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    line-height: 1.2;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  `,

  button: css`
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 0.875rem;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    line-height: 1;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  `,

  price: css`
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 1.125rem;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    line-height: 1.2;
  `,

  nav: css`
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 0.75rem;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    line-height: 1;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  `,
};

const StyledText = styled.p`
  margin: 0;

  color: ${({ $color, theme }) => $color || theme.colors.text.primary};

  text-align: ${({ $align = "left" }) => $align};

  ${({ $variant = "body" }) => variants[$variant] || variants.body}
`;

export const Text = ({
  variant = "body",
  color,
  align = "left",
  children,
  as,
  ...props
}) => {
  return (
    <StyledText
      as={as}
      $variant={variant}
      $color={color}
      $align={align}
      {...props}
    >
      {children}
    </StyledText>
  );
};
