import styled from "styled-components";

export const BackHeaderContainer = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    position: sticky;
    z-index: 900;

    top: ${({ theme }) => theme.sizes.header.mobileHeight};

    display: flex;
    align-items: center;

    width: 100%;
    min-height: 44px;

    padding: 0 20px;

    border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};

    background: ${({ theme }) => theme.colors.background.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    top: ${({ theme }) => theme.sizes.header.mobileHeight};

    min-height: 42px;

    padding-inline: 16px;
  }
`;

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;

  min-height: 38px;

  padding: 0;

  border: none;

  background: transparent;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-family: ${({ theme }) => theme.fonts.body};

  cursor: pointer;

  svg {
    width: 19px;
    height: 19px;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand.primary};

    outline-offset: 3px;

    border-radius: 4px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

export const BackLabel = styled.span`
  font-size: 0.82rem;

  font-weight: ${({ theme }) => theme.fontWeights.semiBold};

  line-height: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 0.78rem;
  }
`;
