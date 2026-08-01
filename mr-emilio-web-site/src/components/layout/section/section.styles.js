import styled from "styled-components";

const getSectionBackground = ({ $background, theme }) => {
  const backgrounds = {
    white: theme.colors.background.primary,
    secondary: theme.colors.background.secondary,
    softBlue: theme.colors.background.softBlue,
    cream: theme.colors.background.cream,
    dark: theme.colors.background.dark,
    transparent: "transparent",
  };

  return backgrounds[$background] || backgrounds.transparent;
};

const getVerticalSpacing = ({ $spacing, theme }) => {
  const spacingVariants = {
    none: "0",
    small: theme.spacing.xxxl,
    normal: theme.spacing.section,
    large: theme.spacing.sectionLarge,
  };

  return spacingVariants[$spacing] || spacingVariants.normal;
};

export const SectionWrapper = styled.section`
  width: 100%;
  padding-top: ${getVerticalSpacing};
  padding-bottom: ${getVerticalSpacing};
  background: ${getSectionBackground};

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding-top: ${({ $spacing, theme }) =>
      $spacing === "none" ? "0" : theme.spacing.section};
    padding-bottom: ${({ $spacing, theme }) =>
      $spacing === "none" ? "0" : theme.spacing.section};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-top: ${({ $spacing, theme }) =>
      $spacing === "none" ? "0" : theme.spacing.xxxl};
    padding-bottom: ${({ $spacing, theme }) =>
      $spacing === "none" ? "0" : theme.spacing.xxxl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding-top: ${({ $spacing, theme }) =>
      $spacing === "none" ? "0" : theme.spacing.xxl};
    padding-bottom: ${({ $spacing, theme }) =>
      $spacing === "none" ? "0" : theme.spacing.xxl};
  }
`;
