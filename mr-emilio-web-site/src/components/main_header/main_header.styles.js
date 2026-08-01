import styled from "styled-components";

export const Header = styled.header`
  position: sticky;
  z-index: 1000;

  top: 0;
  left: 0;

  width: 100%;

  background: ${({ theme }) => theme.colors.background.primary};

  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 48px;

  width: 100%;
  height: ${({ theme }) => theme.sizes.header.desktopHeight};

  padding: 0 64px;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding: 0 80px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 0 48px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    gap: 32px;

    padding: 0 32px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: auto 1fr;
    gap: 20px;

    height: ${({ theme }) => theme.sizes.header.tabletHeight};

    padding: 0 24px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 16px;

    height: ${({ theme }) => theme.sizes.header.mobileHeight};

    padding: 0 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    gap: 12px;

    padding: 0 16px;
  }
`;

export const Logo = styled.a`
  display: inline-flex;
  align-items: center;

  width: fit-content;

  img {
    display: block;
    width: auto;
    height: 78px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    img {
      height: 70px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    img {
      height: 66px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    img {
      height: 62px;
    }
  }
`;

export const Navigation = styled.nav`
  display: flex;
  justify-content: center;
  gap: 36px;

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    gap: 28px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

export const NavigationLink = styled.a`
  color: ${({ theme }) => theme.colors.text.primary};

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.text_16};
  font-weight: ${({ theme }) => theme.fontWeights.medium};

  text-decoration: none;

  transition: color 180ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors.brand.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand.primary};
    outline-offset: 5px;
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-self: end;

    gap: 8px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 4px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    gap: 2px;
  }
`;

export const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 42px;
  height: 42px;

  padding: 0;

  border: none;
  border-radius: 50%;

  background: transparent;
  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 22px;

  cursor: pointer;

  transition: color 180ms ease, background 180ms ease;

  svg {
    width: 1em;
    height: 1em;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.background.softBlue};
    color: ${({ theme }) => theme.colors.brand.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand.primary};
    outline-offset: 2px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 40px;
    height: 40px;

    font-size: 21px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    width: 38px;
    height: 38px;

    font-size: 20px;
  }
`;

export const MobileMenuButton = styled(ActionButton)`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: inline-flex;

    margin-left: 2px;
  }
`;
